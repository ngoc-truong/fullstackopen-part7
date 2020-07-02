import React from "react";
import Comments from "./Comments";
import CommentForm from "./CommentForm";
import { useSelector, useDispatch } from "react-redux";
import { increaseLikes, removeBlog } from "../reducers/blogReducer";
import { useHistory } from "react-router-dom";

const Blog = ({ blog, notifyWith }) => {
	const currentUser = useSelector(state => state.loggedUser);
	const dispatch = useDispatch();
	const history = useHistory();

	if (!blog) {
		return null;
	};

	const idOfBlogCreator = blog.user
		? blog.user.id
		: "Not found";

	const nameOfBlogCreator = blog.user
		? blog.user.name
		: "Blog creator not found";

	
	const deleteBlog = () => {
		const userWantsToDelete = window.confirm(`Do you really want to delete ${blog.title}`);
		if (userWantsToDelete) {
			try {
				dispatch(removeBlog(blog.id));
				notifyWith(`${blog.title} was deleted.`);
				history.push("/blogs");
			} catch (e) {
				notifyWith(`Could not delete blog with title ${blog.title}.`, "error");
			}
		}
	};

	const showDeleteButton = () => {
		if (idOfBlogCreator === currentUser.id) {
			return (
				<button onClick={deleteBlog}>Delete</button>
			);
		}
		return;
	};

	const updateLikes = () => {
		dispatch(increaseLikes(blog.id));
		notifyWith(`You liked the blogpost: "${blog.title}"`);
	}
	
	return (
		<div>
			<h1>{blog.title}</h1>
			<p>More info: <a href={blog.url}>{blog.url}</a></p>
			<p className="likes">
					Likes: {blog.likes}
					<button onClick={updateLikes}>Like</button>
			</p>
			<p>Added by: {nameOfBlogCreator}</p>
			{ currentUser 
				? showDeleteButton()
				: null
			}
			<CommentForm 
				blog={blog}
				notifyWith={notifyWith} 
			/>
			{ blog.comments.length > 0 
				? <Comments comments={blog.comments}/>
				: null
			}
		</div>
	)
};

export default Blog;
