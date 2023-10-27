import React from "react";
import { twMerge } from "tailwind-merge";
interface IProps {
  children?: React.ReactNode;
  className?: string;
}
const CustomBox = (props: IProps) => {
  const { className } = props;
  const mergedClassName = twMerge(
    "bg-white shadow-md hover:shadow-lg duration-300 transition-all rounded-lg border-2",
    className || ""
  );
  return <div className={mergedClassName}>{props.children}</div>;
};

export default CustomBox;
