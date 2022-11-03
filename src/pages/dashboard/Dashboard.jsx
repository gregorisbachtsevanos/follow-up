import { useState } from "react";
import ProjectList from "../../components/ProjectList/ProjectList";
import { useCollection } from "../../hooks/useCollection";

import "./Dashboard.css";
import ProjectFilter from "./ProjectFilter";

const Dashboard = () => {
	const [currentFilter, setCurrentFilter] = useState("all");

	const { documents, error } = useCollection("projects", [
		"createdAt",
		"desc",
	]);

	const changeFilter = (newFilter) => {
		console.log(newFilter);
		setCurrentFilter(newFilter);
	};

	return (
		<div>
			<h2 className="page-title">Dashboard</h2>
			{error && <div className="error">{error}</div>}
			{documents && (
				<ProjectFilter
					currentFilter={currentFilter}
					changeFilter={changeFilter}
				/>
			)}
			{documents && <ProjectList projects={documents} />}
		</div>
	);
};

export default Dashboard;
