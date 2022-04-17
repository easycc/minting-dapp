const firebase = require('firebase-admin');

firebase.initializeApp();

const admin = require('./modules/admin');



module.exports = {
	addMember: admin.addMember,
};