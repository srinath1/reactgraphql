//const{gql}=require('apollo-server-express')
const { authCheck } = require('../helpers/auth');
const User = require('../models/user');
const shortid = require('shortid');
const me = async (parent, args, { req, res }, info) => {
	await authCheck(req);
	return 'srinath';
};
const userCreate = async (parent, args, { req }) => {
	const currentuser = await authCheck(req);
	const user = await User.findOne({ email: currentuser.email });
	return user
		? user
		: new User({
				email: currentuser.email,
				username: shortid.generate()
			}).save();
};
module.exports = {
	Query: {
		me
	},
	Mutation: {
		userCreate
	}
};
