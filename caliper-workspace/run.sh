#!/bin/bash

# This file runs the benchmark module with different setups

# Exit on first error
set -e
starttime=$(date +%s)

declare -a sizes=('data1024B' 'data2kB' 'data3kB' 'data4kB' 'data5kB')
declare -a clients=('2' '10' '20' '50')
declare -a tps=('25' '50' '100' '200')


for i in "${sizes[@]}"; do
    export COLLECTION_TYPE="$i"
    for j in "${clients[@]}"; do
        export NR_OF_CLINETS="$j"
        for h in "${tps[@]}"; do
            export TPS_Caliper="$h"
            echo "Running tests for collection: $i, nr of clients: $j, and tps: $h"
            # rewrite the benchmark configuration 
            python3 bench_config.py
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


cat <<EOF

Total setup execution time : $(($(date +%s) - starttime)) secs ...

Then, to see the results:
    Open the "./results/report_xx.html" file(s).

EOF


# benchmark by chaning batch timeout

# benchmark by changing block size

# benchmark by adding an org

# benchmark by adding peers?