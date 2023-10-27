import React, { useState } from 'react';
import SettingInput from './SettingInput';
import { InputProps } from '../types';

type SettingProps = {
  //list of setting inputs to be created
  settingInputs: InputProps[];
}


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Settings = (props : SettingProps) => {
  const [testVal, setTestVal] = useState(50);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setTestVal(Number(e.target.value));
    };

    return (
      <>
        <div className="bg-slate-300 bg-opacity-80 h-48 w-36">
          <SettingInput
            label={'Input'}
            type={'number'}
            handleChange={handleChange}
            minVal={0}
            maxVal={100}
            stepSize={1}
            startVal={testVal}
          />
        </div>
      </>
    );
  };

  export default Settings;
