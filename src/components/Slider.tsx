import React from 'react';

type SliderProps = {
  minVal: number;
  maxVal: number;
  startVal: number;
  stepSize: number;
  fieldName: string;
  handleChange: (val: number) => void;
};

const Slider = (props: SliderProps) => {

  return (
    <div className={'flex flex-col items-start justify-start gap-1'}>
      <input
        id="default-range"
        type="range"
        value={props.startVal}
        onChange={(e) => {
          props.handleChange(Number(e.target.value))
        }
        }
        min={props.minVal}
        max={props.maxVal}
        step={props.stepSize}
        className={'w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700'}
      />{' '}
      <label htmlFor="default-range" className="block text-sm font-medium text-gray-900">
        {props.fieldName}: {props.startVal == props.maxVal && props.fieldName == 'thickness' ? 'Fullscreen' : props.startVal}
        {props.fieldName == 'opacity' ? '%' : ''}
      </label>
    </div>
  );
};

export default Slider;
