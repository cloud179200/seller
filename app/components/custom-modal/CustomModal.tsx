import React from "react";
import {
  Backdrop,
  Modal,
  Box,
  useTheme,
  useMediaQuery,
  Toolbar,
  IconButton,
  Divider,
  Typography,
  CssBaseline,
} from "@mui/material";
import CustomBox from "../custom-box/CustomBox";
import { TbX } from "react-icons/tb";

interface IProps {
  open: boolean,
  handleClose: () => void,
  title: string | React.ReactNode,
  children?: React.ReactNode,
}

const CustomModal = (props: IProps) => {
  const theme: any = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      keepMounted
    >
      <Box
        sx={{
          position: "absolute",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: matchDownSM ? "100vw" : "50vw",
          left: matchDownSM ? "0" : "25vw",
        }}
      >
        <CustomBox
          sx={{
            p: 0,
            m: 0,
            mt: 2,
            width: "100%",
            maxWidth: matchDownSM ? "100%" : "1000px",
            maxHeight: `calc(100vh - ${theme.spacing(4)})`,
          }}
        >
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: 1,
            }}
          >
            <Typography variant="h4">{props.title}</Typography>
            <IconButton onClick={props.handleClose}>
              <TbX
                stroke={"currentColor"}
                strokeWidth={"1.5"}
                size="2rem"
                style={{ marginTop: "auto", marginBottom: "auto" }}
              />
            </IconButton>
          </Toolbar>
          <Divider />
          <Box
            sx={{
              width: "100%",
              maxHeight: "90vh",
              overflow: "auto",
            }}
          >
            <CssBaseline />
            {props.children}
          </Box>
        </CustomBox>
      </Box>
    </Modal>
  );
};

export default CustomModal;
