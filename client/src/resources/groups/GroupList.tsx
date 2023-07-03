import {
	List,
	Datagrid,
	TextField,
	EditButton,
	ShowButton,
} from "react-admin";

export const GroupList = () => {
	return (
		<List>
			<Datagrid rowClick="edit">
				<TextField source="id" />
				<TextField source="name" />
				<ShowButton />
				<EditButton />
			</Datagrid>
		</List>
	)
};