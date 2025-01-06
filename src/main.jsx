import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './router/index.jsx';
import Notification from './Components/Notification.jsx';
import { ConvexProvider, ConvexReactClient } from 'convex/react';

import 'react-loading-skeleton/dist/skeleton.css';
import GlobalState from './context/index.jsx';
const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL);


createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ConvexProvider client={convex}>
            <GlobalState>
                <Router>
                    <Routes>
                        {publicRoutes.map(({ path, component }) => (
                            <Route key={path} path={path} element={component} />
                        ))}
                    </Routes>
                </Router>
                <Notification />
            </GlobalState>
        </ConvexProvider>
    </StrictMode>,
);
