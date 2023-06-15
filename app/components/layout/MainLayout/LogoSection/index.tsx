"use client"
import React from 'react';
import Link from 'next/link';

// material-ui
import { ButtonBase } from '@mui/material';

// project imports
import config from '@/app/config';
import Logo from '@/app/components/Logo';

// ==============================|| MAIN LOGO ||============================== //


const LogoSection = () => (
    <ButtonBase disableRipple component={Link} href={config.defaultPath}>
        <Logo />
    </ButtonBase>
);

export default LogoSection;
