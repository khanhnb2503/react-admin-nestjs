import {Button, Form, Input, Typography, notification } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { baseUrl } from '../../constants/baseurl';
import axios from 'axios';

import {IUserLogin} from "../../interfaces/user.login";
const { Title, Text } = Typography;

const Login = () => {
	const placement = 'topRight';
	const navigate = useNavigate();
	const [api, contextHolder] = notification.useNotification();

	const handleLogin = async (users: IUserLogin) => {
		const { data, status } = await axios.post(`${baseUrl}/auth/login`, users);
		if(status !== 201 ) {
			api.info({
				message: `Notification`,
				description: <h5>Đăng nhập không thành công</h5>,
				placement
			});
			navigate('/login');
		};
		api.info({
			message: `Notification`,
			description: <h5>Đăng nhập thành công</h5>,
			placement
		});
		const {accessToken, refreshToken} = data;
		localStorage.setItem('accessToken', JSON.stringify(accessToken));
		localStorage.setItem('refreshToken', JSON.stringify(refreshToken));
		setTimeout((() => { navigate('/') }), 3000)
	};

	return (
		<>
			{contextHolder}
			<div className='d-flex justify-content-center align-items-center min-vh-100'>
				<div className='w-25 p-5 bg-light rounded-1 bg-primary-subtle'>
					<div>
						<Form name="login-form" layout='vertical' onFinish={handleLogin}>
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
							<Form.Item className='text-center'>
								<Button type="primary" shape='round' size='large' htmlType="submit">
									Đăng nhập
								</Button>
							</Form.Item>
						</Form>
					</div>
					<div>
						<div className='text-center mt-3'>
							<Text type="secondary">
								Bạn chưa có tài khoản?
								<Text className='text-primary ms-1'>
									<Link to='/register'>Đăng kí</Link>
								</Text>
							</Text>
						</div>
					</div>
				</div>
			</div>
		</>
	)
};

export default Login;