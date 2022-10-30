import React, { useEffect, useState } from "react";
import Select from "react-select";

import { useCollection } from "../../hooks/useCollection";
import "./Create.css";

const categories = [
	{ value: "development", label: "Development" },
	{ value: "design", label: "Design" },
	{ value: "sales", label: "Sales" },
	{ value: "marketing", label: "Marketing" },
];

const Create = () => {
	const [name, setName] = useState("");
	const [details, setDetails] = useState("");
	const [dueDate, setDueDate] = useState("");
	const [category, setCategory] = useState("");
	const [assignUsers, setAssignUsers] = useState([]);

	const [selectUsers, setSelectUsers] = useState([]);
	const { users } = useCollection("users");

	useEffect(() => {
		if (users) {
			const options = users.map((user) => {
				return { value: user, label: user.displayName };
			});
			setSelectUsers(options);
		}
	}, [users]);

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(name, details, dueDate, category.value, assignUsers);
	};

	return (
		<div className="create-form">
			<h2 className="page-title">Create a new Project</h2>
			<form onSubmit={handleSubmit}>
				<label>
					<span>Project Name</span>
					<input
						type="text"
						required
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</label>
				<label>
					<span>Project Details</span>
					<textarea
						type="text"
						required
						value={details}
						onChange={(e) => setDetails(e.target.value)}
					></textarea>
				</label>
				<label>
					<span>Set due date</span>
					<input
						type="date"
						required
						value={dueDate}
						onChange={(e) => setDueDate(e.target.value)}
					/>
				</label>
				<label>
					<span>Project category</span>
					<Select
						options={categories}
						onChange={(option) => setCategory(option)}
					/>
				</label>
				<label>
					<span>Assign to</span>
					<Select
						options={selectUsers}
						onChange={(option) => setAssignUsers(option)}
						isMulti
					/>
				</label>
				<button className="btn">Add Project</button>
			</form>
		</div>
	);
};

export default Create;
