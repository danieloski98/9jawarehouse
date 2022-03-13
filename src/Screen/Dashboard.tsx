import React from 'react'
import Menu from '../components/Menu'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom' 
import NotificationModal from '../components/modals/NotificationModal'
import useSync from '../hooks/useSync';

export default function Dashboard() {

    const [showModal, setShowModal] = React.useState(false);

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
            {/* <div className='overflow-hidden w-full h-full flex flex-row' >
                <div className='flex ' style={{width: '300px', backgroundColor: '#fff', borderTopRightRadius: '40px'}} >
                    <Menu />
                </div>
                <div  style={{backgroundColor: '#F6F4F6'}} className='w-full flex-1 pt-32 lg:pt-0 overflow-x-hidden lg:w-full bg-purple-300 overflow-y-auto flex  ' >
                    <div className="w-full h-32">
                        <Navbar open={setShowModal} />     
                    </div>
                    <div className="flex-1 bg-red-200">
                        <Outlet />
                    </div>
                </div>
            </div>  */}
        {showModal ? 
            (
                <>
                    <div className="h-auto flex justify-end overflow-x-hidden overflow-y-hidden fixed inset-0 z-50 outline-none focus:outline-none"> 
                        <NotificationModal close={setShowModal} />
                    </div> 
                    <div className="opacity-25 fixed flex flex-1 inset-0 z-40 bg-black"/>
                </>
            ) : null} 
        </div>
    )
}
