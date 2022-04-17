import Web3 from 'web3';
import Web3EthContract from 'web3-eth-contract';

let WindowWeb3 = {};

if (process.client) {
	const { ethereum } = window;

	if (ethereum) {
		Web3EthContract.setProvider(ethereum);
		WindowWeb3 = new Web3(ethereum);
	}
	else if (window.web3) {
		WindowWeb3 = new Web3(window.web3.currentProvider);
	}
}

export default WindowWeb3;