import Web3EthContract from 'web3-eth-contract';

import CONFIG from './config.json';
import ABI from './abi.json';

let SmartContract = null;

if (process.client) {
	SmartContract = new Web3EthContract(
		ABI,
		CONFIG.CONTRACT_ADDRESS
	);
}

export default SmartContract;