import {
	Datagrid,
	Show,
	SimpleShowLayout,
	TextField,
	ArrayField,
	SimpleForm,
	Form
} from 'react-admin';
import { Card, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { Modal } from 'antd';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import axios from 'axios';
import { baseUrl } from '../../constants/baseurl';
import { IPermission } from '../../interfaces/permission';

const columns: GridColDef[] = [
	{ field: 'id', headerName: 'ID', width: 210 },
	{ field: 'name', headerName: 'PermissionName', width: 200 },
];

export const GroupDetail = () => {
	const [open, setOpen] = useState(false);
	const [permission, setPermission] = useState<IPermission[]>([]);
	const handleAddPermission: any = (data: IPermission) => {
		console.log(data);
	}

	useEffect(() => {
		(async () => {
			const { data } = await axios.get(baseUrl + '/permissions');
			setPermission(data);
		})()
	}, [])

	return (
		<div>
			<Card sx={{ maxWidth: 900 }}>
				<Show>
					<SimpleShowLayout>
						<TextField source="name" label='TÊN GROUPS' />
						<ArrayField source="roles" label='VAI TRÒ'>
							<Datagrid>
								<TextField source="permissionId" label='PermissionId' />
								<TextField source="name" />
							</Datagrid>
						</ArrayField>
						<Button variant="contained" onClick={() => setOpen(true)}>Add Permission</Button>
					</SimpleShowLayout>
				</Show>
			</Card>
			<Modal
				title="THÊM QUYỀN VÀO GROUP"
				open={open}
				onOk={() => setOpen(true)}
				onCancel={() => setOpen(false)}
				footer={null}
				width={700}
			>
				<Form onSubmit={handleAddPermission}>
					<DataGrid
						rows={permission}
						columns={columns}
						initialState={{
							pagination: {
								paginationModel: { page: 0, pageSize: 5 },
							},
						}}
						pageSizeOptions={[5, 10]}
						checkboxSelection
					/>
					<Button variant="contained" color="primary" type="submit">
						Thêm quyền
					</Button>
				</Form>
			</Modal>
		</div>
	)
}