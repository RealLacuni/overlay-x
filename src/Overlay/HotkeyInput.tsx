import { useEffect, useState } from 'react';
import React from 'react';
import Alert from '../components/Alert';
import { SecondaryButton } from '../components/Buttons';
import { useFormContext, useWatch } from 'react-hook-form';

type HotkeyInputProps = {
  // handleHotkeyUpdate: (identifier: string, hotkey: string) => void;
  className?: string | null;
  fieldName: string;
  startVal: string;
};

const HotkeyInput = ({ className, fieldName }: HotkeyInputProps) => {
  const {register, setValue} = useFormContext();
  const [isListening, setIsListening] = useState(false);
  const [incorrectHotkey, setIncorrectHotkey] = useState(false);
  const [displaySelection, setDisplaySelection] = useState(false);

  const toggleAlert = () => {
    setTimeout(() => {
      setIncorrectHotkey(true);
    }, 1000);
    setIncorrectHotkey(false);
  };
  const val = useWatch({
    name: fieldName,
  });

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

        setValue(fieldName, newHotkey);
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
  }, [isListening, fieldName, setValue]);

  const handleCaptureKeys = () => {
    setIsListening(true); // Start capturing keys after the button click
  };

  return (
    <>
      <SecondaryButton className={`h-16 w-40 justify-center ${className} `} onClick={handleCaptureKeys}>
        {isListening
          ? 'Listening for key press...'
          : `Update ${fieldName === 'toggleOverlay' ? 'overlay' : 'menu'} hotkey`}
      </SecondaryButton>
      {incorrectHotkey && <Alert type={'error'} message={'Invalid hotkey.'}></Alert>}
      {displaySelection && <p className="text-sm text-slate-800">Set new hotkey to <span className='text-sm text-slate-800 font-semibold'>{val}</span></p>}
      <input value={val} {...register(fieldName)} type="text" className="hidden"  />
    </>
  );
};

export default HotkeyInput;
