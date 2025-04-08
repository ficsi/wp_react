import './index.scss';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchOrders, fetchUser} from "../../store/slices/userSlice";

export default function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [token, setToken] = useState("");
	const [error, setError] = useState(null);

	const dispatch = useDispatch();
	const userData = useSelector(state => state.user);
	const previousOrders = useSelector(state => state.user.previousOrders);
	const isUser = userData.status === "succeeded";

	// Attempt login and set token
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
			localStorage.setItem("jwt_token", data.token);
			localStorage.setItem("jwt_exp", Date.now() + 1000 * 60 * 60 * 24 * 7);
			setError(null);
		} catch {
			setError("Network error. Try again.");
		}
	};

	// On token update, fetch user
	useEffect(() => {
		if (token) dispatch(fetchUser(token));
	}, [token, dispatch]);

	// Fetch orders once user is loaded
	useEffect(() => {
		if (isUser && userData.user?.id) {
			dispatch(fetchOrders({token, userId: userData.user.id}));
		}
	}, [isUser, userData.user?.id, token, dispatch]);

	// Check stored token on mount
	useEffect(() => {
		const storedToken = localStorage.getItem("jwt_token");
		const expiry = localStorage.getItem("jwt_exp");

		if (storedToken && expiry && Date.now() < parseInt(expiry)) {
			setToken(storedToken);
		} else {
			localStorage.removeItem("jwt_token");
			localStorage.removeItem("jwt_exp");
		}
	}, []);

	// Greeting block
	const GreetUser = () => (
		<div className="container">
			<h1>Welcome, {userData.user.name}</h1>
			{previousOrders && previousOrders.length > 0 ? (
				<>
					<h2>Your Orders:</h2>
					{previousOrders.map((order) => (
						<p key={order.id}>Order #{order.id} - Total: {order.total} {order.currency}</p>
					))}
				</>
			) : <p>No orders found.</p>}
		</div>
	);

	// Login form
	return (
		!isUser ? (
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
						<label htmlFor="username">Username</label>
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
		) : <GreetUser />
	);
}
