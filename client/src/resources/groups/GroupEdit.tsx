import { Edit, TextInput, SimpleForm } from "react-admin";
import { FormValidators } from '../../constants/errors';

export const GroupEdit = () => {
	return (
		<Edit>
			<SimpleForm>
				<TextInput 
					label="Group name"
					variant="outlined" 
					source="name" 
					validate={FormValidators.groups}
				/>
			</SimpleForm>
		</Edit>
	)
}