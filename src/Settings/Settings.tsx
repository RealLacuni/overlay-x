import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PreferenceContext } from '../util/PreferenceContext';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import ShapePreview from '../components/ShapePreview';
import { FormSettingInputs } from '../types';
import SettingsForm from './SettingsForm';
import { SecondaryButton } from '../components/Buttons';
import ProfileDropdown from '../components/ProfileDropdown';

const onSuccessfulSave = (fxn: React.Dispatch<React.SetStateAction<number>>) => {
  fxn(1);
  setTimeout(() => {
    fxn(0);
  }, 3000);
};
const onFailedSave = (fxn: React.Dispatch<React.SetStateAction<number>>) => {
  fxn(-1);
  setTimeout(() => {
    fxn(0);
  }, 3000);
};
const Settings = () => {
  //get the current profile from the preferences
  const nav = useNavigate();
  const { preferences, updatePreferences, saveToDisk } = useContext(PreferenceContext);
  const [successfulSave, setSuccessfulSave] = useState(0); //state for displaying successful save alert
  const [submitting, setSubmitting] = useState(false);
  const [currentProfile, setCurrentProfile] = useState(preferences.activeProfile);

  const methods = useForm<Partial<FormSettingInputs>>({
    defaultValues: {
      shape: preferences.profiles[currentProfile].currentShape,
      shapeInputs: {
        ...preferences.profiles[currentProfile].shapes[preferences.profiles[currentProfile].currentShape]
      },
      toggleOverlay: preferences.shortcuts.toggleOverlay,
      openMenu: preferences.shortcuts.openMenu
    }
  });
  const shape = methods.watch('shape');

  useEffect(() => {
    // Reset the form when the current profile, or shape of current profile changes
    if (!shape) return;

    window.Main.PrintInBackend(
      `shape is ${shape}, resetting form with inputs: ${JSON.stringify(
        preferences.profiles[currentProfile].shapes[shape]
      )}`
    );

    methods.reset({
      shape,
      shapeInputs: {
        ...preferences.profiles[currentProfile].shapes[shape]
      }
    });
  }, [shape, preferences.profiles, currentProfile, methods]);

  if (!shape) {
    window.Main.PrintInBackend(`shape is undefined, pref is ${preferences}`);
    return <p>Something went wrong! Try to restart the app.</p>;
  }

  const onSubmit: SubmitHandler<Partial<FormSettingInputs>> = async (data) => {
    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 500)); //delay to show that the save is happening

    window.Main.PrintInBackend(`submission data is: ${JSON.stringify(data)}`);
    //validate fields here.
    //if valid, update preferences and save to disk
    const newPreferences = { ...preferences };
    if (!data.shape) {
      window.Main.PrintInBackend('shape is undefined');
      return;
    }
    newPreferences.activeProfile = currentProfile;
    newPreferences.profiles[currentProfile].currentShape = data.shape;
    newPreferences.profiles[currentProfile].shapes[data.shape] = data.shapeInputs;
    newPreferences.shortcuts.toggleOverlay = data.toggleOverlay;
    newPreferences.shortcuts.openMenu = data.openMenu;

    if (!saveToDisk(newPreferences)) {
      window.Main.PrintInBackend('failed to save preferences to disk');
      onFailedSave(setSuccessfulSave);
    } else {
      onSuccessfulSave(setSuccessfulSave);
      window.Main.PrintInBackend('saveToDisk was successful');
      updatePreferences(newPreferences);
    }
    setSubmitting(false);
  };

  return (
    <div className="flex flex-col h-screen overflow-auto p-2 pb-80 bg-slate-50">
      <FormProvider {...methods}>
        <header className="relative flex flex-row justify-between gap-20">
          <h1 className={'text-center text-2xl pb-10'}>Overlay Settings</h1>
          <ProfileDropdown currentProfile={currentProfile} setCurrentProfile={setCurrentProfile} />
        </header>

        <SettingsForm
          onSubmit={onSubmit}
          methods={methods}
          preferences={preferences}
          submitting={submitting}
          successfulSave={successfulSave}
        />
        <ShapePreview shape={shape} fields={preferences.profiles[currentProfile].shapes[shape]} />
      </FormProvider>
      <SecondaryButton
        className={'h-16 w-80'}
        onClick={() => {
          nav('/');
        }}
      >
        {'\u2190 Back to main menu'}
      </SecondaryButton>
    </div>
  );
};

export default Settings;
