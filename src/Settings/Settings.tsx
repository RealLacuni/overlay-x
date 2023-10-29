import React, { useContext, useState } from 'react';
import SettingInput from './SettingInput';
import { PrimaryButton } from '../components/Buttons';
import { useNavigate } from 'react-router-dom';
import { PreferenceContext } from '../util/PreferenceContext';
import { Preferences, Profile, ShapeFields } from '../../shared/types';

const Settings = () =>  {
  const {preferences, updatePreferences} = useContext(PreferenceContext);
  const nav = useNavigate();
  const profiles = preferences.profiles;
  const [currentProfile, setCurrentProfile] = useState({...profiles[preferences.activeProfile]});
  const inputFields = currentProfile.shapeInputs;

  const saveSettings = (newSettings: Preferences) => {
    updatePreferences(newSettings);
  }
  
  const handleFieldChange = (fieldName: string, value: any) => {
    setCurrentProfile((prevProfile : Profile) => ({
      ...prevProfile,
      shapeInputs: {
        ...prevProfile.shapeInputs,
        [fieldName]: value,
      },
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
      <div className="bg-slate-300 bg-opacity-80 h-48 w-36">
        <h1 className={'text-center text-4xl'}>Settings</h1>
        {renderInputFields()}
          <PrimaryButton
            onClick={() => {
              const newProfiles = profiles;
              newProfiles[preferences.activeProfile] = currentProfile;
              saveSettings({
                ...preferences,
                profiles: newProfiles
              });
            }}
          >
            Save
          </PrimaryButton>
        <PrimaryButton onClick={() => {nav('/');}}>
          Back to Main Menu
        </PrimaryButton>
      </div>
    </>
  );
};

export default Settings;
