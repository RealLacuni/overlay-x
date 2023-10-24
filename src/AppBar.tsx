import React, { useState } from 'react';


function AppBar() {
  const [isMaximize, setMaximize] = useState(false);

  const handleToggle = () => {
    if (isMaximize) {
      setMaximize(false);
    } else {
      setMaximize(true);
    }
    window.Main.Maximize();
  };

  return (
    <div className=" flex justify-between draggable border-b bg-gray-100 border-black">
      <div className="inline-flex">
        <img className="h-6 lg:-ml-2"  alt="Icon of Electron" src='/assets/icons/Icon-Electron.png'/>
        <p className="text-xs md:pt-1 md:-ml-1 lg:-ml-2">Overlay X</p>
      </div>
      <div className="inline-flex -mt-1">
        <button onClick={window.Main.Minimize} className="undraggable md:px-4 lg:px-3 pt-1 hover:bg-gray-300">
          &#8211;
        </button>
        <button onClick={handleToggle} className="undraggable px-6 lg:px-5 pt-1 hover:bg-gray-300">
          {isMaximize ? '\u2752' : '⃞'}
        </button>
        <button onClick={window.Main.Close} className="undraggable px-4 pt-1 hover:bg-red-500 hover:text-white">
          &#10005;
        </button>
      </div>
    </div>
  );
}

export default AppBar;
