import React from 'react'
import pic from '../assets/images/LoginImage.png' 
import { useNavigate } from 'react-router-dom';

export default function SideImage() {

    const navigate = useNavigate();

    return (
        <div className='w-full h-screen relative' >
            <img onClick={()=> navigate('/')} className='w-full h-screen cursor-pointer' alt='sideImage' src={pic} />
            <div className=' absolute top-0 justify-end pb-24 z-20 h-screen w-full flex flex-col pl-10 pr-16 text-white ' >
                <p className='text-3xl font-Graphik-Bold'>9jaWarehouse Admin</p>
                <p style={{color:'#DCDCDC'}} className='text-base font-Graphik-Regular mt-10 mb-6'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Bibendum est ultricies integer quis. Iaculis urna id volutpat lacus laoreet. Mauris vitae ultricies leo integer malesuada. Ac odio tempor orci dapibus ultrices in. Egestas diam in arcu cursus euismod. Dictum fusce ut placerat orci nulla.</p> 
            </div>
        </div>
    )
}
