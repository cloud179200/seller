import React, { InputHTMLAttributes } from "react";

interface IOptions extends InputHTMLAttributes<HTMLOptionElement> {
  label?: string;
}

interface IProps extends InputHTMLAttributes<HTMLSelectElement> {
  options: IOptions[]
  label?: string;
  topRightLabel?: string;
  bottomComponent?: React.ReactNode;
  error?: boolean;
  errorMessage?: string;
}

function CustomSelect(props: IProps) {
  const { options, label, topRightLabel, bottomComponent, error, errorMessage, ...restProps } =
    props;

  const errorClass = error ? "select-error" : "";

  return (
    <div className="form-control w-full">
      <label className="label">
        {label && <span className="label-text font-bold">{label}</span>}
        {topRightLabel && <span className="label-text-alt">{topRightLabel}</span>}
      </label>
      <select className={`select ${errorClass} select-bordered w-full`} {...restProps}>
        {options.map((optionProps, index) => <option key={"custom-select"+index} {...optionProps}>{optionProps.label}</option>)}
      </select>
      {error && errorMessage && <label className="label">
        <span className="label-text-alt text-rose-600">{errorMessage}</span>
      </label>}
      {bottomComponent && <div className="relative mt-4 w-full">
        {bottomComponent}
      </div>}
    </div>
  );
}

export default CustomSelect;
