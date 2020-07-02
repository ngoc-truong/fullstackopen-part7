import React from "react";
import { TextField, Button } from "@material-ui/core";

const LoginForm = ({
	handleSubmit,
	handleUsernameChange,
	handlePasswordChange,
	username,
	password,
}) => {
	return (
		<form onSubmit={handleSubmit} >
			<div>
				<TextField
					label="Username"
					id="username"
					value={username}
					onChange={handleUsernameChange}
				/>
			</div>
			<div>
				<TextField
					label="Password"
					id="password"
					type="password"
					value={password}
					onChange={handlePasswordChange}
				/>
			</div>
			<Button 
				variant="contained"
				color="primary"
				id="login-button"
				type="submit">
					login
			</Button>
		</form>
	);
};
export default LoginForm;