import { useParams } from 'react-router-dom';
import { useDocument } from '../../hooks/useDocument';
import './Project.css';

const Project = () => {
	const { id } = useParams();
	const { document, isPending, error } = useDocument('tasks', id);

	return (
		<div>
			{error && <div className="error">{error}</div>}
			{isPending && <p className="loading">loading...</p>}
			{document && (
				<div className="project-details">
					<h1>{document.name}</h1>
				</div>
			)}
		</div>
	);
};

export default Project;
