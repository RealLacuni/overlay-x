import React, { useContext } from 'react';
import { SecondaryButton } from './components/Buttons';
import { useNavigate } from 'react-router-dom';
import { PreferenceContext } from './util/PreferenceContext';

const sendLoadOverlay = (useDev = false) => {
  window.Main.LoadOverlay(useDev);
};

const checkDevMode = () => {
  const devMode = window.Main.IsDevMode();
  return devMode;
}

const Home = () => {
  const {preferences} = useContext(PreferenceContext);
  //open dev tools
  window.Main.OpenDevTools();
  const nav = useNavigate();
  const isDev : boolean = checkDevMode();

  const redirectToSettings = () => {
    console.log('redirecting to settings');
    nav('/settings');
  };

  return (
    <>
      <div className={'flex flex-col bg-blue-300 pt-10 items-center gap-24'}>
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
        {/* <button
          onClick={async () => {
            console.log(await getDevMode());
          }}
        >
          dev mode check
        </button> */}
        <p>
          press <span className={'text-blue-900'}>{preferences.shortcuts.toggleOverlay}</span> at any time to toggle the overlay.
        </p>
      </div>
    </>
  );
};

export default Home;
