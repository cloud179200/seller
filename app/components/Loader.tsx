import React from 'react';
import CustomBox from './custom-box/CustomBox';

// ==============================|| LOADER ||============================== //
const Loader = () => (
    <CustomBox className='flex items-center justify-center'>
        <span className="loading loading-spinner loading-lg"></span>
    </CustomBox>
);

export default Loader;
