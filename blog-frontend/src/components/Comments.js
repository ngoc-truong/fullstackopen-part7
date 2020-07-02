import React from "react";

const Comments = ({ comments }) => {
	return (
		<div>
			<h2>Comments</h2>
			<ul>
				{ comments.map(comment => 
					<li>{comment.text}</li>	
				)}
			</ul>
		</div>
	)
}

export default Comments;