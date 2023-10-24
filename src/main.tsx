import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './Home';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Display from './Display/Display';
import AppBar from './AppBar';

const router = createBrowserRouter([

  {
    path: '/',
    element: <Home />,
  },
    {
      path: '/display',
      element: <Display />,
  }
]);

ReactDOM.render(
  <>
  <AppBar />
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode></>,
  document.getElementById('root')
);
