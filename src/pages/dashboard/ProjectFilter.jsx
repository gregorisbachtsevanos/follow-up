import { useState } from "react";

const filterList = [
	"all",
	"mine",
	"development",
	"design",
	"marketing",
	"sales",
];

const ProjectFilter = ({ currentFilter, changeFilter }) => {
	// const handleClick = (newFilter) => {
	// 	console.log(newFilter);
	// 	setCurrentFilter(newFilter);
	// };

	return (
		<div className="project-filter">
			<nav>
				<p>Filter by:</p>
				{filterList.map((f) => (
					<button
						key={f}
						onClick={() => changeFilter(f)}
						className={currentFilter === f ? "active" : ""}
					>
						{f}
					</button>
				))}
			</nav>
		</div>
	);
};

export default ProjectFilter;
