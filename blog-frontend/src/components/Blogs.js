import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import { 
	Table,
	TableBody,
	TableContainer,
	TableCell,
	TableRow,
	Paper
} from "@material-ui/core";

const Blogs = ({ notifyWith }) => {
	const blogFormRef = React.createRef();
	const user = useSelector(state => state.loggedUser);
	const blogs = useSelector(state => state.blogs);
	const blogsSortedByLikes = blogs.sort((a, b) => {
		return b.likes - a.likes;
	});

	return (
		<div>
			<h2>Blogs</h2>
			{ user 
				? <Togglable
					buttonOpen="Create new blog"
					buttonClose="Cancel"
					ref={blogFormRef}>
					<BlogForm notifyWith={notifyWith}/>
				  </Togglable>
				: <h3>Login to create a new blog</h3>}

			<TableContainer component={Paper}>
				<Table>
					<TableBody>
						<TableRow>
							<TableCell>Title</TableCell>
							<TableCell>Likes</TableCell>
						</TableRow>
						{blogsSortedByLikes.map(blog => (
							<TableRow key={blog.id}>
								<TableCell>
									<Link to={`/blogs/${blog.id}`}>
										{blog.title}
									</Link>
								</TableCell>
								<TableCell>
									{blog.likes}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	)
}

export default Blogs;