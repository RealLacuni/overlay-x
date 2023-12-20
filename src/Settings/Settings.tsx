import React, { useContext, useState, useEffect } from 'react';
import { PrimaryButton, RoundButton } from '../components/Buttons';
import { useNavigate } from 'react-router-dom';
import { PreferenceContext } from '../util/PreferenceContext';
import HotkeyInput from '../Overlay/HotkeyInput';
import Alert from '../components/Alert';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { Profile, ShapeFields } from '../../shared/types';
import CircleSettings from './CircleSettings';
import RectangleSettings from './RectangleSettings';
import ShapeDropdown from '../components/ShapeDropdown';
import SettingDescription from '../components/SettingDescription';
import ShapePreview from '../components/ShapePreview';

type FormSettingInputs = {
  toggleOverlay: string;
  openMenu: string;
  shape: string;
  shapeInputs: ShapeFields;
};

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

  const profiles = preferences.profiles as Profile[];
  const currentProfile = profiles[preferences.activeProfile];

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

  let settingComponent;
  switch (shape) {
    case 'circle':
      settingComponent = <CircleSettings />;
      break;
    case 'rectangle':
      settingComponent = <RectangleSettings />;
      break;
    default:
      settingComponent = <div>error</div>;
  }
  return (
    <div className="flex flex-col h-screen overflow-auto pb-10 bg-slate-50">
      <h1 className={'text-center text-4xl pb-10'}>Settings</h1>
      {/* TODO:
        shape selection and display current profile using dropdown menu, 
         */}
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="flex w-full flex-col gap-16 p-12 justify-center pb-20">
            <SettingDescription description="Overlay shape selection" className="gap-2">
              <ShapeDropdown />
            </SettingDescription>
            {settingComponent}
            <div className="flex flex-row justify-start gap-2">
              <HotkeyInput fieldName={'toggleOverlay'} startVal={preferences.shortcuts.toggleOverlay} />
              <HotkeyInput fieldName={'openMenu'} startVal={preferences.shortcuts.openMenu} />
            </div>
            <div className="flex flex-row gap-4 self-end justify-between">
              {submitting && (
                <div
                  className="self-start inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status"
                >
                  <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                    Loading...
                  </span>
                </div>
              )}
              {successfulSave == -1 && <Alert type="error" message="Error saving new settings." />}
              {successfulSave > 0 && <Alert type="success" message="Saved" />}
              <PrimaryButton
                className={`text-base p-4 justify-center rounded-small self-center`}
                disabled={submitting}
                submit={true}
              >
                Save
              </PrimaryButton>
            </div>
          </div>
        </form>
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
