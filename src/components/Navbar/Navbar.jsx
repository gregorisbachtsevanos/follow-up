import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ user }) => {
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
						<button className="btn">Logout</button>
					</li>
				)}
			</ul>
		</div>
	);
};

export default Navbar;
