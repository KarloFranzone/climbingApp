import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Root from './Routes/Root';
import Home from './Routes/Home';
import Boulders from './Routes/Boulders';
import MapPage from './Routes/Map';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            { index: true, element: <Home /> },
            { path: 'boulders', element: <Boulders /> },
            { path: 'map', element: <MapPage /> },
        ],
    },
]);

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
