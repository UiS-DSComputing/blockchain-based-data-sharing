import yaml
import os


def main():
    """
    This function dynamically resets configurations of benchmark module for the caliper-workspace.
    """

    with open('./benchmarks/myAssetBenchmark.yaml') as f:
        bench_config = yaml.safe_load(f)

    bench_config['test']['workers']['number'] = int(
        os.environ['NR_OF_CLINETS'])
    for round in range(len(bench_config['test']['rounds'])):
        bench_config['test']['rounds'][round]['rateControl']['opts']['tps'] = int(
            os.environ['TPS_Caliper'])

    with open('./benchmarks/myAssetBenchmark.yaml', 'w') as f:
        yaml.dump(bench_config, f)


if __name__ == "__main__":
    main()
