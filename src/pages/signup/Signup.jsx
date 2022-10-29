import { useState } from "react";
import { projectAuth } from "../../firebase/config";

// styles
import "./Signup.css";

const Signup = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	const [avatar, setAvatar] = useState(null);

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(email, password, username);
	};

	return (
		<form className="auth-form" onSubmit={handleSubmit}>
			<h2>Sign up</h2>
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
				<span>Username</span>
				<input
					type="text"
					onChange={(e) => setUsername(e.target.value)}
					value={username}
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
			<label>
				<span>Avatar</span>
				<input
					type="file"
					onChange={(e) => setAvatar(e.target.value)}
					value={avatar}
					// required
				/>
			</label>
			<button className="btn">Sign up</button>
		</form>
	);
};

export default Signup;
