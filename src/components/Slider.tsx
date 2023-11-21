import React from 'react';
import { useFormContext } from 'react-hook-form';

type SliderProps = {
  minVal: number;
  maxVal: number;
  stepSize: number;
  fieldName: string;
};

const Slider = (props: SliderProps) => {
  const {watch, register} = useFormContext();
  const value = watch(props.fieldName);
  return (
    <div className={'flex flex-col items-start justify-start gap-1'}>
      <input
      {...register(props.fieldName)}
        id="default-range"
        type="range"
        value={value}
        min={props.minVal}
        max={props.maxVal}
        step={props.stepSize}
        className={'w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700'}
      />
      <label htmlFor="default-range" className="block text-sm font-medium text-gray-900">
        {props.fieldName}: {value == props.maxVal && props.fieldName == 'thickness' ? 'Fullscreen' : value}
        {props.fieldName == 'opacity' ? '%' : ''}
      </label>
    </div>
  );
};

export default Slider;
