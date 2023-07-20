import { Button, Form, Input, Typography, notification, Col, Row } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { IUserLogin } from "../../interfaces/user.login";
import instance from '../../common/http-common';
const { Title, Text } = Typography;

const Login = () => {
	const placement = 'topRight';
	const navigate = useNavigate();
	const [api, contextHolder] = notification.useNotification();

	const handleLogin = async (users: IUserLogin) => {
		const { status, data } = await instance.post('/auth/login', users);
		if (status !== 201) {
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
		const { accessToken, refreshToken } = data;
		localStorage.setItem('accessToken', JSON.stringify(accessToken));
		localStorage.setItem('refreshToken', JSON.stringify(refreshToken));
		setTimeout((() => { 
			navigate('/')
			location.reload();
		}), 3000)
	};

	return (
		<div className='wrapper__login'>
			{contextHolder}
			<Row justify="center" align="middle" className='form-container'>
				<Col className='content-box'>
					<Form name="login-form" layout='vertical' onFinish={handleLogin}>
						<Form.Item name="username" rules={[{
							required: true,
							message: 'Username không được để trống!',
						}]}
						>
							<Input
								size='large'
								className='border-primary'
								placeholder='Nhập username...'
							/>
						</Form.Item>
						<Form.Item name="password" rules={[{
							required: true,
							message: 'Password không được để trống!',
						}]}>
							<Input
								size='large'
								className='border-primary'
								placeholder='Nhập mật khẩu...'
							/>
						</Form.Item>
						<Form.Item className='text-center'>
							<Button type="primary" shape='round' size='large' htmlType="submit">
								Đăng nhập
							</Button>
						</Form.Item>
					</Form>
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
				</Col>
			</Row>
		</div>
	)
};

export default Login;