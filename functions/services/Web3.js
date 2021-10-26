const functions = require('firebase-functions');

const { ERROR_CODE } = require('../constants/error');

module.exports.getBalance = async function ({ account, curencyName, web3 }) {
	return web3.eth.getBalance(account, function (error, result) {
		if (error) {
			functions.logger.error(error);
			throw new functions.https.HttpsError(
				ERROR_CODE.NOT_FOUND,
				'Account was not found',
				error
			);
		}
		return parseFloat(web3.utils.fromWei(result, curencyName));
	});
};

module.exports.toWei = async function ({ costInEth, currencyName, web3 }) {
	return web3.utils.toWei(String(costInEth), currencyName);
};

module.exports.contract = async function ({ abi, contractAddress, web3 }) {
	return new web3.eth.Contract(
		abi,
		contractAddress
	);
};

module.exports.sendSignedTransaction = async function ({ signedTransaction, web3 }) {
	return web3.eth.sendSignedTransaction(
		signedTransaction,
		function (error, hash) {
			if (error) {
				functions.logger.error(error);
				throw error;
			}
			if (hash) {
				// DO SMTH WITH HASH
			}
		}
	)
	.catch(error => {
		functions.logger.error(error);
		throw new functions.https.HttpsError(
			ERROR_CODE.CANCELLED,
			'Transaction was unsuccessful',
			error
		);
	});
};