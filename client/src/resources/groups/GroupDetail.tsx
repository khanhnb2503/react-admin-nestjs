import { Form, Row, Col, Checkbox, Button, Upload, Typography, Input, Select } from 'antd';
import { useGetOne } from 'react-admin';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { IPermission } from '../../interfaces/permission';
import { IGroups } from '../../interfaces/groups';
import { groupsApi } from '../../services/groups';
import { permissionApi } from '../../services/permission';
import { data, IData, IPermissions } from '../../../data';

const { Dragger } = Upload;
const { Title, Paragraph, Text } = Typography;

export const GroupDetail = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);
	const [permission, setPermission] = useState<IPermission[]>([]);
	const [permissionIds, setPermissionIds] = useState<IPermission[]>([]);
	const [unPermissionIds, setUnPermissionIds] = useState<IPermission[]>([]);
	const { data: groups, isSuccess } = useGetOne<IGroups>('groups', { id: id });

	const handleAddPermission = async () => {
		console.log(permissionIds)
		// try {
		// 	const response = await groupsApi.addPermissionToGroup(id, permissionIds);
		// 	setOpen(false);
		// 	window.location.reload();
		// } catch (error) {
		// 	console.log('error');
		// }
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
	const [fileList, setFileList] = useState([]);
	const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

	return (
		<div className='wrapper__group'>
			<div className="box-info">
				<div className='header-title'>
					<h4>Thông tin nhóm</h4>
				</div>
				<div className='form-groups'>
					<Row gutter={40}>
						<Col xl={10}>
							<div className='upload-avatar'>
								<Upload
									action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
									listType="picture-card"
									fileList={fileList}
									// onPreview={handlePreview}
									onChange={handleChange}
								>
									Upload
								</Upload>
								{/* <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
									<img
										alt="example"
										style={{
											width: '100%',
										}}
										src={previewImage}
									/>
								</Modal> */}
							</div>
							<div className='description'>
								<h6>Mô tả</h6>
								<Text>Oke hello</Text>
							</div>
						</Col>
						<Col xl={14}>
							<Form onFinish={handleAddPermission}>
								<div className='group-name'>
									<p>Tên nhóm</p>
									<Input defaultValue="admin" />
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
									{data.map((item: any, index) => (
										<Checkbox.Group
											style={{ width: '100%' }}
											onChange={(value: any) => setPermissionIds(value)}
											key={index}
										>
											<div className='list-permission'>
												<p>{item.group_name}</p>
												<Row gutter={[50, 5]}>
													{item.permission.map((value: any) => (
														<Col xl={12} key={value.id}>
															<Checkbox
																disabled={value.id !== 4 ? false : true}
																className={value.id !== 4 ? 'active' : ''}
																value={value.id}>{value.name}
															</Checkbox>
														</Col>
													))}
												</Row>
											</div>
										</Checkbox.Group>
									))}
								</div>
							</Form>
						</Col>
					</Row>
				</div>
			</div>
		</div>
	)
}