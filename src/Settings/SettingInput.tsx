import React from "react";
import Slider from "../components/Slider";
import Toggle from "../components/Toggle";

type InputProps = {
  fieldName: string;
  startValue: string | number | boolean;
  handleChange: (e: string | number | boolean) => void;
};

const SettingInput = ({ fieldName, startValue, handleChange }: InputProps) => {
  // TODO: Add all options for possible input types, possibly with switch case
  // and output accordingly.
  const handleChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e.target.value);
  };

  let inputComponent;
  if (typeof startValue === "number") {
    // value is numeric, can safely render a slider along with the input
    const minVal = 0;
    const maxVal = 100;
    const stepSize = 1;
    inputComponent = (
      <div className="w-72">
        <Slider
          fieldName={fieldName}
          minVal={minVal}
          maxVal={maxVal}
          startVal={startValue}
          stepSize={stepSize}
          handleChange={handleChange}
        />
      </div>
    );
  } else if (typeof startValue === "string") {
    // value is a string, probably as part of a dropdown
    if (fieldName === "color") {
      inputComponent = (
        <div className="flex flex-row gap-1">
          <span>Overlay Color: </span>
          <input
            type="color"
            defaultValue={startValue}
            onChange={handleChangeEvent}
            className={"w-6 h-6 bg-gray-200 rounded-md appearance-none cursor-pointer dark:bg-gray-700"}
          /> {startValue}
        </div>
      );
    }
  } else if (fieldName == "inverse") {
    inputComponent = (
      <div className="flex flex-col items-start">
        <span>Invert Overlay</span>
        <Toggle checked={startValue} handleChange={handleChange} />
      </div>
    );
  }
  return inputComponent;
};

export default SettingInput;
