import { Select, Input, Table, Thead, Tr, Th, Tbody, Td } from '@chakra-ui/react'
import React from 'react'
import CancelSubscribtion from '../VendorComponent.tsx/CancelSubscribtion'
import RenewSubscribtion from '../VendorComponent.tsx/modal/RenewSubscribtion'
import SubscriptionModal from '../VendorComponent.tsx/modal/SubscriptionModal'

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

export default function Subscriptions() {

    const [showModal, setShowModal] = React.useState(false)
    const [renewModal, setRenewModal] = React.useState(false)
    const [cancelModal, setCancelModal] = React.useState(false)

    return (
        <div className='w-full py-10 px-10' >
            <div className='w-full flex items-center' > 
                <div className=''>
                    <p style={{fontSize: '20px'}} className='font-Graphik-Medium'>Subscriptions</p>
                    <p style={{color: '#8A8A8A'}} className='text-sm font-Graphik-Regular' >Keep Track of all supports on 9jawarehouse</p>
                </div>
                <div className='ml-auto'>
                    <Select className='font-Graphik-Regular ' fontSize='12px' backgroundColor='white' placeholder='Past 30 days'>
                        <option value='option1'>Option 1</option>
                        <option value='option2'>Option 2</option>
                        <option value='option3'>Option 3</option>
                    </Select>
                </div>
            </div>
            <div className='flex items-center my-12' >
                {/* <p style={{fontSize: '16px'}} className='font-Graphik-SemiBold'>Reviews</p> */}
            
                <div className='ml-auto flex items-center'>
                    <Input  className='font-Graphik-Regular mx-2' fontSize='14px' backgroundColor='#FBFBFB' placeholder='Search Subscriptions' />
                    
                <p style={{fontSize: '14px'}} className='font-Graphik-Medium mx-2'>Filter</p>
                    <Select className='font-Graphik-Regular mx-2' fontSize='14px' backgroundColor='#FBFBFB' placeholder='All Subscriptions'>
                        <option value='option1'>Option 1</option>
                        <option value='option2'>Option 2</option>
                        <option value='option3'>Option 3</option>
                    </Select>
                <button style={{backgroundColor: '#1A8F85'}} className='px-8 py-3 font-Graphik-Regular text-sm text-white rounded-md ml-8' >Apply</button>
                </div>
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
                        {Information.map((item, index)=> {
                            return(
                                <Tr className='font-Graphik-Regular text-sm' key={index} >
                                    <Td>{item.id}</Td> 
                                    <Td>{item.amount}</Td>
                                    <Td>{item.period}</Td>
                                    <Td>{item.date}</Td>
                                    <Td style={item.status === 'Active' ? {color: "#0CD27C"}: {color: '#777777'}} >{item.status}</Td>
                                    <Td >
                                        <svg onClick={()=> setShowModal(true)} className='mx-auto cursor-pointer' id="Iconly_Bold_Show" data-name="Iconly/Bold/Show" xmlns="http://www.w3.org/2000/svg" width="15" height="12" viewBox="0 0 15 12">
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

            <div className='flex items-center my-12' >
                <p style={{fontSize: '14px'}} className='font-Graphik-Regular'>Showing <span className='font-Graphik-SemiBold' >1-10</span> from <span className='font-Graphik-SemiBold' >46 data</span></p>
                <div className='flex items-center ml-auto' >
                    <div style={{borderColor: '#C2C2C2'}} className='w-10 h-10 rounded-lg cursor-pointer flex justify-center items-center border' >

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
                    </div>
                    <div style={{borderColor: '#C2C2C2'}} className='w-10 h-10 rounded-lg cursor-pointer flex justify-center items-center border' >

                    </div>
                </div>
            </div>

            {showModal ? 
                (
                    <>
                        <div className="h-auto flex justify-center items-center overflow-x-hidden overflow-y-hidden fixed pb-4 px-4 inset-0 z-50 outline-none focus:outline-none"> 
                            <SubscriptionModal close={setShowModal} next={setRenewModal} cancel={setCancelModal} />
                        </div> 
                        <div className="opacity-25 fixed flex flex-1 inset-0 z-40 bg-black"/>
                    </>
                ) : null} 

            {renewModal ? 
                (
                    <>
                        <div className="h-auto flex justify-center items-center overflow-x-hidden overflow-y-hidden fixed pb-4 px-4 inset-0 z-50 outline-none focus:outline-none"> 
                            <RenewSubscribtion close={setRenewModal} />
                        </div> 
                        <div className="opacity-25 fixed flex flex-1 inset-0 z-40 bg-black"/>
                    </>
                ) : null} 

            {cancelModal ? 
                (
                    <>
                        <div className="h-auto flex justify-center items-center overflow-x-hidden overflow-y-hidden fixed pb-4 px-4 inset-0 z-50 outline-none focus:outline-none"> 
                            <CancelSubscribtion close={setCancelModal} />
                        </div> 
                        <div className="opacity-25 fixed flex flex-1 inset-0 z-40 bg-black"/>
                    </>
                ) : null} 
        </div>
    )
}
