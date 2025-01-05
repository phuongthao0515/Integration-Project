import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './router/index.jsx';
import Notification from './Components/Notification.jsx';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Router>
            <Routes>
                {publicRoutes.map(({ path, component }) => (
                    <Route key={path} path={path} element={component} />
                ))}
            </Routes>
        </Router>
        <Notification/>
    </StrictMode>,
);
