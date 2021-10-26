const firebase = require('firebase-admin');

firebase.initializeApp();

const admin = require('./modules/admin');
const raffle = require('./modules/raffle');

module.exports.addMember = admin.addMember;
module.exports.takeParticipation = raffle.takeParticipation;
module.exports.mintNft = raffle.mintNft;