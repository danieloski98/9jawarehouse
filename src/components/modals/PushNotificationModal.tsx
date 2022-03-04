import { Input } from '@chakra-ui/input'
import { Select } from '@chakra-ui/select'
import React from 'react'

export default function PushNotificationModal(props: any) {
    return (
        <div style={{width: '816px'}} className='bg-white rounded-lg px-10 py-4 pb-14'  > 
            <div className='w-full flex items-center' >
                <p className='font-Graphik-SemiBold text-2xl mt-6' style={{color:'#0C0C0C'}} >Push Notification Headline</p> 
                <svg onClick={()=> props.close(false)} className='ml-auto cursor-pointer' xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                    <g id="Iconly_Light_Close_Square" data-name="Iconly/Light/Close Square" transform="translate(0.75 0.75)">
                        <g id="Close_Square" data-name="Close Square">
                        <path id="Stroke_1" data-name="Stroke 1" d="M4.792,0,0,4.792" transform="translate(6.853 6.845)" fill="none" stroke="#1a1a1a" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
                        <path id="Stroke_2" data-name="Stroke 2" d="M4.8,4.8,0,0" transform="translate(6.85 6.843)" fill="none" stroke="#1a1a1a" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
                        <path id="Stroke_3" data-name="Stroke 3" d="M13.584,0H4.915C1.894,0,0,2.139,0,5.166v8.168C0,16.361,1.885,18.5,4.915,18.5h8.668c3.031,0,4.917-2.139,4.917-5.166V5.166C18.5,2.139,16.614,0,13.584,0Z" fill="none" stroke="#1a1a1a" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
                        </g>
                    </g>
                </svg>
            </div>
            <p style={{color: '#051646AC'}} className='font-Graphik-Regular text-xs mt-4' >Sun, 10:24 | 4096 Characters</p>
            <div className=' p-7 mt-6' style={{border: '1px solid #D9D9D9', borderRadius: '10px'}} >
                <p style={{color: '#3A3B3E'}} className='font-Graphik-Regular text-sm' >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
                <p style={{color: '#3A3B3E'}} className=' mt-6 font-Graphik-Regular text-sm' > Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
            <div className='mt-6 w-full flex items-center' >
                <div className='w-full flex pr-4 ' >
                    <div className='my-4 pt-4 w-full' >
                        <p className='text-sm mb-1 font-Graphik-Medium '>Recipients</p> 
                        <Select size='lg' fontSize='sm' placeholder="All Users" />
                    </div> 
                    <div className='my-4 pt-4 ml-6 w-full' >
                        <p className='text-sm mb-1 font-Graphik-Medium '>Delivery Type</p> 
                        <Select size='lg' fontSize='sm' placeholder="Instant" />
                    </div> 
                </div>
                <div style={{width:'6px', backgroundColor: '#5858585D', height: '26px'}} className='mt-10' />
                <div className='w-full flex pl-4' >
                    <div className='my-4 pt-4 w-full' >
                        <p className='text-sm mb-1 font-Graphik-Medium '>Select Date</p> 
                        <Input size='lg' fontSize='sm' type='date' />
                    </div> 
                    <div className='my-4 pt-4 ml-6 w-full' >
                        <p className='text-sm mb-1 font-Graphik-Medium '>Select Time</p> 
                        <Input size='lg' fontSize='sm' type='time' />
                    </div> 
                </div>
            </div>
            <div className='flex mt-6' > 
                <button style={{backgroundColor: '#1A8F85'}} className='px-8 py-3 font-Graphik-Bold text-sm text-white rounded-md' >Edit Push Notification</button>
                <button style={{border: '1px solid #E00253', color: '#E00253'}} className='px-8 py-3 font-Graphik-Bold text-sm text-white rounded-md ml-3' >Delete</button>
            </div>
        </div>
    )
}
