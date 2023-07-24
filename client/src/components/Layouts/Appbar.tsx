import { MyMenu } from "./Menu";
// import { AppBar } from "react-admin";
import { AppBar, UserMenu } from 'react-admin';
import Avatar from '@mui/material/Avatar';

const MyCustomIcon = () => (
  <Avatar
    sx={{
      height: 30,
      width: 30,
    }}
    src="https://marmelab.com/images/avatars/adrien.jpg"
  />
);

const MyUserMenu = (props: any) => (
  <div>
    <UserMenu
      {...props}
      icon={<MyCustomIcon />}
    />
  </div>
);

function MyAppbar() {
  return (
    <AppBar userMenu={<MyUserMenu />} />
  );
}

export default MyAppbar;