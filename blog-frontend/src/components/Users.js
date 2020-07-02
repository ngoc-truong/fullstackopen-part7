import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { 
	Table,
	TableBody,
	TableContainer,
	TableCell,
	TableRow,
	Paper
} from "@material-ui/core";

const Users = () => {
	const users = useSelector(state => state.users);

	return (
		<div>
			<h2>Users</h2>
			<TableContainer component={Paper}>
				<Table>
					<TableBody>
							<TableRow>
								<TableCell>Name</TableCell>
								<TableCell>Blogs created</TableCell>
							</TableRow>
						{users.map(user =>(
							<TableRow key={user.id}>
								<TableCell>
									<Link to={`/users/${user.id}`}>
										{user.name}
									</Link>
								</TableCell>
								<TableCell>
									{user.blogs.length}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	)
}

export default Users;