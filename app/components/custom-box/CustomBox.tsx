import React from "react";
import { Box, SxProps, Theme } from "@mui/material";
import { useAppSelector } from "@/app/redux/store";
interface IProps {
  sx?: SxProps<Theme>,
  children?: React.ReactNode,
  className?: string
}
const CustomBox = (props: IProps) => {
  const customization = useAppSelector((state) => state.customization);

  return (
    <Box
      m={1}
      mb={2}
      p={2}
      sx={{
        backgroundColor: "#fff",
        borderRadius: `${customization.borderRadius}px`,
        boxShadow: 2,
        transition: "all 0.3s",
        "&:hover": {
          boxShadow: 6,
        },
        ...(props?.sx || {})
      }}
      className={props.className}
    >
      {props.children}
    </Box >
  );
};

export default CustomBox;
