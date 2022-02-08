import React from 'react'
import Menu from '../components/Menu'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom' 

export default function Dashboard() {

    // const [tab, setTab] = React.useState('Overview')  

    return (
        <div className='w-screen h-screen overflow-x-hidden overflow-y-hidden' >  
            <div className=' overflow-hidden flex flex-row' >
                <div className='flex ' style={{width: '300px', backgroundColor: '#fff', borderTopRightRadius: '40px'}} >
                    <Menu />
                </div>
                <div  style={{backgroundColor: '#F6F4F6'}} className='w-screen pt-32 lg:pt-0 overflow-x-hidden h-screen lg:w-full bg-white overflow-y-auto  ' >
                    <Navbar /> 
                    <>
                        <Outlet />
                    </>
                </div>
            </div>
        </div>
    )
}
