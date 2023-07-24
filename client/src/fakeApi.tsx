import {fetchUtils} from 'react-admin';
import queryString from 'query-string';

const apiUrl = 'http://localhost:4000';
const httpClient = fetchUtils.fetchJson;

export default {
	getList: (resource: string, params: any) => {
		const {page, perPage} = params.pagination;
		const {field, order} = params.sort;
		const query = {
			sort: JSON.stringify([field, order]),
			range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
			filter: JSON.stringify(params.filter),
		};
		const url = `${apiUrl}/${resource}?${queryString.stringify(query)}`;
		return httpClient(url).then(({headers, json}) => ({
			data: json,
			total: 20,
		}));
	},
}