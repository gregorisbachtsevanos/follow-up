import "./Sidebar.css";

import { NavLink } from "react-router-dom";
import { Avatar } from "../Avatar/Avatar";
import { useAuthContext } from "../../hooks/useAuthContext";

const Sidebar = () => {
	const { user } = useAuthContext();

	return (
		<div className="sidebar">
			<div className="sidebar-content">
				<div className="user">
					<Avatar src={user.photoURL} />
					<p>Hey {user.displayName}</p>
				</div>
				<nav className="links">
					<ul>
						<li>
							<NavLink end to="/">
								<span>Dashboard</span>
							</NavLink>
						</li>
						<li>
							<NavLink to="/create">
								<span>New Project</span>
							</NavLink>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	);
};

export default Sidebar;
