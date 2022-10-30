import { Link } from "react-router-dom";

import { useLogout } from "../../hooks/useLogout";
import "./Navbar.css";

const Navbar = ({ user }) => {
	const { logout, isPending } = useLogout();
	return (
		<div className="navbar">
			<ul>
				<li className="logo">
					<span>LOGO</span>
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
							<button className="btn" onClick={logout}>
								Logout
							</button>
						)}
					</li>
				)}
			</ul>
		</div>
	);
};

export default Navbar;
