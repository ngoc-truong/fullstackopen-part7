import React from "react";
import { AppBar, Toolbar, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import Logout from "./Logout";

const Navigation = ({ user, notifyWith }) => {
	const alignRight = {
		marginLeft: "auto",
	};

	return (
		<AppBar position="static">
			<Toolbar>
				<Button color="inherit" component={Link} to="/">
					Home
				</Button>
				<Button color="inherit" component={Link} to="/blogs">
					Blogs
				</Button>
				<Button color="inherit" component={Link} to="/users">
					Users
				</Button>
				{ user 
					? 	<Logout 
							user={user}
							notifyWith={notifyWith}
							alignRight={alignRight} 
						/>
					: 	<Button
							style={alignRight} 
							color="inherit" 
							component={Link} 
							to="/login">
								Login
						</Button>
				}
			</Toolbar>
		</AppBar>
	)
}

export default Navigation;