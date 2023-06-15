/* eslint-disable react/display-name */
"use client"
import React, { Suspense } from 'react';
// project imports
import Loader from './Loader';

// ==============================|| LOADABLE - LAZY LOADING ||============================== //

const Loadable = (Component: React.FC<any>) => (props: { [key: string]: any }) => {
    return (
        <>
            <Suspense fallback={<Loader />}>
                <Component {...props} />
            </Suspense>
        </>
    );
}
export default Loadable;