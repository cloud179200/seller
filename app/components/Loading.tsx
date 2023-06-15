"use client";
import React from "react";
import { NEXT_AUTH_STATUS } from "@/app/config/constant";
import { useSession } from "next-auth/react";
import { InfinitySpin, ProgressBar } from "react-loader-spinner";

const LoadingComponent = ({ isModal = false, height = "100vh" }) => {
  const { status } = useSession();
  return (
    <div
      className={`flex justify-center items-center w-full`}
      style={{ height: isModal ? "30vh" : height }}
    >
      {status === NEXT_AUTH_STATUS.AUTHENTICATED ? (
        <InfinitySpin />
      ) : (
        <ProgressBar
          height="auto"
          width="30%"
          ariaLabel="progress-bar-loading"
          wrapperStyle={{}}
          wrapperClass="progress-bar-wrapper"
        />
      )}
    </div>
  );
};

export default LoadingComponent;
