"use client"
import React from 'react';
// material-ui
import { Typography } from '@mui/material';

// project imports
import NavGroup from './NavGroup';
import { menuItems, menuItemsAdmin } from '@/app/components/layout/menu-items/index';
import { useSession } from 'next-auth/react';
import { NEXT_AUTH_STATUS } from '@/app/config/constant';

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
    const { status } = useSession()
    const navItems = (status === NEXT_AUTH_STATUS.AUTHENTICATED ? menuItemsAdmin : menuItems).items.map((item) => {
        switch (item.type) {
            case 'group':
                return <NavGroup key={item.id} item={item} />;
            default:
                return (
                    <Typography key={item.id} variant="h6" color="error" align="center">
                        Menu Items Error
                    </Typography>
                );
        }
    });

    return <>{navItems}</>;
};

export default MenuList;
