import { Link } from "react-router-dom";
import { Avatar } from "../Avatar/Avatar";
import "./ProjectList.css";

const ProjectList = ({ projects, filter }) => {
	return (
		<div className="project-list">
			{projects.length === 0 && <p>No project yet!</p>}
			{projects.map((project) => (
				<Link to={`project/${project.id}`} key={project.id}>
					<h4>{project.name}</h4>
					<p>Due to: {project.deadline.toDate().toDateString()}</p>
					<div className="assigned-to">
						<ul>
							{project.assignedUsersList.map((user) => (
								<li key={user.photoURL}>
									<Avatar src={user.photoURL} />
								</li>
							))}
						</ul>
					</div>
				</Link>
			))}
		</div>
	);
};

export default ProjectList;
