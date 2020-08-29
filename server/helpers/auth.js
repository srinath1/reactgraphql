var admin = require('firebase-admin');

var serviceAccount = require('../config/fbServiceAccountKey.json');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: 'https://graphqlreactnode-b0f6c.firebaseio.com'
});
exports.authCheck = async (req) => {
	try {
		const currentUser = await admin.auth().verifyIdToken(req.headers.authtoken);
		console.log('Current User', currentUser);
		return currentUser;
	} catch (error) {
		console.log('Auth Check Error', error);
		throw new Error('Invalid or expired token');
	}
};
