import React, { ButtonHTMLAttributes } from "react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  endIcon?: React.ReactNode;
  loading?: boolean;
  cypressData?: string;
}

const CustomButton = ({ children, endIcon, loading, cypressData, ...props }: IProps) => {
  return (
    <button
      className="btn-info btn-block btn mt-2"
      {...props}
      disabled={props.disabled || loading}
      data-cy={cypressData || ""}
    >
      {children}
      {endIcon && !loading && <span className="ml-2">{endIcon}</span>}
      {loading && <span className="loading loading-spinner"></span>}
    </button>
  );
};

export default CustomButton;
