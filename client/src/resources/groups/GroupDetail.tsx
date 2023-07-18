import { Form, Row, Col, Checkbox, Upload, Typography, Input, Select, Button, Spin, notification } from 'antd';
import { useGetOne } from 'react-admin';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { IGroups } from '../../interfaces/groups';
import { IPermission } from '../../interfaces/permission';
import { permissionApi } from '../../services/permission';
import { groupsApi } from '../../services/groups';

const { Dragger } = Upload;
const { Text } = Typography;

export const GroupDetail = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [api, contextHolder] = notification.useNotification();
	const [permissions, setPermission] = useState<IPermission[]>([]);
	const [ids, setIds] = useState<string[]>([]);
	const [loading, setLoading] = useState(false);

	const { data: groups, isSuccess } = useGetOne<IGroups>('groups', { id: id });
	const addPermission = async () => {
		try {
			await groupsApi.addPermissionToGroup(id, ids);
			api['success']({
				message: 'Thông báo',
				description: 'Cập nhật thành công',
			});
		} catch (error) {
			api['error']({
				message: 'Thông báo',
				description: 'Bạn không có quyền cập nhật!',
			});
		}
	};

	useEffect(() => {
		(async () => {
			try {
				const { data: permission } = await permissionApi.getPermissions();
				setPermission(permission);
			} catch (error) {
				console.log('error');
			}
		})()
	}, []);

	return (
		<Spin size='large' spinning={!isSuccess}>
			{contextHolder}
			<div className='wrapper__group'>
				<div className="box-info">
					<div className='header-title'>
						<h4>Thông tin nhóm</h4>
					</div>
					<div className='form-groups'>
						<Row gutter={40}>
							<Col xl={10}>
								<div className='upload-avatar'>
									<Dragger name="avatar" listType="picture-card" className="avatar-uploader">
										Upload
									</Dragger>
								</div>
								<div className='description'>
									<h6>Mô tả</h6>
									<Text>Nhóm đang hoạt động</Text>
								</div>
							</Col>
							<Col xl={14}>
								<Form>
									<div className='group-name'>
										<p>Tên nhóm</p>
										{isSuccess && <Input defaultValue={groups?.name} disabled />}
									</div>
									<div className='group-type'>
										<p>Loại nhóm</p>
										<Select
											defaultValue="Nhân viên"
											style={{ width: 120 }}
											options={[
												{ value: 'jack', label: 'Quản lí' },
												{ value: 'lucy', label: 'Nhân viên' },
												{ value: 'Yiminghe', label: 'Khách' }
											]}
										/>
									</div>
									<div className='content-manager'>
										<Checkbox.Group
											style={{ width: '100%' }}
											onChange={(value: any) => setIds(value)}
											defaultValue={groups?.roles?.map((value: any) => value.id)}
										>
											<div className='list-permission'>
												<p>QUẢN LÍ TÀI KHOẢN</p>
												<Row gutter={[50, 5]}>
													{permissions.length > 0 && permissions.map((value: any) => (
														<Col xl={12} key={value.id}>
															<Checkbox
																className='checkbox-value'
																value={value.id}
															>{`${value.name} tài khoản`}
															</Checkbox>
														</Col>
													))}
												</Row>
											</div>
										</Checkbox.Group>
									</div>
									{isSuccess && groups?.roles?.length > 0
										? <Button type="primary" onClick={addPermission} danger>Update</Button>
										: <Button type="primary" onClick={addPermission}>Create</Button>
									}
								</Form>
							</Col>
						</Row>
					</div>
				</div>
			</div>
		</Spin>
	)
}