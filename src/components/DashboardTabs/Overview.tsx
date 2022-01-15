import { Select } from '@chakra-ui/react'
import React from 'react'

export default function Overview() {
    return (
        <div className='w-full py-10 px-10' >
            <div className='w-full flex items-center' > 
                <div className=''>
                    <p style={{fontSize: '20px'}} className='font-Graphik-Medium'>Overview</p>
                    <p style={{color: '#8A8A8A'}} className='text-sm font-Graphik-Regular' >Keep track of 9jawarehosue performance</p>
                </div>
                <div className='ml-auto'>
                    <Select className='font-Graphik-Regular ' fontSize='12px' backgroundColor='white' placeholder='Past 30 days'>
                        <option value='option1'>Option 1</option>
                        <option value='option2'>Option 2</option>
                        <option value='option3'>Option 3</option>
                    </Select>
                </div>
                <button style={{backgroundColor: '#1A8F85'}} className='px-4 py-3 font-Graphik-Regular text-sm text-white rounded-md ml-4' >Download Report</button>
            </div>
            <div className='w-full flex my-6 px-8 items-center justify-between ' >
                <div className='bg-white w-full mx-2 p-4 rounded-lg' >
                    <p style={{fontSize: '24px'}} className='font-Graphik-SemiBold'>42729</p>
                    <p className='text-sm font-Graphik-Medium mt-1' >Total Registered Users</p>
                    <p style={{color: '#8A8A8A'}} className='text-xs font-Graphik-Regular mt-2' ><span style={{color: '#E00253'}} >-2%</span> than last month</p>
                </div> 
                <div className='bg-white w-full mx-2 p-4 rounded-lg' >
                    <p style={{fontSize: '24px'}} className='font-Graphik-SemiBold'>503</p>
                    <p className='text-sm font-Graphik-Medium mt-1' >Total Vendor Reviews</p>
                    <p style={{color: '#8A8A8A'}} className='text-xs font-Graphik-Regular mt-2' ><span style={{color: '#E00253'}} >-2%</span> than last month</p>
                </div> 
                <div className='bg-white w-full mx-2 p-4 rounded-lg' >
                    <p style={{fontSize: '24px'}} className='font-Graphik-SemiBold'>N1,020,000</p>
                    <p className='text-sm font-Graphik-Medium mt-1' >Total Subscription</p>
                    <p style={{color: '#8A8A8A'}} className='text-xs font-Graphik-Regular mt-2' ><span style={{color: '#0CD27C'}} >-2%</span> than last month</p>
                </div> 
            </div>
        </div>
    )
}
