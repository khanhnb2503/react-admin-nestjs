
import {Admin, Resource} from 'react-admin';
import UserIcon from "@mui/icons-material/Group";
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import 'bootstrap/dist/css/bootstrap.css';

import {authProvider} from './authProvider';
import {dataProvider} from './data/dataProvider';
import {MyLayout} from './components/MyComponents';

import {UserList} from './resources/users/UserList';
import {UserDetail} from './resources/users/UserDetail';
import {UserCreate} from './resources/users/UserCreate';
import {EditUser} from './resources/users/UserEdit';

import { GroupList } from './resources/groups/GroupList';
import { GroupDetail } from './resources/groups/GroupDetail';
import { GroupCreate } from './resources/groups/GroupCreate';
import { GroupEdit } from './resources/groups/GroupEdit';
import Login from './page/auth/Login';
import DashBoard from './components/Dashboard';

export const App = () => (
	<div className='App'>
		<Admin
			dataProvider={dataProvider}
			authProvider={authProvider}
			loginPage={Login}
			dashboard={DashBoard}
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
				name="groups"
				list={GroupList}
				create={GroupCreate}
				show={GroupDetail}
				edit={GroupEdit}
				icon={Diversity3Icon}
			/>
		</Admin>
	</div>
);

