import { Menu } from 'react-admin';
import { useState, useEffect } from 'react';
import { usersApi } from '../../services/users';
import { IUserResponse } from '../../interfaces/users';
import { ListRouter } from '../../routes';

export const MyMenu = (props: any) => {
  const [users, setUsers] = useState<IUserResponse>();
  const [active, setActive] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await usersApi.profile();
        setUsers(data);
        setLoading(true);
      } catch (error) {
        console.log('error');
      }
    })()
  }, []);

  return (
    <div className='wrapper__menu--list'>
      {loading && (
        <Menu {...props}>
          <Menu.DashboardItem />
          {ListRouter.map((item) => (
            <div key={item.id}>
              {users?.roles.includes(item.text) && (
                <Menu.Item
                  to={item.path}
                  primaryText={item.text}
                  leftIcon={item.icon}
                  className={item.id === active ? 'active-menu' : ''}
                  onClick={() => setActive(item.id)}
                />
              )}
            </div>
          ))}
        </Menu>
      )}
    </div>
  )
} 