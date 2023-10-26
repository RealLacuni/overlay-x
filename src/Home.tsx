import React from 'react';
import { SecondaryButton } from './components/Buttons';
// import AppBar from './AppBar';

const Home = () => {
  window.Main.OpenDevTools();

  const sendLoadOverlay = () => {
    window.Main.LoadOverlay();
    }

  return (
    <div className="flex flex-col h-screen gap-12 items-center bg-pink-200 justify-evenly">
      <SecondaryButton className={"bg-slate-400 w-36 h-18 text-lg hover:bg-slate-300"} onClick={sendLoadOverlay}>Launch Overlay</SecondaryButton>
      <SecondaryButton className={"bg-slate-400 w-36 hover:bg-slate-300"} onClick={() => {}}>Settings</SecondaryButton>

      <div>
        <p>To return to the main menu from the overlay, press the "Keybind" keyboard shortcut.</p>
      </div>
      <div>
        <p className={"text-center text-2xl"}>Overlay X</p>
        <p className={"text-center text-sm"}>Version 0.1.0</p>
      </div>
          </div>
  );
}

export default Home;
