import React, { useContext } from 'react';
import { SecondaryButton } from './components/Buttons';
import { useNavigate } from 'react-router-dom';
import { PreferenceContext } from './util/PreferenceContext';

const sendLoadOverlay = (useDev = false) => {
  window.Main.LoadOverlay(useDev);
};

const Home = () => {
  const {preferences} = useContext(PreferenceContext);
  
  //open dev tools
  window.Main.OpenDevTools();
  const nav = useNavigate();
  const isDev : boolean = window.Main.IsDevMode();

  const redirectToSettings = () => {
    nav('/settings');
  };

  return (
    <>
      <div className={'flex flex-col h-screen justify-center bg-slate-50 items-center gap-12 text-blue-900'}>
        <SecondaryButton className={' hover:text-black'} onClick={() => sendLoadOverlay(false)}>
          Launch Overlay
        </SecondaryButton>
        {
          isDev && (
            <SecondaryButton className={' hover:text-black'} onClick={() => sendLoadOverlay(true)}>
              Launch Overlay (Dev)
            </SecondaryButton>
          )
        }
        <SecondaryButton className={' hover:text-black'} onClick={redirectToSettings}>
          Settings
        </SecondaryButton>

        <p>
          Press <span className={'text-black'}>{preferences.shortcuts.toggleOverlay}</span> at any time to toggle the overlay.
        </p>
      </div>
    </>
  );
};

export default Home;
