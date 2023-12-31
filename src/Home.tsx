import React, { useContext } from 'react';
import { SecondaryButton } from './components/Buttons';
import { useNavigate } from 'react-router-dom';
import { PreferenceContext } from './util/PreferenceContext';

const sendLoadOverlay = (useDev = false) => {
  window.Main.LoadOverlay(useDev);
};

const Home = () => {
  const { preferences } = useContext(PreferenceContext);
  const nav = useNavigate();


  return (
    <>
      <div className={'flex flex-col h-screen justify-start pt-20 bg-slate-50 items-center gap-12 text-blue-900'}>
        <SecondaryButton className={' hover:text-black'} onClick={() => sendLoadOverlay(false)}>
          Launch Overlay
        </SecondaryButton>
        <SecondaryButton className={' hover:text-black'} onClick={() => {nav('/settings')}}>
          Settings
        </SecondaryButton>
        <SecondaryButton
          className={' hover:text-black'}
          onClick={() => {
            nav('/about');
          }}
        >
          About
        </SecondaryButton>
        <SecondaryButton className={' hover:text-black bg-indigo-600 text-indigo-50 mt-10'} onClick={window.Main.Close}>
          Close
        </SecondaryButton>

        <p>
          Press <span className={'text-black'}>{preferences.shortcuts.toggleOverlay}</span> at any time to toggle the
          overlay.
        </p>
      </div>
    </>
  );
};

export default Home;
