import TakeNote from '../pages/TakeNote/TakeNote';
import SignUp from '../pages/SingUp/SingUp';
import TodayPage from '../pages/TodayPage/TodayPage';
import UpcomingDayPage from '../pages/UpcomingPage/UpcomingDayPage';
import UpcomingMonthPage from '../pages/UpcomingPage/UpcomingMonthPage';
import Login from '../pages/Login/Login';
import HomePage from '../pages/HomePage/HomePage';
import NotePage from '../pages/NotePage/NotePage';
import WelcomePage from '../pages/Welcome/Welcome';
import Header from '../pages/Welcome/header';

export const publicRoutes = [
    { path: '/header', component: <Header /> },
    { path: '/', component: <WelcomePage /> },
    { path: '/signup', component: <SignUp /> },
    { path: '/today', component: <TodayPage /> },
    { path: '/upcoming-day', component: <UpcomingDayPage /> },
    { path: '/upcoming', component: <UpcomingMonthPage /> },
    { path: '/login', component: <Login /> },
    { path: '/home', component: <HomePage /> },
    // { path: '/note', component: <TakeNote /> },
    // { path: '/note/:id', component: <TakeNote /> },
    { path: '/note', component: <NotePage /> },
    { path: '/note/:id', component: <NotePage /> },
];
