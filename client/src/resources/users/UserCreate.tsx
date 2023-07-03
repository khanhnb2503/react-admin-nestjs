import {
	Create,
	SimpleForm,
	EmailField,
	TextInput,
	CreateBase,
} from 'react-admin';
import {Card} from "@mui/material"


export const UserCreate = () => {
	return (
		<CreateBase>
			<Card>
				<Create>
					<SimpleForm>
						<TextInput source="username" />
						<TextInput source="email" />
						<TextInput source="password" />
						<TextInput source="address" />
					</SimpleForm>
				</Create>
			</Card>
		</CreateBase>
	)
}
