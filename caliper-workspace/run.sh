#!/bin/bash

# This file runs the benchmark module with different setups

# Exit on first error
set -e
starttime=$(date +%s)

# Benchmark different transaction data sizes, nr of clients, and tps with default config - 2org- 2peers. 1 orderer, batchto: 2s, pblock size: 512 KB.
declare -a sizes=('data1024B' 'data2kB' 'data3kB' 'data4kB' 'data5kB')
declare -a clients=('2' '10' '20' '50')
declare -a tps=('25' '50' '100' '200')

# reconfigure the network config file with new secret key
python3 -c "import bench_config; bench_config.reconfig_network()"



# add the third organisation and deploye it on the channel
# ../my-off-cc/addOrg.sh
# benchmark for network 3 org

declare -a tps=('25' '50' '100' '200')
export COLLECTION_TYPE="data1024B"
export NR_OF_CLINETS="10"

for h in "${tps[@]}"; do
    export TPS_Caliper="$h"
    echo "Running tests for 3 organisations with tps: $h"
    # rewrite the benchmark configuration 
    python3 -c  "import bench_config; bench_config.reconfig_benchmark()"
    # sleep for 10 second for configuration to be applied
    sleep 5
    # run the caliper cli
    npx caliper launch manager --caliper-workspace ./ --caliper-networkconfig networks/networkConfig.yaml \
    --caliper-benchconfig benchmarks/myAssetBenchmark.yaml --caliper-flow-only-test --caliper-fabric-gateway-enabled \
    --caliper-report-path results/report_3org_1024kb_10cli_"$h"_tps.html
    # sleep for 5 sec before restarting
    sleep 5
done


# benchmark by changing block size from preffered default vlaue of 500  (batch timeut from default value of 2s, with three orgs)





cat <<EOF

for i in "${sizes[@]}"; do
    export COLLECTION_TYPE="$i"
    for j in "${clients[@]}"; do
        export NR_OF_CLINETS="$j"
        for h in "${tps[@]}"; do
            export TPS_Caliper="$h"
            echo "Running tests for collection: $i, nr of clients: $j, and tps: $h"
            # rewrite the benchmark configuration 
            python3 -c  "import bench_config; bench_config.reconfig_benchmark()"
            # sleep for 10 second for configuration to be applied
            sleep 10
            # run the caliper cli
            npx caliper launch manager --caliper-workspace ./ --caliper-networkconfig networks/networkConfig.yaml \
            --caliper-benchconfig benchmarks/myAssetBenchmark.yaml --caliper-flow-only-test --caliper-fabric-gateway-enabled \
            --caliper-report-path results/report_"$i"_"$j"_c_"$h"_tps.html
            # sleep for 5 sec before restarting
            sleep 5
        done
    done
done





Total setup execution time : $(($(date +%s) - starttime)) secs ...

Then, to see the results:
    Open the "./results/report_xx.html" file(s).

EOF






# benchmark by adding peers?