import assert from 'assert';
import compile from "../compile";
import {testProvider} from '../providers';

const initialMessage = 'Hi there!';

let accounts: any;
let inbox: any;
beforeEach(async () => {

    // Get a list of all accounts
    accounts = await testProvider.eth.getAccounts();

    // Use one of those accounts to deploy the contract
    inbox = await new testProvider.eth.Contract(compile.abi)
        .deploy({
            data: compile.evm.bytecode.object,
            arguments: [initialMessage],
        })
        .send({from: accounts[0], gas: '1000000'});
});

describe('Inbox', () => {

    it('deploys a contract', () => {
        assert.ok(inbox.options.address);
    });

    it('has a default message', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, initialMessage);
    });

    it('can change the message', async () => {
        await inbox.methods.setMessage('bye').send({from: accounts[0]});
        const message = await inbox.methods.message().call();
        assert.equal(message, 'bye');
    });
});