import CONFIG from '../contracts/config.json';
import Web3 from '../contracts/Web3';
import SmartContract from '../contracts/SmartContract';

import LocaleStorage from '~/services/locale-storage';

export const state = () => ({
	collection: {
		maxMintAmount: 0,
		totalSupply: 0
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
			});

			return Web3.eth.getAccounts()
			.then(async foundAccounts => {
				account = foundAccounts[0];
				LocaleStorage.setItem('account', account);

				return ethereum.request({
					method: 'net_version'
				});
			})
			.then(networkId => {
				if (networkId === String(CONFIG.NETWORK.ID)) {
					commit('SET_STATE', ['account', account]);

					ethereum.on('accountsChanged', accounts => {
						commit('SET_STATE', ['account', accounts[0]]);
					});

					ethereum.on('chainChanged', () => {
						window.location.reload();
					});
				}
				else {
					let message = `Change network to ${CONFIG.NETWORK.NAME}.`;

					throw message;
				}
				return null;
			})
			.catch(error => {
				this.$notify({
					group: 'all',
					type: 'warning',
					title: error
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

		return Promise.all([totalSupply, maxMintAmount])
		.then(values => {
			commit('SET_STATE', ['collection', {
				totalSupply: values[0],
				maxMintAmount: values[1]
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

	async claimNft ({ commit, state, dispatch }, mintAmount) {
		let account = this.getters['ethereum/account'];

		let gasLimit = CONFIG.GAS_LIMIT;
		let totalCostWei = String(CONFIG.WEI_COST * mintAmount);
		let totalGasLimit = String(gasLimit * mintAmount);

		return SmartContract.methods
			.mint(mintAmount)
			.send({
				gasLimit: String(totalGasLimit),
				to: CONFIG.CONTRACT_ADDRESS,
				from: account,
				value: totalCostWei
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
					title: 'Sorry, something went wrong.'
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