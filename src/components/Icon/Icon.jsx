export const Icon = ({ attr, clickEvent }) => {
	return (
		<span className="material-symbols-outlined" onClick={clickEvent}>
			{attr}
		</span>
	);
};

// export default Icon;
