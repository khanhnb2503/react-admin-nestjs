import {
	List,
	Datagrid,
	TextField,
	EmailField,
	EditButton,
	ShowButton,
	TextInput,
} from "react-admin";

const userFilters = [
	<TextInput source="username" label="Nhập để tìm kiếm..." alwaysOn />,
];


export const UserList = () => {
	return (
		<List filters={userFilters}>
			<Datagrid rowClick="edit">
				<TextField source="id" />
				<TextField source="username" />
				<EmailField source="email" />
				<TextField source="address" />
				<ShowButton />
				<EditButton />
			</Datagrid>
		</List>
	)
};
