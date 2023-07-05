import { Form, useGetOne } from 'react-admin';
import { Card, Button, Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import { Modal } from 'antd';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

import { baseUrl } from '../../constants/baseurl';
import { IPermission } from '../../interfaces/permission';
import { IGroups } from '../../interfaces/groups';

const columns: GridColDef[] = [
	{ field: 'id', headerName: 'ID', width: 210 },
	{ field: 'name', headerName: 'PermissionName', width: 200 },
];

export const GroupDetail = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);
	const [permission, setPermission] = useState<IPermission[]>([]);
	const [permissionIds, setPermissionIds] = useState<IPermission[]>([]);
	const [unPermissionIds, setUnPermissionIds] = useState<IPermission[]>([]);
	const { data: groups, isSuccess } = useGetOne<IGroups>('groups', { id: id });

	axios.defaults.headers.common['Authorization'] =
		`Bearer ${JSON.parse(localStorage.getItem('accessToken') || '')}`;

	const handleAddPermission = async () => {
		const data = await axios.post(
			baseUrl + `/groups/add-permission/${id}`,
			permissionIds
		);
		setOpen(false);
	};

	const handleUnPermission = async () => {
		const data = await axios.post(
			baseUrl + `/groups/un-permission/${id}`,
			unPermissionIds
		);
	}

	useEffect(() => {
		(async () => {
			const { data: permission } = await axios.get(`${baseUrl}/permissions`);
			setPermission(permission);
		})()
	}, []);

	return (
		<div>
			{isSuccess && (
				<Card sx={{ maxWidth: 900, padding: 3 }}>
					<div>
						<p>GROUP NAME: {groups?.name}</p>
					</div>
					<p>ROLES</p>
					{!groups?.roles ? (<h5>Chưa có quyền</h5>)
						: (
							<Form onSubmit={handleUnPermission} >
								<DataGrid
									rows={groups?.roles}
									columns={columns}
									initialState={{
										pagination: {
											paginationModel: { page: 0, pageSize: 5 },
										},
									}}
									pageSizeOptions={[5, 10]}
									checkboxSelection
									onRowSelectionModelChange={(id: any) => setUnPermissionIds(id)}
								/>
								<Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }} style={{ marginTop: 16 }}>
									<Grid item >
										<Button
											size="small"
											variant="contained"
											onClick={() => setOpen(true)}>Add
										</Button>
									</Grid>
									<Grid item >
										{groups?.roles &&
											<Button
												size="small"
												color='error'
												variant="contained"
												type='submit'
											>Update
											</Button>
										}
									</Grid>
								</Grid>
							</Form>
						)}
				</Card>
			)}

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
						onRowSelectionModelChange={(id: any) => setPermissionIds(id)}
					/>
					<Button variant="contained" color="primary" type="submit">
						Thêm quyền
					</Button>
				</Form>
			</Modal>
		</div>
	)
}