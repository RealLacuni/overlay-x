import React from 'react';
import Slider from '../components/Slider';

type InputProps = {
    label: string;
    type: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    minVal: number;
    maxVal: number;
    stepSize: number;
    startVal: number;
    }

const SettingInput = ( props: InputProps ) => {
  return (
    <div>
      <h1>Input</h1>
      <Slider minVal={props.minVal} maxVal={props.maxVal} startVal={props.startVal} stepSize={props.stepSize}
      handleChange = {props.handleChange} />
    </div>
  );
};

export default SettingInput;