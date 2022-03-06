import React from 'react'
import { useNavigate } from 'react-router-dom';
import ReuseableUserModal from '../VendorComponent.tsx/modal/ReuseableUserModal';

export default function RoleManage() { 

    const navigate = useNavigate(); 
    const [showModal, setShowModal] = React.useState(false)
    const [showOption, setShowOption] = React.useState(0)
    
    return (
        <div className='w-full h-full' > 
            <div className='w-full flex items-center' > 
                <div className=''>
                    <p style={{fontSize: '20px'}} className='font-Graphik-Medium'>Role Managment</p>
                    <p style={{color: '#8A8A8A'}} className='text-sm font-Graphik-Regular' >Keep Track of all roles on 9jawarehouse</p>
                </div>
                <button style={{border: '1px solid #1A8F85', color:'#1A8F85'}} className='px-4 py-3 font-Graphik-Regular text-sm text-white rounded-md ml-auto' >View Logs</button>
                <button onClick={()=> navigate('/dashboard/rolemanagement/AddUser')} style={{backgroundColor: '#1A8F85'}} className='px-4 py-3 font-Graphik-Regular text-sm text-white rounded-md ml-4' >New User</button>
            </div>
            <div className='my-12 bg-white rounded-xl p-8' > 
                <p className=' font-Graphik-SemiBold text-sm' >Super Admin</p>
                <div style={{width: '300px'}} className='flex relative py-2 px-3 mt-6 ' >
                    <div className='w-20 rounded-lg h-20 bg-blue-300' >

                    </div>
                    <div className=' my-auto ml-3' >
                        <p className='font-Graphik-Medium ' >George Abdul</p>
                        <p className='font-Graphik-Regular text-sm '>youremail@gmail.com</p>
                    </div>
                    <svg onClick={()=> setShowOption(1)} className='ml-auto cursor-pointer' width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.99935 4.66667C8.73573 4.66667 9.33268 4.06971 9.33268 3.33333C9.33268 2.59695 8.73573 2 7.99935 2C7.26297 2 6.66602 2.59695 6.66602 3.33333C6.66602 4.06971 7.26297 4.66667 7.99935 4.66667Z" fill="#000"/>
                        <path d="M7.99935 9.33333C8.73573 9.33333 9.33268 8.73638 9.33268 8C9.33268 7.26362 8.73573 6.66666 7.99935 6.66666C7.26297 6.66666 6.66602 7.26362 6.66602 8C6.66602 8.73638 7.26297 9.33333 7.99935 9.33333Z" fill="#000"/>
                        <path d="M7.99935 14C8.73573 14 9.33268 13.403 9.33268 12.6667C9.33268 11.9303 8.73573 11.3333 7.99935 11.3333C7.26297 11.3333 6.66602 11.9303 6.66602 12.6667C6.66602 13.403 7.26297 14 7.99935 14Z" fill="#000"/>
                    </svg>
                    {showOption === 1 ? 
                        <div style={{boxShadow: '0px 3px 6px #00000029'}} className='py-3 absolute right-3 top-12 bg-white px-4' >
                            <svg onClick={()=> setShowOption(0)} width="10" className='mb-1 cursor-pointer ml-auto' height="10" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 8L1 15M1 1L8 8L1 1ZM8 8L15 15L8 8ZM8 8L15 1L8 8Z" stroke="#000" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <p onClick={()=> navigate('/dashboard/rolemanagement/edituser')} className='font-Graphik-Regular cursor-pointer text-sm '>Edit</p>
                            <p onClick={()=> setShowModal(true)} className='font-Graphik-Regular text-sm my-2 cursor-pointer '>Delete</p>
                            <p className='font-Graphik-Regular text-sm cursor-pointer '>Reset Password</p>
                        </div>
                    :null}
                </div>
                <div className='mt-10' > 
                    <p className='font-Graphik-SemiBold text-sm' >Admin</p>
                    <div className='grid grid-cols-3 gap-6 mt-6' > 
                        <div style={{width: '300px'}} className='flex relative py-2 px-3 ' >
                            <div className='w-20 rounded-lg h-20 bg-blue-300' >

                            </div>
                            <div className=' my-auto ml-3' >
                                <p className='font-Graphik-Medium ' >George Abdul</p>
                                <p className='font-Graphik-Regular text-sm '>youremail@gmail.com</p>
                            </div>
                            <svg onClick={()=> setShowOption(2)} className='ml-auto cursor-pointer' width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.99935 4.66667C8.73573 4.66667 9.33268 4.06971 9.33268 3.33333C9.33268 2.59695 8.73573 2 7.99935 2C7.26297 2 6.66602 2.59695 6.66602 3.33333C6.66602 4.06971 7.26297 4.66667 7.99935 4.66667Z" fill="#000"/>
                                <path d="M7.99935 9.33333C8.73573 9.33333 9.33268 8.73638 9.33268 8C9.33268 7.26362 8.73573 6.66666 7.99935 6.66666C7.26297 6.66666 6.66602 7.26362 6.66602 8C6.66602 8.73638 7.26297 9.33333 7.99935 9.33333Z" fill="#000"/>
                                <path d="M7.99935 14C8.73573 14 9.33268 13.403 9.33268 12.6667C9.33268 11.9303 8.73573 11.3333 7.99935 11.3333C7.26297 11.3333 6.66602 11.9303 6.66602 12.6667C6.66602 13.403 7.26297 14 7.99935 14Z" fill="#000"/>
                            </svg>
                            {showOption === 2 ? 
                                <div style={{boxShadow: '0px 3px 6px #00000029'}} className='py-3 absolute right-3 top-12 bg-white px-4' >
                                    <svg onClick={()=> setShowOption(0)} width="10" className='mb-1 cursor-pointer ml-auto' height="10" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8 8L1 15M1 1L8 8L1 1ZM8 8L15 15L8 8ZM8 8L15 1L8 8Z" stroke="#000" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                    <p onClick={()=> navigate('/dashboard/rolemanagement/edituser')} className='font-Graphik-Regular cursor-pointer text-sm '>Edit</p>
                                    <p onClick={()=> setShowModal(true)} className='font-Graphik-Regular text-sm my-2 cursor-pointer '>Delete</p>
                                    <p className='font-Graphik-Regular text-sm cursor-pointer '>Reset Password</p>
                                </div>
                            :null}
                        </div>
                        <div style={{width: '300px'}} className='flex py-2 relative px-3 ' >
                            <div className='w-20 rounded-lg h-20 bg-blue-300' >

                            </div>
                            <div className=' my-auto ml-3' >
                                <p className='font-Graphik-Medium ' >George Abdul</p>
                                <p className='font-Graphik-Regular text-sm '>youremail@gmail.com</p>
                            </div>
                            <svg onClick={()=> setShowOption(3)} className='ml-auto cursor-pointer' width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.99935 4.66667C8.73573 4.66667 9.33268 4.06971 9.33268 3.33333C9.33268 2.59695 8.73573 2 7.99935 2C7.26297 2 6.66602 2.59695 6.66602 3.33333C6.66602 4.06971 7.26297 4.66667 7.99935 4.66667Z" fill="#000"/>
                                <path d="M7.99935 9.33333C8.73573 9.33333 9.33268 8.73638 9.33268 8C9.33268 7.26362 8.73573 6.66666 7.99935 6.66666C7.26297 6.66666 6.66602 7.26362 6.66602 8C6.66602 8.73638 7.26297 9.33333 7.99935 9.33333Z" fill="#000"/>
                                <path d="M7.99935 14C8.73573 14 9.33268 13.403 9.33268 12.6667C9.33268 11.9303 8.73573 11.3333 7.99935 11.3333C7.26297 11.3333 6.66602 11.9303 6.66602 12.6667C6.66602 13.403 7.26297 14 7.99935 14Z" fill="#000"/>
                            </svg>

                            {showOption === 3 ? 
                                <div style={{boxShadow: '0px 3px 6px #00000029'}} className='py-3 absolute right-3 top-12 bg-white px-4' >
                                    <svg onClick={()=> setShowOption(0)} width="10" className='mb-1 cursor-pointer ml-auto' height="10" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8 8L1 15M1 1L8 8L1 1ZM8 8L15 15L8 8ZM8 8L15 1L8 8Z" stroke="#000" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                    <p onClick={()=> navigate('/dashboard/rolemanagement/edituser')} className='font-Graphik-Regular cursor-pointer text-sm '>Edit</p>
                                    <p onClick={()=> setShowModal(true)} className='font-Graphik-Regular text-sm my-2 cursor-pointer '>Delete</p>
                                    <p className='font-Graphik-Regular text-sm cursor-pointer '>Reset Password</p>
                                </div>
                            :null}
                        </div>
                        <div style={{width: '300px'}} className='flex py-2 relative px-3 ' >
                            <div className='w-20 rounded-lg h-20 bg-blue-300' >

                            </div>
                            <div className=' my-auto ml-3' >
                                <p className='font-Graphik-Medium ' >George Abdul</p>
                                <p className='font-Graphik-Regular text-sm '>youremail@gmail.com</p>
                            </div>
                            <svg onClick={()=> setShowOption(4)} className='ml-auto cursor-pointer' width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.99935 4.66667C8.73573 4.66667 9.33268 4.06971 9.33268 3.33333C9.33268 2.59695 8.73573 2 7.99935 2C7.26297 2 6.66602 2.59695 6.66602 3.33333C6.66602 4.06971 7.26297 4.66667 7.99935 4.66667Z" fill="#000"/>
                                <path d="M7.99935 9.33333C8.73573 9.33333 9.33268 8.73638 9.33268 8C9.33268 7.26362 8.73573 6.66666 7.99935 6.66666C7.26297 6.66666 6.66602 7.26362 6.66602 8C6.66602 8.73638 7.26297 9.33333 7.99935 9.33333Z" fill="#000"/>
                                <path d="M7.99935 14C8.73573 14 9.33268 13.403 9.33268 12.6667C9.33268 11.9303 8.73573 11.3333 7.99935 11.3333C7.26297 11.3333 6.66602 11.9303 6.66602 12.6667C6.66602 13.403 7.26297 14 7.99935 14Z" fill="#000"/>
                            </svg>

                            {showOption === 4 ? 
                                <div style={{boxShadow: '0px 3px 6px #00000029'}} className='py-3 absolute right-3 top-12 bg-white px-4' >
                                    <svg onClick={()=> setShowOption(0)} width="10" className='mb-1 cursor-pointer ml-auto' height="10" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8 8L1 15M1 1L8 8L1 1ZM8 8L15 15L8 8ZM8 8L15 1L8 8Z" stroke="#000" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                    <p onClick={()=> navigate('/dashboard/rolemanagement/edituser')} className='font-Graphik-Regular cursor-pointer text-sm '>Edit</p>
                                    <p onClick={()=> setShowModal(true)} className='font-Graphik-Regular text-sm my-2 cursor-pointer '>Delete</p>
                                    <p className='font-Graphik-Regular text-sm cursor-pointer '>Reset Password</p>
                                </div>
                            :null}
                        </div>
                    </div>
                </div>
            </div>  
            
            {showModal ? 
                (
                    <>
                        <div className="h-auto flex justify-center items-center overflow-x-hidden overflow-y-hidden fixed pb-4 px-4 inset-0 z-50 outline-none focus:outline-none"> 
                        <ReuseableUserModal header='Delete User' body='You are about to delete Johnson’s account from the administrative account list' button='Delete Account' close={setShowModal} />
                        </div> 
                        <div className="opacity-25 fixed flex flex-1 inset-0 z-40 bg-black"/>
                    </>
                ) : null} 
        </div>
    )
}
