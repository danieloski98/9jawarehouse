import { Select, Input, Table, Thead, Tr, Th, Tbody, Td } from '@chakra-ui/react'
import React from 'react'

const Information = [
    {
      title: 'Welcome To 9jawa...',
      sendon: 'Users & Vendors',
      no: '357 Users',
      sentto: 'June 20, 2021', 
      status: 'Delivered'
    },
    {
      title: 'Welcome To 9jawa...',
      sendon: 'Users & Vendors',
      no: '357 Users',
      sentto: 'June 20, 2021', 
      status: 'Delivered'
    },
    {
      title: 'Welcome To 9jawa...',
      sendon: 'Users & Vendors',
      no: '357 Users',
      sentto: 'June 20, 2021', 
      status: 'Delivered'
    },
    {
      title: 'Welcome To 9jawa...',
      sendon: 'Users & Vendors',
      no: '357 Users',
      sentto: 'June 20, 2021', 
      status: 'Delivered'
    },
    {
      title: 'Welcome To 9jawa...',
      sendon: 'Users & Vendors',
      no: '357 Users',
      sentto: 'June 20, 2021', 
      status: 'Delivered'
    },
]

export default function PushNotifications() { 
    return (
        <div className='w-full py-10 px-10' >
            <div className='w-full flex items-center' > 
                <div className=''>
                    <p style={{fontSize: '20px'}} className='font-Graphik-Medium'>Push Notifications</p>
                    <p style={{color: '#8A8A8A'}} className='text-sm font-Graphik-Regular' >Manage all notifications on 9jawarehouse</p>
                </div>
                <div className='ml-auto'>
                    <Select className='font-Graphik-Regular ' fontSize='12px' backgroundColor='white' placeholder='Past 30 days'>
                        <option value='option1'>Option 1</option>
                        <option value='option2'>Option 2</option>
                        <option value='option3'>Option 3</option>
                    </Select>
                </div>
            </div>
            <div className='w-full flex my-6 px-8 items-center justify-between ' >
                <div className='bg-white w-full mx-2 p-4 rounded-lg' >
                    <p style={{fontSize: '24px'}} className='font-Graphik-SemiBold'>3000</p>
                    <p className='text-sm font-Graphik-Medium mt-1' >Total Push Notifications</p>
                    {/* <p style={{color: '#8A8A8A'}} className='text-xs font-Graphik-Regular mt-2' ><span style={{color: '#E00253'}} >-2%</span> than last month</p> */}
                </div> 
                <div className='bg-white w-full mx-2 p-4 rounded-lg' >
                    <p style={{fontSize: '24px'}} className='font-Graphik-SemiBold'>2500</p>
                    <p className='text-sm font-Graphik-Medium mt-1' >Total This Week</p>
                    {/* <p style={{color: '#8A8A8A'}} className='text-xs font-Graphik-Regular mt-2' ><span style={{color: '#E00253'}} >-2%</span> than last month</p> */}
                </div> 
                <div className='bg-white w-full mx-2 p-4 rounded-lg' >
                    <p style={{fontSize: '24px'}} className='font-Graphik-SemiBold'>500</p>
                    <p className='text-sm font-Graphik-Medium mt-1' >Average Rating</p>
                    {/* <p style={{color: '#8A8A8A'}} className='text-xs font-Graphik-Regular mt-2' ><span style={{color: '#0CD27C'}} >-2%</span> than last month</p> */}
                </div> 
            </div>
            <div className='flex items-center my-12' >
                {/* <p style={{fontSize: '16px'}} className='font-Graphik-SemiBold'>Reviews</p> */}
            
                <div className='ml-auto flex items-center'>
                    <Input  className='font-Graphik-Regular mx-2' fontSize='14px' backgroundColor='#FBFBFB' placeholder='Search Push Notifications' />
                    
                <p style={{fontSize: '14px'}} className='font-Graphik-Medium mx-2'>Filter</p>
                    <Select className='font-Graphik-Regular mx-2' fontSize='14px' backgroundColor='#FBFBFB' placeholder='All Push Notifications'>
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
                            <Th>TITLE</Th>
                            <Th>SENT TO</Th> 
                            <Th>NO OF RECIPIENTS</Th> 
                            <Th>SENT ON</Th> 
                            <Th>STATUS</Th> 
                            <Th>ACTION</Th> 
                        </Tr>
                    </Thead>
                    <Tbody>
                        {Information.map((item, index)=> {
                            return(
                                <Tr className='font-Graphik-Regular text-sm' key={index} >
                                    <Td>{item.title}</Td> 
                                    <Td>{item.sentto}</Td>
                                    <Td>{item.no}</Td>
                                    <Td>{item.sendon}</Td>
                                    <Td >{item.status}</Td>
                                    <Td >
                                        <svg className='mx-auto cursor-pointer' id="Iconly_Bold_Show" data-name="Iconly/Bold/Show" xmlns="http://www.w3.org/2000/svg" width="15" height="12" viewBox="0 0 15 12">
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
        </div>
    )
}
