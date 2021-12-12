const functions = require('firebase-functions');

const METAMASK_PRIVATE_KEY = functions.config().metamask.private_key;
const Web3 = require('../Web3');

const get = async function (abi, contractAddress, chainId) {
	let web3 = await Web3.provider(chainId);

	functions.logger.log('abi', abi);
	functions.logger.log('contractAddress', contractAddress);
	functions.logger.log('chainId', chainId);

	return new web3.eth.Contract(
		abi,
		contractAddress
	);
};

const getWhitelistedUsers = async function (abi, contractAddress, chainId) {
	let contract = await get(
		abi,
		contractAddress,
		chainId
	);

	return contract.methods.whitelistedAddresses().call();
};

const getMaxSupply = async function (abi, contractAddress, chainId) {
	let contract = await get(
		abi,
		contractAddress,
		chainId
	);

	return contract.methods.maxSupply().call();
};

const setWhitelistedUsers = async function (abi, contractAddress, chainId, currentQueueParticipators) {
	let contract = await get(
		abi,
		contractAddress,
		chainId
	);

	return contract.methods.whitelistUsers(currentQueueParticipators).call();
};

module.exports = {
	getMaxSupply,
	getWhitelistedUsers,
	setWhitelistedUsers
};