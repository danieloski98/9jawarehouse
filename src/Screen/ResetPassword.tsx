import { Input } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png' 
import SideImage from '../components/SideImage'

export default function ResetPassword() {

    const navigate = useNavigate();
    const [show, setShow] = React.useState(false)

    return (
        <div className='w-full flex bg-white flex-row h-screen'> 
            <SideImage />
            <div className='w-full h-screen justify-center relative items-center px-10 flex flex-col'>
                
                <img style={{width: '70px', height:'70px'}} className='absolute top-8 right-16' alt='logo' src={logo} />
                {!show ?  
                    <div style={{width: '500px'}} >
                        <p className='text-lg font-Graphik-Bold'>Reset Password</p>
                        <p className='text-base font-Graphik-Regular mt-4 mb-6'>Enter Your Email Address To Get A New Password</p> 
                        <div className='my-4 pt-4 w-full' >
                            <p className='text-sm mb-1 font-Graphik-Medium '>Email Address</p> 
                            <Input size='lg' placeholder="Email" />
                        </div>  
                        <button onClick={()=> setShow(true)} style={{ width: '166px' ,backgroundColor:'#1A8F85'}} className='text-base text-white mt-4 rounded  py-3 font-Graphik-SemiBold'>Send Password</button>
                    </div>
                :
                    <div onClick={()=> navigate('/')} className='cursor-pointer' style={{width: '500px'}} >
                        <p className='text-lg font-Graphik-Bold text-center'>Password Sent</p>
                        <p className='text-base font-Graphik-Regular text-center mt-4 '>Your New Secure Password Has Been Sent To Your Email<br/> Address</p>  
                    </div>
                }
            </div>
        </div>
    )
}
