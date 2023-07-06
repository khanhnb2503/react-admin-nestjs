import { Edit, TextInput, SimpleForm } from "react-admin";
import { FormValidators } from '../../constants/errors';

export const PermissionEdit = () => {
	return (
		<Edit>
			<SimpleForm>
				<TextInput 
					label="Permission name"
					variant="outlined" 
					source="name" 
					validate={FormValidators.permission}
				/>
			</SimpleForm>
		</Edit>
	)
}