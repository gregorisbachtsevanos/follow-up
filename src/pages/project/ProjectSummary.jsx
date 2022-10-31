import { Avatar } from '../../components/Avatar/Avatar';

const ProjectSummary = ({ project }) => {
	return (
		<div>
			<div className="project-summary">
				<h1 className="page-title">{project.name}</h1>
				<p className="due-date">
					Project deadline: {project.deadline.toDate().toDateString()}
				</p>
				<p className="details">{project.details}</p>
				<h4>Project is assigned to:</h4>
				<div className="assigned-to">
					<ul>
						{project.assignedUsersList.map((user) => (
							<li key={user.photoURL}>
								<Avatar src={user.photoURL} />
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default ProjectSummary;
