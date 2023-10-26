import React from 'react';
import { SecondaryButton } from './components/Buttons';
import { useNavigate } from 'react-router-dom';

const sendLoadOverlay = (useDev = false) => {
  console.log('sending load overlay');
  window.Main.LoadOverlay(useDev);
};

const checkDevMode = () => {
  console.log('checking dev mode');

  const devMode = window.Main.IsDevMode();

  console.log(devMode);
  return devMode;
}

const Home = () => {
  //open dev tools
  window.Main.OpenDevTools();
  const nav = useNavigate();
  const isDev = checkDevMode();
  const redirectToSettings = () => {
    console.log('redirecting to settings');
    nav('/settings');
  };

  return (
    <>
      <div className={'flex flex-col bg-blue-300 pt-10 items-center gap-24'}>
        <SecondaryButton className={' hover:text-black'} onClick={sendLoadOverlay}>
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
        {/* <button
          onClick={async () => {
            console.log(await getDevMode());
          }}
        >
          dev mode check
        </button> */}
        <p>
          press <span className={'text-blue-900'}>*key here*</span> at any time to toggle the overlay.
        </p>
      </div>
    </>
  );
};

export default Home;
