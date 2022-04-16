import WindowWeb3 from '../services/WindowWeb3';
import InfuraWeb3 from '../services/InfuraWeb3';
import abi from '../collection/abi.json';
import config from '../collection/config.json';

import NETWORKS from '~/constants/networks';

export const state = () => ({
	collection: {
		totalSupply: 0
	},
	account: null
});

export const actions = {
	async connect ({ commit, dispatch, getters }) {
		const { ethereum } = window;
		let { network } = getters;

		const metamaskIsInstalled = ethereum && ethereum.isMetaMask;
		let account = null;

		if (metamaskIsInstalled) {
			await window.ethereum.enable();
			ethereum.on('accountsChanged', () => {
				dispatch('connect');
			});
			ethereum.on('chainChanged', () => {
				dispatch('connect');
			});

			return WindowWeb3.eth.getAccounts()
					.then(async foundAccounts => {
						account = foundAccounts[0];

						if (account) {
							return ethereum.request({
								method: 'net_version'
							});
						}

						let message = {
							title: `No active wallet found in MetaMask.`
						};

						throw message;
					})
					.then(networkIdStr => {
						let networkId = parseInt(networkIdStr, 10);

						if (networkId === config.network.chainId) {
							commit('SET_STATE', ['account', account]);
						}
						else {
							let message = {
								title: `Switch to the ${network.chain}`,
								text: `Your network is ${network.name}`
							};

							throw message;
						}
						return null;
					})
					.catch(error => {
						console.log(error);
						this.$notify({
							group: 'all',
							type: 'warning',
							...error
						});
					});
		}

		this.$notify({
			group: 'all',
			type: 'warning',
			title: 'Please, install Metamask'
		});
	},

	async fetchCollectionContractData ({ commit, getters }) {
		let { InfuraSmartContract } = getters;
		let totalSupply = InfuraSmartContract.methods.totalSupply().call();

		return Promise.all([totalSupply])
		.then(values => {
			commit('UPDATE_STATE', ['collection', {
				totalSupply: parseInt(values[0], 10)
			}]);

			return values;
		})
		.catch(() => {
			this.$notify({
				group: 'all',
				type: 'error',
				title: 'Could not load data from contract.'
			});
		});
	},

	async mintNft ({ getters, dispatch }, { mintAmount }) {
		let { account, SmartContract } = getters;

		let amount = mintAmount * config.cost;

		let valueInWei = WindowWeb3.utils.toWei(String(amount), 'ether');

		let totalCostWei = String(valueInWei);

		return SmartContract.methods.mint(mintAmount)
		.send({
			to: config.contractAddress,
			from: account,
			value: totalCostWei
		})
		.once('error', error => {
			throw error;
		})
		.then(receipt => {
			dispatch('fetchCollectionContractData');

			return receipt;
		})
		.catch(error => {
			throw error;
		});
	}
};

export const mutations = {
	SET_STATE (state, data) {
		let field = data[0];
		let value = data[1];

		state[field] = value;
	},
	UPDATE_STATE (state, data) {
		let field = data[0];
		let value = data[1];
		let isObject = value instanceof Object;
		let isArray = value instanceof Array;

		if (isObject) {
			state[field] = { ...state[field], ...value };
		}
		else if (isArray) {
			state[field] = [...state[field], ...value];
		}
	}
};

export const getters = {
	data (state) {
		return state.data;
	},

	account (state) {
		return state.account;
	},

	collection (state) {
		return state.collection;
	},

	network (state) {
		let network = {};

		network = NETWORKS[config.network.id];
		network.chain = network.chains[config.network.chainId];
		return network;
	},

	SmartContract () {
		if (config.contractAddress) {
			return new WindowWeb3.eth.Contract(
				abi,
				config.contractAddress
			);
		}
	},

	InfuraSmartContract () {
		if (config.contractAddress) {
			return new InfuraWeb3.eth.Contract(
				abi,
				config.contractAddress
			);
		}
	}
};