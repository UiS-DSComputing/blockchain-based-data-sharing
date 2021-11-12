# Blockchain empowered data management
------------------------------------------------------------------------------------------------------------------------------------------------------------------------

This project is a demo application for experiment with [Hyperledger](https://www.hyperledger.org/) blockchain technology. We specifically design an off-chain storage model, where we use a [MySql](https://www.mysql.com/) database to store data and submit light-weighted transactions to the blockchain with only the hash of data.<br/>



### To compiling our demo projcet
------------------------------------------------------------------------------------------------------------------------------------------------------------------------
This project is implemented in [Go](https://golang.org/). In addition, we have implemneted an API to an communicate with a MySql server.<br/>
You need to have a fabric network running with at least two peer organizations and an ordering service.<br/>
However, fabric provides a [test network](https://hyperledger-fabric.readthedocs.io/en/release-2.2/test_network.html) which you can run locally and has all required configurations. In the following, we list the requirements for compiling this application:<br>

- cURL — latest version
- Go — version 1.17.x
- Docker Compose — version 1.29.x
- MySql server — 8.0.2x
- Hyperledger Fabric test network<br/>




### Run the demo
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Start the MySql server by `/your-path-to-bin/mysql -u username -p password`, by replacing username and password with yours.<br>
If you are using Fabric's test network, you need to put this project in the `Github/your-user-name/fabric-samples/my-simple-offchain/` directory. Then use the following commands to start the test network, configure a channel, deploy the chaincode, and start the application server:
`cd fabric-samples/test-network`<br/>
`./network.sh up` <br/>
`./network.sh createChannel -c mychannel -ca`<br/>
`./network.sh deployCC -ccn basic -ccp ../my-simple-offchain/chaincode-go -ccl go`<br/>
`cd fabric-samples/my-simple-offchain/application-go`</br>
`go run offApp.go`<br/>



#### Good luck :-)
