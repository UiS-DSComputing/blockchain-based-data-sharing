# Caliper Benchmark Module


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

Please refer to the main [README.md]("../README.md") file to configuere. You can setup and initialize the network:<br/>

```shell
cd fabric-samples/my-simple-offchain
./start.sh
```



---------------------------------------------------------------------------------------------------------------------------------------------------

## Run the benchmarking module

```shell
cd caliper-worksapce
```

Use our script to configuere and run our benchmarking module:<br/>

```shell
./run.sh
```

You can find a `report.html` file in the parent directory.

----------------------------------------------------------------------------------------------------------------------------------------------------
