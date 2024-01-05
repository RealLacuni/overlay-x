import React from 'react';

type Props = {
  onClick?: () => void;
  className?: string | null | undefined;
  children?: React.ReactNode;
  submit?: boolean;
  disabled?: boolean;
};

const PrimaryButton = ({ submit = false, className, onClick, children, disabled }: Props) => {
  return (
    <button
      type={submit ? 'submit' : 'button'}
      className={
        `${className}` +
        `${disabled ? ' bg-gray-300 text-gray-400' : ' bg-indigo-600 hover:bg-indigo-700 text-indigo-50'} ` +
        'select-none inline-flex px-2.5 py-1.5 border border-transparent text-sm font-medium rounded shadow-sm \
        focus:outline-none justify-center self-center align-middle'
      }
      {...(disabled ? { disabled: true } : {})}
      onClick={submit ? undefined : onClick}
    >
      {children}
    </button>
  );
};

const SecondaryButton = ({ submit = false, className, onClick, children, disabled }: Props) => {
  return (
    <button
      type={submit ? 'submit' : 'button'}
      className={
        `${className} ` +
        `${disabled ? ' bg-gray-300 text-gray-400 ' : 'bg-indigo-100 hover:bg-indigo-200 text-indigo-700'} ` +
        'select-none inline-flex px-2.5 py-1.5 border border-transparent font-medium rounded justify-center self-center text-sm align-middle  \
        focus:outline-none'
      }
      onClick={submit ? undefined : onClick}
      {...(disabled ? { disabled: true } : {})}
    >
      {children}
    </button>
  );
};

const TertiaryButton = ({ submit = false, className, onClick, children, disabled }: Props) => {
  return (
    <button
      type={submit ? 'submit' : 'button'}
      className={
        `${className} ` +
        `${disabled ? ' bg-gray-300 text-gray-400' : ' hover:bg-indigo-200 border border-indigo-600 text-indigo-600 '}` +
        'select-none inline-flex px-2.5 py-1.5 border border-transparent text-sm font-medium rounded shadow-sm \
        focus:outline-none justify-center self-center align-middle'
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
        'inline-flex items-center px-3.5 py-2 border border-transparent text-sm leading-4 font-medium rounded-full shadow-sm text-white \
       bg-indigo-600 hover:bg-indigo-700 focus:outline-none ' + `${props.className}`
      }
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export { SecondaryButton, PrimaryButton, TertiaryButton, RoundButton };
