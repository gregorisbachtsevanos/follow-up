import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { timestamp } from '../../firebase/config';

import { useCollection } from '../../hooks/useCollection';
import { useAuthContext } from '../../hooks/useAuthContext';
import './Create.css';
import { useFirestore } from '../../hooks/useFirestore';
import { useNavigate } from 'react-router-dom';

const categories = [
	{ value: 'development', label: 'Development' },
	{ value: 'design', label: 'Design' },
	{ value: 'sales', label: 'Sales' },
	{ value: 'marketing', label: 'Marketing' },
];

const Create = () => {
	const [name, setName] = useState(''); // set project name
	const [details, setDetails] = useState(''); // set project details
	const [dueDate, setDueDate] = useState(''); // set project delivery date
	const [category, setCategory] = useState(''); // set project category
	const [assignUsers, setAssignUsers] = useState([]); // set assign users to project
	const [formError, setFormError] = useState(null); // set form validation error

	const [selectUsers, setSelectUsers] = useState([]); // set users array for the options (dropdown)
	const { documents } = useCollection('users'); // get users collection (all users)
	const { user } = useAuthContext(); // get auth user
	const navigate = useNavigate(); // redirect if the task was insert successfully

	const { addDocument, res } = useFirestore('projects'); // get the addDocument function from useFirestore hook

	useEffect(() => {
		if (documents) {
			const options = documents.map((user) => {
				return { value: user, label: user.displayName };
			});
			
			setSelectUsers(options);
		}
	}, [documents]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!category) return setFormError('Category cannot be empty');

		if (assignUsers.length === 0)
			return setFormError('You must assign at least one user');

		setFormError(null);

		const createdBy = {
			displayName: user.displayName,
			photoURL: user.photoURL,
			id: user.uid,
		};

		const assignedUsersList = assignUsers.map((u) => {
			return {
				displayName: u.value.displayName,
				photoURL: u.value.photoURL,
				id: u.value.id,
			};
		});

		const project = {
			name,
			details,
			category: category.value,
			deadline: timestamp.fromDate(new Date(dueDate)),
			comments: [],
			createdBy,
			assignedUsersList,
		};

		await addDocument(project);
		if (!res.error) {
			navigate('/');
		} else {
			console.log(res.error)
			setFormError(res.error)
		}
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
				{formError && <div className="error">{formError}</div>}
			</form>
		</div>
	);
};

export default Create;
