import React, { useState } from 'react';

type SliderProps = {
  minVal: number;
  maxVal: number;
  startVal: number;
  stepSize: number;
  fieldName: string;
  handleChange: (val: number) => void;
};

const Slider = (props: SliderProps) => {
  const [sliderValue, setSliderValue] = useState(props.startVal);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setSliderValue(newValue);
    props.handleChange(newValue); // Call handleChange with the updated value directly here
  };
  
  return (
    <div className={'flex flex-col items-start justify-start gap-1'}>
      <input
        id="default-range"
        type="range"
        value={sliderValue}
        onChange={handleSliderChange}
        min={props.minVal}
        max={props.maxVal}
        step={props.stepSize}
        className={'w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700'}
      />      <label htmlFor="default-range" className="block text-sm font-medium text-gray-900">
      {props.fieldName}: {sliderValue}
      </label>
    </div>
  );
};

export default Slider;
