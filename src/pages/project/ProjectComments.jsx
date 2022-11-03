import React, { useState } from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

import { timestamp } from "../../firebase/config";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";
import { Avatar } from "../../components/Avatar/Avatar";

export const ProjectComments = ({ project }) => {
	const { user } = useAuthContext();
	const [newComment, setNewComment] = useState("");
	const { updateDocument, res } = useFirestore("projects");

	const handleSubmit = async (e) => {
		e.preventDefault();
		const commentToAdd = {
			displayName: user.displayName,
			userId: user.uid,
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
			setNewComment("");
		}
	};

	const deleteComment = async (commentId, e) => {
		e.preventDefault();
		await updateDocument(project.id, {
			comments: project.comments.filter(
				(comment) => comment.id !== commentId
			),
		});
	};

	return (
		<div className="project-comments">
			<h4>Project Comments</h4>
			<ul>
				{project.comments.length > 0 &&
					project.comments.map((comment) => (
						<li key={comment.id}>
							<div className="comment-header">
								<div className="comment-author">
									<Avatar src={comment.photoURL} />
									<p>{comment.displayName}</p>
								</div>
								{(user.uid === comment.userId ||
									user.uid === project.createdBy.id) && (
									<div className="comment-delete-icon">
										<span
											className="material-symbols-outlined"
											onClick={(e) =>
												deleteComment(comment.id, e)
											}
										>
											delete
										</span>
									</div>
								)}
							</div>
							<div className="comment-date">
								<p>
									{formatDistanceToNow(
										comment.createdAt.toDate(),
										{ addSuffix: true }
									)}
								</p>
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
