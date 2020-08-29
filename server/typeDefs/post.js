const { gql } = require('apollo-server-express');

module.exports = gql`
	type Query {
		totalPosts: Int!
		allPosts: [Post!]!
	}

	type Post {
		id: ID!
		title: String!
		description: String!
	}

	input PostInput {
		title: String!
		description: String!
	}

	type Mutation {
		newPost(input: PostInput!): Post!
	}
`;
