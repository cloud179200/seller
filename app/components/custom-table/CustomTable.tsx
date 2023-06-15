import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  Toolbar,
  Typography,
  Divider,
  Grid,
  Pagination,
  Box,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { usePrevious } from "react-use";
import CustomRow from "./CustomRow";

const CustomTable = ({
  data = [],
  headers = [],
  title = "",
  reloadPageWhenDataChange = true,
}) => {
  const [page, setPage] = useState<number>(1);
  const rowsPerPage = 10;
  const lengthData = data?.length || 0;
  const prevLengthData = usePrevious(lengthData);

  const totalPage =
    Math.round(lengthData / rowsPerPage) < lengthData / rowsPerPage
      ? Math.round(lengthData / rowsPerPage) + 1
      : Math.round(lengthData / rowsPerPage);
  const handlePageChange = (e: any, p: number) => {
    setPage(p);
  };

  useEffect(() => {
    if (reloadPageWhenDataChange || (prevLengthData || 0) > lengthData) {
      setPage(1);
    }
  }, [data]);

  return (
    <>
      {title && (
        <Toolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 }, mb: 1 }}>
          <Typography variant="h3" component="div">
            {title}
          </Typography>
        </Toolbar>
      )}
      <Divider />
      {!lengthData ? (
        <Grid container>
          <Grid item md={12}>
            <Typography variant="h3" align="center" mb={2} mt={2}>
              Không có dữ liệu để hiển thị
            </Typography>
          </Grid>
        </Grid>
      ) : (
        <>
          <TableContainer sx={{ maxHeight: "50vh" }}>
            <Table
              stickyHeader
              sx={{
                backgroundColor: "#ffff",
              }}
            >
              <TableHead>
                <TableRow>
                  {headers.map((item, index) => (
                    <TableCell
                      key={item + index}
                      align={index ? "right" : "inherit"}
                      sx={{
                        fontWeight: "bold",
                        fontSize: "1.1rem",
                      }}
                    >
                      {item}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data
                  .slice(page * rowsPerPage - rowsPerPage, page * rowsPerPage)
                  .map((row, id) => (
                    <CustomRow key={row + page + id} rowData={row} index={id} />
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          {typeof lengthData === "number" && lengthData > rowsPerPage && (
            <Box>
              <Pagination
                sx={{ marginTop: "1rem" }}
                color="secondary"
                count={totalPage}
                page={page}
                onChange={handlePageChange}
              />
            </Box>
          )}
        </>
      )}
    </>
  );
};

export default CustomTable;
