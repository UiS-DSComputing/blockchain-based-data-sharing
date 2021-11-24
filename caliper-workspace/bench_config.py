import yaml
import os
import glob


def reconfig_network(file_path: str = './networks/networkConfig.yaml') -> None:
    with open(file_path) as f:
        net_config = yaml.safe_load(f)

    sk_path = "../../fabric-samples/test-network/organizations/peerOrganizations/org1.example.com/users/User1@org1.example.com/msp/keystore/*sk"

    sk_file = []
    for file in glob.glob(sk_path):
        sk_file.append(file)

    net_config['organizations'][0]['identities']['certificates'][0]['clientPrivateKey']['path'] = sk_file[0] if "sk" in sk_file[0] else ""

    with open(file_path, 'w') as f:
        yaml.dump(net_config, f)


def reconfig_benchmark(file_path: str = './benchmarks/myAssetBenchmark.yaml') -> None:
    """
        This function dynamically resets configurations of benchmark module for the caliper-workspace.
    """
    with open(file_path) as f:
        bench_config = yaml.safe_load(f)

    bench_config['test']['workers']['number'] = int(
        os.environ['NR_OF_CLINETS'])
    for round in range(len(bench_config['test']['rounds'])):
        bench_config['test']['rounds'][round]['rateControl']['opts']['tps'] = int(
            os.environ['TPS_Caliper'])

    with open(file_path, 'w') as f:
        yaml.dump(bench_config, f)
