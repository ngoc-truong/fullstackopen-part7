import React from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../reducers/loginReducer";
import { Button } from "@material-ui/core";

const Logout = ({ user, notifyWith, alignRight }) => {
	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(logoutUser());
		notifyWith("User successfully logged out.");
	}

	return (
		<div style={alignRight}>
			<em>{user.username} logged in.</em>
			<Button 
				color="inherit"
				onClick={handleLogout}>Logout</Button>
		</div>
	)
}

export default Logout;