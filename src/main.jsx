import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './router/index.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Router>
            <Routes>
                {publicRoutes.map(({ path, component }) => (
                    <Route key={path} path={path} element={component} />
                ))}
            </Routes>
        </Router>
    </StrictMode>,
);
