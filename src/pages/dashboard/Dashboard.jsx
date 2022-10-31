import { useCollection } from '../../hooks/useCollection';

import './Dashboard.css';

const Dashboard = () => {
	const { documents } = useCollection('tasks');
	return (
		<div>
			{documents &&
				documents.map((task) => (
					<div>
						<h1>{task.name}</h1>
						<p>{task.details}</p>
					</div>
				))}
		</div>
	);
};

export default Dashboard;
