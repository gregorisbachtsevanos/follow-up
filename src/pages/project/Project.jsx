import { useParams } from 'react-router-dom';
import { useDocument } from '../../hooks/useDocument';
import './Project.css';
import { ProjectComments } from './ProjectComments';
import ProjectSummary from './ProjectSummary';

const Project = () => {
	const { id } = useParams();
	const { document, isPending, error } = useDocument('projects', id);

	return (
		<div>
			{error && <div className="error">{error}</div>}
			{isPending && <p className="loading">loading...</p>}
			{document && (
				<div className="project-details">
					<ProjectSummary project={document} />
					<ProjectComments project={document} />
				</div>
			)}
		</div>
	);
};

export default Project;
