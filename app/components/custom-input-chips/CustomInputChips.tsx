import React from "react";
import { MuiChipsInput, MuiChipsInputProps } from "mui-chips-input";
import { useTheme } from "@mui/material";

const CustomChipsInput = (props: MuiChipsInputProps) => {
  const theme = useTheme()
  return (
    <>
      <MuiChipsInput {...props} sx={{
        "& > .MuiInputBase-root > .MuiInputBase-input": {
          padding: theme.spacing(1.5),
        }
      }} />
    </>
  );
};

export default CustomChipsInput;
