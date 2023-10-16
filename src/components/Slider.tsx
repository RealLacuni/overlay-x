import React from 'react';

type SliderProps = {
    minVal: number;
    maxVal: number;
    startVal: number;
    stepSize: number;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }

const Slider = (props : SliderProps) => {

  return (
    <div className={"flex flex-row "}>
      <label htmlFor="default-range" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Default range
      </label>
      <input
        id="default-range"
        type="range"
        defaultValue={props.startVal}
        onChange={props.handleChange}
        className={'w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700'}
      />
      <p>{props.startVal}</p>
    </div>
  );
};

export default Slider;
