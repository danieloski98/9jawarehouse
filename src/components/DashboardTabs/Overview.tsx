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
            <div className='w-full flex  ' >
                <div>
                    <p style={{fontSize: '20px'}} className='font-Graphik-Medium'>Overview</p>
                    <p style={{color: '#8A8A8A'}} className='text-sm font-Graphik-Regular' >Keep track of 9jawarehosue performance</p>
                </div>

            </div>
        </div>
    )
}
