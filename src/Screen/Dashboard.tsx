import React from 'react'
import Menu from '../components/Menu'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom' 
import NotificationModal from '../components/modals/NotificationModal'
import useSync from '../hooks/useSync';

export default function Dashboard() {
    // custom hook for synchronization
    const sync = useSync();

    return (
        <div className='w-screen h-screen overflow-x-hidden overflow-y-hidden' >  
            <div className="w-full h-full flex">
                <div className='w-72 h-full shadow-xl border-r-2 border-gray-200'>
                    <Menu />
                </div>
                <div className='flex-1 flex flex-col overflow-hidden z-0'>
                    <div className="w-full h-24 bg-white shadow-md z-0">
                        <Navbar />
                    </div>
                    <div className="flex-1 overflow-auto z-10 bg-gray-100">
                        <Outlet />
                    </div>  
                </div>
            </div>
        </div>
    )
}
