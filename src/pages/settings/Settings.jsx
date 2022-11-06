import React, { useState } from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import { useAuthContext } from '../../hooks/useAuthContext';
import './Settings.css';

const Settings = () => {
	const { user } = useAuthContext(); // get user

	const [email, setEmail] = useState(''); // set new email
	const [password, setPassword] = useState(''); // set new password

	const [firstName, setFirstName] = useState(''); // set firstName

	const [lastName, setLastName] = useState(''); // set lastName

	const [username, setUsername] = useState(''); // set new username

	const [avatar, setAvatar] = useState(null); // set new avatar
	const [avatarError, setAvatarError] = useState(null); // set error for avatar input

	const { updateDocument } = useFirestore('users'); // edit collection

	const handleClick = (value) => {
		updateDocument(user.uid, value);
	};
	console.log(user);
	return (
		<form className="update-form">
			<h2>Update Profile</h2>
			<label>
				<span>First Name</span>
				<div>
					<input
						type="text"
						onChange={(e) => setFirstName(e.target.value)}
						placeholder={user.providerData[0].firstName}
					/>
					<button onClick={(e) => handleClick({ firstName })}>
						change
					</button>
				</div>
			</label>
			<label>
				<span>Last Name</span>
				<div>
					<input
						type="text"
						onChange={(e) => setLastName(e.target.value)}
						placeholder={user.providerData[0].lastLame}
					/>
					<button onClick={(e) => handleClick({ lastName })}>
						change
					</button>
				</div>
			</label>
			<label>
				<span>Username</span>
				<div>
					<input
						type="text"
						onChange={(e) => setUsername(e.target.value)}
						placeholder={user.displayName}
					/>
					<button onClick={(e) => handleClick({ displayName: username })}>
						change
					</button>
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
			{/* )}
			{error && <div className="error">{error}</div>} */}
		</form>
	);
};

export default Settings;
