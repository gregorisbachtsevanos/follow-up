import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";

// styles
import "./Signup.css";

const Signup = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	const [avatar, setAvatar] = useState(null);
	const [avatarError, setAvatarError] = useState(null);
	const { signup, isPending, error } = useSignup();

	const handleSubmit = (e) => {
		e.preventDefault();
		// return console.log(email, password, username, avatar);
		signup(email, password, username, avatar);
	};

	const handleAvatarChange = (e) => {
		setAvatar(null);
		let selected = e.target.files[0];
		console.log(selected);
		if (!selected) {
			setAvatarError("Avatar cannot be empty");
			return;
		}
		if (!selected.type.includes("image/")) {
			setAvatarError("Type must be an image");
			return;
		}
		// if (selected.size > 100000) {
		// 	setAvatarError("Image must be smaller than 100kb");
		// 	return;
		// }
		setAvatarError(null);
		setAvatar(selected);
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
					onChange={handleAvatarChange}
					// value={avatar}
					// required
				/>
			</label>
			{avatarError && <div className="error">{avatarError}</div>}
			{isPending ? (
				<button className="btn" disabled>
					Loading
				</button>
			) : (
				<button className="btn">Sign up</button>
			)}
			{error && <div className="error">{error}</div>}
		</form>
	);
};

export default Signup;
