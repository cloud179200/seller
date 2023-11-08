// assets
import { TbKey } from "react-icons/tb";

// constant
const icons = {
    TbKey
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
    id: "pages",
    title: "Pages",
    caption: "Pages Caption",
    type: "group",
    children: [
        {
            id: "authentication",
            title: "Authentication",
            type: "collapse",
            icon: icons.TbKey,

            children: [
                {
                    id: "login3",
                    title: "Login",
                    type: "item",
                    url: "/pages/login/login3",
                    target: true
                },
                {
                    id: "register3",
                    title: "Register",
                    type: "item",
                    url: "/pages/register/register3",
                    target: true
                }
            ]
        }
    ]
};

export default pages;
