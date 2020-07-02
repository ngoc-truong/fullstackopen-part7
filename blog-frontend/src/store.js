import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import blogReducer from "./reducers/blogReducer";
import notificationReducer from "./reducers/notificationReducer";
import loginReducer from "./reducers/loginReducer";
import userReducer from "./reducers/userReducer";

const allReducers = combineReducers({
	blogs: blogReducer,
	notification: notificationReducer,
	loggedUser: loginReducer,
	users: userReducer,
});

const store = createStore(
	allReducers, 
	composeWithDevTools(
		applyMiddleware(thunk)
	)
);

export default store;