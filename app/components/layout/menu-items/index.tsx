import * as icons from "react-icons/tb";
import { NAME_TRANS_EN } from "@/app/config/constant";
import { IconType } from "react-icons";

export interface IListMenu {
  id: string;
  title: string;
  type: string;
  icon?: IconType;
  caption?: string;
  children?: IListMenuChildren[];
}
export interface IListMenuChildren {
  id: string;
  title: string;
  type: string;
  url: string;
  icon?: IconType;
  breadcrumbs: boolean;
  external?: boolean;
  target?:boolean,
  disabled?: boolean;
  caption?: string;
  chip?: any
}
const listMenuItems: IListMenu = {
  id: "dashboard",
  title: "",
  type: "group",
  children: [
    {
      id: NAME_TRANS_EN.HOME,
      title: NAME_TRANS_EN.HOME,
      type: "item",
      url: "/dashboard",
      icon: icons.TbDashboard,
      breadcrumbs: false,
    },
    // {
    //   id: NAME_TRANS_EN.CLASS,
    //   title: NAME_TRANS_EN.CLASS,
    //   type: "item",
    //   url: "/class",
    //   icon: icons.TbChalkboard,
    //   breadcrumbs: false,
    // },
    // {
    //   id: NAME_TRANS_EN.TRANSACTION_HISTORY,
    //   title: NAME_TRANS_EN.TRANSACTION_HISTORY,
    //   type: "item",
    //   url: "/transaction/history",
    //   icon: icons.TbHistory,
    //   breadcrumbs: false,
    // },
  ],
};
export const menuItems = {
  items: [listMenuItems],
};

const listMenuItemsAdmin: IListMenu = {
  id: "dashboard",
  title: "",
  type: "group",
  children: [
    {
      id: NAME_TRANS_EN.HOME,
      title: NAME_TRANS_EN.HOME,
      type: "item",
      url: "/dashboard",
      icon: icons.TbDashboard,
      breadcrumbs: false,
    },
    // {
    //   id: NAME_TRANS_EN.CLASS,
    //   title: NAME_TRANS_EN.CLASS,
    //   type: "item",
    //   url: "/class",
    //   icon: icons.TbChalkboard,
    //   breadcrumbs: false,
    // },
    // {
    //   id: NAME_TRANS_EN.TEACHER,
    //   title: NAME_TRANS_EN.TEACHER,
    //   type: "item",
    //   url: "/teacher",
    //   icon: icons.TbUser,
    //   breadcrumbs: false,
    // },
    // {
    //   id: NAME_TRANS_EN.STUDENT,
    //   title: NAME_TRANS_EN.STUDENT,
    //   type: "item",
    //   url: "/student",
    //   icon: icons.TbUser,
    //   breadcrumbs: false,
    // },
    // {
    //   id: NAME_TRANS_EN.TRANSACTION_HISTORY,
    //   title: NAME_TRANS_EN.TRANSACTION_HISTORY,
    //   type: "item",
    //   url: "/transaction/history",
    //   icon: icons.TbHistory,
    //   breadcrumbs: false,
    // },
    // {
    //   id: NAME_TRANS_EN.LANDING_PAGE,
    //   title: NAME_TRANS_EN.LANDING_PAGE,
    //   type: "item",
    //   url: "/landing/manage",
    //   icon: icons.TbAd,
    //   breadcrumbs: false,
    // },
  ],
};

export const menuItemsAdmin = {
  items: [listMenuItemsAdmin],
};
