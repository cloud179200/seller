"use client";
import React from "react";

// project imports
import ProfileSection from "./ProfileSection";
// import NotificationSection from './NotificationSection';

// assets
import { TbCircleArrowLeft, TbHome, TbMenu2 } from "react-icons/tb";
import Link from "next/link";
// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = ({
  open,
  enabledHandleLeftDrawer,
  handleLeftDrawerToggle,
}: {
  open: boolean;
  enabledHandleLeftDrawer: boolean;
  handleLeftDrawerToggle: () => void;
}) => {
  return (
    <>
      <div className="navbar rounded-br-xl bg-base-300 shadow-md">
        <div className="navbar-start">
          <div className="dropdown">
            {enabledHandleLeftDrawer ? <button className="btn btn-circle btn-ghost" onClick={handleLeftDrawerToggle}>
              {open ? <TbCircleArrowLeft className="h-5 w-5" /> : <TbMenu2 className="h-5 w-5" />}
            </button> : <Link
              prefetch={false} href="/dashboard" className="btn btn-circle btn-ghost"><TbHome className="h-5 w-5" /></Link>}
          </div>
        </div>
        {/* <div className="navbar-center">
          <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
        </div> */}
        <div className="navbar-end">
          <ProfileSection />
        </div>
      </div>
    </>
  );
};

export default Header;
