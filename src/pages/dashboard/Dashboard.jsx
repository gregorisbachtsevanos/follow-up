import ProjectList from '../../components/ProjectList/ProjectList';
import { useCollection } from '../../hooks/useCollection';

import './Dashboard.css';

const Dashboard = () => {
	const { documents, error } = useCollection('tasks');
	return (
		<div>
			<h2 className="page-title">Dashboard</h2>
			{error && <div className="error">{error}</div>}
			{documents && <ProjectList projects={documents} />}
		</div>
	);
};

export default Dashboard;
