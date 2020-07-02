import blogService from "../services/blogs";

export const initializeBlogs = () => {
	return async dispatch => {
		const blogs = await blogService.getAll();
		dispatch({
			type: "INIT_BLOGS",
			data: blogs, 
		});
	};
};

export const createBlog = (blogObject) => {
	return async dispatch => {
		const newBlog = await blogService.create(blogObject);
		dispatch({
			type: "NEW_BLOG",
			data: newBlog,
		});
	};
};

export const removeBlog = (id) => {
	return async dispatch => {
		await blogService.remove(id);
		dispatch({
			type: "REMOVE_BLOG",
			data: { id },
		});
	};
};

export const increaseLikes = (id) => {
	return async dispatch => {
		const blogs = await blogService.getAll();
		const blog = blogs.find(b => b.id === id);
		const changedBlog = { ...blog, likes: blog.likes + 1 };
		await blogService.update(id, changedBlog);
		dispatch({
			type: "INCREASE_LIKES",
			data: { id },
		})
	}
};

export const addComment = (id, comment) => {
	return async dispatch => {
		const newComment = await blogService.addComment(id, comment);
		dispatch({
			type: "ADD_COMMENT",
			data: {
				id,
				newComment
			}
		})
	}
};

const blogReducer = (state = [], action) => {
	let id;
	let blogToChange;
	let changedBlog;
	
	switch(action.type) {
		case "INIT_BLOGS":
			return action.data;
		case "NEW_BLOG":
			return [...state, action.data]; //state.concat(action.data);
		case "INCREASE_LIKES":
			id = action.data.id;
			blogToChange = state.find(b => b.id === id);
			changedBlog = { 
				...blogToChange, 
				likes: blogToChange.likes + 1 
			}
			return state.map(blog => blog.id !== id ? blog : changedBlog);
		case "REMOVE_BLOG":
			id = action.data.id;
			const index = state.findIndex(blog => blog.id === id);
			const blogsCopy = [ ...state ];
			blogsCopy.splice(index, 1);
			return blogsCopy;	
		case "ADD_COMMENT": 
			id = action.data.id;
			blogToChange = state.find(b => b.id === id);
			changedBlog = {
				...blogToChange,
				comments: blogToChange.comments.concat(action.data.newComment)
			}
			return state.map(blog => blog.id !== id ? blog : changedBlog);
		default:
			return state;
	}
}

export default blogReducer;