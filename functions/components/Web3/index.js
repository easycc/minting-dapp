const functions = require('firebase-functions');
const Web3 = require('web3');

const INFURA_PROJECT_ID = functions.config().infura.project_id;


const { INFURA_ENTRYPOINT_BY_CHAIN_ID } = require('../../constants/infura-entrypoint-by-chain-id');

const provider = async function (abi, contractAddress, chainId) {
	return new Web3(new Web3.providers.HttpProvider(`${INFURA_ENTRYPOINT_BY_CHAIN_ID[chainId]}${INFURA_PROJECT_ID}`));
};

module.exports = {
	provider
};