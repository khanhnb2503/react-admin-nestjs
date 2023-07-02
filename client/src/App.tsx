
import {Admin, Resource} from 'react-admin';
import UserIcon from "@mui/icons-material/Group";
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import {Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';

import {authProvider} from './authProvider';
import {dataProvider} from './data/dataProvider';
import {MyLayout} from './components/MyComponents';
import users from './users';

import {UserList} from './users/UserList';
import {UserDetail} from './users/UserDetail';
import {UserCreate} from './users/UserCreate';
import {EditUser} from './users/UserEdit';

import {PermissionList} from './permissions/PermissionList';
import {PermissionEdit} from './permissions/PermissionEdit';
import Login from './page/auth/Login';

export const App = () => (
	<>
		<Admin
			dataProvider={dataProvider}
			authProvider={authProvider}
			layout={MyLayout}
			loginPage={Login}
		>
			<Resource
				name="users"
				list={UserList}
				show={UserDetail}
				create={UserCreate}
				edit={EditUser}
				icon={UserIcon}
			/>

			<Resource
				name="permissions"
				list={PermissionList}
				edit={PermissionEdit}
				icon={VerifiedUserIcon}
			/>
		</Admin>
	</>
);

