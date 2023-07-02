import { useState, useEffect } from "react"
import { useDataProvider } from "react-admin";
import { useParams } from "react-router-dom";

type IUser = {
	id: string;
	username: string;
	email: string;
	address: string;
}

import fakeApi from "../fakeApi";

const params = {
	pagination: {page: 1, perPage: 5},
	sort: {field: 'username', order: 'ASC'},
}

export const UserDetail =  () => {
	const { id } = useParams();
	const dataProvider = useDataProvider();
	const [user, getUser] = useState<IUser>();

	useEffect(() => {
		(async () => {
			const { data } = await dataProvider.getOne('users', { id: id});
			getUser(data);
			const usersData = await fakeApi.getList('users', params);
			console.log(usersData);
		})()
	},[]);

	return (
		<div>
			{user && (
				<ul>
					<li>{user.id}</li>
					<li>{user.username}</li>
					<li>{user.email}</li>
					<li>{user.address}</li>
				</ul>
			)}
		</div>
	)
}