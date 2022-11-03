const filterList = [
	"All",
	"Mine",
	"Development",
	"Design",
	"Marketing",
	"Sales",
];

const ProjectFilter = ({ filter, changeFilter }) => {
	// const handleClick = (newFilter) => {
	// 	console.log(newFilter);
	// 	setfilter(newFilter);
	// };

	return (
		<div className="project-filter">
			<nav>
				<p>Filter by:</p>
				{filterList.map((f) => (
					<button
						key={f.toLowerCase()}
						onClick={() => changeFilter(f.toLowerCase())}
						className={filter === f ? "active" : ""}
					>
						{f}
					</button>
				))}
			</nav>
		</div>
	);
};

export default ProjectFilter;
