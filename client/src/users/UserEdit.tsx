import { Edit, TextInput, SimpleForm } from "react-admin"

export const EditUser = () => {

	return (
		<Edit>
			<SimpleForm>
				<TextInput source="username" />
				<TextInput source="email" />
				<TextInput source="address" />
			</SimpleForm>
		</Edit>
	)
}