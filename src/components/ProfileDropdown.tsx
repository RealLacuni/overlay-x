import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import React from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

const ProfileDropdown = () => {
  const currentProfile = useWatch({ name: 'currentProfile'});
  const { register, setValue, control } = useFormContext();
  console.log(currentProfile);
  

  return (
    <Controller
      control={control}
      name="test"
      render={({ field }) => (
        <Menu as="div" className={'z-50 absolute mt-2 right-10 inline-block text-left'}
        onChange={field.onChange}>
          <div>
            <Menu.Button className="z-50 inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
              {currentProfile ? currentProfile.charAt(0).toUpperCase() + currentProfile.slice(1) : 'Default'}
              <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
              <Menu.Item>
                <div
                  className="cursor-pointer flex flex-row py-1 align-middle gap-1.5"
                  onClick={() => setValue('currentProfile', 'default')}
                >
                  <span className="select-none">Default</span>
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 8" fill="currentColor">
                    <circle cx="4" cy="4" r="3" fill={'transparent'} strokeWidth={'1'} stroke="#434242" />
                  </svg>
                </div>
              </Menu.Item>
              <Menu.Item>
                <div
                  className="cursor-pointer py-1 flex flex-row align-middle gap-1.5"
                  onClick={() => setValue('currentProfile', 'Profile 1')}
                >
                  <span className="select-none">Profile 1</span>
                </div>
              </Menu.Item>
              <Menu.Item>
                <div
                  className="cursor-pointer py-1 flex flex-row align-middle gap-1.5"
                  onClick={() => setValue('currentProfile', 'Profile 2')}
                >
                  <span className="select-none">Profile 2</span>{' '}
                </div>
              </Menu.Item>
              <Menu.Item>
                <div
                  className="cursor-pointer py-1 flex flex-row align-middle gap-1.5"
                  onClick={() => setValue('currentProfile', 'Profile 3')}
                >
                  <span className="select-none">Profile 3</span>{' '}
                </div>
              </Menu.Item>
              <Menu.Item>
                <div
                  className="cursor-pointer py-1 flex flex-row align-middle gap-1.5"
                  onClick={() => setValue('currentProfile', 'Profile 4')}
                >
                  <span className="select-none">Profile 4</span>{' '}
                </div>
              </Menu.Item>
            </Menu.Items>
          </Transition>
          <input value={currentProfile} type="hidden" name="shape" {...register} />
        </Menu>
      )}
    />
  );
};

export default ProfileDropdown;
