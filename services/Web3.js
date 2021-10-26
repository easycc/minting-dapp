import Web3 from 'web3';
import Web3EthContract from 'web3-eth-contract';

let web3 = {};

if (process.client) {
	const { ethereum } = window;

	if (ethereum) {
		Web3EthContract.setProvider(ethereum);
		web3 = new Web3(ethereum);
	}
	else if (window.web3) {
		// Legacy dapp browsers...
		web3 = new Web3(window.web3.currentProvider);
	}
	else {
		console.log('Non-Ethereum browser detected.');
	}
}

export default web3;