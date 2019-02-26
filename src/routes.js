// @material-ui/icons
import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonIcon from '@material-ui/icons/Person';
import NotificationsIcon from '@material-ui/icons/Notifications';


// Components
import DashboardView from './components/dashboard/Main';
import Profile from './components/dashboard/Profile';
import Notifications from './components/dashboard/Notifications';

const dashboardRoutes = [
    {
        dir: "/dashboard",
        path: "/main",
        name: "Dashboard",
        icon: DashboardIcon,
        component: DashboardView
    },
    {
        dir: "/dashboard",
        path: "/profile",
        name: "Edit Profile",
        icon: PersonIcon,
        component: Profile
    },
    {
        dir: "/dashboard",
        path: "/notifications",
        name: "Notifications",
        icon: NotificationsIcon,
        component: Notifications
    }
];

export default dashboardRoutes;
