import React, { useContext, useState } from 'react';
import SettingInput from './SettingInput';
import { PrimaryButton } from '../components/Buttons';
import { useNavigate } from 'react-router-dom';
import { PreferenceContext } from '../util/PreferenceContext';
import { Preferences, Profile } from '../../shared/types';

const Settings = () =>  {
  const {preferences, updatePreferences} = useContext(PreferenceContext);
  const nav = useNavigate();
  const profiles = preferences.profiles;
  const [currentProfile, setCurrentProfile] = useState({...profiles[preferences.activeProfile]});
  const inputFields = currentProfile.shapeInputs;

  const saveSettings = (newSettings: Preferences) => {
    updatePreferences({...newSettings});
  }
  
  const handleFieldChange = (fieldName: string, value: string | number | boolean) => {
    console.log("in handle change for ", fieldName, " with value ", value);
  
    setCurrentProfile((prevProfile : Profile) => ({
      ...prevProfile,
      shapeInputs: {
        ...prevProfile.shapeInputs,
        [fieldName]: value,
      },
    }));
  };

  const renderInputFields = () => {
    console.log(Object.keys(inputFields)[0]);
    
    return Object.keys(inputFields).map((fieldName, index) => (
      <SettingInput
        key = {index}
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
        {renderInputFields()}
          <PrimaryButton className = {"h-16 w-24"}
            onClick={() => {
              const newProfiles = [...profiles]; // Create a new copy of the profiles array
              newProfiles[preferences.activeProfile] = { ...currentProfile }; // Assign a copy of the current profile
              saveSettings({
                ...preferences,
                profiles: newProfiles,
              });
            }}
          >
            Save
          </PrimaryButton>
        <PrimaryButton className = {"h-16 w-24"} onClick={() => {nav('/');}}>
          Back to Main Menu
        </PrimaryButton >
      </div>
    </>
  );
};

export default Settings;
