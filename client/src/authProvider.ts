import {AuthProvider, HttpError} from 'react-admin';
import axios from 'axios';

import {baseUrl} from './constants/baseurl';

export const authProvider: AuthProvider = {
	login: async ({username, password}) => {
		console.log(username, password);
		try {
			const {data, status} = await axios.post(
				`${baseUrl}/auth/login`,
				{username, password}
			);
			if (status === 201) {
				const {accessToken, refreshToken} = data;
				localStorage.setItem('accessToken', JSON.stringify(accessToken));
				localStorage.setItem('refreshToken', JSON.stringify(refreshToken));
			}
		} catch (error) {
			throw new Error('Tài khoản hoặc mật khẩu không hợp lệ')
		}
	},

	logout: () => {
		localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
		return Promise.resolve();
	},
	checkError: async (error) => {
		console.log(error);
	},

	checkAuth: () =>
		localStorage.getItem('accessToken')
			? Promise.resolve()
			: Promise.reject(),

	getPermissions: () => {
		return Promise.resolve(undefined);
	},

	getIdentity: () => {
		const persistedUser = localStorage.getItem('accessToken');
		const user = persistedUser ? JSON.parse(persistedUser) : null;
		return Promise.resolve(user);
	},
};

export default authProvider;
