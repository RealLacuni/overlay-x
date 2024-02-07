import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PreferenceContext } from '../util/PreferenceContext';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import ShapePreview from '../components/ShapePreview';
import { FormSettingInputs } from '../types';
import SettingsForm from './SettingsForm';
import Sidebar from '../components/Sidebar';
import ProfileSelection from './ProfileSelection';

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

  useEffect(() => {
    // Reset the form when the current profile, or shape of current profile changes

    methods.reset({
      shapeInputs: {
        ...preferences.profiles[currentProfile].shapes[preferences.profiles[currentProfile].currentShape]
      }
    });
  }, [preferences.profiles, currentProfile, methods]);


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
    <div className="flex flex-row">
      <Sidebar>
        <div className={'flex flex-col justify-between h-full items-center gap-4 py-4'}>
          <h1 className={'text-xl text-slate-200 pt-2 font-semibold'}>Overlay Settings</h1>
          <div className="flex flex-col gap-8">
            <ProfileSelection currentProfile={currentProfile} setCurrentProfile={setCurrentProfile} />
          </div>
          <div className="h-12 flex flex-col items-center justify-end text-white  cursor-pointer hover:text-indigo-400">
            <a
              className={'font-bold select-none'}
              onClick={() => {
                nav('/');
              }}
            >
              {'Back to main menu'}
            </a>
            <span className="h-4 w-4">{'\u2190'}</span>
          </div>
        </div>
      </Sidebar>
      <div className="flex flex-col w-full h-screen overflow-auto p-2 pb-80 bg-slate-50">
        <FormProvider {...methods}>
          <SettingsForm
            onSubmit={onSubmit}
            methods={methods}
            preferences={preferences}
            submitting={submitting}
            successfulSave={successfulSave}
          />
          <ShapePreview />
        </FormProvider>
      </div>
    </div>
  );
};

export default Settings;
