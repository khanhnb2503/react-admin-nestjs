import { Edit, TextInput, SimpleForm, SaveButton } from "react-admin";
import { FormValidators } from '../../constants/errors';

export const EditUser = () => {

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
			</SimpleForm>
			
		</Edit>
	)
}