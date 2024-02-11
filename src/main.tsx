import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './Home';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import Overlay from './Overlay/Overlay';
import Settings from './Settings/Settings';
import { PreferenceProvider } from './util/PreferenceContext';


const router = createHashRouter([
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
    }
  ]);

const settingsCB = () => {
  //navigate to /settings page
  router.navigate('/settings');
};

window.Main.OpenSettings(settingsCB);

ReactDOM.render(
  <div className="flex flex-col h-screen font-sans">
    <React.StrictMode>
      <RouterProvider router={router}/>
    </React.StrictMode>
  </div>,
  document.getElementById('root')
);
