"use client";
import React, { useMemo, useState } from "react";
import CustomBox from "@/app/components/custom-box/CustomBox";
import Tabs from "./Tabs";
import Payment from "./Payment";
import User from "./User";

const TABS = {
  PROFILE: {
    id: "profile",
    label: "Profile",
  },
  NOTIFICATIONS: {
    id: "notifications",
    label: "Notifications",
  },
  PAYMENT: {
    id: "payment",
    label: "Payment",
  },
};

const useTabs = () => {
  const [activeId, setActiveId] = useState(TABS.PROFILE.id);

  const tabs = useMemo(() => Object.entries(TABS).map((i) => i[1]), []);

  const handleTabClick = (id: string) => {
    setActiveId(id);
  };

  return {
    activeId,
    component: (
      <Tabs tabs={tabs} activeId={activeId} onTabClick={handleTabClick} />
    ),
  };
};

const useBoards = (activeId: string) => {
  const render = () => {
    if (activeId == TABS.PROFILE.id) {
      return <User />;
    }

    if (activeId == TABS.NOTIFICATIONS.id) {
      return (
        <div className="mx-1 mt-2 grid w-1/2 grid-cols-12 gap-y-2">
          <CustomBox className="col-span-full border-[1px]">
            <div className="form-control p-4">
              <label className="label cursor-pointer">
                <span className="label-text">Alert</span>
                <input type="checkbox" className="toggle" />
              </label>
            </div>
          </CustomBox>
          <CustomBox className="col-span-full border-[1px]">
            <div className="form-control p-4">
              <label className="label cursor-pointer">
                <span className="label-text">Adverting email</span>
                <input type="checkbox" className="toggle" />
              </label>
            </div>
          </CustomBox>
        </div>
      );
    }

    if (activeId == TABS.PAYMENT.id) {
      return <Payment />;
    }
    return null;
  };
  return {
    component: <>{render()}</>,
  };
};

const page = () => {
  const { activeId, component: sideBar } = useTabs();
  const { component: boards } = useBoards(activeId);
  return (
    <CustomBox>
      <div className="flex min-h-[80vh] flex-wrap items-start justify-start p-4">
        <div className="ml-2 w-full">{sideBar}</div>
        <div className={"h-[80vh] w-full grow rounded-lg border-2 bg-white"}>
          {boards}
        </div>
      </div>
    </CustomBox>
  );
};

export default page;
