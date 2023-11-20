import { useEffect, useState } from 'react';
import React from 'react';
import Alert from '../components/Alert';
import { SecondaryButton } from '../components/Buttons';
import { useFormContext } from 'react-hook-form';

type HotkeyInputProps = {
  // handleHotkeyUpdate: (identifier: string, hotkey: string) => void;
  className?: string | null;
  featureName: string;
  startVal: string;
};

const HotkeyInput = ({ className, featureName, startVal }: HotkeyInputProps) => {
  const {register} = useFormContext();
  const [isListening, setIsListening] = useState(false);
  const [incorrectHotkey, setIncorrectHotkey] = useState(false);
  const [newHotkey, setNewHotkey] = useState(startVal);
  const [displaySelection, setDisplaySelection] = useState(false);

  const toggleAlert = () => {
    setTimeout(() => {
      setIncorrectHotkey(true);
    }, 1000);
    setIncorrectHotkey(false);
  };

  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      if (isListening) {
        const { key, ctrlKey, metaKey, shiftKey, altKey } = e;
        if (key === 'Control' || key === 'Meta' || key === 'Shift' || key === 'Alt') {
          // valid hotkey should have a key to press, can't be just modifiers
          toggleAlert();
          setIsListening(false);
          return;
        }
        const newHotkey = `${ctrlKey ? 'Control+' : ''}${metaKey ? 'Command+' : ''}${shiftKey ? 'Shift+' : ''}${
          altKey ? 'Alt+' : ''
        }${key.toUpperCase()}`;

        // maybe validate hotkey here
        setNewHotkey(newHotkey);
        setDisplaySelection(true);
        setTimeout(() => {
          setDisplaySelection(false);
        }, 1000);

        setIsListening(false); // Stop capturing keys after setting the new hotkey
      }
    };

    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isListening, featureName]);

  const handleCaptureKeys = () => {
    setIsListening(true); // Start capturing keys after the button click
  };

  return (
    <div className="flex flex-row gap-2 items-center">
      <SecondaryButton className={`h-16 w-48 justify-center ${className} `} onClick={handleCaptureKeys}>
        {isListening
          ? 'Listening for key press...'
          : `Set new hotkey for ${featureName === 'toggleOverlay' ? 'overlay' : 'menu'}`}
      </SecondaryButton>
      {incorrectHotkey && <Alert type={'error'} message={'Invalid hotkey.'}></Alert>}
      {displaySelection && <p className="text-sm text-slate-800">Set new hotkey to <span className='text-sm text-slate-800 font-semibold'>{newHotkey}</span></p>}
      <input {...register(featureName)} type="text" name={featureName} className="hidden" value={newHotkey} />
    </div>
  );
};

export default HotkeyInput;
