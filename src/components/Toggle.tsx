import React from 'react';
import { Switch } from '@headlessui/react';
import { classNames } from '../util/classNames';
import { useFormContext, Controller, useWatch } from 'react-hook-form';

type ToggleProps = {
  name: string;
};
const Toggle = ({ name }: ToggleProps) => {
  const { control } = useFormContext();
  const toggleValue = useWatch({
    name: name,
    defaultValue: false,
  });

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Switch
          defaultChecked={toggleValue}
          onChange={field.onChange}
          name={name}
          className={`${
            toggleValue ? 'bg-blue-600' : 'bg-gray-200'
          } relative inline-flex h-6 w-11 items-center rounded-full`}
        >
          <span className="sr-only">Use setting</span>
          <span
            aria-hidden="true"
            className={classNames(
              toggleValue ? 'translate-x-5' : 'translate-x-0',
              'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
            )}
          />
        </Switch>
      )}
    />
  );
};

export default Toggle;
