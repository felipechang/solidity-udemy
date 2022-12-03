const {resolve} = require('path');
const {readFileSync} = require('fs');
const {compile} = require('solc');

const inboxPath = resolve(__dirname, 'contracts', 'Inbox.sol');
const source = readFileSync(inboxPath, 'utf8');

const input = {
    language: 'Solidity',
    sources: {
        'Inbox.sol': {
            content: source,
        },
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*'],
            },
        },
    },
};

export default JSON.parse(compile(JSON.stringify(input))).contracts[
    'Inbox.sol'
    ].Inbox;
