import {
	List,
	Datagrid,
	TextField,
	EmailField,
	EditButton,
	ShowButton,
	NumberField
} from "react-admin";

export const ProductList = () => {
	return (
		<List>
			<Datagrid 
				rowClick="edit"
			>
				<TextField source="id" sortable={false} />
				<TextField source="name" />
				<NumberField source="price" />
				<ShowButton />
			</Datagrid>
		</List>
	)
};
