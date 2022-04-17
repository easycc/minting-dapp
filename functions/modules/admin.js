const functions = require('firebase-functions');
const firebase = require('firebase-admin');

module.exports.addMember = functions
.https.onCall(async (data, context) => {
	if (!context.auth.token.role === 'admin') return;
	const { email, role } = data;

	try {
		let user = await firebase.auth().getUserByEmail(email);

		let result = await firebase.auth().setCustomUserClaims(user.uid, { role });

		functions.logger.log('add member ', result);

		return user;
	}
	catch (error) {
		functions.logger.error(error);
		return error.errorInfo;
	}
});