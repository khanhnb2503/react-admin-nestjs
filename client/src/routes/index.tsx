import UserIcon from "@mui/icons-material/Group";
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import Diversity3Icon from '@mui/icons-material/Diversity3';

export const ListRouter = [
  {
    id: 1,
    path: '/users',
    text: 'Tài khoản',
    icon: <UserIcon />
  },
  {
    id: 2,
    path: '/products',
    text: 'Sản phẩm',
    icon: <ProductionQuantityLimitsIcon />
  },
  {
    id: 3,
    path: '/groups',
    text: 'Quyền hạn',
    icon: <Diversity3Icon />
  }
]