import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useFirestore } from '../../hooks/useFirestore';

import { useLogout } from '../../hooks/useLogout';
import { useTheme } from '../../hooks/useTheme';
import { Icon } from '../Icon/Icon';
import './Navbar.css';

const Navbar = ({ user, theme }) => {
	const { logout, isPending } = useLogout();
	// const { changeTheme } = useAuthContext();
	const [colorTheme, setColorTheme] = useState(theme);
	const { updateDocument } = useFirestore('users');
	const {changeTheme} = useTheme()

	const clickHandler = () => {
		changeTheme(theme === 'light' ? 'dark' : 'light');
		setColorTheme(theme === 'light' ? 'dark' : 'light');
		// changeTheme({theme})
	};
	return (
		<div className="navbar">
			<ul>
				<li className="logo">
					<span>LOGO</span>
					{/* <button onClick={clickHandler}>
						{colorTheme === 'light' ? 'dark' : 'light'}
					</button> */}
				</li>
				{!user ? (
					<>
						<li>
							<Link to="/login">Login</Link>
						</li>
						<li>
							<Link to="/signup">Signup</Link>
						</li>
					</>
				) : (
					<li>
						{isPending ? (
							<button className="btn" disabled>
								Logging out...
							</button>
						) : (
							<button className="btn logout-btn" onClick={logout}>
								<span>Logout</span>
								<Icon attr="logout" />
							</button>
						)}
					</li>
				)}
			</ul>
		</div>
	);
};

export default Navbar;
