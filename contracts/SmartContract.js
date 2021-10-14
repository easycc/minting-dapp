import Web3 from './Web3';
import CONFIG from './config.json';
import ABI from './abi.json';

let SmartContract = null;

if (process.client) {
	SmartContract = new Web3.eth.Contract(
		ABI,
		CONFIG.CONTRACT_ADDRESS
	);
}

export default SmartContract;