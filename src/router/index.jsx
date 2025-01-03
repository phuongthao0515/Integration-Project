import App from '../App';
import SignUp from '../pages/SingUp/SingUp';
import TodayPage from '../pages/TodayPage/TodayPage';
import UpcomingDayPage from '../pages/UpcomingPage/UpcomingDayPage';
import UpcomingMonthPage from '../pages/UpcomingPage/UpcomingMonthPage';

export const publicRoutes = [
    { path: '/', component: <App /> },
    { path: '/signup', component: <SignUp /> },
    { path: '/today', component: <TodayPage /> },
    { path: '/upcoming-day', component: <UpcomingDayPage /> },
    { path: '/upcoming-month', component: <UpcomingMonthPage /> },
];
