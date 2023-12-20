import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

type SliderProps = {
  minVal: number;
  maxVal: number;
  stepSize: number;
  fieldName: string;
};
const Slider = (props: SliderProps) => {
  const { register } = useFormContext();
  const nestedInput = `shapeInputs.${props.fieldName}`;
  const value = useWatch({
    name: nestedInput
  });
  const shape = useWatch({
    name: 'shape'
  });

  let displayedName;
  props.fieldName == 'offset' && shape == 'rectangle'
    ? (displayedName = `Thickness`)
    : (displayedName = props.fieldName.charAt(0).toUpperCase() + props.fieldName.slice(1))

  return (
    <div className={'flex flex-col items-start justify-start gap-1 border-2 px-1.5 pt-5 rounded-lg bg-gray-100'}>
      <input
        type="range"
        min={props.minVal}
        max={props.maxVal}
        step={props.stepSize}
        defaultValue={value}
        className={'w-full h-2 bg-gray-400 rounded-lg cursor-pointer accent-indigo-600'}
        {...register(nestedInput, { valueAsNumber: true })}
      />
      <label htmlFor="default-range" className="self-end">
        {displayedName}: { ("Thickness, Size".includes(displayedName) && value == 100) ? "Fullscreen": value}
        {props.fieldName == 'opacity' && '%'}
      </label>
    </div>
  );
};

export default Slider;
