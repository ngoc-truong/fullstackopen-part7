import React from "react";
import { Alert } from "@material-ui/lab";

const Notification = ({ notification }) => {
	if (notification === null) {
		return null;
	}

	return (
		<div className={notification.type}>
			{(notification.message &&
				<Alert severity="success">
					{notification.message}
				</Alert>
			)}
		</div>
	);
};

export default Notification;