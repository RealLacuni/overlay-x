import React from 'react';
import Slider from '../components/Slider';
import Toggle from '../components/Toggle';
import {useFormContext } from 'react-hook-form';

type InputProps = {
  fieldName: string;
};

enum SliderFields {
  opacity = 'opacity',
  thickness = 'thickness',
  offset = 'offset'
}

const SettingInput = ({ fieldName}: InputProps) => {
  const formMethods = useFormContext();
  const startValue = formMethods.watch(fieldName);

  let inputComponent;
  if (Object.values(SliderFields).includes(fieldName as SliderFields) ) {
    // value is numeric, can safely render a slider along with the input
    const minVal = 0;
    const maxVal = 100;
    const stepSize = 1;
    inputComponent = (
      <div className="w-72">
        <Slider fieldName={fieldName} minVal={minVal} maxVal={maxVal} stepSize={stepSize} />
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
            {...formMethods.register}
            defaultValue={startValue}
            className={'w-6 h-6 bg-gray-200 rounded-md appearance-none cursor-pointer dark:bg-gray-700'} {...formMethods.register}
          />{' '}
          {startValue}
        </div>
      );
    }
  } else if (fieldName == 'inverse') {
    inputComponent = (
      <div className="flex flex-col items-start">
        <span>Invert Overlay</span>
        <Toggle name="inverse" />
      </div>
    );
  }
  return inputComponent;
};

export default SettingInput;
