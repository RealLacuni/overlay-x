import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

const ShapeDropdown = () => {
  const shape = useWatch({ name: 'shape' });
  const { register, setValue } = useFormContext();
  
  return (
    <Menu as="div" className={'relative inline-block text-left'}>
      <div>
        <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
          {shape.charAt(0).toUpperCase() + shape.slice(1)}
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
        <Menu.Items className="origin-top-right absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
          <Menu.Item>
            <div className="cursor-pointer flex flex-row py-1 align-middle gap-1.5" onClick={() => setValue('shape', 'circle')}>
              <span className='select-none'>Circle</span>
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 8" fill="currentColor">
                <circle cx="4" cy="4" r="3" fill={"transparent"} strokeWidth={"1"} stroke='#434242'/>
              </svg>
            </div>
          </Menu.Item>
          <Menu.Item>
            <div className="cursor-pointer py-1 flex flex-row align-middle gap-1.5" onClick={() => setValue('shape', 'rectangle')}>
            <span className='select-none'>Rectangle</span>              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="-1 0 12 8" fill="currentColor">
                <rect x="0" y="0" width="8" height="8" fill={"transparent"} strokeWidth={"1"} stroke='#434242'
                />
              </svg>
            </div>
          </Menu.Item>
        </Menu.Items>
      </Transition>
      <input value={shape} type="hidden" name="shape" {...register} />
    </Menu>
  );
};

export default ShapeDropdown;
