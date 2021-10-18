let networks = Object.freeze({
	ETHEREUM: {
		name: 'Ethereum',
		currency: {
			symbol: 'ETH',
			name: 'ether'
		},
		chains: {
			1: 'Ethereum Main Network (Mainnet)',
			3: 'Ropsten Test Network',
			4: 'Rinkeby Test Network',
			5: 'Goerli Test Network',
			42: 'Kovan Test Network'
		}
	}
});

export default networks;