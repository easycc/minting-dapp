const firebase = require('firebase-admin');
const functions = require('firebase-functions');

const { ERROR_CODE } = require('../../constants/error');

let get = async function (collectionId) {
	return firebase.firestore()
		.collection('collections')
		.doc(collectionId)
		.get()
		.then(collectionSnap => collectionSnap.data())
		.catch(error => {
			functions.logger.error(error);
			throw new functions.https.HttpsError(
				ERROR_CODE.INVALID_ARGUMENT,
				'Collection was not found',
				error
			);
		});
};

let update = async function (collectionId, data) {
	return firebase.firestore()
		.collection('collections')
		.doc(collectionId)
		.update(data)
		.then(collectionSnap => collectionSnap.data())
		.catch(error => {
			functions.logger.error(error);
			throw new functions.https.HttpsError(
				ERROR_CODE.INVALID_ARGUMENT,
				'Collection update was not successful',
				error
			);
		});
};

let list = async function () {
	return firebase.firestore()
		.collection('collections')
		.get()
		.then(collectionsSnap => collectionsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })))
		.catch(error => {
			functions.logger.error(error);
			throw new functions.https.HttpsError(
				ERROR_CODE.INVALID_ARGUMENT,
				'Collections were not found',
				error
			);
		});
};

let getParticipator = async function (collectionId, wallet) {
	return firebase.firestore()
		.collection('collections')
		.doc(collectionId)
		.collection('participators')
		.doc(wallet)
		.get()
		.then(participatorSnap => ({ data: participatorSnap.data(), snap: participatorSnap }))
		.catch(error => {
			functions.logger.error(error);
			throw new functions.https.HttpsError(
				ERROR_CODE.INVALID_ARGUMENT,
				'Participator was not found',
				error
			);
		});
};

let getParticipators = async function (collectionId) {
	return firebase.firestore()
		.collection('collections')
		.doc(collectionId)
		.collection('participators')
		.get()
		.then(collectionSnap => collectionSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })))
		.catch(error => {
			functions.logger.error(error);
			throw new functions.https.HttpsError(
				ERROR_CODE.INVALID_ARGUMENT,
				'Participators were not found',
				error
			);
		});
};

let addParticipator = async function (collectionId, wallet, participator) {
	return firebase.firestore()
		.collection('collections')
		.doc(collectionId)
		.collection('participators')
		.doc(wallet)
		.set({ ...participator, createdAt: new Date() })
		.catch(error => {
			throw new functions.https.HttpsError(
				ERROR_CODE.INVALID_ARGUMENT,
				'Participator adding was unsuccessful.',
				error
			);
		});
};

module.exports = {
	getParticipator,
	list,
	get,
	update,
	getParticipators,
	addParticipator
};