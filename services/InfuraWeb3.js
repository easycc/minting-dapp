import Web3 from 'web3';

import config from '../collection/config.json';

let InfuraWeb3 = {};

if (process.client) {
	let url;

	switch (config.network.chainId) {
		case 1:
			url = `https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`;
			break;

		case 4:
			url = `https://rinkeby.infura.io/v3/${process.env.INFURA_PROJECT_ID}`;
			break;
	}
	InfuraWeb3 = new Web3(new Web3.providers.HttpProvider(url));
}

export default InfuraWeb3;