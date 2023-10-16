import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Overlay from './Overlay/Overlay';
import Settings from './Settings/Settings';

const router = createBrowserRouter([

  {
    path: '/',
    element: <App />,
  },
    {
      path: '/overlay',
      element: <Overlay radius = {100} opacity={0.6} width={200} color={'black'}/>, //eventually pass in props using user settings, stored in a properties file maybe?
  },
  {
    path: '/settings',
    element: <Settings />,
  }
]);

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById('root')
);
