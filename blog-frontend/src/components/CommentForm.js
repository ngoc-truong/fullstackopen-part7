import React from "react";
import { useDispatch } from "react-redux";
import { addComment } from "../reducers/blogReducer";
import { TextField, Button } from "@material-ui/core";

const CommentForm = ({ blog, notifyWith }) => {
	const dispatch = useDispatch();

	const createComment = (event) => {
		event.preventDefault();

		const newComment = {
			text: event.target.text.value,
		};

		event.target.text.value = "";

		try {
			dispatch(addComment(blog.id, newComment));
			notifyWith(`Comment with text: "${newComment.text}" created.`);
		} catch (e) {
			notifyWith(`Could not save comment`);
		}
	};

	return (
		<div>
			<h2>Create a comment</h2>
			<form onSubmit={createComment}>
				<div>
					<TextField
						label="Text"
						type="text"
						name="text"
						id="text"
					/>
				</div>
				<Button
					variant="contained"
					color="primary" 
					type="submit">
						Add comment
				</Button>
			</form>
		</div>
	)
}

export default CommentForm;