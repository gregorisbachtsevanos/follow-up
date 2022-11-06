import React, { useState } from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import { useAuthContext } from '../../hooks/useAuthContext';
import './Settings.css';

const Settings = () => {
	const { user } = useAuthContext(); // get user

	const [email, setEmail] = useState(user.email ? user.email : false); // set new email
	const [password, setPassword] = useState(
		user.password ? user.password : false
	); // set new password

	const [firstName, setFirstName] = useState(
		user.firstName ? user.firstName : false
	); // set firstName

	const [lastName, setLastName] = useState(
		user.lastName ? user.lastName : false
	); // set lastName

	const [username, setUsername] = useState(
		user.displayName ? user.displayName : false
	); // set new username

	const [avatar, setAvatar] = useState(null); // set new avatar
	const [avatarError, setAvatarError] = useState(null); // set error for avatar input

	const { updateDocument } = useFirestore('users'); // edit collection

	const handleSubmit = (e) => {
		e.preventDefault();

		var info = [
			email && { email },
			username && { displayName: username },
			firstName && { firstName: firstName },
			lastName && { lastName },
		];
		let newInfo = info.filter((i) => i != false);

		updateDocument(user.uid, newInfo);
		return;
		updateDocument(user.uid, {
			email,
			password,
			username,
			firstName,
			lastName,
		});
	};

	const changeValues = (defaultValues, newValues) => {
		defaultValues = { ...defaultValues, newValues };
		console.log(defaultValues);
	};

	return (
		<form className="update-form" onSubmit={handleSubmit}>
			<h2>Update Profile</h2>
			<label>
				<span>First Name</span>
				<div>
					<input
						type="text"
						onChange={(e) => setFirstName(e.target.value)}
						placeholder={firstName ? firstName : void 0}
					/>
					<button>change</button>
				</div>
			</label>
			<label>
				<span>Last Name</span>
				<div>
					<input
						type="text"
						onChange={(e) => setLastName(e.target.value)}
						placeholder={lastName ? lastName : void 0}
					/>
					<button>change</button>
				</div>
			</label>
			<label>
				<span>Username</span>
				<div>
					<input
						type="text"
						onChange={(e) => setUsername(e.target.value)}
						placeholder={username ? username : void 0}
					/>
					<button>change</button>
					
				</div>
			</label>
			{/* <label>
				<span>Email</span>
				<input
					type="email"
					onChange={(e) => setEmail(e.target.value)}
					placeholder={user.email}
				/>
			</label>
			<label>
				<span>Password</span>
				<input
					type="password"
					onChange={(e) => setPassword(e.target.value)}
				/>
			</label> */}
			{/* <label>
				<span>Avatar</span>
				<input
					type="file"
					// onChange={handleAvatarChange}
					// value={avatar}
				/>
			</label> */}
			{/* {avatarError && <div className="error">{avatarError}</div>}
			{isPending ? (
				<button className="btn" disabled>
					Loading
				</button>
			) : ( */}
			<button className="btn">Update</button>
			{/* )}
			{error && <div className="error">{error}</div>} */}
		</form>
	);
};

export default Settings;
