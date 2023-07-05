import { Edit, TextInput, SimpleForm, useGetList, SelectInput, ReferenceInput } from "react-admin";
import { FormValidators } from '../../constants/errors';

export const EditUser = () => {
	const { data, isLoading } = useGetList('groups');
	return (
		<Edit>
			<SimpleForm>
				<TextInput
					label="Username"
					variant="outlined"
					source="username"
					validate={FormValidators.username}
				/>
				<TextInput
					label="Email"
					variant="outlined"
					source="email"
					validate={FormValidators.email}
				/>
				<TextInput
					label="Address"
					variant="outlined"
					source="address"
					validate={FormValidators.address}
				/>
				<ReferenceInput label="Role" source="roleId" reference="groups">
					<SelectInput variant="outlined" source="roleId" optionText='name'/>
				</ReferenceInput>
			</SimpleForm>

		</Edit>
	)
}