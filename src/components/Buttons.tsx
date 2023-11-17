import React from 'react';

type Props = {
  onClick?: () => void;
  className?: string | null | undefined;
  children?: React.ReactNode;
  submit?: boolean;
}

const SecondaryButton = ({submit = false, className, onClick, children }: Props) => {
  return (
    <button
    type={submit ? 'submit' : 'button'}
    className={
        'undraggable inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs leading-4 font-medium rounded text-indigo-700 \
       bg-indigo-100 hover:bg-indigo-200 focus:outline-none' + `${className}`
      }
      onClick={submit ? undefined : onClick}
    >
      {children}
    </button>
  );
};

const PrimaryButton = ({submit = false, className, onClick, children }: Props) => {
  return (
    <button
      type={submit ? 'submit' : 'button'}
      className={
        'undraggable inline-flex items-center px-2.5 py-1.5 border border-transparent text-sm font-medium rounded shadow-sm text-white \
        bg-indigo-600 hover:bg-indigo-700 focus:outline-none' + `${className}`
      }
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
