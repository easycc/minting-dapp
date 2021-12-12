import Web3EthContract from 'web3-eth-contract';

import Web3 from '../services/Web3';

import getSignatureParameters from '~/utils/get-signature-parameters';
import LocaleStorage from '~/services/locale-storage';
import NETWORKS from '~/constants/networks';

let sigUtil = require('eth-sig-util');

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
				dispatch('fetchCollectionContractData');
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

		await dispatch('fetchCollectionConfig');
		await dispatch('fetchCollectionContractData');
	},

	async fetchCollectionConfig ({ commit }) {
		let { id } = this.$router.app.$route.params;

		return this.$fire.firestore
		.collection('collections')
		.doc(id)
		.get()
		.then(collectionSnap => {
			let data = collectionSnap.data();

			for (let key of Object.keys(data)) {
				if (data[key].toDate) {
					data[key] = new Date(data[key].toDate());
				}
			}
			return commit('SET_STATE', ['collection', data]);
		});
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

	async mintNft ({ getters, dispatch }, { mintAmount, collectionId }) {
		let { collection, account, SmartContract, network } = getters;
		let { chainId } = collection.network;

		let from = account;
		let data = SmartContract.methods.mint(mintAmount, account).encodeABI();
		const SAFE_GAS_LIMIT = 285000;
		let value = Web3.utils.toWei(String(collection.cost), network.currency.name);
		let gasLimit = String(SAFE_GAS_LIMIT * mintAmount);

		// const domainType = [
		// 	{ name: 'name', type: 'string' },
		// 	{ name: 'version', type: 'string' },
		// 	{ name: 'chainId', type: 'uint256' },
		// 	{ name: 'verifyingContract', type: 'address' }
		// ];

		// let domainData = {
		// 	name: 'TestContract',
		// 	version: '1',
		// 	chainId,
		// 	verifyingContract: collection.contractAddress
		// };

		// let message = {
		// 	to: collection.contractAddress,
		// 	from,
		// 	value,
		// 	data
		// };

		// const metaTransactionType = [
		// 	{ name: 'to', type: 'address' },
		// 	{ name: 'from', type: 'address' },
		// 	{ name: 'value', type: 'uint256' },
		// 	{ name: 'data', type: 'bytes' }
		// ];

		// const dataToSign = JSON.stringify({
		// 	types: {
		// 		EIP712Domain: domainType,
		// 		MetaTransaction: metaTransactionType
		// 	},
		// 	domain: domainData,
		// 	primaryType: 'MetaTransaction',
		// 	message
		// });


		let domain = [
			{ name: 'name', type: 'string' },
			{ name: 'version', type: 'string' },
			{ name: 'chainId', type: 'uint256' },
			{ name: 'verifyingContract', type: 'address' }
		];
		let sellOrders = [
			{ name: 'to', type: 'address' },
			{ name: 'from', type: 'address' },
			{ name: 'value', type: 'uint256' },
			{ name: 'data', type: 'bytes' }
		];
		const domainData = {
			name: 'NFT',
			version: '1',
			chainId,
			verifyingContract: collection.contractAddress
		};
		let message = {
			to: collection.contractAddress,
			from: account,
			value,
			data
		};
		let dataS = JSON.stringify({
			types: {
				EIP712Domain: domain,
				MetaTransaction: sellOrders
			},
			domain: domainData,
			primaryType: 'MetaTransaction',
			message
		});

		window.web3.currentProvider.sendAsync({
			method: 'eth_signTypedData_v4',
			params: [from, dataS],
			from
		}, async function (error, result) {
			if (error) {
				console.log(error);
			}
			else {
				const signature = result.result.substring(2);
				const r = `0x${signature.substring(0, 64)}`;
				const s = `0x${signature.substring(64, 128)}`;
				const v = parseInt(signature.substring(128, 130), 16);


				let tx = await SmartContract.methods.recover(
					message.to, message.from, message.value, message.data, v, r, s
				).call();

				console.log(tx);

				// tx.on('transactionHash', function (hash) {
				// 	console.log(`Transaction sent by relayer with hash ${hash}`);
				// }).once('confirmation', function (confirmationNumber, receipt) {
				// 	console.log('Transaction confirmed on chain');
				// 	console.log(receipt);
				// });
			}
		});
	},

	async sendTransaction ({ getters, dispatch }, {
		to, from, value, data, r, s, v
	}) {
		let { collection, account, SmartContract, network } = getters;
		let { chainId } = collection.network;


		return;

		console.log('to');
		console.log(to);
		console.log('from');
		console.log(from);
		console.log('value');
		console.log(value);
		console.log('data');
		console.log(data);
		console.log('r');
		console.log(r);
		console.log('s');
		console.log(s);
		console.log('v');
		console.log(v);

		try {
			let gasLimit = await SmartContract.methods
				.recover(to, from, value, data, r, s, v);

			console.log('gasLimit');
			console.log(gasLimit);

			let gasPrice = await Web3.eth.getGasPrice();

			let tx = SmartContract.methods
				.recover(to, from, value, data, r, s, v)
				.send({
					to,
					from,
					value,
					data,
					gasPrice: Web3.utils.toHex(gasPrice),
					gasLimit: Web3.utils.toHex(gasLimit)
				});

			tx.on('transactionHash', function (hash) {
				console.log(`Transaction sent by relayer with hash ${hash}`);
			}).once('confirmation', function (confirmationNumber, receipt) {
				console.log('Transaction confirmed on chain');
				console.log(receipt);
			});
		}
		catch (error) {
			console.log(error);
		}
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