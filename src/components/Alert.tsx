import { useState, useEffect } from 'react';
import { ExclamationCircleIcon, CheckIcon } from '@heroicons/react/24/solid';
import React from 'react';

type AlertProps = {
  // optional message prop
  message?: string;
  type: 'success' | 'error';
};

const Alert = ({ message, type }: AlertProps) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {show && (
        type === 'success' ?
        (
        <div className="rounded-md absolute bg-green-50 px-4 py-2">
          <div className="flex">
            <div className="flex-shrink-0">
              <CheckIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">Success</h3>
              <div className="mt-2 text-sm text-green-700">
                <p>
                  {message}
                </p>
              </div>
            </div>
          </div>
        </div>)
        :
        (
            <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <ExclamationCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>
                    {message}
                  </p>
                </div>
              </div>
            </div>
          </div>  
        )
      )}
    </>
  );
};

export default Alert;
