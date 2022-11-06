const filterList = [
	'all',
	'mine',
	'development',
	'design',
	'marketing',
	'sales',
];

const ProjectFilter = ({ filter, changeFilter }) => {
	return (
		<div className="project-filter">
			<nav>
				<p>Filter by:</p>
				{filterList.map((f) => (
					<button
						key={f}
						onClick={() => changeFilter(f)}
						className={filter === f ? 'active' : void(0)}
					>
						{f.charAt(0).toUpperCase()+f.slice(1)}
					</button>
				))}
			</nav>
		</div>
	);
};

export default ProjectFilter;
