'use strict';

const { WorkloadModuleBase } = require('@hyperledger/caliper-core');

class MyWorkload extends WorkloadModuleBase {
    constructor(data) {
        super();
        this.data = data;
    }


    async initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext) {
        await super.initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext);

        for (let i = 0; i < this.roundArguments.assets; i++) {
            const assetID = `${this.workerIndex}_${i}` + this.data;
            //console.log(`Worker ${this.workerIndex}: Creating asset ${assetID}`);
            const request = {
                contractId: this.roundArguments.contractId,
                contractFunction: 'CreateAsset',
                invokerIdentity: 'User1',
                contractArguments: [assetID, 'owner'],
                readOnly: false
            };

            await this.sutAdapter.sendRequests(request);
        }
    }

    async submitTransaction() {
        const randomId = Math.floor(Math.random() * this.roundArguments.assets);
        const assetID = `${this.workerIndex}_${randomId}` + this.data;
        const myArgs = {
            contractId: this.roundArguments.contractId,
            contractFunction: 'ReadAsset',
            invokerIdentity: 'User1',
            contractArguments: [assetID],
            readOnly: true
        };

        await this.sutAdapter.sendRequests(myArgs);
    }

    async cleanupWorkloadModule() {
        for (let i = 0; i < this.roundArguments.assets; i++) {
            const assetID = `${this.workerIndex}_${i}` + this.data;
            //console.log(`Worker ${this.workerIndex}: Deleting asset ${assetID}`);
            const request = {
                contractId: this.roundArguments.contractId,
                contractFunction: 'DeleteAsset',
                invokerIdentity: 'User1',
                contractArguments: [assetID],
                readOnly: false
            };
            await this.sutAdapter.sendRequests(request);
        }
    }
}

const chaindata = {
    data32B: `Lorem ipsum dolor sit amet odio.`,
    data100B: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at ipsum quis dui lacinia efficitur.`,
    data500B: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris suscipit mauris venenatis lacus finibus congue. Nulla nulla leo, rutrum et orci et, pharetra facilisis magna. Proin eros tellus, maximus sit amet lectus sed, imperdiet elementum lacus. Proin leo enim, pharetra quis mi nec, vestibulum fermentum nulla. Curabitur suscipit tellus dolor, et sollicitudin lacus rutrum ac. Etiam iaculis, libero quis posuere aliquet, urna dui laoreet eros, nec iaculis nibh augue eu ipsum. Phasellus nec amet.`,
    data1KB: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris luctus ex in tellus ullamcorper scelerisque. Integer interdum quam sit amet massa porta sollicitudin in vel ex. Aliquam malesuada, massa id dignissim pretium, nulla purus porttitor tellus, et aliquam orci lorem eget nunc. Nam tincidunt enim ante. Donec sodales faucibus lectus. Curabitur facilisis vulputate ultrices. Suspendisse dapibus mollis libero eu consequat. Quisque aliquet mauris sed nisi ullamcorper facilisis. Integer lacinia neque ac leo varius consectetur. Aenean tempus fermentum nunc sit amet iaculis. Donec euismod, elit sed accumsan dapibus, augue urna mattis mi, eu molestie dui nisi vitae risus. Cras consequat facilisis risus sed lobortis. Vestibulum nec risus pretium libero facilisis tincidunt. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent bibendum purus at risus cursus, eget cursus neque maximus. Proin imperdiet ante maximus, lacinia dui sed, dictum cras.`,
    data5KB: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris luctus ex in tellus ullamcorper scelerisque. Integer interdum quam sit amet massa porta sollicitudin in vel ex. Aliquam malesuada, massa id dignissim pretium, nulla purus porttitor tellus, et aliquam orci lorem eget nunc. Nam tincidunt enim ante. Donec sodales faucibus lectus. Curabitur facilisis vulputate ultrices. Suspendisse dapibus mollis libero eu consequat. Quisque aliquet mauris sed nisi ullamcorper facilisis. Integer lacinia neque ac leo varius consectetur. Aenean tempus fermentum nunc sit amet iaculis. Donec euismod, elit sed accumsan dapibus, augue urna mattis mi, eu molestie dui nisi vitae risus. Cras consequat facilisis risus sed lobortis. Vestibulum nec risus pretium libero facilisis tincidunt. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent bibendum purus at risus cursus, eget cursus neque maximus. Proin imperdiet ante maximus, lacinia dui sed, dictum cras.
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris luctus ex in tellus ullamcorper scelerisque. Integer interdum quam sit amet massa porta sollicitudin in vel ex. Aliquam malesuada, massa id dignissim pretium, nulla purus porttitor tellus, et aliquam orci lorem eget nunc. Nam tincidunt enim ante. Donec sodales faucibus lectus. Curabitur facilisis vulputate ultrices. Suspendisse dapibus mollis libero eu consequat. Quisque aliquet mauris sed nisi ullamcorper facilisis. Integer lacinia neque ac leo varius consectetur. Aenean tempus fermentum nunc sit amet iaculis. Donec euismod, elit sed accumsan dapibus, augue urna mattis mi, eu molestie dui nisi vitae risus. Cras consequat facilisis risus sed lobortis. Vestibulum nec risus pretium libero facilisis tincidunt. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent bibendum purus at risus cursus, eget cursus neque maximus. Proin imperdiet ante maximus, lacinia dui sed, dictum cras.
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris luctus ex in tellus ullamcorper scelerisque. Integer interdum quam sit amet massa porta sollicitudin in vel ex. Aliquam malesuada, massa id dignissim pretium, nulla purus porttitor tellus, et aliquam orci lorem eget nunc. Nam tincidunt enim ante. Donec sodales faucibus lectus. Curabitur facilisis vulputate ultrices. Suspendisse dapibus mollis libero eu consequat. Quisque aliquet mauris sed nisi ullamcorper facilisis. Integer lacinia neque ac leo varius consectetur. Aenean tempus fermentum nunc sit amet iaculis. Donec euismod, elit sed accumsan dapibus, augue urna mattis mi, eu molestie dui nisi vitae risus. Cras consequat facilisis risus sed lobortis. Vestibulum nec risus pretium libero facilisis tincidunt. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent bibendum purus at risus cursus, eget cursus neque maximus. Proin imperdiet ante maximus, lacinia dui sed, dictum cras.
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris luctus ex in tellus ullamcorper scelerisque. Integer interdum quam sit amet massa porta sollicitudin in vel ex. Aliquam malesuada, massa id dignissim pretium, nulla purus porttitor tellus, et aliquam orci lorem eget nunc. Nam tincidunt enim ante. Donec sodales faucibus lectus. Curabitur facilisis vulputate ultrices. Suspendisse dapibus mollis libero eu consequat. Quisque aliquet mauris sed nisi ullamcorper facilisis. Integer lacinia neque ac leo varius consectetur. Aenean tempus fermentum nunc sit amet iaculis. Donec euismod, elit sed accumsan dapibus, augue urna mattis mi, eu molestie dui nisi vitae risus. Cras consequat facilisis risus sed lobortis. Vestibulum nec risus pretium libero facilisis tincidunt. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent bibendum purus at risus cursus, eget cursus neque maximus. Proin imperdiet ante maximus, lacinia dui sed, dictum cras.
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris luctus ex in tellus ullamcorper scelerisque. Integer interdum quam sit amet massa porta sollicitudin in vel ex. Aliquam malesuada, massa id dignissim pretium, nulla purus porttitor tellus, et aliquam orci lorem eget nunc. Nam tincidunt enim ante. Donec sodales faucibus lectus. Curabitur facilisis vulputate ultrices. Suspendisse dapibus mollis libero eu consequat. Quisque aliquet mauris sed nisi ullamcorper facilisis. Integer lacinia neque ac leo varius consectetur. Aenean tempus fermentum nunc sit amet iaculis. Donec euismod, elit sed accumsan dapibus, augue urna mattis mi, eu molestie dui nisi vitae risus. Cras consequat facilisis risus sed lobortis. Vestibulum nec risus pretium libero facilisis tincidunt. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent bibendum purus at risus cursus, eget cursus neque maximus. Proin imperdiet ante maximus, lacinia dui sed, dictum cras.`,
};

function createWorkloadModule() {
    return new MyWorkload(chaindata.data32B);
}


module.exports.createWorkloadModule = createWorkloadModule;
