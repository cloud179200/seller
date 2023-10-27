"use client";
import React from "react";

interface IProps {
  tabs: Array<{ id: string; label: string }>;
  activeId: string;
  onTabClick: (_id: string) => void;
}
const Tabs = (props: IProps) => {
  const { tabs, activeId, onTabClick } = props;
  return (
    <div className="tabs">
      {tabs.map((item) => (
        <a
          key={item.id}
          className={`tab-bordered tab-lifted tab border-b-0 ${
            activeId === item.id ? "tab-active" : ""
          }`}
          onClick={() => onTabClick(item.id)}
        >
          {item.label}
        </a>
      ))}
    </div>
  );
};

export default Tabs;
