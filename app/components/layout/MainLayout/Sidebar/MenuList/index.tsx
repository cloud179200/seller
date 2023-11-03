import React from "react";
import {
    menuItems,
    menuItemsAdmin,
} from "@/app/components/layout/menu-items/index";
import Animate from "@/app/components/extended/Animate";
import Link from "next/link";
import {
    TbPlayerRecordFilled,
} from "react-icons/tb";
import { NEXT_AUTH_STATUS } from "@/app/config/constant";
import { useSession } from "next-auth/react";

interface IProps {
    isMinimal: boolean;
}

function MenuList(props: IProps) {
    const { isMinimal } = props;
    const { status } = useSession();
   
    const sidebarItems = (
        status === NEXT_AUTH_STATUS.AUTHENTICATED ? menuItemsAdmin : menuItems
    ).items[0].children?.map((item) => {
        const itemIcon = item.icon ? (
            <item.icon className="h-5 w-5" />
        ) : (
            <TbPlayerRecordFilled className="h-5 w-5" />
        );
        switch (item.type) {
            case "item":
                return isMinimal ? (
                    <li key={item.id} className="mt-2">
                        <Link
                            href={item.url}
                            className="tooltip tooltip-right hidden md:block"
                            data-tip={item.title}
                        >
                            {itemIcon}
                        </Link>
                    </li>
                ) : (
                    <Animate key={item.id} animateWhenInView="slide" animateWhenInViewProps={{ transition: { type:"spring", duration: 0.5 } }}>
                        <li className="mt-2 px-2">
                            <Link href={item.url} className="ring-2 ring-neutral md:ring-0">
                                <h4 className="mr-2 w-[64vw] overflow-hidden truncate md:w-[10rem]">
                                    {item.title}
                                </h4>
                                {itemIcon}
                            </Link>
                        </li>
                    </Animate>
                );
            default:
                return (
                    <h6 className="text-center text-error" key={item.id}>
                        Menu Items Error
                    </h6>
                );
        }
    });

    return <>{sidebarItems}</>;
}

export default MenuList;