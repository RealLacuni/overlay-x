import { useEffect, useState } from 'react';
import { PrimaryButton } from '../components/Buttons';
import React from 'react';

type HotkeyInputProps = {
  handleHotkeyUpdate: (identifier: string, hotkey: string) => void;
  className?: string | null;
  featureName: string;
};

const HotkeyInput = ({ handleHotkeyUpdate, className, featureName }: HotkeyInputProps) => {
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      if (isListening) {
        const { key, ctrlKey, metaKey, shiftKey, altKey } = e;
        if (!key) {
          // valid hotkey should have a key to press, can't be just modifiers
          // TODO: display error here if incorrect hotkey
          return;
        }
        const newHotkey = `${ctrlKey ? 'Control+' : ''}${metaKey ? 'Command+' : ''}${shiftKey ? 'Shift+' : ''}${
          altKey ? 'Alt+' : ''
        }${key.toUpperCase()}`;

        // save new hot key to preferences
        handleHotkeyUpdate(featureName, newHotkey);
        setIsListening(false); // Stop capturing keys after setting the new hotkey
      }
    };

    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isListening, handleHotkeyUpdate]);

  const handleCaptureKeys = () => {
    setIsListening(true); // Start capturing keys after the button click
  };

  return (
    <PrimaryButton className={className} onClick={handleCaptureKeys}>
      {isListening
        ? 'Listening for key press...'
        : `Set new hotkey for ${featureName === 'toggleOverlay' ? 'overlay' : 'menu'}`}
    </PrimaryButton>
  );
};

export default HotkeyInput;
