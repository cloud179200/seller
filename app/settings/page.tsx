"use client";
import React, { useMemo, useState } from "react";
import CustomBox from "@/app/components/custom-box/CustomBox";
import Tabs from "./Tabs";
import Payment from "./Payment";
import User from "./User";
import Notification from "./Notification";

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
    if (activeId === TABS.PROFILE.id) {
      return <User />;
    }

    if (activeId === TABS.NOTIFICATIONS.id) {
      return <Notification />
    }

    if (activeId === TABS.PAYMENT.id) {
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
        <div className="md:h-[80vh] w-full grow rounded-lg border-2 bg-base-100">
          {boards}
        </div>
      </div>
    </CustomBox>
  );
};

export default page;
