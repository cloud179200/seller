import React, { memo } from "react";
import { TableRow, TableCell, Fade } from "@mui/material";
import _ from "underscore";
interface IProps{
  rowData: any;
  index: number;
  children?: React.ReactNode;
}
const CustomRow = ({ rowData, index }: IProps) => {
  return (
    <Fade in={true} style={{ transitionDelay: `${index * 40}ms` }}>
      <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
        {typeof rowData === "object" &&
          Object.keys(_.clone(rowData)).map((key, id) => {
            return (
              <TableCell
                key={rowData + key + id}
                component={id === 0 ? "th" : undefined}
                scope={id === 0 ? "row" : ""}
                align={id === 0 ? "inherit" : "right"}
              >
                {rowData[key]}
              </TableCell>
            );
          })}
      </TableRow>
    </Fade>
  );
};

export default memo(CustomRow);
