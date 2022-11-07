import { Link } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";

import { useLogout } from "../../hooks/useLogout";
import { Icon } from "../Icon/Icon";
import "./Navbar.css";

const Navbar = ({ user, theme }) => {
	const { logout, isPending } = useLogout();
	const { changeColor } = ThemeContext();
	return (
		<div className="navbar">
			<ul>
				<li className="logo">
					<span>LOGO</span>
					<button onClick={() => changeColor('dark')}>{theme === 'light' ? 'dark': 'light'}</button>
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
