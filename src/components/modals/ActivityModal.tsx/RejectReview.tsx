import { Textarea } from '@chakra-ui/textarea'
import React from 'react'

export default function RejectReview(props: any) {
    return (
        <div style={{width: '523px'}} className='bg-white rounded-lg px-10 py-6'  > 
            <div className='w-full flex items-center' >
                <p className='font-Graphik-SemiBold' style={{color:'#0C0C0C'}} >Reject Review</p> 
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
            <p className='text-sm font-Graphik-Regular my-4' >You are about to Reject a user from 9jawarehouse</p>
            <p className='text-sm font-Graphik-Medium mb-2 mt-8' >Give your Reason</p>
            <Textarea height='152px' backgroundColor='white' placeholder='Write message' border='1px solid #0C346839' />
            <button style={{backgroundColor: '#1A8F85'}} className='w-full py-3 font-Graphik-Regular text-sm text-white rounded-md mt-8' >Reject Review</button>
        </div>
    )
}
