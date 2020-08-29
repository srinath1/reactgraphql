const express = require('express');
const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge');
const { loadFilesSync } = require('@graphql-tools/load-files');
const { ApolloServer, gql } = require('apollo-server-express');
const { authCheck } = require('./helpers/auth');

const http = require('http');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const db = async () => {
	try {
		const success = await mongoose.connect(process.env.DATABASE_CLOUD, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false
		});
		console.log('connected');
	} catch (error) {
		console.log(error);
	}
};
db();
const typeDefs = mergeTypeDefs(loadFilesSync(path.join(__dirname, './typeDefs')));
const resolvers = mergeResolvers(loadFilesSync(path.join(__dirname, './resolvers')));

const apolloServer = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req, res }) => ({
		req,
		res
	})
});
apolloServer.applyMiddleware({
	app: app
});

const httpServer = http.createServer(app);
app.get('/rest', authCheck, (req, res) => {
	res.json({
		data: 'you hit me'
	});
});

app.listen(process.env.PORT, () => {
	console.log('server running');
	console.log(` graphql server running.${apolloServer.graphqlPath}`);
});
