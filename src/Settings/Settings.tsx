import React, { useContext, useState } from 'react';
import SettingInput from './SettingInput';
import { PrimaryButton } from '../components/Buttons';
import { useNavigate } from 'react-router-dom';
import { PreferenceContext } from '../util/PreferenceContext';
import HotkeyInput from '../Overlay/HotkeyInput';
import Alert from '../components/Alert';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { ShapeFields } from '../../shared/types';

type FormSettingInputs = {
  toggleOverlay: string,
  openMenu: string,
  inputFields: ShapeFields
}

const onSuccessfulSave = (fxn : React.Dispatch<React.SetStateAction<boolean>>) => {
  fxn(true);
  setTimeout(() => {
    fxn(false);
  }, 3000);
};

const Settings = () => {
  //get the current profile from the preferences
  const nav = useNavigate();
  const { preferences, updatePreferences, saveToDisk } = useContext(PreferenceContext);
  const profiles = preferences.profiles;
  const [successfulSave, setSuccessfulSave] = useState(false); //state for displaying successful save alert
  const currentProfile = profiles[preferences.activeProfile];
  const inputFields = currentProfile.shapeInputs;
  const methods = useForm<Partial<FormSettingInputs>>({
    defaultValues: {
      ...preferences.profiles[preferences.activeProfile].shapeInputs,
      toggleOverlay: preferences.shortcuts.toggleOverlay,
      openMenu: preferences.shortcuts.openMenu,
    }
  });
  window.Main.PrintInBackend(`current values of form: , ${JSON.stringify(methods.getValues())}`);

  const onSubmit: SubmitHandler<typeof inputFields> = (data) => {
    window.Main.PrintInBackend(data);
    //validate fields here.
    //if valid, update preferences and save to disk
    onSuccessfulSave(setSuccessfulSave);
  };

  const renderInputFields = React.useMemo(() => {
    return Object.keys(inputFields).map((fieldName, index) => (
      <SettingInput key={index} fieldName={fieldName} />
    ));
  }, [inputFields]);

  return (
    <div className='h-screen overflow-auto pb-20'>
      <h1 className={'text-center text-4xl'}>Settings</h1>
      {/* TODO:
        shape selection and display current profile using dropdown menu, 
         */}
      {/* form provider currently bugged, causes full rerenders on every input change per github issue */}
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="flex h-screen w-full flex-col gap-8 p-2 justify-start align pb-20">
            {renderInputFields}
            <HotkeyInput fieldName={'toggleOverlay'} startVal={preferences.shortcuts.toggleOverlay} />
            <HotkeyInput fieldName={'openMenu'} startVal={preferences.shortcuts.openMenu} />
            <div className="flex flex-row gap-4">
              <PrimaryButton className={'h-16 w-20 justify-center'} submit={true}>
                Save
              </PrimaryButton>
              {successfulSave && <Alert type="success" />}
            </div>
          </div>
        </form>
      </FormProvider>
      <PrimaryButton
        className={'h-16 w-36 justify-center self-center'}
        onClick={() => {
          nav('/');
        }}
      >
        Back to Main Menu
      </PrimaryButton>
    </div>
  );
};

export default Settings;
