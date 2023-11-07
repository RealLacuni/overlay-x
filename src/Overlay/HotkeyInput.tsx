import { useEffect, useState } from 'react';
import { PrimaryButton } from '../components/Buttons';
import React from 'react';

type HotkeyInputProps = {
  hotkeyApiFunction: (hotkey: string) => boolean;
  className?: string | null;
  feature_name: string;
};

const HotkeyInput = ({ hotkeyApiFunction, className, feature_name }: HotkeyInputProps) => {
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      if (isListening) {
        const { key, ctrlKey, metaKey, shiftKey, altKey } = e;

        const newHotkey = `${ctrlKey ? 'Control+' : ''}${metaKey ? 'Command+' : ''}${
          shiftKey ? 'Shift+' : ''
        }${altKey? 'Alt+' : ''}${key.toUpperCase()}`;

        // Send the new hotkey to the main process
        window.Main.PrintInBackend(`would set ${newHotkey}`);
        // const updated = hotkeyApiFunction(newHotkey);
        // if (!updated) {
        //   //TODO: trigger an error popup
        //   alert('Hotkey already in use, please choose another one.');
        // }
        setIsListening(false); // Stop capturing keys after setting the new hotkey
      }
    };

    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [hotkeyApiFunction, isListening]);

  const handleCaptureKeys = () => {
    setIsListening(true); // Start capturing keys after the button click
  };

  return (
    <PrimaryButton className={className} onClick={handleCaptureKeys}>
        {
        isListening ? `Listening for key press...` : `Set new hotkey for ${feature_name}`
        }

    </PrimaryButton>
  );
};

export default HotkeyInput;
