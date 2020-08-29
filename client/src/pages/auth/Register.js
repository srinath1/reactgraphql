import React, { useState } from 'react';
import { auth } from '../../firebase';
import { ToastContainer, toast } from 'react-toastify';

const Register = () => {
	const [ email, setEmail ] = useState('');
	const [ loading, setLoading ] = useState(false);
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		const config = {
			url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
			handleCodeInApp: true
		};
		await auth.sendSignInLinkToEmail(email, config);
		toast.success('Email has been sent ,Pls clickfor regd');

		window.localStorage.setItem('emailformregistration', email);
		setEmail('');
		setLoading(false);
	};
	return (
		<div className="container p-5">
			{loading ? <h4 className="text-danger">Loading...</h4> : <h4>Register</h4>}
			
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

				<button className="btn btn-raised btn-primary" disabled={!email || loading}>
					Submit
				</button>
			</form>
		</div>
	);
};
export default Register;
