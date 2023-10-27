import React, { ButtonHTMLAttributes } from "react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  endIcon?: React.ReactNode;
  loading?: boolean;
}

const CustomButton = ({ children, endIcon, loading, ...props }: IProps) => {
  return (
    <button
      className="btn-info btn-block btn mt-2"
      {...props}
      disabled={props.disabled || loading}
    >
      {children}
      {endIcon && !loading && <span className="ml-2">{endIcon}</span>}
      {loading && <span className="loading loading-spinner"></span>}
    </button>
  );
};

export default CustomButton;
