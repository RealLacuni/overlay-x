import React from "react";

type Props = {
    text: string;
    onClick: () => void;
    className?: string;
}

const SecondaryButton = (props: Props) => {
  return (
    <button
      type="button"
      className={"undraggable inline-flex items-center px-3.5 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 \
       bg-indigo-100 hover:bg-indigo-200 focus:outline-none" + `${props.className}`}
    onClick={props.onClick}>
      {props.text}
    </button>
  );
};

const PrimaryButton = (props: Props) => {
  return (
    <button
      type="button"
      className={"undraggable inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white \
      bg-indigo-600 hover:bg-indigo-700 focus:outline-none" + `${props.className}`}
      onClick={props.onClick}>
      {props.text}
    </button>
  );
}

const RoundButton = (props: Props) => {
  return (
    <button
      type="button"
      className={"undraggable inline-flex items-center px-3.5 py-2 border border-transparent text-sm leading-4 font-medium rounded-full shadow-sm text-white \
       bg-indigo-600 hover:bg-indigo-700 focus:outline-none" + `${props.className}`}
       onClick={props.onClick}>
      {props.text}
    </button>
  );
}

export { SecondaryButton, PrimaryButton, RoundButton };