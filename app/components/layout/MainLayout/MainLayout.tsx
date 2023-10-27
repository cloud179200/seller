"use client";
import React, { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/app/redux/store";
import {
  customizationActions,
  customizationActionsName,
} from "@/app/redux/customization/slice";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { PRIVATE_ROUTE_IGNORE_SIDEBAR } from "@/app/config/router";
import { usePathname } from "next/navigation";
// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = (props: { children?: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();

  const isDisplaySidebar = useMemo(() => (!PRIVATE_ROUTE_IGNORE_SIDEBAR.map(item => item.path).includes(pathname || "")), [pathname]);
  // const _loadingCommon = useAppSelector((state) => state.common.loading);
  // Handle left drawer
  const leftDrawerOpened = useAppSelector(
    (state) => state.customization.opened
  );

  const handleLeftDrawerToggle = () => {
    dispatch(
      customizationActions[customizationActionsName.SET_MENU]({
        opened: !leftDrawerOpened,
      })
    );
  };

  // useEffect(() => {
  //   dispatch(
  //     customizationActions[customizationActionsName.SET_MENU]({
  //       opened: !matchDownMd,
  //     })
  //   );
  // }, [matchDownMd]);

  return (
    <>
      <div className="grid h-screen w-screen grid-cols-12 bg-base-100">
        <div className="z-30 col-span-12 h-[58px]">
          <Header open={leftDrawerOpened} enabledHandleLeftDrawer={isDisplaySidebar} handleLeftDrawerToggle={handleLeftDrawerToggle} />
        </div>
        <div className="z-20 col-span-12 flex h-[calc(100vh-58px)] flex-nowrap">
          {isDisplaySidebar && <div>
            <Sidebar open={leftDrawerOpened} />
          </div>}
          <div className={`w-screen grow bg-base-100 p-4`}>
            {props.children}
          </div>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
