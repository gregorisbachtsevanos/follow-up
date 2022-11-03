import { useState } from "react";
import ProjectList from "../../components/ProjectList/ProjectList";
import { useCollection } from "../../hooks/useCollection";
import { useAuthContext } from "../../hooks/useAuthContext";

import "./Dashboard.css";
import ProjectFilter from "./ProjectFilter";

const Dashboard = () => {
	const { user } = useAuthContext();
	const [filter, setFilter] = useState("all");

	const { documents, error } = useCollection("projects", [
		"createdAt",
		"desc",
	]);

	const changeFilter = (newFilter) => {
		console.log(newFilter);
		setFilter(newFilter);
	};

	const projects = documents
		? documents.filter((document) => {
				switch (filter) {
					case "all":
						return true;
					case "mine":
						let assignedToMe = false;
						document.assignedUsersList.map((u) => {
							if (u.id === user.uid) {
								assignedToMe = true;
							}
						});
						return assignedToMe;
					case "all":
						return true;
					case "development":
					case "design":
					case "marketing":
					case "sales":
						return document.category === filter;
					default:
						return true;
				}
		  })
		: null;

	return (
		<div>
			<h2 className="page-title">Dashboard</h2>
			{error && <div className="error">{error}</div>}
			{documents && (
				<ProjectFilter filter={filter} changeFilter={changeFilter} />
			)}
			{documents && <ProjectList projects={projects} filter={filter} />}
		</div>
	);
};

export default Dashboard;
