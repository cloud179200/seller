"use client"
import React, { useEffect, useState } from "react";

import Link from "next/link";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Avatar,
  Chip,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
} from "@mui/material";

// assets
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Animate from "@/app/components/extended/Animate";
import { IListMenuChildren } from "@/app/components/layout/menu-items";
import { useAppDispatch, useAppSelector } from "@/app/redux/store";
import { customizationActions, customizationActionsName } from "@/app/redux/customization/slice";
import { usePathname } from "next/navigation";
// ==============================|| SIDEBAR MENU LIST ITEMS ||============================== //
interface IProps {
  item: IListMenuChildren,
  level: number,
  children?: React.ReactNode
}

const NavItem = ({ item, level }: IProps) => {
  // const [listItemProps, setListItemProps] = useState<any>({
  //   href: item.url,
  //   target: itemTarget,
  // });
  const theme: any = useTheme();
  const dispatch = useAppDispatch();
  const customization = useAppSelector((state) => state.customization);
  const matchesSM = useMediaQuery(theme.breakpoints.down("lg"));
  const pathname = usePathname()
  const [itemTarget, setItemTarget] = useState("_self");

  const itemIcon = item?.icon ? (
    <item.icon stroke={"currentColor"} strokeWidth={"1.5"} size="1.3rem" />
  ) : (
    <FiberManualRecordIcon
      sx={{
        width:
          customization.isOpen.findIndex((id) => id === item?.id) > -1 ? 8 : 6,
        height:
          customization.isOpen.findIndex((id) => id === item?.id) > -1 ? 8 : 6,
      }}
      fontSize={level > 0 ? "inherit" : "medium"}
    />
  );

  if (item?.target) {
    setItemTarget("_blank");
  }

  if (item?.external) {
    // setListItemProps({
    //   href: item.url,
    //   target: itemTarget,
    //   // forwardRef((props, ref: React.Ref<HTMLAnchorElement>) => (
    //   //   <Link ref={ref} {...props} href={item.url} target={itemTarget} />
    //   // ))
    // });
  }

  const itemHandler = (id: string) => {
    dispatch(
      customizationActions[customizationActionsName.MENU_OPEN]({
        id
      })
    );
    if (matchesSM) dispatch(
      customizationActions[customizationActionsName.SET_MENU]({
        opened: false
      })
    );
  };

  // active menu item on page load
  useEffect(() => {
    const currentIndex = (pathname || "").split("/").findIndex((id) => id === item.id);
    if (currentIndex > -1) {
      dispatch(
        customizationActions[customizationActionsName.MENU_OPEN]({
          id: item.id
        })
      );
    }
  }, []);

  return (
    <ListItemButton
      LinkComponent={Link}
      href={item.url}
      target={itemTarget}
      disabled={item.disabled}
      sx={{
        borderRadius: `${customization.borderRadius}px`,
        mb: 0.5,
        alignItems: "flex-start",
        backgroundColor: level > 1 ? "transparent !important" : "inherit",
        py: level > 1 ? 1.25 : 1.5,
        pl: `${level * 24}px`,
      }}
      selected={customization.isOpen.some((id) => id === item.id) || document.location.pathname === item.url}
      onClick={() => itemHandler(item.id)}
    >
      <ListItemIcon sx={{ my: "auto", minWidth: !item?.icon ? 18 : 36 }}>
        {itemIcon}
      </ListItemIcon>
      <Animate type="slide">
        <ListItemText
          primary={
            <Typography
              variant={
                (customization.isOpen.some((id) => id === item.id) || document.location.pathname === item.url)
                  ? "h5"
                  : "body1"
              }
              color="inherit"
            >
              {item.title}
            </Typography>
          }
          secondary={
            item.caption && (
              <Typography
                variant="caption"
                sx={{ ...theme.typography.subMenuCaption }}
                display="block"
                gutterBottom
              >
                {item.caption}
              </Typography>
            )
          }
        />
      </Animate>

      {item.chip && (
        <Chip
          color={item.chip.color}
          variant={item.chip.variant}
          size={item.chip.size}
          label={item.chip.label}
          avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
        />
      )}
    </ListItemButton>
  );
};

export default NavItem;
