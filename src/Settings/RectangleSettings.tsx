import { useWatch } from 'react-hook-form';
import { RectangleFields, Preferences, ShapeFields } from '../../shared/types';
import useRenderInputFields from '../util/renderInputFields';
import React from 'react';

type InputProps = {
  fields: ShapeFields;
  preferences: Preferences;
};

const RectangleSettings = (props: InputProps) => {
  let fields = props.fields as Partial<RectangleFields>;
  const isInverted = useWatch({
    name: `shapeInputs.inverse`
  });
  if (!isInverted) {
    //filter out the offset field from fields
    fields = { ...fields };
    delete fields.width;
  }

  const inputFields = useRenderInputFields(fields, props.preferences);
  return <>{inputFields}</>;
};

export default RectangleSettings;
