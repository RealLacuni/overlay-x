import { useEffect, useState } from 'react';
import React from 'react';
import { SecondaryButton } from '../components/Buttons';
import { useFormContext, useWatch } from 'react-hook-form';

type HotkeyInputProps = {
  // handleHotkeyUpdate: (identifier: string, hotkey: string) => void;
  className?: string | null;
  fieldName: string;
  startVal: string;
};

const HotkeyInput = ({ className, fieldName }: HotkeyInputProps) => {
  const { register, setValue } = useFormContext();
  const [isListening, setIsListening] = useState(false);
  const [incorrectHotkey, setIncorrectHotkey] = useState(false);
  const [displaySelection, setDisplaySelection] = useState(false);

  const onAlert = (fxn: React.Dispatch<React.SetStateAction<boolean>>) => {
    fxn(true);
    setTimeout(() => {
      fxn(false);
    }, 3000);
  };
  const val = useWatch({
    name: fieldName
  });

  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      if (isListening) {
        const { key, ctrlKey, metaKey, shiftKey, altKey } = e;
        if (key === 'Escape' || key === 'Control' || key === 'Meta' || key === 'Shift' || key === 'Alt') {
          //Don't allow escape to be set, ensure a key is pressed
          // valid hotkey should have a key to press, can't be just modifiers
          onAlert(setIncorrectHotkey);
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
        }, 3000);

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
    <div className="relative">
      <SecondaryButton
        className={`h-16 w-40 justify-center ${className} ${
          isListening && 'bg-slate-300 hover:bg-slate-300 text-slate-100'
        }`}
        onClick={handleCaptureKeys}
        disabled={isListening}
      >
        {isListening
          ? 'Listening for key press...'
          : `Update ${fieldName === 'toggleOverlay' ? 'overlay' : 'menu'} hotkey`}
      </SecondaryButton>
      {incorrectHotkey && (
        <span className="text-sm text-black absolute top-8 left-2 border p-0.5 bg-red-100 border-red-400">
          Error saving hotkey. Try a different key.
        </span>
      )}
      {displaySelection && (
        <span className="text-sm text-slate-800 absolute top-8 left-2 border p-0.5 bg-green-50 border-green-200">
          Set new hotkey to <span className="text-sm text-slate-800 font-semibold">{val}</span>
        </span>
      )}

      <input value={val} {...register(fieldName)} type="text" className="hidden" />
    </div>
  );
};

export default HotkeyInput;
