const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile');

let accounts;
let inbox;
const INITIAL_STRING = 'Hi there!';

beforeEach ( async () =>{
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts();

    // Use one of those accounts to deploy the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['Hi there!']})
        .send({ from: accounts[0], gas: '1000000'});

});

describe('Inbox', () =>{
    it('Deploys a contract', () =>{
        //console.log("Accounts: ", accounts);
       // console.log("Inbox: ", inbox);
        assert.ok(inbox.options.address);
    });

    it('Has a default message', async () =>{
        const message = await inbox.methods.message().call();
        assert.equal(message, INITIAL_STRING);
    });

    it('Can change the message', async () =>{
        let newMsg = 'Message changed';
        await inbox.methods.setMessage(newMsg)
            .send({from: accounts[0], gas: '1000000'});
        let msgChanged = await inbox.methods.message().call();
        assert.equal(newMsg, msgChanged);
    });
});