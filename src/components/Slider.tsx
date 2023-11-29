import React from 'react';
import { useFormContext, useWatch} from 'react-hook-form';

type SliderProps = {
  minVal: number;
  maxVal: number;
  stepSize: number;
  fieldName: string;
};

const Slider = (props: SliderProps) => {
  const {register} = useFormContext();
  const nestedInput = `shapeInputs.${props.fieldName}`
  const value = useWatch({
    name: nestedInput,
  });

  return (
    <div className={'flex flex-col items-start justify-start gap-1 border-2 px-1.5 pt-5 rounded-lg bg-gray-100'}>
      <input
        type="range"
        min={props.minVal}
        max={props.maxVal}
        step={props.stepSize}
        className={'w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700'}
        {...register(nestedInput, {valueAsNumber: true})}
      />
      <label htmlFor="default-range" className="self-end">
        {props.fieldName}: {value == props.maxVal && props.fieldName == 'thickness' ? 'Fullscreen' : value}
        {props.fieldName == 'opacity' ? '%' : ''}
      </label>
    </div>
  );
};

export default Slider;
