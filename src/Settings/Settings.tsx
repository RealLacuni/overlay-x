import React, { useContext, useState } from 'react';
import SettingInput from './SettingInput';
import { PrimaryButton } from '../components/Buttons';
import { useNavigate } from 'react-router-dom';
import { PreferenceContext } from '../util/PreferenceContext';
import { Preferences, Profile } from '../../shared/types';
import HotkeyInput from '../Overlay/HotkeyInput';

const Settings = () => {
  const { preferences, updatePreferences } = useContext(PreferenceContext);
  const nav = useNavigate();
  const profiles = preferences.profiles;
  const [currentProfile, setCurrentProfile] = useState({ ...profiles[preferences.activeProfile] });
  const inputFields = currentProfile.shapeInputs;

  const saveSettings = (newSettings: Preferences) => {
    updatePreferences({ ...newSettings });
  };

  const handleFieldChange = (fieldName: string, value: string | number | boolean) => {
    setCurrentProfile((prevProfile: Profile) => ({
      ...prevProfile,
      shapeInputs: {
        ...prevProfile.shapeInputs,
        [fieldName]: value
      }
    }));
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
        <HotkeyInput hotkeyApiFunction={window.Main.HotkeyChangeToggle} feature_name={'Toggle'} />
        <PrimaryButton
          className={'h-16 w-20 justify-center'}
          onClick={() => {
            const newProfiles = { ...profiles }; // Create a new copy of the profiles array
            newProfiles[preferences.activeProfile] = { ...currentProfile }; // Assign a copy of the current profile
            console.log('old profiles: ', profiles);

            console.log('new profiles: ', newProfiles);

            saveSettings({
              ...preferences,
              profiles: newProfiles
            });
          }}
        >
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
