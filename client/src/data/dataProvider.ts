import {fetchUtils} from 'react-admin';

import simpleRestProvider from 'ra-data-simple-rest';

const httpClient = (url: string, options: fetchUtils.Options = {}) => {
	const token = JSON.parse(localStorage.getItem('accessToken') ?? '');
	const customHeaders = (options.headers ||
		new Headers({
			Accept: 'application/json',
		})) as Headers;
	customHeaders.set('X-Custom-Header', 'foobar');
	customHeaders.set('Authorization',`Bearer ${token}`)
	options.headers = customHeaders;
	return fetchUtils.fetchJson(url, options);
}

const dataProvider = simpleRestProvider(
	import.meta.env.VITE_SIMPLE_REST_URL, httpClient
);

export {dataProvider}
