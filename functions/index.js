const firebase = require('firebase-admin');

firebase.initializeApp();

const admin = require('./modules/admin');
const ruffle = require('./modules/ruffle');

module.exports.addMember = admin.addMember;
module.exports.takeParticipation = ruffle.takeParticipation;