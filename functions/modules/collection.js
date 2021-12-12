const functions = require('firebase-functions');

const Collection = require('../components/Collection');
const Contract = require('../components/Contract');
const Queue = require('../components/Queue');
const Web3 = require('../components/Web3');
const { NETWORK } = require('../constants/network');
const { ERROR_CODE } = require('../constants/error');


module.exports.takeParticipation = functions
.https.onCall(async data => {
	const { participator, collectionId, account } = data;

	let collection = await Collection.get(collectionId);

	let { raffle, network, cost } = collection;
	let { registration } = raffle;
	let { startAt, endAt } = registration;

	let raffleRegistrationStartAt = new Date(startAt.toDate());
	let raffleRegistrationEndAt = new Date(endAt.toDate());
	let raffleRegistrationIsActive = raffleRegistrationStartAt < new Date() && raffleRegistrationEndAt > new Date();

	if (!raffleRegistrationIsActive) {
		throw new functions.https.HttpsError(
			ERROR_CODE.ABORTED,
			"Event hasn't been started yet"
		);
	}

	let { currency } = NETWORK[network.id];
	let requiredAmount = cost * participator.amount;
	let { chainId } = network;

	let accountBalance = await Web3.getBalance(account, currency.name, chainId);

	if (accountBalance < requiredAmount) {
		throw new functions.https.HttpsError(
			ERROR_CODE.INVALID_ARGUMENT,
			`You must have at least ${requiredAmount} ${currency.symbol} on your wallet.`
		);
	}

	return Collection.addParticipator(participator);
});

module.exports.updateQueue = functions.pubsub
.schedule('every 1 minutes') // (1)
.onRun(async () => {
	let collections = await Collection.list();

	for (let collection of collections) {
		let {
			abi,
			id,
			contractAddress,
			raffle,
			network,
			queue
		} = collection;

		let { offset, ended, waveIntervalInMinutes } = queue;
		let { startAt } = raffle;

		let raffleStartAt = new Date(startAt.toDate());
		let currentDate = new Date();

		const raffleNotExpired = raffleStartAt < currentDate;
		const raffleNotEnded = !ended;

		if (raffleNotExpired && raffleNotEnded) {
			let { chainId } = network;
			let participators = await Collection.getParticipators(id);

			let queueLimit = await Contract.getMaxSupply(abi, contractAddress, chainId);

			functions.logger.log('queueLimit', queueLimit);

			// let {
			// 	newOffset,
			// 	newWave,
			// 	isLastWave
			// } = Queue.getNextWave(participators, offset, queueLimit);

			// functions.logger.log({
			// 	newOffset,
			// 	newWave,
			// 	isLastWave
			// });

			// let raffleDurationInMinutes = Math.ceil(participators.length / queueLimit) * waveIntervalInMinutes;
			// let raffleEndAt = raffleStartAt.setMinutes(raffleStartAt.getMinutes() + raffleDurationInMinutes);

			// await Collection.update(id, {
			// 	queue: {
			// 		ended: isLastWave,
			// 		wave: newWave,
			// 		offset: newOffset
			// 	},
			// 	raffle: {
			// 		endAt: raffleEndAt
			// 	}
			// });

			// await Contract.setWhitelistedUsers(abi, contractAddress, chainId, newWave);
		}
	}
});