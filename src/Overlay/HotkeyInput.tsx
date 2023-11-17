import { useEffect, useState } from "react";
import React from "react";
import Alert from "../components/Alert";
import { SecondaryButton } from "../components/Buttons";

type HotkeyInputProps = {
  handleHotkeyUpdate: (identifier: string, hotkey: string) => void;
  className?: string | null;
  featureName: string;
  startVal: string;
};

const HotkeyInput = ({ handleHotkeyUpdate, className, featureName, startVal }: HotkeyInputProps) => {
  const [isListening, setIsListening] = useState(false);
  const [incorrectHotkey, setIncorrectHotkey] = useState(false);
  const [newHotkey, setNewHotkey] = useState(startVal);

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
        if (key === "Control" || key === "Meta" || key === "Shift" || key === "Alt") {
          // valid hotkey should have a key to press, can't be just modifiers
          toggleAlert();
          setIsListening(false);
          return;
        }
        const newHotkey = `${ctrlKey ? "Control+" : ""}${metaKey ? "Command+" : ""}${shiftKey ? "Shift+" : ""}${
          altKey ? "Alt+" : ""
        }${key.toUpperCase()}`;

        // save new hot key to preferences
        handleHotkeyUpdate(featureName, newHotkey);
        setNewHotkey(newHotkey);
        setIsListening(false); // Stop capturing keys after setting the new hotkey
      }
    };

    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [isListening, handleHotkeyUpdate, featureName]);

  const handleCaptureKeys = () => {
    setIsListening(true); // Start capturing keys after the button click
  };

  return (
    <>
      <SecondaryButton className={`h-16 w-48 justify-center ${className} `} onClick={handleCaptureKeys}>
        {isListening
          ? "Listening for key press..."
          : `Set new hotkey for ${featureName === "toggleOverlay" ? "overlay" : "menu"}`}
      </SecondaryButton>
      {
        incorrectHotkey &&
        <Alert type={"error"} message={"Invalid hotkey."}></Alert>
      }
      <input type="text" name={featureName} className="hidden" value={newHotkey}/>
    </>
  );
};

export default HotkeyInput;
