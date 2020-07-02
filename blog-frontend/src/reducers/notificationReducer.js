export const setNotification = (object) => {
	return {
		type: "SET_NOTIFICATION",
		data: {
			message: object.message,
			notificationType: object.type,
		}
	}
}

const notificationReducer = (state = {}, action) => {
	switch(action.type) {
		case "SET_NOTIFICATION":
			const newState = {
				message: action.data.message,
				type: action.data.notificationType,
			}
			return newState;
		default:
			return state;
	}
}

export default notificationReducer;