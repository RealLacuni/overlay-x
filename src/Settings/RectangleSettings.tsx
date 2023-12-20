import { useWatch } from 'react-hook-form';
import React from 'react';
import SettingInput from './SettingInput';

const RectangleSettings = () => {
  const isInverted = useWatch({
    name: `shapeInputs.inverse`
  });
  const sliders = ['width', 'height', 'opacity'];

  if (isInverted) {
    //filter out the offset field from fields
    // sliders.findIndex((field, index) => {
    //   if (field == 'width') {
    //     sliders.splice(index, 1);
    //   }
    // });
    sliders.push('offset');
  }

  return (
    <>
      <SettingInput fieldName="color" inputType="color" />
      <SettingInput fieldName={sliders} inputType="slider" />
      <SettingInput fieldName="inverse" inputType="toggle" />
    </>
  );
};

export default RectangleSettings;
