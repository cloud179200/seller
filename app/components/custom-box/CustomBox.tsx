import React from "react";
import { twMerge } from "tailwind-merge";
interface IProps extends React.HTMLAttributes<HTMLDivElement> {
}
const CustomBox = (props: IProps) => {
  const { className, ...rest } = props;
  const mergedClassName = twMerge(
    "bg-base-100 shadow-md hover:shadow-lg duration-300 transition-all rounded-lg border-2",
    className || ""
  );
  return <div className={mergedClassName} {...rest}>{props.children}</div>;
};

export default CustomBox;
