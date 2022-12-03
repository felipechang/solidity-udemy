import {walletProvider} from "./providers";
import compile from "./compile";

const deploy = async () => {
    const accounts = await walletProvider.eth.getAccounts();
    console.log('accounts', accounts);
    console.log('Attempting to deploy from account', accounts[0]);
    const result = await new walletProvider.eth.Contract(compile.abi)
        .deploy({
            data: compile.evm.bytecode.object,
            arguments: ['Hi there!'],
        })
        .send({from: accounts[0], gas: '1000000'});

    console.log('Contract deployed to', result.options.address);
    walletProvider.engine.stop();
}
deploy();