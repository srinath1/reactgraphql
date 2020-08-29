import React, { useState, useContext } from 'react';
import ApolloClient from 'apollo-boost';
import { Switch, Route } from 'react-router-dom';
import { gql } from 'apollo-boost';
import Home from './pages/Home';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import CompleteRegistration from './pages/auth/CompleteRegistration';
import { ApolloProvider } from '@apollo/react-hooks';
import Nav from './components/Nav';
import { ToastContainer } from 'react-toastify';
import { AuthContext } from './context/authContext';

const App = () => {
	const { state } = useContext(AuthContext);
	const { user } = state;
	const client = new ApolloClient({
		uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
		request: (operation) => {
			operation.setContext({
				headers: {
					authtoken: user ? user.token : ''
				}
			});
		}
	});

	return (
		<div className="container">
			<ApolloProvider client={client}>
				<Nav />
				<ToastContainer />
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/register" component={Register} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/completeregistration" component={CompleteRegistration} />
				</Switch>
			</ApolloProvider>
		</div>
	);
};

export default App;
