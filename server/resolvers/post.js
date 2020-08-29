//const { gql } = require('apollo-server-express');
const { Posts } = require('../temp');
const post = require('../typeDefs/post');
const { authCheck } = require('../helpers/auth');
const totalPosts = () => Posts.length;
const allPosts = async (parent, args, { req }) => {
	await authCheck(req);
	return Posts;
};
const newPost = (parent, args, ctx) => {
	console.log('parent', parent);
	console.log('args', args);

	const post = {
		id: Posts.length + 1,
		...args.input
	};
	Posts.push(post);
	console.log(parent);
	return post;
};
module.exports = {
	Query: {
		totalPosts: totalPosts,
		allPosts: allPosts
	},
	Mutation: {
		newPost
	}
};

//mongodb+srv://srinath:graphql@cluster0.yendj.mongodb.net/<dbname>?retryWrites=true&w=majority
