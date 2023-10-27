"use client"
import React from 'react';
// third-party

// project imports
import MenuList from './MenuList';

interface IProps {
    open: boolean;
    window?: any
}
const Sidebar = (props: IProps) => {
    const { open } = props;
    const openClass = "w-[85vw] sm:w-64 p-0 md:p-2 absolute md:static z-40 md:z-10"
    const notOpenClass = "w-0 md:w-16 p-0 md:p-2 absolute md:static z-40 md:z-10"
    const extendClass = open ? openClass : notOpenClass
    return (
        <>
            <ul className={`menu h-full rounded-r-xl bg-base-200 shadow-sm transition-[width] duration-100 ${extendClass}`}>
                <MenuList isMinimal={!open} />
            </ul>
        </>
    );
};

export default Sidebar;
