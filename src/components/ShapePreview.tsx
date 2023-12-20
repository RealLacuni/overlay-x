import React from 'react'
import { useFormContext } from 'react-hook-form';

 const ShapePreview = () => {
    const { watch } = useFormContext();
    const fields = watch("shapeInputs");
    console.log("ShapePreview.tsx: formState", fields);
  return (
    <div>ShapePreview</div>
  )
}

export default ShapePreview;