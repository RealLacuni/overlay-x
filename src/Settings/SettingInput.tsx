import React from 'react';
import Slider from '../components/Slider';
import Toggle from '../components/Toggle';
import { useFormContext, useWatch } from 'react-hook-form';

type InputProps = {
  fieldName: string | string[];
  inputType?: string;
};

const SettingInput = ({ fieldName, inputType }: InputProps) => {
  const formMethods = useFormContext();
  const startValue = useWatch({
    name: `shapeInputs.${fieldName}`
  });
  let inputComponent;
  if (inputType == 'slider' && typeof fieldName != 'string') {
    // value is numeric, can safely render a slider along with the input
    const minVal = 0;
    const maxVal = 100;
    const stepSize = 1;
    const sliderComponents = fieldName.map((field: string) => (
      <div key={field} className="">
        <Slider fieldName={field} minVal={minVal} maxVal={maxVal} stepSize={stepSize} />
      </div>
    ));
    inputComponent = (
        <div className="grid grid-cols-3 w-full align-middle pb-2 gap-2 border-b-2">{sliderComponents}</div>
    );
  } else if (fieldName == 'inverse') {
    inputComponent = (
      <div className="flex flex-row justify-between w-full align-middle pb-1 border-b-2">
        <div className=" flex gap-1 justify-center align-middle">
          <span>Invert Overlay</span>
          <Toggle fieldName="inverse" />
        </div>
        <p className="text-gray-500 text-sm self-end">Toggle to control empty space around the cursor</p>
      </div>
    );
  } else {
    // value is a string, probably as part of a dropdown
    if (fieldName === 'color') {
      inputComponent = (
        <div className="flex flex-row gap-1 border-b-2 justify-between">
          <div>
            <input
              type="color"
              {...formMethods.register(`shapeInputs.${fieldName}`)}
              defaultValue={startValue}
              className={'w-12 h-4 bg-gray-200 rounded-md appearance-none cursor-pointer dark:bg-gray-700'}
            />{' '}
            {startValue}
          </div>
          <span className="text-gray-500 text-sm self-end select-none">Color of the overlay </span>
        </div>
      );
    }
  }
  return inputComponent;
};

export default SettingInput;
