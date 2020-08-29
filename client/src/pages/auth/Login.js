import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth, googleAuthProvider } from '../../firebase';

const Login = () => {
	const { dispatch } = useContext(AuthContext);
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ loading, setLoading ] = useState(false);
	const [ success, setSuccess ] = useState(false);
	let history = useHistory();
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			await auth.signInWithEmailAndPassword(email, password).then(async (result) => {
				const { user } = result;
				const idTokenResult = await user.getIdTokenResult();
				dispatch({
					type: 'LOGGED_IN_USER',
					payload: { email: user.email, token: idTokenResult.token }
				});
				history.push('/');
			});
		} catch (e) {
			console.log('error'.e.message);
			toast.error(e.message);
			setLoading(false);
		}
	};
	const googleLogin = () => {
		auth.signInWithPopup(googleAuthProvider).then(async (result) => {
			const { user } = result;
			const idTokenResult = await user.getIdTokenResult();
			dispatch({
				type: 'LOGGED_IN_USER',
				payload: { email: user.email, token: idTokenResult.token }
			});
			history.push('/');
		});
	};
	return (
		<div className="container p-5">
			{loading ? <h4 className="text-danger">Loading...</h4> : <h4>Login</h4>}
			<button onClick={googleLogin} className="btn btn-raised btn-danger mt-5">
				Login With Google
			</button>
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="form-control"
						placeholder="Enter Email"
						disabled={loading}
					/>
				</div>
				<div className="form-group">
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="form-control"
						placeholder="Enter password"
						disabled={loading}
					/>
				</div>
				<button className="btn btn-raised btn-primary" disabled={!email || !password || loading}>
					Submit
				</button>
			</form>
		</div>
	);
};

export default Login;
