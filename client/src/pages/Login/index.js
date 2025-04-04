import './index.scss';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchUser, setUser} from "../../store/slices/userSlice";


export default function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [token, setToken] = useState("");
	const [error, setError] = useState(null);
	const [isUser, setIsUser] = useState(false);
	const userData = useSelector(state => state.user);
	const dispatch = useDispatch();

	const setTokenAuth = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch("https://private.local/wp-json/jwt-auth/v1/token", {
				method: "POST",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify({username, password}),
			});

			const data = await response.json();

			if (!response.ok) {
				setError(data.message || "Login failed");
				return;
			}

			setToken(data.token);
			localStorage.setItem("jwt", data.token);
			setError(null);

		} catch (e) {
			setError("Network error. Try again.");
		}
	};

	useEffect(() => {
		dispatch(fetchUser(token));
	}, [token, dispatch]);

	useEffect(() => {
		const {user, status, error} = userData;
		setIsUser(status === "succeeded");
	}, [userData]);

	const GreetUser = () => {
		return (
			<h1 className={'container'}>Welcome, {userData.user.name}</h1>
		)
	}
	return (
		!isUser ?
			<div className="login-container">
				<div className="heading">Sign in to your account</div>

				{error && <p style={{color: "red"}}>{error}</p>}

				<form className="form" onSubmit={setTokenAuth}>
					<div className="input-field">
						<input
							required
							autoComplete="off"
							type="text"
							name="username"
							id="username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
						<label htmlFor="username">Full Name</label>
					</div>

					<div className="input-field">
						<input
							required
							autoComplete="off"
							type="password"
							name="password"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<label htmlFor="password">Password</label>
					</div>

					<div className="btn-container">
						<button type="submit" className="btn">Submit</button>
						<div className="acc-text">
							New here? <span style={{color: "#0000ff", cursor: "pointer"}}>Create Account</span>
						</div>
					</div>
				</form>
			</div>
			: <GreetUser/>
	);
}
