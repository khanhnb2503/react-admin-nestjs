import {
	List,
	Datagrid,
	TextField,
	EditButton,
	ShowButton,
	SimpleShowLayout,
	RichTextField,
	useRecordContext
} from "react-admin";


const GroupShow = () => (
	<SimpleShowLayout>
		<RichTextField source="name" />
	</SimpleShowLayout>
);


export const GroupList = () => {
	return (
		<List>
			<Datagrid rowClick="show">
				<TextField source="id" />
				<TextField source="name" />
				<ShowButton />
				<EditButton />
			</Datagrid>
		</List>
	)
};
