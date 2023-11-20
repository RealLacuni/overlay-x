import React, { useState } from 'react';
import { Switch } from '@headlessui/react';
import { classNames } from '../util/classNames';
import { Control, Controller } from 'react-hook-form';

type ToggleProps = {
  checked: boolean;
  name: string;
  control: Control;
};
const Toggle = ({ checked, name, control }: ToggleProps) => {
  const [enabled, setEnabled] = useState(checked);
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Switch
          checked={enabled}
          {...field}
          onChange={() => {
            setEnabled(!enabled);
          }}
        >
          <span className="sr-only">Use setting</span>
          <span
            aria-hidden="true"
            className={classNames(
              enabled ? 'translate-x-5' : 'translate-x-0',
              'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
            )}
          />
        </Switch>
      )}
    />
  );
};

export default Toggle;
