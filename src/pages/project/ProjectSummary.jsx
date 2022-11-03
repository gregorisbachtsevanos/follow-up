import { Avatar } from "../../components/Avatar/Avatar";
import { useFirestore } from "../../hooks/useFirestore";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Icon } from "../../components/Icon/Icon";

const ProjectSummary = ({ project }) => {
	const { deleteDocument, res } = useFirestore("projects");
	const { user } = useAuthContext();

	const navigate = useNavigate();

	const deleteProject = () => {
		deleteDocument(project.id);
		navigate("/");
	};

	const markAsdComplete = () => {
		alert("Project has been marked as complete");
		navigate("/");
	};

	return (
		<div>
			<div className="project-summary">
				<div className="project-header">
					<h1 className="page-title">{project.name}</h1>
					<div className="comment-delete-icon">
						{/* <span
							className="material-symbols-outlined"
							onClick={deleteProject}
						>
							delete
						</span> */}
						{user.uid === project.createdBy.id && (
							<Icon attr="delete" clickEvent={deleteProject} />
						)}
					</div>
				</div>

				<p className="due-date">
					Project deadline: {project.deadline.toDate().toDateString()}
				</p>
				<p className="details">{project.details}</p>
				<h4>Project is assigned to:</h4>
				<div className="assigned-users">
					<ul>
						{project.assignedUsersList.map((user) => (
							<li key={user.photoURL}>
								<Avatar src={user.photoURL} />
							</li>
						))}
					</ul>
				</div>
			</div>
			{user.uid === project.createdBy.id && (
				<button className="btn" onClick={markAsdComplete}>
					Mark as Complete
				</button>
			)}
		</div>
	);
};

export default ProjectSummary;
