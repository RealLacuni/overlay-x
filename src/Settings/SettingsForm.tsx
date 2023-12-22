import React from 'react';
import { PrimaryButton,  } from '../components/Buttons';
import HotkeyInput from '../Overlay/HotkeyInput';
import Alert from '../components/Alert';
import { SubmitHandler, UseFormReturn, useWatch } from 'react-hook-form';
import CircleSettings from './CircleSettings';
import RectangleSettings from './RectangleSettings';
import ShapeDropdown from '../components/ShapeDropdown';
import SettingDescription from '../components/SettingDescription';
import { FormSettingInputs } from '../types';
import { Preferences } from '../../shared/types';

interface SettingsFormProps {
  onSubmit: SubmitHandler<Partial<FormSettingInputs>>;
  methods: UseFormReturn<Partial<FormSettingInputs>>; // Replace 'any' with proper type
  preferences: Preferences;
  submitting: boolean;
  successfulSave: number;
}

const SettingsForm = ({ onSubmit, methods, preferences, submitting, successfulSave } : SettingsFormProps) => {
  const shape = useWatch({ name: 'shape', control: methods.control });
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
  );
};

export default SettingsForm;
