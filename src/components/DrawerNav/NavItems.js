import DashboardOutlined from '@mui/icons-material/DashboardOutlined'
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined'
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined'

export const NavItems = [
  {
    title: 'Dashboard',
    icon: <DashboardOutlined style={{ color: 'white' }} />,
    link: '/',
  },
  {
    title: 'Products',
    icon: <Inventory2OutlinedIcon style={{ color: 'white' }} />,
    link: '/products',
  },
  {
    title: 'Clients',
    icon: <PeopleOutlinedIcon style={{ color: 'white' }} />,
    link: '/clients',
  },
]
