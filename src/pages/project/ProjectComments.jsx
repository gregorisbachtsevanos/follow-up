import React, { useState } from 'react';
import { timestamp } from '../../firebase/config';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useFirestore } from '../../hooks/useFirestore';
import { Avatar } from '../../components/Avatar/Avatar';

export const ProjectComments = ({ project }) => {
	const { user } = useAuthContext();
	const [newComment, setNewComment] = useState('');
	const { updateDocument, res } = useFirestore('projects');

	const handleSubmit = async (e) => {
		e.preventDefault();
		const commentToAdd = {
			displayName: user.displayName,
			photoURL: user.photoURL,
			content: newComment,
			createdAt: timestamp.fromDate(new Date()),
			id: Math.random(),
		};
		// console.log(commentToAdd);
		await updateDocument(project.id, {
			comments: [...project.comments, commentToAdd],
		});

		if (!res.error) {
			setNewComment('');
		}
	};

	const deleteComment = async (id, e) => {
		e.preventDefault();
		// console.log(project.comments);

		const newCommentList = project.comments.filter((comment) => {
			return comment.id !== id;
		});
		// console.log(newCommentList);
		await updateDocument(id, {
			comments: project.comments.filter((comment) => comment.id !== id),
		});
	};

	return (
		<div className="project-comments">
			<h4>Project Comments</h4>
			<ul>
				{project.comments.length > 0 &&
					project.comments.map((comment) => (
						<li key={comment.id}>
							<button
								className="btn"
								onClick={(e) => deleteComment(comment.id, e)}
							>
								DELETE
							</button>

							<div className="comment-author">
								<Avatar src={comment.photoURL} />
								<p>{comment.displayName}</p>
							</div>
							<div className="comment-date">
								<p>date here</p>
							</div>
							<div className="comment-content">
								<p>{comment.content}</p>
							</div>
						</li>
					))}
			</ul>
			<form className="add-comment" onSubmit={handleSubmit}>
				<label>
					<span>Add comment</span>
					<textarea
						required
						onChange={(e) => setNewComment(e.target.value)}
						value={newComment}
					></textarea>
				</label>
				<button className="btn">Comment</button>
			</form>
		</div>
	);
};
