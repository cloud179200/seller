"use client";
import React, { useMemo } from "react";

// assets
import { TbLogout, TbSettings } from "react-icons/tb";
import { NEXT_AUTH_STATUS } from "@/app/config/constant";
import { signOut, useSession } from "next-auth/react";
import { faker } from "@faker-js/faker";
import Link from "next/link";
// ==============================|| PROFILE MENU ||============================== //

const ProfileSection = () => {
  // const router = useRouter();
  const { data, status } = useSession();
  const avatarURL = useMemo(
    () => data?.user?.image || faker.image.avatar(),
    [data?.user?.email]
  );
  const MENU_INDEX = useMemo(() => faker.number.int({ min: 0, max: 1000 }), []);

  const handleLogout = async () => {
    if (status === NEXT_AUTH_STATUS.AUTHENTICATED) {
      await signOut({ redirect: false, callbackUrl: "/" });
    }
    return;
  };

  // const helloContent = useMemo(() => {
  //   const currentHour = parseFloat(moment().format("HH"));
  //   if (currentHour >= 3 && currentHour < 12) {
  //     return "Good Morning";
  //   } else if (currentHour >= 12 && currentHour < 15) {
  //     return "Good Afternoon";
  //   } else if (currentHour >= 18 || currentHour < 3) {
  //     return "Good Evening";
  //   }
  //   return "Hello";
  // }, []);

  return (
    <>
      {/* Avatar and dropdown */}
      <div className="dropdown dropdown-end">
        <label data-cy="menu-button" tabIndex={MENU_INDEX} className="avatar btn btn-circle btn-ghost">
          <div className="w-10 rounded-full">
            <img src={avatarURL} title="avatar" alt="avatar"/>
          </div>
        </label>
        <ul tabIndex={MENU_INDEX} className="menu dropdown-content rounded-box menu-sm mt-3 w-52 bg-base-100 p-2 shadow">
          {/* <div className="card-body p-0">
            <h3 className="card-title">{data?.user?.email || ""}</h3>
            <p>{helloContent}</p>
          </div> */}
          <li className="my-1">
            <Link data-cy="settings-button" href="/settings">
              <TbSettings className="h-5 w-5" />&nbsp;Settings
            </Link></li>
          <li className="my-1">
            <span data-cy="logout-button" onClick={handleLogout}><TbLogout className="h-5 w-5" />&nbsp;Logout</span></li>
        </ul>
      </div>
    </>
  );
};

export default ProfileSection;
