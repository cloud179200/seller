"use client";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/redux/store";
import {
  customizationActions,
  customizationActionsName,
} from "@/app/redux/customization/slice";
import { TbMenu2, TbToggleRight, TbUser } from "react-icons/tb";
// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = (props: { children?: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const loadingCommon = useAppSelector((state) => state.common.loading);

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
    <div
      className={`flex h-screen transition-all duration-300 ${
        leftDrawerOpened ? "" : "translate-x-full"
      }`}
    >
      {/* Sidebar */}
      <div className="bg-gray-800 text-white w-1/5 py-4 px-6">
        <button className="flex items-center space-x-2 text-gray-300 hover:text-white transition-all duration-300">
          <TbMenu2 className="w-6 h-6" />
          <span className="font-medium">Dashboard</span>
        </button>
        <button className="flex items-center space-x-2 text-gray-300 hover:text-white transition-all duration-300">
          <TbUser className="w-6 h-6" />
          <span className="font-medium">Profile</span>
        </button>
        {/* Add more buttons with icons as needed */}
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-grow">
        {/* Navbar */}
        <nav className="bg-gray-200 px-4 py-2">{/* Navbar content */}</nav>

        {/* Page content */}
        <div className="flex-grow bg-gray-100 px-4 py-6">
          {/* Page content goes here */}
        </div>
      </div>

      {/* Sidebar toggle */}
      <div
        className="fixed top-0 left-0 bg-gray-200 text-gray-700 p-4 cursor-pointer transition-all duration-300"
        onClick={handleLeftDrawerToggle}
      >
        <TbMenu2
          className={`w-6 h-6 ${leftDrawerOpened ? "rotate-180" : ""}`}
        />
      </div>

      {/* Avatar and dropdown */}
      <div className="bg-gray-200 text-gray-700 py-2 px-4 flex items-center space-x-2">
        <img className="h-8 w-8 rounded-full" src="avatar.jpg" alt="Avatar" />
        <div className="relative">
          <button className="flex items-center focus:outline-none">
            <TbToggleRight className="w-6 h-6" />
          </button>
          {/* Dropdown menu */}
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg py-1 opacity-0 transition-all duration-300 transform scale-0 hover:opacity-100 hover:scale-100">
            <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
              Settings
            </button>
            <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
