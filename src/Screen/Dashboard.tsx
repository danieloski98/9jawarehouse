import React from 'react'
import Menu from '../components/Menu'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom' 
import NotificationModal from '../components/modals/NotificationModal'

export default function Dashboard() {

    const [showModal, setShowModal] = React.useState(false)

    return (
        <div className='w-screen h-screen overflow-x-hidden overflow-y-hidden' >  
            <div className=' overflow-hidden flex flex-row' >
                <div className='flex ' style={{width: '300px', backgroundColor: '#fff', borderTopRightRadius: '40px'}} >
                    <Menu />
                </div>
                <div  style={{backgroundColor: '#F6F4F6'}} className='w-screen pt-32 lg:pt-0 overflow-x-hidden h-screen lg:w-full bg-white overflow-y-auto  ' >
                    <Navbar open={setShowModal} /> 
                    <>
                        <Outlet />
                    </>
                </div>
            </div> 
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
