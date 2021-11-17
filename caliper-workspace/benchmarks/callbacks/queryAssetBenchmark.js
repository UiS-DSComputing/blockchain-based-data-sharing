'use strict';
import sjcl from 'sjcl';

module.exports.info = 'Template callback';

const contractID = 'basic';
const version = '0.0.1';

let bc, ctx, clientArgs, clientIdx;

async function sha256(message) {
    const hashDataBits = sjcl.hash.sha256.hash(message);
    const hashedData = sjcl.codec.hex.fromBits(hashDataBits);
    return hashedData;
}

module.exports.init = async function (blockchain, context, args) {
    bc = blockchain;
    ctx = context;
    clientArgs = args;
    clientIdx = context.clientIdx.toString();
    for (let i = 0; i < clientArgs.assets; i++) {
        try {
            let txt1KB = 'suske' * 200
            const data = `${clientIdx}_${i}_This_a_unique_test_file_${txt1KB}`;
            const hashID = sha256(data)
            // TODO: add a insertion to database as well
            console.log(`Client ${clientIdx}: Creating asset ${hashID}`);
            const myArgs = {
                chaincodeFunction: 'CreateAsset',
                invokerIdentity: 'Admin@org1.example.com',
                chaincodeArguments: [hashID, 'owner']
            };
            await bc.bcObj.invokeSmartContract(ctx, contractID, version, myArgs);
        } catch (error) {
            console.log(`Client ${clientIdx}: Smart Contract threw with error: ${error}`);
        }
    }
};

module.exports.run = function () {
    const randomId = Math.floor(Math.random() * clientArgs.assets);
    let txt1KB = 'suske' * 200
    const data = `${clientIdx}_${randomId}_This_a_unique_test_file_${txt1KB}`;
    const hashID = sha256(data)
    const myArgs = {
        chaincodeFunction: 'ReadAsset',
        invokerIdentity: 'Admin@org1.example.com',
        chaincodeArguments: [hashID]
    };
    return bc.bcObj.querySmartContract(ctx, contractID, version, myArgs);
};

module.exports.end = async function () {
    bc = blockchain;
    ctx = context;
    clientArgs = args;
    clientIdx = context.clientIdx.toString();
    for (let i = 0; i < clientArgs.assets; i++) {
        try {
            let txt1KB = 'suske' * 200
            const data = `${clientIdx}_${i}_This_a_unique_test_file_${txt1KB}`;
            const hashID = sha256(data)
            // TODO: add a insertion to database as well
            console.log(`Client ${clientIdx}: Deleting asset ${hashID}`);
            const myArgs = {
                chaincodeFunction: 'DeleteAsset',
                invokerIdentity: 'Admin@org1.example.com',
                chaincodeArguments: [hashID]
            };
            await bc.bcObj.invokeSmartContract(ctx, contractID, version, myArgs);
        } catch (error) {
            console.log(`Client ${clientIdx}: Smart Contract threw with error: ${error}`);
        }
    }
};