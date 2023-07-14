import { Modal } from 'antd';
import axios from 'axios';
import { Form, useGetOne } from 'react-admin';
import { Card, Button, Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import { useParams, useNavigate } from 'react-router-dom';

import { baseUrl } from '../../constants/baseurl';
import { IPermission } from '../../interfaces/permission';
import { IGroups } from '../../interfaces/groups';
import { groupsApi } from '../../services/groups';
import { permissionApi } from '../../services/permission';

const columns: GridColDef[] = [
	{ field: 'id', headerName: 'ID', width: 250 },
	{ field: 'action', headerName: 'Permission', width: 300 },
	{ field: 'resource', headerName: 'Resource', width: 200 },
];

const columnModal: GridColDef[] = [
	{ field: 'id', headerName: 'ID', width: 250 },
	{ field: 'name', headerName: 'Permission', width: 300 },
]

export const GroupDetail = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);
	const [permission, setPermission] = useState<IPermission[]>([]);
	const [permissionIds, setPermissionIds] = useState<IPermission[]>([]);
	const [unPermissionIds, setUnPermissionIds] = useState<IPermission[]>([]);
	const { data: groups, isSuccess } = useGetOne<IGroups>('groups', { id: id });

	const handleAddPermission = async () => {
		try {
			const response = await groupsApi.addPermissionToGroup(id, permissionIds);
			setOpen(false);
			window.location.reload();
		} catch (error) {
			console.log('error');
		}
	};

	const handleUnPermission = async () => {
		try {
			const response = await groupsApi.unPermissionToGroup(id, unPermissionIds);
			setOpen(false);
			window.location.reload();
		} catch (error) {
			console.log()
		}
	}

	useEffect(() => {
		(async () => {
			try {
				const { data: permission } = await permissionApi.getPermissions();
				setPermission(permission);
			} catch (error) {
				console.log('error');
			}
		})();
	}, []);

	return (
		<div>
			{isSuccess && (
				<Card sx={{ maxWidth: 900, padding: 3 }}>
					<div>
						<p>GROUP NAME: {groups?.name}</p>
						<p>ROLES</p>
					</div>
					<Form onSubmit={handleUnPermission}>
						{!groups?.roles
							? (<h5>Chưa có quyền</h5>)
							: (
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
							)}
						<Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }} style={{ marginTop: 16 }}>
							<Grid item >
								<Button
									size="small"
									variant="contained"
									onClick={() => setOpen(true)}>Add
								</Button>
							</Grid>
							<Grid item >
								{groups?.roles && unPermissionIds.length > 0 &&
									<Button
										size="small"
										color='error'
										variant="contained"
										type='submit'
									>Delete</Button>
								}
							</Grid>
						</Grid>
					</Form>
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
					<div>
						<DataGrid
							rows={permission}
							columns={columnModal}
							autoHeight={true}
							checkboxSelection
							disableRowSelectionOnClick={false}
							onRowSelectionModelChange={(id: any) => setPermissionIds(id)}
							style={{ marginBottom: 15 }}
							pageSizeOptions={[5, 10]}
							initialState={{
								pagination: {
									paginationModel: { page: 0, pageSize: 5 },
								},
							}}
							isRowSelectable={
								(params: GridRowParams) => (!groups?.roles)
									? true
									: (!groups?.roles.some((item: any) => item.id === params.id))
							}
						/>
					</div>
					{permissionIds.length > 0 && (
						<Button variant="contained" color="primary" type="submit">
							Thêm quyền
						</Button>
					)}
				</Form>
			</Modal>
		</div>
	)
}