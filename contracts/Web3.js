import Web3 from 'web3';
import Web3EthContract from 'web3-eth-contract';

let web3 = null;

if (process.client) {
	const { ethereum } = window;

	const metamaskIsInstalled = ethereum && ethereum.isMetaMask;

	if (metamaskIsInstalled) {
		Web3EthContract.setProvider(ethereum);
		web3 = new Web3(ethereum);

		try {
		// Request account access if needed
			ethereum.enable();
		}
		catch {
			console.log('User denied account access...');
		}
	}
	else if (window.web3) {
	// Legacy dapp browsers...
		web3 = new Web3(window.web3.currentProvider);
	}
	else {
	// Non-dapp browsers...
		console.log(
			'Non-Ethereum browser detected. You should consider trying MetaMask!'
		);
	}
}

export default web3;