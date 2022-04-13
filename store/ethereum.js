import Web3EthContract from 'web3-eth-contract';

import Web3 from '../services/Web3';
import abi from '../collection/abi.json';

import NETWORKS from '~/constants/networks';


export const state = () => ({
	collection: {
		contractAddress: '0xfcD1186589a5801e30290765a340d0B968a568aB',
		abi,
		cost: 0.05,

		maxMintAmount: 0,
		totalSupply: 0,
		maxSupply: 0,
		symbol: null,
		name: null,
		network: {
			id: 'ETHEREUM',
			chainId: 4
		}
	},
	account: null
});

export const actions = {

	async connect ({ commit, dispatch, getters }) {
		const { ethereum } = window;
		let { collection, network } = getters;

		await window.ethereum.enable();

		const metamaskIsInstalled = ethereum && ethereum.isMetaMask;
		let account = null;

		if (metamaskIsInstalled) {
			ethereum.on('accountsChanged', () => {
				dispatch('connect');
			});
			ethereum.on('chainChanged', () => {
				dispatch('connect');
			});

			return Web3.eth.getAccounts()
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

						if (networkId === collection.network.chainId) {
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

		let message = 'Please install Metamask';

		this.$notify({
			group: 'all',
			type: 'warning',
			title: message
		});
	},

	async fetchCollection ({ dispatch }) {
		const { ethereum } = window;
		const metamaskIsInstalled = ethereum;

		if (!metamaskIsInstalled) return;

		await dispatch('fetchCollectionContractData');
	},

	async fetchCollectionContractData ({ commit, getters }) {
		let { SmartContract, network } = getters;
		let totalSupply = SmartContract.methods.totalSupply().call();
		let maxMintAmount = SmartContract.methods.maxMintAmount().call();
		let maxSupply = SmartContract.methods.maxSupply().call();
		let cost = SmartContract.methods.cost().call();
		let symbol = SmartContract.methods.symbol().call();
		let name = SmartContract.methods.name().call();

		return Promise.all([totalSupply, maxMintAmount, maxSupply, cost, symbol, name])
		.then(values => {
			commit('UPDATE_STATE', ['collection', {
				totalSupply: parseInt(values[0], 10),
				maxMintAmount: parseInt(values[1], 10),
				maxSupply: parseInt(values[2], 10),
				cost: parseFloat(Web3.utils.fromWei(values[3], network.currency.name)),
				symbol: values[4],
				name: values[5]
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
		let { account, SmartContract, collection } = getters;

		let amount = mintAmount * collection.cost;

		let donationAmountInWei = Web3.utils.toWei(String(amount), 'ether');

		let totalCostWei = String(donationAmountInWei);

		return SmartContract.methods.mint(mintAmount)
		.send({
			to: collection.contractAddress,
			from: account,
			value: totalCostWei
		})
		.once('error', error => {
			throw error;
		})
		.then(receipt => receipt)
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
		let { collection } = state;

		if (collection && collection.network.id) {
			let network = {};

			network = NETWORKS[collection.network.id];
			network.chain = network.chains[collection.network.chainId];
			return network;
		}
		return null;
	},

	SmartContract (state) {
		let { collection } = state;

		if (collection.contractAddress) {
			return new Web3EthContract(
				abi,
				collection.contractAddress
			);
		}
	}
};