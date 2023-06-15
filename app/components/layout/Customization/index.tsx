"use client"
import React, { useState, useEffect } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Drawer,
  Fab,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  Slider,
  Tooltip,
  Typography,
} from "@mui/material";
import { TbSettings } from "react-icons/tb";

// third-party
import PerfectScrollbar from "react-perfect-scrollbar";

// project imports
import SubCard from "@/app/components/cards/SubCard";
import { gridSpacing } from "@/app/redux/customization/constant";
import Animate from "@/app/components/extended/Animate";
import { customizationActions, customizationActionsName } from "@/app/redux/customization/slice";
import { useAppDispatch, useAppSelector } from "@/app/redux/store";

interface IProps {
  children?: React.ReactNode
}

// concat 'px'
function valueText(value: number | string) {
  return `${value}px`;
}

// ==============================|| LIVE CUSTOMIZATION ||============================== //

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Customization = (_props: IProps) => {
  const theme: any = useTheme();
  const dispatch = useAppDispatch();
  const customization = useAppSelector((state) => state.customization);

  // drawer on/off
  const [open, setOpen] = useState(false);
  const [fontFamily, setFontFamily] = useState("Inter");
  const [borderRadius, setBorderRadius] = useState<number>(14);

  const handleBorderRadius = (_event: Event, newValue: number | number[]) => {
    typeof newValue === "number" && setBorderRadius(newValue);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  useEffect(() => {
    dispatch(customizationActions[customizationActionsName.SET_BORDER_RADIUS]({ borderRadius }));
  }, [borderRadius]);

  useEffect(() => {
    let newFont;
    switch (fontFamily) {
      case "Inter":
        newFont = `'Inter', sans-serif`;
        break;
      case "Poppins":
        newFont = `'Poppins', sans-serif`;
        break;
      case "cursive":
        newFont = `cursive`;
        break;
      case "Roboto":
        newFont = `'Roboto', sans-serif`;
        break;
      case "Sono":
      default:
        newFont = `'Sono', sans-serif`;
        break;
    }
    dispatch(
      customizationActions[customizationActionsName.SET_FONT_FAMILY]({
        fontFamily: newFont,
      })
    );
  }, [fontFamily]);

  useEffect(() => {
    let initialFont = `Inter`;
    switch (customization.fontFamily) {
      case `'Inter', sans-serif`:
        initialFont = "Inter";
        break;
      case `'Poppins', sans-serif`:
        initialFont = "Poppins";
        break;
      case `'Roboto', sans-serif`:
      default:
        initialFont = "Roboto";
        break;
    }
    setFontFamily(initialFont)
  }, [customization.fontFamily])

  useEffect(() => {
    setBorderRadius(customization.borderRadius)
  }, [customization.borderRadius])
  
  return (
    <>
      {/* toggle button */}
      <Tooltip title="Live Customize">
        <Fab
          component="div"
          onClick={handleToggle}
          size="medium"
          variant="circular"
          color="secondary"
          sx={{
            borderRadius: 0,
            borderTopLeftRadius: "50%",
            borderBottomLeftRadius: "50%",
            borderTopRightRadius: "50%",
            borderBottomRightRadius: "4px",
            top: "25%",
            position: "fixed",
            right: 10,
            zIndex: theme.zIndex.speedDial,
          }}
        >
          <Animate type="rotate">
            <IconButton color="inherit" size="large" disableRipple>
              <TbSettings />
            </IconButton>
          </Animate>
        </Fab>
      </Tooltip>

      <Drawer
        anchor="right"
        onClose={handleToggle}
        open={open}
        PaperProps={{
          sx: {
            width: 280,
          },
        }}
      >
        <PerfectScrollbar component="div">
          <Grid container spacing={gridSpacing} sx={{ p: 3 }}>
            <Grid item xs={12}>
              {/* font family */}
              <SubCard title="Font Family" secondary={undefined}>
                <FormControl>
                  <RadioGroup
                    aria-label="font-family"
                    value={fontFamily}
                    onChange={(e) => setFontFamily(e.target.value)}
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      value="Sono"
                      control={<Radio />}
                      label="Roboto"
                      sx={{
                        "& .MuiSvgIcon-root": { fontSize: 28 },
                        "& .MuiFormControlLabel-label": {
                          color: theme.palette.grey[900],
                        },
                      }}
                    />
                    <FormControlLabel
                      value="Roboto"
                      control={<Radio />}
                      label="Roboto"
                      sx={{
                        "& .MuiSvgIcon-root": { fontSize: 28 },
                        "& .MuiFormControlLabel-label": {
                          color: theme.palette.grey[900],
                        },
                      }}
                    />
                    <FormControlLabel
                      value="Poppins"
                      control={<Radio />}
                      label="Poppins"
                      sx={{
                        "& .MuiSvgIcon-root": { fontSize: 28 },
                        "& .MuiFormControlLabel-label": {
                          color: theme.palette.grey[900],
                        },
                      }}
                    />
                    <FormControlLabel
                      value="Inter"
                      control={<Radio />}
                      label="Inter"
                      sx={{
                        "& .MuiSvgIcon-root": { fontSize: 28 },
                        "& .MuiFormControlLabel-label": {
                          color: theme.palette.grey[900],
                        },
                      }}
                    />
                    <FormControlLabel
                      value="cursive"
                      control={<Radio />}
                      label="Cursive"
                      sx={{
                        "& .MuiSvgIcon-root": { fontSize: 28 },
                        "& .MuiFormControlLabel-label": {
                          color: theme.palette.grey[900],
                        },
                      }}
                    />
                  </RadioGroup>
                </FormControl>
              </SubCard>
            </Grid>
            <Grid item xs={12}>
              {/* border radius */}
              <SubCard title="Border Radius" secondary={undefined}>
                <Grid
                  item
                  xs={12}
                  container
                  spacing={2}
                  alignItems="center"
                  sx={{ mt: 2.5 }}
                >
                  <Grid item>
                    <Typography variant="h6" color="secondary">
                      4px
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <Slider
                      size="small"
                      value={borderRadius}
                      onChange={handleBorderRadius}
                      getAriaValueText={valueText}
                      valueLabelDisplay="on"
                      aria-labelledby="discrete-slider-small-steps"
                      marks
                      step={2}
                      min={4}
                      max={48}
                      color="secondary"
                      sx={{
                        "& .MuiSlider-valueLabel": {
                          color: "secondary.light",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <Typography variant="h6" color="secondary">
                      48px
                    </Typography>
                  </Grid>
                </Grid>
              </SubCard>
            </Grid>
          </Grid>
        </PerfectScrollbar>
      </Drawer>
    </>
  );
};

export default Customization;
