import React from 'react'

export default function SubscriptionModal(props: any) {

    const NextClicked =()=> {
        props.next(true)
        props.close(false)
    } 

    const CancelClicked =()=> {
        props.cancel(true)
        props.close(false)
    }

    return (
        <div style={{width: '523px'}} className='bg-white rounded-lg px-10 py-4 pb-8'  > 
            <div className='w-full flex items-center' >
                <p className='font-Graphik-SemiBold mt-6' style={{color:'#0C0C0C'}} >Transaction ID - 16GSF572HH</p> 
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

            <div style={{backgroundColor: '#0CD8572E', color: '#0CD857'}} className='w-32 my-4 py-2 font-Graphik-Medium flex justify-center items-center rounded-2xl' >
                <div className='w-2 h-2 rounded-full mr-3' style={{backgroundColor: '#0CD857'}} />Active
            </div>

            <div className='w-full grid grid-cols-3 gap-4 mt-8' >
                <div className='' >
                    <p style={{color: '#270223'}} className=' font-Graphik-SemiBold text-sm ' >Vendor</p>
                    <p style={{color: '#828282'}} className=' mt-1 font-Graphik-Regular text-sm ' >Limmer makeover</p>
                </div>
                <div className='' >
                    <p style={{color: '#270223'}} className=' font-Graphik-SemiBold text-sm ' >Date</p>
                    <p style={{color: '#828282'}} className=' mt-1 font-Graphik-Regular text-sm ' >Jun 10, 2020</p>
                </div>
                <div className='' >
                    <p style={{color: '#270223'}} className=' font-Graphik-SemiBold text-sm ' >Period</p>
                    <p style={{color: '#828282'}} className=' mt-1 font-Graphik-Regular text-sm ' >Monthly</p>
                </div>
                <div className='' >
                    <p style={{color: '#270223'}} className=' font-Graphik-SemiBold text-sm ' >Amount</p>
                    <p style={{color: '#828282'}} className=' mt-1 font-Graphik-Regular text-sm ' >N1,000</p>
                </div>
                <div className='' >
                    <p style={{color: '#270223'}} className=' font-Graphik-SemiBold text-sm ' >Days Remaning</p>
                    <p style={{color: '#828282'}} className=' mt-1 font-Graphik-Regular text-sm ' >28</p>
                </div>
            </div>
            <div className='w-full flex justify-center flex-col items-center mt-8' > 
                <button onClick={()=> NextClicked()} style={{backgroundColor: '#1A8F85'}} className='w-full py-3 font-Graphik-SemiBold text-sm text-white rounded-md' >Renew Subscription</button>
                <p onClick={()=> CancelClicked()} style={{color: '#3E3F41'}} className='font-Graphik-SemiBold cursor-pointer mx-auto mt-5 text-sm '>Cancel Subscription</p>
            </div>
        </div>
    )
}
