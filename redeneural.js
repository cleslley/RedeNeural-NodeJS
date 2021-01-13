const mnist = require('mnist'); 
const set = mnist.set(1000, 10);
const trainingSet = set.training;
const testSet = set.test;

const synaptic = require('synaptic');
const Layer = synaptic.Layer;
const Network = synaptic.Network;
const Trainer = synaptic.Trainer;

const inputLayer = new Layer(784);
const hiddenLayer = new Layer(150);
const outputLayer = new Layer(10);

inputLayer.project(hiddenLayer);
hiddenLayer.project(outputLayer);

const myNetwork = new Network({
    input: inputLayer,
    hidden: [hiddenLayer],
    output: outputLayer
});

const trainer = new Trainer(myNetwork);
trainer.train(trainingSet, {
    rate: .2,
    iterations: 20,
    error: .1,
    shuffle: true,
    log: 1,
    cost: Trainer.cost.MSE
});


for (let i = 0; i < 10; i++) {

    console.log("Resposta Esperada: ",testSet[i].output);
    console.log("Resposta Encontrada: ",myNetwork.activate(testSet[i].input));
} 



//console.log("Testando numero 0: ",myNetwork.activate(digtest));
