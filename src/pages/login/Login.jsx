import React, { useState } from "react";
import "./Login.css";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = () => {};

	return (
		<form className="auth-form" onSubmit={handleSubmit}>
			<h2>Login</h2>
			<label>
				<span>Email</span>
				<input
					type="email"
					onChange={(e) => setEmail(e.target.value)}
					value={email}
					required
				/>
			</label>
			<label>
				<span>Password</span>
				<input
					type="password"
					onChange={(e) => setPassword(e.target.value)}
					value={password}
					required
				/>
			</label>
			{false ? (
				<button className="btn" disabled>
					Loading
				</button>
			) : (
				<button className="btn">Login</button>
			)}
			{/* {error && <div className="error">{error}</div>} */}
		</form>
	);
};

export default Login;
