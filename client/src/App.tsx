
import { Admin, Resource } from 'react-admin';
import UserIcon from "@mui/icons-material/Group";
import Diversity3Icon from '@mui/icons-material/Diversity3';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import 'bootstrap/dist/css/bootstrap.css';

import { authProvider } from './authProvider';
import { dataProvider } from './data/dataProvider';

import { UserList } from './resources/users/UserList';
import { UserDetail } from './resources/users/UserDetail';
import { UserCreate } from './resources/users/UserCreate';
import { EditUser } from './resources/users/UserEdit';

import { GroupList } from './resources/groups/GroupList';
import { GroupDetail } from './resources/groups/GroupDetail';
import { GroupCreate } from './resources/groups/GroupCreate';
import { GroupEdit } from './resources/groups/GroupEdit';

import { ProductList } from './resources/products/ProductList';
import { ProductCreate } from './resources/products/ProductCreate';

import Login from './page/auth/Login';
import DashBoard from './components/Dashboard';
import MyLayouts from './components/Layouts';

export const App = () => (
	<div className='App'>
		<Admin
			dataProvider={dataProvider}
			authProvider={authProvider}
			loginPage={Login}
			// dashboard={DashBoard}
			layout={MyLayouts}
		>
			<Resource
				name="users"
				list={UserList}
				show={UserDetail}
				create={UserCreate}
				edit={EditUser}
			/>

			<Resource
				name="products"
				list={ProductList}
				create={ProductCreate}
			/>
			<Resource
				name="groups"
				list={GroupList}
				create={GroupCreate}
				show={GroupDetail}
				edit={GroupEdit}
			/>
		</Admin>
	</div>
);

