import App from '../App';
import SingUp from '../pages/SingUp/SingUp';
import Login from '../pages/Login/Login';

export const publicRoutes = [
    { path: '/', component: <App /> },
    { path: '/signup', component: <SingUp /> },
    { path: '/login', component: <Login />},
];
