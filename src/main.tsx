import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './Home';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Overlay from './Overlay/Overlay';
import Settings from './Settings/Settings';
import { PreferenceProvider } from './util/PreferenceContext';
import AboutPage from './About/AboutPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <PreferenceProvider>
        <Home />
      </PreferenceProvider>
    )
  },
  {
    path: '/overlay',
    element: (
      <PreferenceProvider>
        <Overlay />
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
  },
  {
    path: '/about',
    element: (<AboutPage />
    )}
]);

const settingsCB = () => {
  //navigate to /settings page
  router.navigate('/settings');
}

window.Main.OpenSettings(settingsCB);

ReactDOM.render(
  <div className='flex flex-col h-screen'>
    {
      // if current route is not /overlay then load appBar
      // window.location.pathname !== '/overlay' && <AppBar />
    }
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </div>,
  document.getElementById('root')
);
