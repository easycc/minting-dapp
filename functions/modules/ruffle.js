const functions = require('firebase-functions');
const firebase = require('firebase-admin');

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
			'invalid-argument',
			'Collection was not found',
			error
		);
	}

	let collection = collectionSnap.data();

	let raffleStartDate = new Date(collection.raffleStartDate.toDate());
	let raffleEndDate = new Date(collection.raffleStartDate.toDate());
	let ruffleIsActive = raffleStartDate < new Date() && raffleEndDate > new Date();

	// check wallet, connect infura

	if (!ruffleIsActive) {
		throw new functions.https.HttpsError(
			'aborted',
			"Event hasn't been started yet"
		);
	}

	try {
		await firebase.firestore()
		.collection('collections')
		.doc(collectionId)
		.collection('participators')
		.doc(account)
		.set(participator);
	}
	catch (error) {
		throw new functions.https.HttpsError(
			'invalid-argument',
			'Participator adding was unsuccessful.',
			error
		);
	}

	functions.logger.log('add participator: ', account);
});