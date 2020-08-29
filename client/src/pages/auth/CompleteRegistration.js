import React, { useState, useEffect, useContext } from 'react';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
const USER_CREATE = gql`
	mutation userCreate {
		userCreate {
			username
			email
		}
	}
`;
const CompleteRegistration = () => {
	const { dispatch } = useContext(AuthContext);

	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ loading, setLoading ] = useState('');
	const [ userCreate ] = useMutation(USER_CREATE);

	let history = useHistory();
	useEffect(
		() => {
			console.log('oldhistory', history);

			console.log('newhistory', history);
			setEmail(window.localStorage.getItem('emailformregistration'));
		},
		[ history ]
	);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		if (!email || !password) {
			toast.error('Email & Password are required');
			return;
		}
		try {
			const result = await auth.signInWithEmailLink(email, window.location.href);
			console.log(result);
			if (result.user.emailVerified) {
				window.localStorage.removeItem('emailformregistration');
				let user = await auth.currentUser;
				await user.updatePassword(password);
				const idTokenResult = await user.getIdTokenResult();
				dispatch({
					type: 'LOGGED_IN_USER',
					payload: { email: user.email, token: idTokenResult.token }
				});
				history.push('/');
			}
		} catch (error) {
			console.log('error', error.message);
			setLoading(false);
			toast.error(error.message);
		}
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="form-control"
					placeholder="Enter Email"
					disabled={loading}
				/>

				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className="form-control"
					placeholder="Enter Password"
					disabled={loading}
				/>

				<button className="btn btn-raised btn-primary" disabled={!email || loading}>
					Submit
				</button>
			</form>
		</div>
	);
};

export default CompleteRegistration;
