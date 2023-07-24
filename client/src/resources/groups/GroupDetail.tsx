import {
	Form, Row, Col, Checkbox, Upload, Typography,
	Input, Select, Button, Spin, notification, Switch
} from 'antd';
import { useGetOne } from 'react-admin';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { IPermission, IResources } from '../../interfaces/permission';
import { permissionApi, resourceApi } from '../../services/permission';
import { groupsApi } from '../../services/groups';
import { IGroups } from '../../interfaces/groups';

const { Dragger } = Upload;
const { Text } = Typography;

export const GroupDetail = () => {
	const { id } = useParams();
	const [isLoading, setIsLoading] = useState(false);
	const [api, contextHolder] = notification.useNotification();
	const [permissions, setPermission] = useState<IPermission[]>([]);
	const [resource, setResource] = useState<IResources[]>([]);
	const [ids, setIds] = useState<string[]>([]);
	const { data: groups } = useGetOne<IGroups>('groups', { id: id });

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
				const { data: resource } = await resourceApi.getResource();
				setResource(resource);
				setIsLoading(true);
			} catch (error) {
				console.log('error');
			}
		})()
	}, []);

	return (
		<>
			<Spin spinning={!isLoading}>
				<div>
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
												<Input defaultValue={groups?.name} disabled />
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
												<div className='power'>
													<Row justify='start' align='middle' gutter={[6, 0]}>
														<Col>
															<Switch size="small" defaultChecked />
														</Col>
														<Col>
															<h6>Quyền hạn trong dashboard</h6>
														</Col>
													</Row>
												</div>
												{isLoading && (
													<Checkbox.Group
														style={{ width: '100%' }}
														onChange={(value: any) => setIds(value)}
														defaultValue={groups?.roles?.map(
															(role: any) => `${role.actionId}_${role.resourceId}`
														)}
													>
														<div className='list-permission'>
															{resource.length > 0 && resource.map((res) => (
																<div className='items' key={res.id}>
																	<p>QUẢN LÍ {res.name}</p>
																	<Row gutter={[50, 5]}>
																		{permissions.length > 0 && permissions.map((value: any) => (
																			<Col xl={12} 
																				key={value.id} 
																				className={`${
																					((res.name == 'Quyền hạn') && ((value.name == 'Thêm') || (value.name == 'Xóa')))
																					? 'hidden-checkbox' : '' 
																				}`}
																			>
																				<Checkbox
																					className='checkbox-value'
																					value={`${value.id}_${res.id}`}
																				>
																					{`${value.name} ${res.name}`}
																				</Checkbox>
																			</Col>
																		))}
																	</Row>
																</div>
															))}
														</div>
													</Checkbox.Group>
												)}
											</div>
											{groups?.roles?.length > 0
												? <Button type="primary" onClick={addPermission} danger>Update</Button>
												: <Button type="primary" onClick={addPermission}>Create</Button>
											}
										</Form>
									</Col>
								</Row>
							</div>
						</div>
					</div>
				</div>
			</Spin>
		</>
	)
}