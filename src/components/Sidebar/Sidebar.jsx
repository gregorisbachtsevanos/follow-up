import "./Sidebar.css";

import { NavLink } from "react-router-dom";
import { Avatar } from "../Avatar/Avatar";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Icon } from "../Icon/Icon";

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
								<Icon attr="space_dashboard" />
								<span>Dashboard</span>
							</NavLink>
						</li>
						<li>
							<NavLink to="/create">
								{/* <span className="material-symbols-outlined">
									add
								</span> */}
								<Icon attr="add" />
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
