import React from 'react';
import Slider from '../components/Slider';
import Toggle from '../components/Toggle';

type InputProps = {
  fieldName: string;
  startValue: string | number;
  handleChange: (e: string | number | boolean) => void;
};

const SettingInput = ({ fieldName, startValue, handleChange }: InputProps) => {
  // TODO: Add all options for possible input types, possibly with switch case
  // and output accordingly.
  const handleChangeEvent = (e : React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e.target.value);
  }

  let inputComponent;
  if (typeof startValue === 'number') {
    // value is numeric, can safely render a slider along with the input
    let minVal; let maxVal; let stepSize;
    if (fieldName === 'opacity') {
      minVal = 0.0;
      maxVal = 1.0;
      stepSize = 0.01;
    } else {
      minVal = 0;
      maxVal = 100;
      stepSize = 1;
    }
    inputComponent = (
      <div className="w-48">
        <Slider
          fieldName={fieldName}
          minVal={minVal}
          maxVal={maxVal}
          startVal={startValue}
          stepSize={stepSize}
          handleChange={handleChange}
        />
              </div>
    );
  }
  else if (typeof startValue === 'string') {
    // value is a string, probably as part of a dropdown
    if (fieldName === 'color') {
      inputComponent = (
        <div className="flex flex-row items-start justify-center">
          <span>Overlay Color</span>
          <input
            type="color"
            defaultValue={startValue}
            onChange={handleChangeEvent}
            className={' bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700'}
          />
          <p>{startValue}</p>
        </div>
      );
    }
  }
  else if (fieldName == "inverse") {
    // TODO: Add a checkbox for inverse
    inputComponent = (
      <div className="flex flex-col items-start">
        <span>Invert Overlay</span>
        <Toggle checked = {startValue} handleChange={handleChange}/>
      </div>
    );
  }
  return inputComponent;
};

export default SettingInput;
