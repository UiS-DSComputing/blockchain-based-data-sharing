# Benchmarks


You can also use our benchmarking module to benchamrk our chaincode.<br>
In the benchmarking set we use different data set to store on the chain, and evaluate the performance based on that.
The size of data set varies as follow:<br>
- 32 bytes
- 100 bytes
- 500 bytes
- 1000 bytes 

--------------------------------------------------------------------------------------------------------------------------------------------------
## Requiremnts
Install the Fabric tools and add them to PATH:<br/>
```shell
curl -sSL https://bit.ly/2ysbOFE | bash -s -- 2.2.0 1.4.8 -s
export PATH=$PATH:$(pwd)/bin
```
Create and initialize the network:<br/>
```shell
./startFabric.sh
```

---------------------------------------------------------------------------------------------------------------------------------------------------



## Run the benchmarking module
```shell
cd caliper-worksapce
```
Use the Caliper CLI to run the benchmarking module:<br/>
```shell
npx caliper launch manager --caliper-workspace ./ --caliper-networkconfig networks/networkConfig.yaml --caliper-benchconfig benchmarks/myAssetBenchmark.yaml --caliper-flow-only-test --caliper-fabric-gateway-enabled --caliper-report-path ./report.html
```

You can find a `report.html` file in the parent directory.

----------------------------------------------------------------------------------------------------------------------------------------------------
