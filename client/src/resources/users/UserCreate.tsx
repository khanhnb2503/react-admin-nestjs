import {
	Create,
	SimpleForm,
	TextInput,
	useNotify
} from 'react-admin';
import { Card, Grid } from "@mui/material";

import { FormValidators } from '../../constants/errors';

export const UserCreate = () => {
	const notify = useNotify();
	const onSuccess = () => notify('Tạo tài khoản thành công');

	return (
		<Card>
			<Create mutationOptions={{ onSuccess }} redirect='list' title='Thêm tài khoản Admin'>
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
						label="password"
						variant="outlined"
						source="password"
						validate={FormValidators.password}
					/>
					<TextInput
						label="Address"
						variant="outlined"
						source="address"
						validate={FormValidators.address}
					/>
				</SimpleForm>
			</Create>
		</Card>
	)
}
