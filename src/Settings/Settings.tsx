import React, { useContext, useState } from 'react';
import SettingInput from './SettingInput';
import { PrimaryButton, RoundButton } from '../components/Buttons';
import { useNavigate } from 'react-router-dom';
import { PreferenceContext } from '../util/PreferenceContext';
import HotkeyInput from '../Overlay/HotkeyInput';
import Alert from '../components/Alert';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { ShapeFields } from '../../shared/types';

type FormSettingInputs = {
  toggleOverlay: string;
  openMenu: string;
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
  const profiles = preferences.profiles;
  const currentProfile = profiles[preferences.activeProfile];
  const inputFields = currentProfile.shapeInputs;
  const methods = useForm<Partial<FormSettingInputs>>({
    defaultValues: {
      shapeInputs: { ...preferences.profiles[preferences.activeProfile].shapeInputs },
      toggleOverlay: preferences.shortcuts.toggleOverlay,
      openMenu: preferences.shortcuts.openMenu
    }
  });

  const onSubmit: SubmitHandler<typeof inputFields> = async (data) => {
    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 500)); //delay to show that the save is happening

    window.Main.PrintInBackend(`submission data is: ${JSON.stringify(data)}`);
    //validate fields here.
    //if valid, update preferences and save to disk

    const newPreferences = { ...preferences };
    newPreferences.profiles[preferences.activeProfile].shapeInputs = data.shapeInputs;
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

  const renderInputFields = React.useMemo(() => {
    if (!inputFields) {
      window.Main.PrintInBackend(`inputFields is undefined, pref is  ${preferences}`);
      return <p>Something went wrong! Try to restart the app.</p>;
    }
    return Object.keys(inputFields).map((fieldName, index) => <SettingInput key={index} fieldName={fieldName} />);
  }, [inputFields, preferences]);

  return (
    <div className="flex flex-col h-screen overflow-auto pb-20">
      <h1 className={'text-center text-4xl'}>Settings</h1>
      {/* TODO:
        shape selection and display current profile using dropdown menu, 
         */}
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="flex h-screen w-full flex-col gap-8 p-2 justify-center pb-20">
            {renderInputFields}
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
              <PrimaryButton className={`h-16 w-20 justify-center rounded-small self-center`} disabled={submitting} submit={true}>
                Save
              </PrimaryButton>
            </div>
          </div>
        </form>
      </FormProvider>
      <RoundButton
        className={'h-16 w-40 justify-center self-center'}
        onClick={() => {
          nav('/');
        }}
      >
        Back to Main Menu
      </RoundButton>
    </div>
  );
};

export default Settings;
