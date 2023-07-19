import {
	Create,
	SimpleForm,
	TextInput,
	useNotify,
	NumberInput
} from 'react-admin';
import { Card, Grid } from "@mui/material";

export const ProductCreate = () => {
	const notify = useNotify();
	const onSuccess = () => notify('Thêm sản phẩm thành công');

	return (
		<Card>
			<Create mutationOptions={{ onSuccess }} redirect='list' title='Thêm sản phẩm'>
				<SimpleForm>
					<TextInput
						label="Tên sản phẩm"
						variant="outlined"
						source="name"
					/>
					<NumberInput
						label="Giá sản phẩm"
						variant="outlined"
						source="price"
					/>
				</SimpleForm>
			</Create>
		</Card>
	)
}
