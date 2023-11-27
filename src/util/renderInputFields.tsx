import React from "react";
import { Preferences, ShapeFields } from "../../shared/types";
import SettingInput from "../Settings/SettingInput";

const useRenderInputFields = (inputFields : Partial<ShapeFields>, preferences:Preferences) => { // can safely use partial as we're not directly accessing any fields, but iterating over all existing keys
  return React.useMemo(() => {
    if (!inputFields) {
      window.Main.PrintInBackend(`inputFields is undefined, pref is ${preferences}`);
      return <p>Something went wrong! Try to restart the app.</p>;
    }
    return Object.keys(inputFields).map((fieldName, index) => (
      <SettingInput key={index} fieldName={fieldName} />
    ));
  }, [inputFields, preferences]);
};

export default useRenderInputFields;