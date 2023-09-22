import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Display from './Display/Display';

const router = createBrowserRouter([

  {
    path: '/',
    element: <App />,
  },
    {
      path: '/display',
      element: <Display />,
  }
]);

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById('root')
);
