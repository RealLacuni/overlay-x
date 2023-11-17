import React from 'react';
import Slider from '../components/Slider';
import Toggle from '../components/Toggle';

type InputProps = {
  fieldName: string;
  startValue: string | number | boolean;
};

const SettingInput = ({ fieldName, startValue }: InputProps) => {
  let inputComponent;
  if (typeof startValue === 'number') {
    // value is numeric, can safely render a slider along with the input
    const minVal = 0;
    const maxVal = 100;
    const stepSize = 1;
    inputComponent = (
      <div className="w-72">
        <Slider fieldName={fieldName} minVal={minVal} maxVal={maxVal} startVal={startValue} stepSize={stepSize} />
      </div>
    );
  } else if (typeof startValue === 'string') {
    // value is a string, probably as part of a dropdown
    if (fieldName === 'color') {
      inputComponent = (
        <div className="flex flex-row gap-1">
          <span>Overlay Color: </span>
          <input
            type="color"
            defaultValue={startValue}
            className={'w-6 h-6 bg-gray-200 rounded-md appearance-none cursor-pointer dark:bg-gray-700'}
          />{' '}
          {startValue}
        </div>
      );
    }
  } else if (fieldName == 'inverse') {
    inputComponent = (
      <div className="flex flex-col items-start">
        <span>Invert Overlay</span>
        <Toggle checked={startValue} name="invert" />
      </div>
    );
  }
  return inputComponent;
};

export default SettingInput;
