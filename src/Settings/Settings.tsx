import React, { useContext, useState } from 'react';
import { PrimaryButton, RoundButton } from '../components/Buttons';
import { useNavigate } from 'react-router-dom';
import { PreferenceContext } from '../util/PreferenceContext';
import HotkeyInput from '../Overlay/HotkeyInput';
import Alert from '../components/Alert';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { ShapeFields } from '../../shared/types';
import CircleSettings from './CircleSettings';
import RectangleSettings from './RectangleSettings';
import ShapeDropdown from '../components/ShapeDropdown';

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

let renderCount = 0;
const Settings = () => {
  //get the current profile from the preferences
  renderCount++;
  const nav = useNavigate();
  const { preferences, updatePreferences, saveToDisk } = useContext(PreferenceContext);
  const [successfulSave, setSuccessfulSave] = useState(0); //state for displaying successful save alert
  const [submitting, setSubmitting] = useState(false);
  const profiles = preferences.profiles;
  const currentProfile = profiles[preferences.activeProfile];
  const inputFields = currentProfile.shapes[currentProfile.currentShape];

  const methods = useForm<Partial<FormSettingInputs>>({
    defaultValues: {
      shape: preferences.profiles[preferences.activeProfile].currentShape,
      shapeInputs: { ...preferences.profiles[preferences.activeProfile].shapes[preferences.profiles[preferences.activeProfile].currentShape] },
      toggleOverlay: preferences.shortcuts.toggleOverlay,
      openMenu: preferences.shortcuts.openMenu
    }
  });

  const shape = methods.watch('shape');

  const onSubmit: SubmitHandler<typeof inputFields> = async (data) => {
    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 500)); //delay to show that the save is happening

    window.Main.PrintInBackend(`submission data is: ${JSON.stringify(data)}`);
    //validate fields here.
    //if valid, update preferences and save to disk
    const newPreferences = { ...preferences };
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
      settingComponent = <CircleSettings fields={inputFields} preferences={preferences} />;
      break;
    case 'rectangle':
      settingComponent = <RectangleSettings fields={inputFields} preferences={preferences} />;
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
      <p>{renderCount}</p>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="flex h-screen w-full flex-col gap-12 p-2 justify-center pb-20">
            <div className="border-b-2 border-gray-300 flex flex-row justify-between align-middle items-end pb-1">
              <ShapeDropdown />
              <p className="text-gray-500 text-sm self-end">Overlay shape selection</p>
            </div>
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
