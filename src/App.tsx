import React from 'react';
import AppBar from './AppBar';
import { SecondaryButton } from './components/Buttons';
import { useNavigate } from 'react-router-dom';

const sendLoadOverlay = () => {
  window.Main.LoadOverlay();
};

const App = () => {
  const nav = useNavigate();

  const redirectToSettings = () => {
    console.log('redirecting to settings');
    nav('/settings');
  };
  //open dev tools
  window.Main.OpenDevTools();

  return (
    <>
      <AppBar />
      <div className={'flex flex-col bg-blue-300 pt-10 items-center gap-24'}>
        <SecondaryButton
          className={' hover:text-black'}
          onClick={sendLoadOverlay}
          text="Launch Overlay"
        ></SecondaryButton>
        <SecondaryButton className={' hover:text-black'} onClick={redirectToSettings} text="Settings"></SecondaryButton>
        <p>
          press <span className={'text-blue-900'}>*key here*</span> at any time to toggle the overlay.
        </p>
      </div>
    </>
  );
};

export default App;
