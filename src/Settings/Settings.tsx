import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PreferenceContext } from '../util/PreferenceContext';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import ShapePreview from '../components/ShapePreview';
import { FormSettingInputs } from '../types';
import SettingsForm from './SettingsForm';
import { RoundButton } from '../components/Buttons';

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

  const methods = useForm<Partial<FormSettingInputs>>({
    defaultValues: {
      shape: preferences.profiles[preferences.activeProfile].currentShape,
      shapeInputs: {
        ...preferences.profiles[preferences.activeProfile].shapes[
          preferences.profiles[preferences.activeProfile].currentShape
        ]
      },
      toggleOverlay: preferences.shortcuts.toggleOverlay,
      openMenu: preferences.shortcuts.openMenu
    }
  });
  const shape = methods.watch('shape');
  useEffect(() => {
    // Reset the form when the 'shape' field changes
    if (shape) {
      methods.reset({
        shape,
        shapeInputs: {
          ...preferences.profiles[preferences.activeProfile].shapes[shape]
        }
      });
    }
  }, [shape, preferences.profiles, preferences.activeProfile, methods]);

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
    newPreferences.profiles[preferences.activeProfile].currentShape = data.shape;
    newPreferences.profiles[preferences.activeProfile].shapes[data.shape] = data.shapeInputs;
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
    <div className="flex flex-col h-screen overflow-auto pb-10 bg-slate-50">
      <h1 className={'text-center text-4xl pb-10'}>Settings</h1>
      {/* TODO:
        shape selection and display current profile using dropdown menu, 
         */}
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
      <RoundButton
        className={'h-16 w-44 justify-center self-center'}
        onClick={() => {
          nav('/');
        }}
      >
        {'\u2190 Back to main menu'}
      </RoundButton>
    </div>
  );
};

export default Settings;
