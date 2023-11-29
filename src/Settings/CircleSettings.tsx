import { useWatch } from 'react-hook-form';
import { CircleFields, Preferences, ShapeFields } from '../../shared/types';
import useRenderInputFields from '../util/renderInputFields';
import React from 'react';

type InputProps = {
  fields: ShapeFields;
  preferences: Preferences;
};

const CircleSettings = (props: InputProps) => {
  let fields = props.fields as Partial<CircleFields>;
  const isInverted = useWatch({
    name: `shapeInputs.inverse`
  });
  
  if (!isInverted) {
    //filter out the offset field from fields
    fields = { ...fields };
    delete fields.offset;
  }

  const inputFields = useRenderInputFields(fields, props.preferences);
  return <>{inputFields}</>;
};

export default CircleSettings;
