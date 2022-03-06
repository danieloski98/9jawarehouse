import React from 'react'
import { Outlet } from 'react-router-dom'

export default function RoleManagement() {
    return (
        <div className='w-full py-10 px-10' >
            <Outlet/>
        </div>
    )
}
