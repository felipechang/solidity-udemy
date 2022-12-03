const HDWalletProvider = require('@truffle/hdwallet-provider');
const ganache = require('ganache-cli');
const Web3 = require('web3');

require('dotenv').config();

export const walletProvider = new Web3(new HDWalletProvider(
    process.env.ACCOUNT_PNEUMONIC,
    process.env.NETWORK_URL,
));

export const testProvider = new Web3(ganache.provider());

