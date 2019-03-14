// @material-ui/icons
import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonIcon from '@material-ui/icons/Person';
import NotificationsIcon from '@material-ui/icons/Notifications';


// Components
import Main from './components/dashboard/Main';
import Profile from './components/dashboard/Profile';
import Notifications from './components/dashboard/Notifications';

const dashboardRoutes = [
    {
        path: "/main",
        name: "Dashboard",
        icon: DashboardIcon,
        component: Main
    },
    {
        path: "/profile",
        name: "Edit Profile",
        icon: PersonIcon,
        component: Profile
    },
    {
        path: "/notifications",
        name: "Notifications",
        icon: NotificationsIcon,
        component: Notifications
    }
];

export default dashboardRoutes;
