import React from 'react';
import Slider from '../components/Slider';
import Toggle from '../components/Toggle';
import { useFormContext, useWatch } from 'react-hook-form';
import SettingDescription from '../components/SettingDescription';

type InputProps = {
  fieldName: string | string[];
  inputType?: string;
};

const SettingInput = ({ fieldName, inputType }: InputProps) => {
  const isString = typeof fieldName === typeof 'string';
  const formMethods = useFormContext();
  const startValue = useWatch({
    name: `shapeInputs.${fieldName}`
  });
  let inputComponent;
  if (inputType == 'slider' && typeof fieldName !== 'string') {
    // value is numeric, can safely render a slider along with the input
    const minVal = 0;
    const maxVal = 100;
    const stepSize = 1;
    const sliderComponents = fieldName.map((field: string) => (
      <div key={field} className="">
        <Slider fieldName={field} minVal={minVal} maxVal={maxVal} stepSize={stepSize} />
      </div>
    ));
    inputComponent = <div className="grid grid-cols-3 w-full align-middle pb-2 gap-2">{sliderComponents}</div>;
  } else if (fieldName == 'inverse') {
    inputComponent = (
      <SettingDescription description="Toggle to control empty space around the cursor">
        <div>
          <span>Invert Overlay</span>
          <Toggle fieldName="inverse" />
        </div>
      </SettingDescription>
    );
  } else {
    // value is a string, probably as part of a dropdown
    if (fieldName === 'color') {
      inputComponent = (
        <SettingDescription description="Color of the overlay" className="">
          <div className="flex flex-col items-center">
            <input
              type="color"
              {...formMethods.register(`shapeInputs.${fieldName}`)}
              defaultValue={startValue}
              className={'w-10 h-6 bg-transparent appearance-none cursor-pointer'}
            />
            <p className="text-sm">{startValue}</p>
          </div>
        </SettingDescription>
      );
    }
  }
  if (isString) return inputComponent;
  else
    return (
      <div className="flex flex-col items-center">
        {inputComponent}
        <p className="w-full border-b-2 text-end text-sm text-gray-500 select-none">Slider values</p>
      </div>
    );
};

export default SettingInput;
