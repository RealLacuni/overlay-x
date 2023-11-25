import React from 'react';

type Props = {
  onClick?: () => void;
  className?: string | null | undefined;
  children?: React.ReactNode;
  submit?: boolean;
  disabled?: boolean;
};

const SecondaryButton = ({ submit = false, className, onClick, children, disabled }: Props) => {
  return (
    <button
      type={submit ? 'submit' : 'button'}
      className={
        'undraggable inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs leading-4 font-medium rounded  \
        focus:outline-none' +
        `${className}` +
        `${disabled ? ' bg-gray-300 text-gray-400' : ' bg-indigo-100 hover:bg-indigo-200 text-indigo-700'}`
      }
      onClick={submit ? undefined : onClick}
      {...(disabled ? { disabled: true } : {})}
    >
      {children}
    </button>
  );
};

const PrimaryButton = ({ submit = false, className, onClick, children, disabled }: Props) => {
  return (
    <button
      type={submit ? 'submit' : 'button'}
      className={
        'undraggable inline-flex items-center px-2.5 py-1.5 border border-transparent text-sm font-medium rounded shadow-sm text-white \
        focus:outline-none' +
        `${className}` +
        `${disabled ? ' bg-gray-300 text-gray-400' : ' bg-indigo-600 hover:bg-indigo-700'}`
      }
      {...(disabled ? { disabled: true } : {})}
      onClick={submit ? undefined : onClick}
    >
      {children}
    </button>
  );
};

const RoundButton = (props: Props) => {
  return (
    <button
      type="button"
      className={
        'undraggable inline-flex items-center px-3.5 py-2 border border-transparent text-sm leading-4 font-medium rounded-full shadow-sm text-white \
       bg-indigo-600 hover:bg-indigo-700 focus:outline-none' + `${props.className}`
      }
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export { SecondaryButton, PrimaryButton, RoundButton };
