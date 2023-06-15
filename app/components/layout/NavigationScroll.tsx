"use client"
import React, { useEffect } from 'react';
import { useRouter } from "next/router";

// ==============================|| NAVIGATION SCROLL TO TOP ||============================== //

const NavigationScroll = ({ children }: { children?: React.ReactNode }) => {
    const router = useRouter();
    const { pathname } = router;

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }, [pathname]);

    return children || null;
};

export default NavigationScroll;
