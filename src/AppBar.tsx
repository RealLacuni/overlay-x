import React, { useState } from 'react';

const AppBar = () => {
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
    <div className="sticky top-0 w-full draggable select-none flex justify-end border-b bg-gray-100 border-b-slate-300">
      <div className="inline-flex mb-0.5">
        <button onClick={window.Main.Minimize} className="undraggable px-6 md:px-4 lg:px-3 pt-1 hover:bg-gray-300">
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
};

export default AppBar;
