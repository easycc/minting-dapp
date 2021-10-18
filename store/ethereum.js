import Web3EthContract from 'web3-eth-contract';

import Web3 from '../contracts/Web3';

import LocaleStorage from '~/services/locale-storage';
import NETWORKS from '~/constants/networks';

export const state = () => ({
	collection: {
		maxMintAmount: 0,
		totalSupply: 0,
		maxSupply: 0,
		symbol: null,
		name: null,
		cost: null,
		network: {
			id: null,
			chainId: null
		}
	},
	account: null
});

export const actions = {
	async connect ({ commit, dispatch, getters }) {
		const { ethereum } = window;
		let { collection, network } = getters;

		const metamaskIsInstalled = ethereum && ethereum.isMetaMask;
		let account = null;

		if (metamaskIsInstalled) {
			ethereum.on('accountsChanged', () => {
				dispatch('connect');
			});
			ethereum.on('chainChanged', () => {
				dispatch('connect');
				dispatch('fetchCollectionData');
			});

			return Web3.eth.getAccounts()
			.then(async foundAccounts => {
				account = foundAccounts[0];
				if (account) {
					LocaleStorage.setItem('account', account);
					return ethereum.request({
						method: 'net_version'
					});
				}

				let message = {
					title: `No active account found in MetaMask .`
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

		let message = 'Install Metamask';

		this.$notify({
			group: 'all',
			type: 'warning',
			title: message
		});
	},

	async fetchDatabaseCollectionData ({ commit }) {
		return this.$fire.firestore
		.collection('collections')
		.doc('crypto-savanna')
		.get()
		.then(collectionSnap => commit('SET_STATE', ['collection', collectionSnap.data()]));
	},

	async fetchCollectionData ({ commit, getters, dispatch }) {
		await dispatch('fetchDatabaseCollectionData');

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
				totalSupply: values[0],
				maxMintAmount: values[1],
				maxSupply: values[2],
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

	async claimNft ({ dispatch, getters }, mintAmount) {
		let { collection, account, SmartContract, network } = getters;
		const SAFE_GAS_LIMIT = 285000;

		let gasLimit = SAFE_GAS_LIMIT;
		let costInEth = collection.cost;
		let totalCostWei = Web3.utils.toWei(String(costInEth), network.currency.name);
		let totalGasLimit = String(gasLimit * mintAmount);

		return SmartContract.methods
			.mint(mintAmount)
			.send({
				gasLimit: String(totalGasLimit),
				to: collection.contractAddress,
				from: account,
				value: String(totalCostWei)
			})
			.once('error', err => {
				throw err;
			})
			.then(() => {
				dispatch('fetchCollectionData');

				return null;
			})
			.catch(err => {
				console.log(err);

				this.$notify({
					group: 'all',
					type: 'error',
					title: 'Sorry, something went wrong.',
					text: err.message ? err.message : err
				});
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
			let abi = JSON.parse(collection.abi);

			return new Web3EthContract(
				abi,
				collection.contractAddress
			);
		}
	}
};