import React, { useState, useContext } from 'react';
import ApolloClient from 'apollo-boost';
import { gql } from 'apollo-boost';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import { AuthContext } from '../context/authContext';
import { useHistory } from 'react-router-dom';
const GET_ALL_POSTS = gql`
	{
		allPosts {
			id
			title
			description
		}
	}
`;

const Home = () => {
	const { data, loading, error } = useQuery(GET_ALL_POSTS);
	const [ fetchPosts, { data: posts } ] = useLazyQuery(GET_ALL_POSTS);
	const { state, dispatch } = useContext(AuthContext);

	const history = useHistory();
	const changeUserName = () => {
		dispatch({
			type: 'LOGGED_IN_USER',
			payload: 'srinath'
		});
	};
	if (loading) {
		return <p className="p-5">Loading...</p>;
	}

	return (
		<div className="container">
			<div className="row p-5">
				{data &&
					data.allPosts.map((post) => (
						<div className="col-md-4" key={post.id}>
							<div className="card">
								<div className="card-body">
									<div className="card-title">
										<h4>{post.title}</h4>
									</div>
									<p className="card-text">{post.description}</p>
									<hr />
								</div>
							</div>
							<div />
						</div>
					))}
			</div>
			<div className="row p-5">
				<button
					onClick={() => {
						return fetchPosts();
					}}
					className="btn-btn-raised btn-primary"
				>
					Fetch Posts
				</button>
			</div>
			<hr />
			{JSON.stringify(posts)}
			<div>
				<hr />
				<button onClick={changeUserName} className="btn btn-primary">
					Change User Name
				</button>
				{JSON.stringify(state.user)}
				<hr />
			</div>
			<div>{JSON.stringify(history)}</div>
		</div>
	);
};

export default Home;
