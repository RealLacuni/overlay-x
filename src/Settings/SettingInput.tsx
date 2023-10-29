import React from 'react';
import Slider from '../components/Slider';
import { InputProps } from '../types';


const SettingInput = ( props: InputProps ) => {
  // TODO: Add all options for possible input types, possibly with switch case
  // and output accordingly.
  return (
    <div>
      <h1>Input</h1>
      <Slider minVal={props.minVal} maxVal={props.maxVal} startVal={props.startVal} stepSize={props.stepSize}
      handleChange = {props.handleChange} />
    </div>
  );
};

export default SettingInput;
