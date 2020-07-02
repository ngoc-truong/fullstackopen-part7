import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../reducers/loginReducer";
import { Button, TextField } from "@material-ui/core";

const Login = ({ notifyWith }) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = async (event) => {
		event.preventDefault();
		try {
			dispatch(loginUser(username, password));
			notifyWith(`${username} successfully logged in.`);
			setUsername("");
			setPassword("");
			history.push("/");
		} catch (exception) {
			notifyWith("Invalid username or password.", "error");
		};
	};

	return (
		<div>
			<h2>Login</h2>
			<form onSubmit={handleLogin} >
				<div>
					<TextField
						label="Username"
						id="username"
						value={username}
						onChange={event => setUsername(event.target.value)}
					/>
				</div>
				<div> 
					<TextField
						label="Password"
						id="password"
						type="password"
						value={password}
						onChange={event => setPassword(event.target.value)}
					/>
				</div>
				<Button
					variant="contained"
					color="primary"
					id="login-button"
					type="submit">
					Login
				</Button>
			</form>
		</div>
	)
};

export default Login;