import { Layout, Sidebar } from "react-admin";
import { MyMenu } from "./Menu";

function MyLayouts(props: any) {
  return (
    <Layout
      {...props}
      menu={MyMenu}
    />
  );
}

export default MyLayouts;