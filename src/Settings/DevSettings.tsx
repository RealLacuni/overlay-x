import React, { useState } from 'react';
import SettingInput from './SettingInput';

const Settings = () => {
  const [testVal, setTestVal] = useState(50);

  console.log(testVal);

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
