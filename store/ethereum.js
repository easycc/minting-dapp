import CONFIG from '../contracts/config.json';
import Web3 from '../contracts/Web3';
import SmartContract from '../contracts/SmartContract';

import LocaleStorage from '~/services/locale-storage';
import ethNetworkById from '~/utils/eth-network-by-id';

export const state = () => ({
	collection: {
		maxMintAmount: 0,
		totalSupply: 0,
		maxSupply: 0,
		symbol: null,
		name: null,
		cost: null
	},
	account: null
});

export const actions = {
	async connect ({ commit, dispatch }) {
		const { ethereum } = window;

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
				LocaleStorage.setItem('account', account);

				return ethereum.request({
					method: 'net_version'
				});
			})
			.then(networkIdStr => {
				let networkId = parseInt(networkIdStr, 10);

				if (networkId === CONFIG.NETWORK.ID) {
					commit('SET_STATE', ['account', account]);
				}
				else {
					let message = {
						title: `Switch to the Ethereum ${ethNetworkById(CONFIG.NETWORK.ID)} network`,
						text: `Your network is ${ethNetworkById(networkId)}`
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

	async fetchCollectionData ({ commit }) {
		let totalSupply = SmartContract.methods.totalSupply().call();
		let maxMintAmount = SmartContract.methods.maxMintAmount().call();
		let maxSupply = SmartContract.methods.maxSupply().call();
		let cost = SmartContract.methods.cost().call();
		let symbol = SmartContract.methods.symbol().call();
		let name = SmartContract.methods.name().call();

		return Promise.all([totalSupply, maxMintAmount, maxSupply, cost, symbol, name])
		.then(values => {
			commit('SET_STATE', ['collection', {
				totalSupply: values[0],
				maxMintAmount: values[1],
				maxSupply: values[2],
				cost: parseFloat(Web3.utils.fromWei(values[3], CONFIG.NETWORK.CURRENCY)),
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
		let { collection, account } = getters;
		const SAFE_GAS_LIMIT = 285000;

		let gasLimit = SAFE_GAS_LIMIT;
		let costInEth = collection.cost;
		let totalCostWei = Web3.utils.toWei(String(costInEth), CONFIG.NETWORK.CURRENCY);
		let totalGasLimit = String(gasLimit * mintAmount);

		return SmartContract.methods
			.mint(mintAmount)
			.send({
				gasLimit: String(totalGasLimit),
				to: CONFIG.CONTRACT_ADDRESS,
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
	SET_STATE (state, value) {
		state[value[0]] = value[1];
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
	}
};