import { Edit, TextInput, SimpleForm } from "react-admin"

export const PermissionEdit = () => {
	return (
		<Edit>
			<SimpleForm>
				<TextInput source="name" />
			</SimpleForm>
		</Edit>
	)
}