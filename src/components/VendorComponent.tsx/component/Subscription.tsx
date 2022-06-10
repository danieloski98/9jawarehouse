import { Input, Select, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import React from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { ISubscription } from '../../../types/Subscriptions'
import { IUser } from '../../../types/user'
import CancelSubscribtion from '../CancelSubscribtion'
import RenewSubscribtion from '../modal/RenewSubscribtion'
import SubscriptionModal from '../modal/SubscriptionModal'

const Information = [
    {
      id: '16GSF572HH',
      amount: 'N1000',
      period: 'Monthly',
      date: 'Jun 20, 2021', 
      status: 'Active'
    },
    {
      id: '16GSF572HH',
      amount: 'N1000',
      period: 'Monthly',
      date: 'Jun 20, 2021', 
      status: 'Active'
    },
    {
      id: '16GSF572HH',
      amount: 'N1000',
      period: 'Monthly',
      date: 'Jun 20, 2021', 
      status: 'Expired'
    },
    {
      id: '16GSF572HH',
      amount: 'N1000',
      period: 'Monthly',
      date: 'Jun 20, 2021', 
      status: 'Active'
    },
    {
      id: '16GSF572HH',
      amount: 'N1000',
      period: 'Monthly',
      date: 'Jun 20, 2021', 
      status: 'Expired'
    },
]

export default function Subscription({user}: {user: IUser}) {

    const [showModal, setShowModal] = React.useState(false)
    const [renewModal, setRenewModal] = React.useState(false)
    const [cancelModal, setCancelModal] = React.useState(false)
    const [active, setActive] = React.useState({} as ISubscription);

    return (
        <div className='w-full' >  
            {/* <div className='w-full flex my-6 px-8 items-center justify-between ' >
                <div className='bg-white w-full mx-2 p-4 rounded-lg' >
                    <p style={{fontSize: '24px', color: '#004143'}} className='font-Graphik-SemiBold'>N30,000</p>
                    <p className='text-sm font-Graphik-Medium mt-1' >Total Amount</p>
                    <p style={{color: '#8A8A8A'}} className='text-xs font-Graphik-Regular mt-2' ><span style={{color: '#E00253'}} >-2%</span> than last month</p>
                </div> 
                <div className='bg-white w-full mx-2 p-4 rounded-lg' >
                    <p style={{fontSize: '24px'}} className='font-Graphik-SemiBold'>N,3000</p>
                    <p className='text-sm font-Graphik-Medium mt-1' >Current Balance</p>
                    <p style={{color: '#8A8A8A'}} className='text-xs font-Graphik-Regular mt-2' ><span style={{color: '#E00253'}} >-2%</span> than last month</p>
                </div> 
                <div className='bg-white w-full mx-2 p-4 rounded-lg' >
                    <p style={{fontSize: '24px'}} className='font-Graphik-SemiBold'>28</p>
                    <p className='text-sm font-Graphik-Medium mt-1' >Days Left</p>
                    <p style={{color: '#8A8A8A'}} className='text-xs font-Graphik-Regular mt-2' ><span style={{color: '#0CD27C'}} >-2%</span> than last month</p>
                </div> 
            </div> */}
            <div className='w-full flex items-center my-12' > 
                <div className='w-auto' >
                    <div className='flex items-center' >
                        {/* <div style={{borderColor: '#C2C2C2'}} className='w-10 h-10 rounded-lg cursor-pointer flex justify-center items-center border' > 
                            <IoIosArrowBack color='#878787' />
                        </div>
                        <div style={{borderColor: '#C2C2C2'}} className='w-auto h-10 font-Graphik-Bold rounded-lg flex border mx-2'> 
                            <div style={{backgroundColor: '#3E3F41'}} className='w-10 cursor-pointer h-10 rounded-lg flex text-white justify-center items-center' >
                                1
                            </div>
                            <div style={{color: '#202020'}} className='w-10 cursor-pointer h-10 rounded-lg flex text-white justify-center items-center' >
                                2
                            </div>
                            <div style={{color: '#202020'}} className='w-10 cursor-pointer h-10 rounded-lg flex text-white justify-center items-center' >
                                3
                            </div>
                            <div style={{color: '#202020'}} className='w-10 cursor-pointer h-10 rounded-lg flex text-white justify-center items-center' >
                                4
                            </div>
                        </div> */}
                        {/* <div style={{borderColor: '#C2C2C2'}} className='w-10 h-10 rounded-lg cursor-pointer flex justify-center items-center border' >
                            <IoIosArrowForward color='#878787' />
                        </div> */}
                    </div>
                    <p style={{fontSize: '14px'}} className='font-Graphik-Regular mt-2'>Showing <span className='font-Graphik-SemiBold' >1-{user.subscriptions?.length}</span> from <span className='font-Graphik-SemiBold' >{user.subscriptions?.length} data</span></p>
                </div>
                {/* <div className='w-full flex items-center ml-20'>
                    <Input  className='font-Graphik-Regular mx-2' fontSize='14px' backgroundColor='#FBFBFB' placeholder='Search tranactions' />
                    
                    <p style={{fontSize: '14px'}} className=' ml-10 font-Graphik-Medium mx-2'>Filter</p>
                    <Select className='font-Graphik-Regular mx-2' fontSize='14px' backgroundColor='#FBFBFB' placeholder='All Reviews'>
                        <option value='option1'>Option 1</option>
                        <option value='option2'>Option 2</option>
                        <option value='option3'>Option 3</option>
                    </Select>
                <button style={{backgroundColor: '#1A8F85'}} className='px-8 py-3 font-Graphik-Regular text-sm text-white rounded-md ml-8' >Apply</button>
                </div> */}
            </div>
            <div className='bg-white w-full py-6' > 
                <Table variant='unstyled' >
                    {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
                    <Thead>
                        <Tr className='font-Graphik-Medium text-sm' >
                            <Th>TRANSACTION ID</Th>
                            <Th>AMOUNT PAID</Th> 
                            <Th>PERIOD</Th> 
                            <Th>DATE</Th> 
                            <Th>STATUS</Th> 
                            <Th>ACTION</Th> 
                        </Tr>
                    </Thead>
                    <Tbody>
                        {user.subscriptions !== undefined && user.subscriptions.map((item, index)=> {
                            return(
                                <Tr className='font-Graphik-Regular text-sm' key={index} >
                                    <Td>{item.reference_id}</Td> 
                                    <Td>{item.amount}</Td>
                                    <Td>{item.amount === 12000 ? '6 Months':'12 Months'}</Td>
                                    <Td>{new Date(item.created_at).toDateString()}</Td>
                                    <Td style={item.status === 1 ? {color: "#777777"}: {color: '#0CD27C'}} >{item.status === 1 ? 'Pending':'Active'}</Td>
                                    <Td >
                                        <svg onClick={()=> { setActive(item); setShowModal(true) }} className='mx-auto cursor-pointer' id="Iconly_Bold_Show" data-name="Iconly/Bold/Show" xmlns="http://www.w3.org/2000/svg" width="15" height="12" viewBox="0 0 15 12">
                                            <g id="Show">
                                                <path id="Show-2" data-name="Show" d="M7.493,12C4.4,12,1.611,9.836.044,6.211a.543.543,0,0,1,0-.429C1.609,2.161,4.394,0,7.493,0H7.5a6.98,6.98,0,0,1,4.3,1.534,10.676,10.676,0,0,1,3.154,4.248.543.543,0,0,1,0,.429C13.389,9.836,10.6,12,7.5,12ZM4.573,6A2.923,2.923,0,1,0,7.5,3.091,2.918,2.918,0,0,0,4.573,6Zm1.1,0a1.865,1.865,0,0,1,.037-.356h.036a1.5,1.5,0,0,0,1.5-1.44A1.492,1.492,0,0,1,7.5,4.18,1.814,1.814,0,1,1,5.672,6Z" fill="#200e32"/>
                                            </g>
                                        </svg>
                                    </Td>
                                </Tr> 
                            )
                        })}
                    </Tbody> 
                </Table>
            </div>

            {showModal && 
                (
                    <>
                        <div className="h-auto flex justify-center items-center overflow-x-hidden overflow-y-hidden fixed pb-4 px-4 inset-0 z-50 outline-none focus:outline-none"> 
                            <SubscriptionModal close={setShowModal} subs={active} />
                        </div> 
                        <div className="opacity-25 fixed flex flex-1 inset-0 z-40 bg-black"/>
                    </>
                )} 
        </div>
    )
}
