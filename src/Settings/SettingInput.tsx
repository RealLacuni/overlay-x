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
  const shape = useWatch({
    name: 'shape'
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
        <div className="relative flex flex-col items-center align-middle pr-2 pb-5">
          <Toggle fieldName="inverse" />
          <p className="whitespace-nowrap">Invert Overlay</p>
          {startValue && shape == 'circle' && (
            <p className="absolute w-96 left-0 top-12 text-xs text-gray-500">
              Use the offset field to control the thickness of the overlay, and size to control the empty space.
            </p>
          )}
        </div>
      </SettingDescription>
    );
  } else if (fieldName === 'color') {
    inputComponent = (
      <SettingDescription description="Color of the overlay" className="">
        <div className="flex flex-col items-center select-all">
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
