#!/bin/bash


# Exit on first error
set -e


declare -a sizes=('data1024B' 'data2kB' 'data3kB' 'data4kB' 'data5kB')

for i in "${sizes[@]}"; do
    echo "Running tests for $i"
    export COLLECTION_TYPE="$i"
    
    npx caliper launch manager --caliper-workspace ./ --caliper-networkconfig networks/networkConfig.yaml \
     --caliper-benchconfig benchmarks/myAssetBenchmark.yaml --caliper-flow-only-test --caliper-fabric-gateway-enabled \
      --caliper-report-path results/report_5c_25tps_"$i".html

done


