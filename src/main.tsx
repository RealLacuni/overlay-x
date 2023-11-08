import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './Home';
import AppBar from './AppBar';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Overlay from './Overlay/Overlay';
import Settings from './Settings/Settings';
import { PreferenceProvider } from './util/PreferenceContext';

const router = createBrowserRouter([
  {
    path: '/',
    element:       <PreferenceProvider>
    <Home/>
  </PreferenceProvider>
  },
  {
    path: '/overlay',
    element: (
      <PreferenceProvider>
        <Overlay/>
      </PreferenceProvider>
    )
  },
  {
    path: '/settings',
    element: (
      <PreferenceProvider>
        <Settings />
      </PreferenceProvider>
    )
  }
]);

ReactDOM.render(
  <>
    {
      // if current route is not /overlay then load appBar
      window.location.pathname !== '/overlay' && <AppBar />
    }
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </>,
  document.getElementById('root')
);
