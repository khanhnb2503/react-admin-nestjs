import { Sidebar } from 'react-admin';

function MySidebar(props: any) {
  return (
    <Sidebar
      sx={{
        "& .RaSidebar-drawerPaper": {
          backgroundColor: "red",
        },
      }}
      {...props}
    />
  );
}

export default MySidebar;