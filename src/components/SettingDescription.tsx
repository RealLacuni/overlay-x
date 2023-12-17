import React from 'react';

type SettingDescriptionProps = {
  description: string;
  children: React.ReactNode;
  className?: string;
};

const SettingDescription = (props: SettingDescriptionProps) => {
  return (
    <div className={`${props.className} w-full flex flex-row items-start`}>
      {props.children}
      <div className="text-end text-sm text-gray-500 w-full select-none">
        <div className="border-b-2">{props.description}</div>
      </div>
    </div>
  );
};

export default SettingDescription;
