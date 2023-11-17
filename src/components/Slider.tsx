import React from 'react';

type SliderProps = {
  minVal: number;
  maxVal: number;
  startVal: number;
  stepSize: number;
  fieldName: string;
};

const Slider = (props: SliderProps) => {
  const [sliderValue, setSliderValue] = React.useState(props.startVal);

  return (
    <div className={'flex flex-col items-start justify-start gap-1'}>
      <input
        id="default-range"
        type="range"
        value={sliderValue}
        min={props.minVal}
        max={props.maxVal}
        step={props.stepSize}
        onChange={(e) => setSliderValue(parseInt(e.target.value))}
        className={'w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700'}
      />
      <label htmlFor="default-range" className="block text-sm font-medium text-gray-900">
        {props.fieldName}: {sliderValue == props.maxVal && props.fieldName == 'thickness' ? 'Fullscreen' : sliderValue}
        {props.fieldName == 'opacity' ? '%' : ''}
      </label>
    </div>
  );
};

export default Slider;
