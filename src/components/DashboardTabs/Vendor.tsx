import React from 'react';
import { Outlet } from 'react-router';

export default function Vendors() {
    return (
        <div className='w-full py-10 px-10' >
            <Outlet/>
        </div>
    );
}
