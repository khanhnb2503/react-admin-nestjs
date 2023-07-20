import {
	Form, Row, Col, Checkbox, Upload, Typography,
	Input, Select, Button, Spin, notification
} from 'antd';
import { useDataProvider, useGetOne } from 'react-admin';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { IGroups } from '../../interfaces/groups';
import { IPermission, IResources } from '../../interfaces/permission';
import { permissionApi, resourceApi } from '../../services/permission';
import { groupsApi } from '../../services/groups';

const { Dragger } = Upload;
const { Text } = Typography;

export const GroupDetail = () => {
	const { id } = useParams();
	const dataProvider = useDataProvider();
	const [api, contextHolder] = notification.useNotification();
	const [groupData, setGroupData] = useState<IGroups>();
	const [permissions, setPermission] = useState<IPermission[]>([]);
	const [resource, setResource] = useState<IResources[]>([]);
	const [ids, setIds] = useState<string[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	const addPermission = async () => {
		try {
			await groupsApi.addPermissionToGroup(id, ids);
			console.log(ids)
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
				const { data: resource } = await resourceApi.getResource();
				const { data: groups } = await dataProvider.getOne<IGroups>('groups', { id: id });
				setGroupData(groups);
				setPermission(permission);
				setResource(resource);
				setIsLoading(true);
			} catch (error) {
				console.log('error');
			}
		})()
	}, []);

	let values: any = [];
	groupData?.roles?.map((item: any) => {
		resource.map((value: any) => {
			let valueCheckbox = `${item.actionId}_${value.id}`;
			if (values.indexOf(valueCheckbox) === -1) {
				values.push(valueCheckbox)
			}
		})
	});

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
												<Input defaultValue={groupData?.name} disabled />
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
												{values.length > 0 && (
													<Checkbox.Group
														style={{ width: '100%' }}
														onChange={(value: any) => setIds(value)}
														defaultValue={values}
													>
														<div className='list-permission'>
															{resource.length > 0 && resource.map((resource) => (
																<div className='items' key={resource.id}>
																	<p>QUẢN LÍ {resource.name}</p>
																	<Row gutter={[50, 5]}>
																		{permissions.length > 0 && permissions.map((value: any) => (
																			<Col xl={12} key={value.id}>
																				<Checkbox
																					className='checkbox-value'
																					value={`${value.id}_${resource.id}`}
																				>
																					{`${value.name} ${resource.name}`}
																				</Checkbox>
																			</Col>
																		))}
																	</Row>
																</div>
															) )}
														</div>
													</Checkbox.Group>
												)}
											</div>
											{groupData?.roles?.length > 0
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