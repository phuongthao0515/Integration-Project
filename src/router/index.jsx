import TakeNote from '../pages/TakeNote/TakeNote';
import SignUp from '../pages/SingUp/SingUp';
import TodayPage from '../pages/TodayPage/TodayPage';
import UpcomingDayPage from '../pages/UpcomingPage/UpcomingDayPage';
import UpcomingMonthPage from '../pages/UpcomingPage/UpcomingMonthPage';
import Login from '../pages/Login/Login';
import HomePage from '../pages/HomePage/HomePage';

export const publicRoutes = [
    { path: '/', component: <TakeNote /> },
    { path: '/signup', component: <SignUp /> },
    { path: '/today', component: <TodayPage /> },
    { path: '/upcoming-day', component: <UpcomingDayPage /> },
    { path: '/upcoming', component: <UpcomingMonthPage /> },
    { path: '/login', component: <Login/>},
    { path: '/home', component: <HomePage/>}
];
