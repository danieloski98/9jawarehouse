import React from 'react'
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io"
import ProfileInformation from './component/ProfileInformation';
import CustomerReview from './component/CustomerReview';
import Verification from './component/Verification';
import Subscription from './component/Subscription';

export default function VendorProfile() {

    const navigate = useNavigate();
    const [tab, setTab] = React.useState(0)
 
    return (
        <div className='w-full py-10 px-10' >
            <div className='w-full flex items-center' >  
                <div onClick={()=> navigate('/dashboard/vendors')} className='w-5 h-5 cursor-pointer mr-4 rounded-full flex border border-black justify-center items-center' >
                    <IoIosArrowBack />
                </div>
                <p style={{fontSize: '20px'}} className='font-Graphik-Medium'>Vendor Profile</p>  
            </div>
            <div className='w-full flex text-sm items-center mt-6 rounded-lg py-2 px-1 bg-white' >
                <div onClick={()=> setTab(0)} style={tab === 0 ? {backgroundColor: '#004143', color: 'white'}: {}} className='w-full cursor-pointer font-Graphik-Regular mx-3 py-3 rounded-lg flex justify-center items-center' >
                    Profile Information
                </div>
                <div onClick={()=> setTab(1)} style={tab === 1 ? {backgroundColor: '#004143', color: 'white'}: {}} className='w-full cursor-pointer font-Graphik-Regular mx-3 py-3 rounded-lg flex justify-center items-center' >
                    Customer Reviews
                </div>
                <div onClick={()=> setTab(2)} style={tab === 2 ? {backgroundColor: '#004143', color: 'white'}: {}} className='w-full cursor-pointer font-Graphik-Regular mx-3 py-3 rounded-lg flex justify-center items-center' >
                    Verification
                </div>
                <div onClick={()=> setTab(3)} style={tab === 3 ? {backgroundColor: '#004143', color: 'white'}: {}} className='w-full cursor-pointer font-Graphik-Regular mx-3 py-3 rounded-lg flex justify-center items-center' >
                    Subscriptions
                </div>
                <div onClick={()=> setTab(4)} style={tab === 4 ? {backgroundColor: '#004143', color: 'white'}: {}} className='w-full cursor-pointer font-Graphik-Regular mx-3 py-3 rounded-lg flex justify-center items-center' >
                    Support Tickets
                </div>
            </div>
            <div className='w-full' >
                {tab === 0 ?
                    <ProfileInformation />
                        :tab === 1 ?
                            <CustomerReview />
                                :tab === 2 ?
                                    <Verification />
                                        :tab === 3 ?
                                            <Subscription />
                :null}
            </div>
        </div>
    )
}
