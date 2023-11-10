import React, { useContext, useState } from 'react';
import SettingInput from './SettingInput';
import { PrimaryButton } from '../components/Buttons';
import { useNavigate } from 'react-router-dom';
import { PreferenceContext } from '../util/PreferenceContext';
import { Profile } from '../../shared/types';
import HotkeyInput from '../Overlay/HotkeyInput';

const Settings = () => {
  const { preferences, updatePreferences, saveToDisk } = useContext(PreferenceContext);
  const nav = useNavigate();
  const profiles = preferences.profiles;
  const [currentProfile, setCurrentProfile] = useState({ ...profiles[preferences.activeProfile] });
  const inputFields = currentProfile.shapeInputs;

  console.log('current pref: ', preferences);
  
  const handleFieldChange = (fieldName: string, value: string | number | boolean) => {
    /* handler function for when a field is changed,
     *  updates the current profile with the new value and sets the current profile to the new profile
     */
    setCurrentProfile((prevProfile: Profile) => ({
      ...prevProfile,
      shapeInputs: {
        ...prevProfile.shapeInputs,
        [fieldName]: value
      }
    }));
  };

  const handleHotkeyUpdate = (identifier: string, hotkey: string) => {
    const newPref = { ...preferences, shortcuts: { ...preferences.shortcuts, [identifier]: hotkey } };
    window.Main.PrintInBackend(`\new hotkey pref: ${JSON.stringify(newPref)}\n`);
    updatePreferences(newPref);
  };

  const savePreferences = () => {

    const newProfiles = { ...profiles }; // Create a new copy of the profiles array
    newProfiles[preferences.activeProfile] = { ...currentProfile }; // Overwrite current profile with the new current profile
    const newPref = {
      ...preferences,
      profiles: newProfiles
    }
    window.Main.PrintInBackend(
      `\nsaving preferences ... ${JSON.stringify(newPref)}\n`
    );
    updatePreferences(newPref);
    const didSave = saveToDisk();
    if (didSave) {
      window.Main.PrintInBackend('saved preferences to disk');
    } else {
      // scrap changes
      updatePreferences(preferences);
      window.Main.PrintInBackend('failed to save preferences to disk');
    }
  };

  const renderInputFields = () => {
    return Object.keys(inputFields).map((fieldName, index) => (
      <SettingInput
        key={index}
        fieldName={fieldName}
        startValue={currentProfile.shapeInputs[fieldName]}
        handleChange={(value) => handleFieldChange(fieldName, value)}
      />
    ));
  };

  return (
    <>
      <div className="flex flex-col gap-8 p-2 justify-start align">
        <h1 className={'text-center text-4xl'}>Settings</h1>
        {/* TODO:
        shape selection and display current using dropdown menu */}
        {renderInputFields()}
        <HotkeyInput handleHotkeyUpdate={handleHotkeyUpdate} featureName={'toggleOverlay'} />
        <HotkeyInput handleHotkeyUpdate={handleHotkeyUpdate} featureName={'openMenu'} />
        <PrimaryButton className={'h-16 w-20 justify-center'} onClick={savePreferences}>
          Save
        </PrimaryButton>
        <PrimaryButton
          className={'h-16 w-36 justify-center self-center'}
          onClick={() => {
            nav('/');
          }}
        >
          Back to Main Menu
        </PrimaryButton>
      </div>
    </>
  );
};

export default Settings;
