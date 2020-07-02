import React from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import { TextField, Button } from "@material-ui/core";

const BlogForm = ({ notifyWith }) => {
	const dispatch = useDispatch();

	const addBlog = (event) => {
		event.preventDefault();
		const newBlog = {
			title: event.target.title.value,
			author: event.target.author.value,
			url: event.target.url.value,
		};

		event.target.title.value = "";
		event.target.author.value = "";
		event.target.url.value = "";
		
		try {
			dispatch(createBlog(newBlog));
			notifyWith(`Blog with title "${newBlog.title}" saved.`);
		} catch (e) {
			notifyWith(`Could not save blog ${newBlog.title} to the server`, "error");
		}
	};

	return (
		<div>
			<h2>Create a new blog</h2>
			<form onSubmit={addBlog}>
				
				<div>
					<TextField
						label="Title"
						type="text"
						name="title"
						id="title"
					/>
				</div>
				
				<div>
					<TextField
						label="Author"
						type="text"
						name="author"
						id="author"
					/>
				</div>
				
				<div>
					<TextField 
						label="Url"
						type="text"
						name="url"
						id="url"
					/>
				</div>
			
				<Button 
					variant="contained" 
					color="primary" 
					type="submit">
					Create post
				</Button>
			</form>
		</div>

	);
};

export default BlogForm;