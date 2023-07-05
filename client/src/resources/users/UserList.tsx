import {
	List,
	Datagrid,
	TextField,
	EmailField,
	EditButton,
	ShowButton,
	useGetList,
} from "react-admin";

export const UserList = () => {
	return (
		<List>
			<Datagrid 
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
