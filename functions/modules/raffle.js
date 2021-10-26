const functions = require('firebase-functions');
const firebase = require('firebase-admin');
const Web3 = require('web3');
const ethUtil = require('ethereumjs-util');
const sigUtil = require('eth-sig-util');

const Web3Service = require('../services/Web3');
const { NETWORK } = require('../constants/network');
const { ERROR_CODE } = require('../constants/error');
const { INFURA_ENTRYPOINT_BY_CHAIN_ID } = require('../constants/infura-entrypoint-by-chain-id');

const INFURA_PROJECT_ID = functions.config().infura.project_id;


module.exports.takeParticipation = functions
.https.onCall(async data => {
	const { participator, collectionId, account } = data;
	let collectionSnap;

	try {
		collectionSnap = await firebase.firestore()
			.collection('collections')
			.doc(collectionId)
			.get();
	}
	catch (error) {
		throw new functions.https.HttpsError(
			ERROR_CODE.INVALID_ARGUMENT,
			'Collection was not found',
			error
		);
	}

	let collection = collectionSnap.data();

	let raffleRegistrationStartDate = new Date(collection.raffleRegistrationStartDate.toDate());
	let raffleRegistrationEndDate = new Date(collection.raffleRegistrationEndDate.toDate());
	let raffleRegistrationIsActive = raffleRegistrationStartDate < new Date() && raffleRegistrationEndDate > new Date();

	if (!raffleRegistrationIsActive) {
		throw new functions.https.HttpsError(
			ERROR_CODE.ABORTED,
			"Event hasn't been started yet"
		);
	}

	let { currency } = NETWORK[collection.network.id];
	let requiredAmount = collection.cost * participator.amount;
	let { chainId } = collection.network;
	const web3 = new Web3(new Web3.providers.HttpProvider(`${INFURA_ENTRYPOINT_BY_CHAIN_ID[chainId]}${INFURA_PROJECT_ID}`));

	let accountBalance = await Web3Service.getBalance({ account, currencyName: currency.name, web3 });

	if (accountBalance < requiredAmount) {
		throw new functions.https.HttpsError(
			ERROR_CODE.INVALID_ARGUMENT,
			`You must have at least ${requiredAmount} ${currency.symbol} on your wallet.`
		);
	}

	try {
		await firebase.firestore()
		.collection('collections')
		.doc(collectionId)
		.collection('participators')
		.doc(account)
		.set({ ...participator, createdAt: new Date() });
	}
	catch (error) {
		throw new functions.https.HttpsError(
			ERROR_CODE.INVALID_ARGUMENT,
			'Participator adding was unsuccessful.',
			error
		);
	}

	functions.logger.log('add participator: ', account);
});

module.exports.mintNft = functions
.https.onCall(async data => {
	const {
		account, collectionId, signature, messageParams, deadline
	} = data;
	let collectionSnap;
	let participatorSnap;

	try {
		collectionSnap = await firebase.firestore()
			.collection('collections')
			.doc(collectionId)
			.get();

		participatorSnap = await firebase.firestore()
			.collection('collections')
			.doc(collectionId)
			.collection('participators')
			.doc(account)
			.get();
	}
	catch (error) {
		throw new functions.https.HttpsError(
			ERROR_CODE.INVALID_ARGUMENT,
			'Collection was not found',
			error
		);
	}

	let collection = collectionSnap.data();
	let { abi, contractAddress } = collection;
	let participator = participatorSnap.data();
	let mintAmount = participator.amount;

	// CHECK IF IN THE ACCOUNT IN THE QUEUE ARRAY and mintAmount === registered mintAmount

	let { chainId, currency } = collection.network;
	const web3 = new Web3(new Web3.providers.HttpProvider(`${INFURA_ENTRYPOINT_BY_CHAIN_ID[chainId]}${INFURA_PROJECT_ID}`));


	const recovered = sigUtil.recoverTypedSignature({ data: JSON.parse(messageParams), sig: signature });

	if (ethUtil.toChecksumAddress(recovered) !== ethUtil.toChecksumAddress(account)) {
		throw new functions.https.HttpsError(
			ERROR_CODE.INVALID_ARGUMENT,
			'Failed to verify signer'
		);
	}

	const vrsPart = signature.substring(2);
	const vPart = parseInt(vrsPart.substring(128, 130), 16);
	const rPart = `0x${vrsPart.substring(0, 64)}`;
	const sPart = `0x${vrsPart.substring(64, 128)}`;

	let Contract = await Web3Service.contract({ abi: JSON.parse(abi), contractAddress, web3 });

	// return Contract.methods.mint(vPart, rPart, sPart, account, deadline, mintAmount).sendRawTransaction(signature);

	return Web3Service.sendSignedTransaction({ web3, signature });
});