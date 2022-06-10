import React from 'react'
import { useNavigate } from 'react-router-dom';
import useSync from '../../hooks/useSync';
import { IAdmin } from '../../types/Admin.Type';
import ReuseableUserModal from '../VendorComponent.tsx/modal/ReuseableUserModal';
import { FiMoreVertical } from 'react-icons/fi'

export default function RoleManage() { 

    const navigate = useNavigate(); 
    const [showModal, setShowModal] = React.useState(false);
    const [nshowModal, setNshowmodal] = React.useState(0);
    const [showOption, setShowOption] = React.useState(0);
    const [superadmins, setSuperAdmins] = React.useState([] as IAdmin[]);
    const [nadmins, setAdmins] = React.useState([] as IAdmin[]);

    const {admins} = useSync();

    React.useEffect(() => {
        const s = admins.filter((item) => item.type === 1);
        const n = admins.filter((item)=> item.type !== 1);

        setSuperAdmins(s);
        setAdmins(n);
    }, [admins])

    
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
               <div className="w-full h-auto flex">
                   {superadmins.length > 0 && superadmins.map((item, index) => (
                        <div key={index.toString()} style={{width: '350px'}} className='flex relative py-2 px-3 mt-6 ' >
                            <div className='w-24 rounded-lg h-20 bg-blue-300' >
                                <div className='w-24 rounded-lg h-20 bg-blue-300 flex justify-center items-center' >
                                    <img src={`https://avatars.dicebear.com/api/human/${item.email}.png`} className="w-16 h-16" alt="" />
                                </div>
                            </div>
                            <div className=' my-auto ml-3' >
                                <p className='font-Graphik-Medium ' >{item.fullname}</p>
                                <p className='font-Graphik-Regular text-sm '>{item.email}</p>
                            </div>
                            <FiMoreVertical size={25} color="black" onClick={()=> setShowOption(index+1)} className="cursor-pointer" />
                            {showOption === index+1 ? 
                                <div style={{boxShadow: '0px 3px 6px #00000029'}} className='py-3 absolute right-3 top-12 bg-white px-4 ' >
                                    <svg onClick={()=> setShowOption(0)} width="10" className='mb-1 cursor-pointer ml-auto' height="10" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8 8L1 15M1 1L8 8L1 1ZM8 8L15 15L8 8ZM8 8L15 1L8 8Z" stroke="#000" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                    <p onClick={()=> navigate(`/dashboard/rolemanagement/edituser/${item._id}`)} className='font-Graphik-Regular cursor-pointer text-sm mr-10'>Edit</p>
                                    {/* <p onClick={()=> setShowModal(true)} className='font-Graphik-Regular text-sm my-2 cursor-pointer '>Delete</p> */}
                                    {/* <p className='font-Graphik-Regular text-sm cursor-pointer '>Reset Password</p> */}
                                </div>
                            :null}
                        </div>
                   ))}
                   {superadmins.length < 1 && (
                       <p>There are no super admins</p>
                   )}
               </div>
                <div className='mt-10' > 
                    <p className='font-Graphik-SemiBold text-sm' >Admin</p>
                    <div className="w-full h-auto flex flex-wrap">
                   {nadmins.length > 0 && nadmins.map((item, index) => (
                        <div key={index.toString()} style={{width: '350px'}} className='flex relative py-2 px-3 mt-6 ' >
                            <div className='w-24 rounded-lg h-20 bg-blue-300 flex justify-center items-center' >
                                <img src={`https://avatars.dicebear.com/api/human/${item.email}.png`} className="w-16 h-16" alt="" />
                            </div>
                            <div className=' my-auto ml-3' >
                                <p className='font-Graphik-Medium ' >{item.fullname}</p>
                                <p className='font-Graphik-Regular text-sm '>{item.email}</p>
                            </div>
                            <FiMoreVertical size={25} color="black" onClick={()=> setNshowmodal(index+1)} className="cursor-pointer" />
                          
                            {nshowModal === index+1 ? 
                                <div style={{boxShadow: '0px 3px 6px #00000029'}} className='py-3 absolute right-3 top-12 bg-white px-4' >
                                    <svg onClick={()=> setNshowmodal(0)} width="10" className='mb-1 cursor-pointer ml-auto' height="10" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8 8L1 15M1 1L8 8L1 1ZM8 8L15 15L8 8ZM8 8L15 1L8 8Z" stroke="#000" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                    <p onClick={()=> navigate(`/dashboard/rolemanagement/edituser/${item._id}`)} className='font-Graphik-Regular cursor-pointer text-sm mr-10'>Edit</p>
                                    {/* <p onClick={()=> setShowModal(true)} className='font-Graphik-Regular text-sm my-2 cursor-pointer '>Delete</p> */}
                                    {/* <p className='font-Graphik-Regular text-sm cursor-pointer '>Reset Password</p> */}
                                </div>
                            :null}
                        </div>
                   ))}
                   {nadmins.length < 1 && (
                       <p>There are no super admins</p>
                   )}
               </div>
                </div>
            </div>  
{/*  */}
        </div>
    )
}
