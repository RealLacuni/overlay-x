import React from 'react';
import AppBar from './AppBar';

const App = () => {
  const sendLoadDisplay = () => {
    window.Main.LoadDisplay();
    }
  return (
    <>
      <AppBar />
      <button className={"bg-slate-400 hover:bg-slate-300 hover:text-black"} onClick={sendLoadDisplay}>Launch Overlay</button>
    </>
  );
}

export default App;
