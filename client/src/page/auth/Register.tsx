import {Button, Form, Input, Typography, notification } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { baseUrl } from '../../constants/baseurl';
import { IUserRegister } from '../../interfaces/user.register';
const { Title, Text } = Typography;

const Register = () => {
	const placement = 'topRight';
	const navigate = useNavigate();
	const [api, contextHolder] = notification.useNotification();

	const handleRegister = async (users: IUserRegister) => {
		const { status, data } = await axios.post(`${baseUrl}/users`, users);
		if(status !== 201 ) {
			api.info({
				message: `Notification`,
				description: <h5>Lỗi khi tạo tài khoản!</h5>,
				placement
			});
		};

		api.info({
			message: `Notification`,
			description: <h5>Tạo tài khoản thành công</h5>,
			placement
		});
		const {accessToken, refreshToken} = data;
		localStorage.setItem('accessToken', JSON.stringify(accessToken));
		localStorage.setItem('refreshToken', JSON.stringify(refreshToken));
		setTimeout((() => { navigate('/') }), 3000);
	};

	return (
		<>
			{contextHolder}
			<div className='d-flex justify-content-center align-items-center min-vh-100'>
				<div className='w-25 p-5 bg-light rounded-1 bg-primary-subtle text-dark'>
					<div>
						<Form name="login-form" layout='vertical' onFinish={handleRegister}>
							<Form.Item name="username" className='mb-3' rules={[{
									required: true,
									message: 'Username không được để trống!',
								}]}
							>
								<Input
									size='large'
									className='text-secondary border border-primary'
									placeholder='Nhập username...'
								/>
							</Form.Item>
							<Form.Item name="email" className='mb-3' rules={[{
									required: true,
									message: 'Email không được để trống!',
								}]}
							>
								<Input
									size='large'
									className='text-secondary border border-primary'
									placeholder='Nhập email...'
								/>
							</Form.Item>
							<Form.Item name="password" rules={[{
									required: true,
									message: 'Password không được để trống!',
								}]}>
								<Input.Password
									size='large'
									className='text-secondary border border-primary'
									placeholder='Nhập mật khẩu...'
								/>
							</Form.Item>
							<Form.Item name="address" rules={[{
									required: true,
									message: 'Address không được để trống!',
								}]}>
								<Input
									size='large'
									className='text-secondary border border-primary'
									placeholder='Nhập địa chỉ...'
								/>
							</Form.Item>
							<Form.Item className='text-center'>
								<Button type="primary" shape='round' size='large' htmlType="submit">
									Đăng kí
								</Button>
							</Form.Item>
						</Form>
					</div>
					<div>
						<div className='text-center mt-3'>
							<Text type="secondary">
								Bạn đã có tài khoản?
								<Text className='text-primary ms-1'>
									<Link to='/login'>Đăng nhập</Link>
								</Text>
							</Text>
						</div>
					</div>
				</div>
			</div>
		</>
	)
};

export default Register;