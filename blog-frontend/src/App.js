import React, { useEffect } from "react";
import "./App.css";
import Home from "./components/Home";
import Blog from "./components/Blog";
import Blogs from "./components/Blogs";
import Users from "./components/Users";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Notification from "./components/Notification";
import User from "./components/User";
import Navigation from "./components/Navigation";
import { initializeBlogs } from "./reducers/blogReducer";
import { setNotification } from "./reducers/notificationReducer";
import { rememberUser } from "./reducers/loginReducer";
import { initializeUsers } from "./reducers/userReducer";
import { useSelector, useDispatch } from "react-redux";
import { Switch, Route, Link, useRouteMatch, Redirect } from "react-router-dom";
import Container from "@material-ui/core/Container";

const App = () => {
	const dispatch = useDispatch();
	const blogFormRef = React.createRef();

	const blogs = useSelector(state => state.blogs);
	const notification = useSelector(state => state.notification);
	const user = useSelector(state => state.loggedUser);
	const users = useSelector(state => state.users);

	// Load blog posts into React app
	useEffect(() => {
		dispatch(initializeBlogs());
	}, []);

	// Load users into React app
	useEffect(() => {
		dispatch(initializeUsers());
	}, []);

	// Remember logged-in user from localStorage
	useEffect(() => {
		dispatch(rememberUser());
	}, []);

	// Notifications
	const notifyWith = (message, type="success") => {
		dispatch(setNotification({ message, type }));
		setTimeout(() => {
			dispatch(setNotification({}));
		}, 5000);
	};

	const matchUser = useRouteMatch("/users/:id");
	const matchBlog = useRouteMatch("/blogs/:id");

	const targetUser = matchUser
		? users.find(user => user.id === matchUser.params.id)
		: null;

	const targetBlog = matchBlog 
		? blogs.find(blog => blog.id === matchBlog.params.id)
		: null;

	// Return
	return (
		<Container>
			<Navigation 
				user={user}
				notifyWith={notifyWith} 
			/>
			<Notification notification={notification} />

			<Switch>
				<Route path="/users/:id">
					<User user={targetUser}/>
				</Route>
				<Route path="/blogs/:id">
					<Blog 
						blog={targetBlog}
						notifyWith={notifyWith}
					/>
				</Route>
				<Route path="/blogs">
					<Blogs notifyWith={notifyWith}/>
				</Route>
				<Route path="/users">
					{user ? <Users /> : <Redirect to="/login" />}
				</Route>
				<Route path="/login">
					<Login notifyWith={notifyWith}/>
				</Route>
				<Route path="/">
					<Home />
				</Route>
			</Switch>
		</Container>
	)
};

export default App;