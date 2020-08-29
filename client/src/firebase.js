import * as firebase from 'firebase';
var firebaseConfig = {
	apiKey: 'AIzaSyD_kUJUT7c7LJdAX1spdPvE_rGFQ',
	authDomain: 'graphqlreactnode-b0f6c.firebaseapp.com',
	databaseURL: 'https://graphqlreactnode-b0f6c.firebaseio.com',
	projectId: 'graphqlreactnode-b0f6c',
	storageBucket: 'graphqlreactnode-b0f6c.appspot.com',
	messagingSenderId: '765209111906',
	appId: '1:765209111906:web:9f68742f50fb4a03add03b',
	measurementId: 'G-E8CZSSBJCN'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
