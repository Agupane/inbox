const HDWallletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
/** Interface == ABI **/
const { interface, bytecode } = require('./compile');

const provider = new HDWallletProvider(
  'organ exile mouse true shock spike dizzy deposit famous mixed pipe custom',
  'https://rinkeby.infura.io/v3/c78d8fd9285c4004b4b31b77d6cc5d3d'
);

const web3 = new Web3(provider);

const deploy = async () =>{
    const accounts = await web3.eth.getAccounts();
    console.log("Attempting to deploy from account: ", accounts[0]);
    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['Hi there!']})
        .send({ from: accounts[0], gas: '1000000'});

    console.log("Contract deployed to: ", result.options.address);
};

deploy();