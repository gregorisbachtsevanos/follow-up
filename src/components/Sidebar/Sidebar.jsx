import "./Sidebar.css";

import { NavLink } from "react-router-dom";

const Sidebar = () => {
	return (
		<div className="sidebar">
			<div className="sidebar-content">
				<div className="user">
					{/*// TODO: user's icon and username goes here*/}
					<p>Hey user</p>
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
