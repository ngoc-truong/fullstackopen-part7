import blogService from "../services/blogs";
import loginService from "../services/login";

export const rememberUser = () => {
	return async dispatch => {
		let user = null;
		const loggedUserJSON = await window.localStorage.getItem("loggedBlogappUser");
		if (loggedUserJSON) {
			user = JSON.parse(loggedUserJSON);
			blogService.setToken(user.token);
		}

		dispatch({
			type: "REMEMBER_USER",
			data: user,
		})
	}
}

export const loginUser = (username, password) => {
	return async dispatch => {
		const user = await loginService.login( {username, password });
		window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
		blogService.setToken(user.token);

		dispatch({
			type: "LOGIN_USER",
			data: user,
		})
	}
}

export const logoutUser = () => {
	return async dispatch => {
		window.localStorage.removeItem("loggedBlogappUser");
		dispatch({
			type: "LOGOUT_USER",
		})
	}
}

const loginReducer = (state = null, action) => {
	switch(action.type) {
		case "REMEMBER_USER":
			return action.data;
		case "LOGIN_USER":
			return action.data;
		case "LOGOUT_USER":
			return null;
		default: 
			return state;
	}
};

export default loginReducer; 