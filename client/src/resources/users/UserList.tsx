import {
	List,
	Datagrid,
	TextField,
	EmailField,
	EditButton,
	ShowButton,
	useGetList,
} from "react-admin";

const sort = { field: 'username', order: 'ASC'}

export const UserList = () => {
	const { data, total, isLoading }  = useGetList('users', {
		pagination: {page: 1, perPage: 5},
		sort
	});
	return (
		<List>
			<Datagrid 
				data={data}
				total={total}
				isLoading={isLoading}
				sort={sort}
				rowClick="edit"
			>
				<TextField source="id" sortable={false} />
				<TextField source="username" />
				<EmailField source="email" sortable={false}/>
				<TextField source="address" sortable={false}/>
				<ShowButton />
				<EditButton />
			</Datagrid>
		</List>
	)
};
