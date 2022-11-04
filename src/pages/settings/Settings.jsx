import React, { useState } from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import { useAuthContext } from '../../hooks/useAuthContext';
import './Settings.css';

const Settings = () => {
	const [email, setEmail] = useState(false); // set new email
	const [password, setPassword] = useState(false); // set new password
	const [firstName, setFirstName] = useState(false); // set firstName
	const [lastName, setLastName] = useState(false); // set lastName
	const [username, setUsername] = useState(false); // set new username
	const [avatar, setAvatar] = useState(null); // set new avatar
	const [avatarError, setAvatarError] = useState(null); // set error for avatar input

	const { user } = useAuthContext(); // get user
	const { updateDocument } = useFirestore('users'); // edit collection

	const handleSubmit = (e) => {
		e.preventDefault();
		
		updateDocument(user.uid, {firstName, lastName, username, email, password})
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
				<input
					type="text"
					onChange={(e) => setFirstName(e.target.value)}
					value={user.firstName}
				/>
			</label>
			<label>
				<span>Last Name</span>
				<input
					type="text"
					onChange={(e) => setLastName(e.target.value)}
					value={user.lastName}
				/>
			</label>
			<label>
				<span>Email</span>
				<input
					type="email"
					onChange={(e) => setEmail(e.target.value)}
					value={user.email}
				/>
			</label>
			<label>
				<span>Username</span>
				<input
					type="text"
					onChange={(e) => setUsername(e.target.value)}
					value={user.displayName}
				/>
			</label>
			<label>
				<span>Password</span>
				<input
					type="password"
					onChange={(e) => setPassword(e.target.value)}
				/>
			</label>
			<label>
				<span>Avatar</span>
				<input
					type="file"
					// onChange={handleAvatarChange}
					// value={avatar}
				/>
			</label>
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
