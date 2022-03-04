import React from 'react'

export default function NotificationModal(props: any) {
  return (
    <div style={{width: '379px'}} className='bg-white px-10 py-4 pb-14 overflow-y-auto' >
        <div className='w-full flex items-center' >
            <p className='font-Graphik-SemiBold text-xl mt-6' style={{color:'#0C0C0C'}} >Edit User Profile</p> 
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
        <div className='w-full mt-4 flex flex-col' >
            <div className=' p-4 mt-3 ' style={{border: '1px solid #D9D9D9', borderRadius: '10px'}} >
                <p style={{color: '#3A3B3E'}} className='font-Graphik-Regular text-sm' >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p> 
            </div>
            <p className='font-Graphik-SemiBold mt-3 ml-auto' style={{color:'#0C0C0C'}} >9:00 AM</p>
            <div className=' p-4 mt-3 ' style={{border: '1px solid #D9D9D9', borderRadius: '10px'}} >
                <p style={{color: '#3A3B3E'}} className='font-Graphik-Regular text-sm' >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p> 
            </div>
            <p className='font-Graphik-SemiBold mt-3 ml-auto' style={{color:'#0C0C0C'}} >9:00 AM</p> 
            <div className=' p-4 mt-3 ' style={{border: '1px solid #D9D9D9', borderRadius: '10px'}} >
                <p style={{color: '#3A3B3E'}} className='font-Graphik-Regular text-sm' >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p> 
            </div>
            <p className='font-Graphik-SemiBold mt-3 ml-auto' style={{color:'#0C0C0C'}} >9:00 AM</p> 
            <div className=' p-4 mt-3 ' style={{border: '1px solid #D9D9D9', borderRadius: '10px'}} >
                <p style={{color: '#3A3B3E'}} className='font-Graphik-Regular text-sm' >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p> 
            </div>
            <p className='font-Graphik-SemiBold mt-3 ml-auto' style={{color:'#0C0C0C'}} >9:00 AM</p>   
        </div>
    </div>
  )
}
