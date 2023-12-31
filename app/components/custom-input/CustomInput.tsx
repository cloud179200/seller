import React, { InputHTMLAttributes } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  topRightLabel?: string;
  onEndIconClick?: React.MouseEventHandler<HTMLButtonElement>;
  endIcon?: React.ReactNode;
  bottomComponent?: React.ReactNode;
  error?: boolean;
  errorMessage?: string;
  cypressData?:string;
}

function CustomInput(props: IProps) {
  const { label, topRightLabel, endIcon, onEndIconClick, bottomComponent, error, errorMessage, cypressData, ...restProps } =
    props;
  const errorClass = error ? "input-error animate-shake-twice focus:[animation-delay:0.3s]" : "";
  return (
    <div className="form-control w-full">
      <label className="label">
        {label && <span className="label-text font-bold">{label}</span>}
        {topRightLabel && <span className="label-text-alt">{topRightLabel}</span>}
      </label>
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Type here"
          className={`input input-bordered ${errorClass} w-full`}
          data-cy={cypressData || ""}
          {...restProps}
        />
        {endIcon && (
          <span className="btn btn-circle btn-ghost btn-sm absolute right-0 top-2 mr-3 flex items-center">
            <button className="focus:outline-none" onClick={onEndIconClick}>
              {endIcon}
            </button>
          </span>
        )}
      </div>
      {error && errorMessage && <label className="label">
        <span className="label-text-alt text-error">{errorMessage}</span>
      </label>}
      {bottomComponent && <div className="relative mt-4 w-full">
        {bottomComponent}
      </div>}
    </div>
  );
}

export default CustomInput;
