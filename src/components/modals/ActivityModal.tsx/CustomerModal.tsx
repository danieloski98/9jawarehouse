import React from 'react'
import item from '../../../assets/images/item.png'

export default function CustomerModal(props: any) {

    const ClickHandler =()=>{
        props.close(false)
        props.next(true)
    }

    return (
        <div style={{width: '900px'}} className='bg-white rounded-lg px-10 py-6'  >
            <div className='w-full flex items-center' >
                <p className='font-Graphik-SemiBold' style={{color:'#0C0C0C'}} >Customer Review</p> 
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
            <div className='w-full flex mt-3 mb-4' >
                <div className='w-full pr-4 flex flex-1 flex-col' style={{borderRightWidth: '1px', borderColor: '#70707070'}} >
                    <div style={{backgroundColor: '#A8B6283D', color: '#98A80B'}} className='w-32 py-2 font-Graphik-Medium flex justify-center items-center rounded-2xl' >
                        <div className='w-2 h-2 rounded-full mr-3' style={{backgroundColor: '#98A80B'}} />Pending
                    </div>
                    <p className='font-Graphik-Regular text-sm mt-2' >12 Jan, 2021</p>
                    <div className='w-full grid grid-cols-2 gap-4 mt-8' >
                        <div>
                            <p style={{color: '#1A1A1A'}} className='font-Graphik-SemiBold' >Service</p>
                            <p style={{color: '#6B6B6B'}} className='font-Graphik-Medium text-sm ' >Event Planing</p>
                        </div>
                        <div>
                            <p style={{color: '#1A1A1A'}} className='font-Graphik-SemiBold' >Created By</p>
                            <p style={{color: '#6B6B6B'}} className='font-Graphik-Medium text-sm ' >John Anderson</p>
                        </div>
                        <div>
                            <p style={{color: '#1A1A1A'}} className='font-Graphik-SemiBold' >Email</p>
                            <p style={{color: '#6B6B6B'}} className='font-Graphik-Medium text-sm ' >Johnanderson@Gmail.Com</p>
                        </div>
                        <div>
                            <p style={{color: '#1A1A1A'}} className='font-Graphik-SemiBold' >Rating</p>
                            <div className='flex items-center' >
                                <div className='w-auto'> 
                                    <svg id="Group" xmlns="http://www.w3.org/2000/svg" width="15.422" height="14.706" viewBox="0 0 15.422 14.706">
                                        <path id="Path_18" data-name="Path 18" d="M13.7,960.408a.351.351,0,0,0-.319.243l-1.651,5.116-5.375-.011a.351.351,0,0,0-.206.634l4.355,3.152-1.672,5.111a.351.351,0,0,0,.54.392l4.343-3.169,4.344,3.169a.351.351,0,0,0,.54-.392l-1.672-5.111,4.355-3.152a.351.351,0,0,0-.206-.635l-5.375.011-1.653-5.117a.351.351,0,0,0-.348-.242Z" transform="translate(-6.001 -960.408)" fill="#f8d529"/>
                                    </svg>
                                </div>
                                <p style={{color: '#6B6B6B'}} className='font-Graphik-Medium text-sm ml-auto ' >4 Stars</p>
                            </div>
                            {/* <p style={{color: '#6B6B6B'}} className='font-Graphik-Medium text-sm ' >Johnanderson@Gmail.Com</p> */}
                        </div>
                    </div> 
                    <div className='mt-5' >
                        <p style={{color: '#1A1A1A'}} className='font-Graphik-SemiBold' >Comments</p>
                        <p style={{color: '#6B6B6B'}} className='font-Graphik-Medium text-sm ' >lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna</p>
                    </div>
                    <div className='mt-5' >
                        <p style={{color: '#1A1A1A'}} className='font-Graphik-SemiBold' >Attachments</p>
                        <div className='flex mt-3' >
                            <img src={item} alt='' className='w-20 h-20 mx-1 rounded' />
                            <img src={item} alt='' className='w-20 h-20 mx-1 rounded' />
                        </div>
                    </div>
                </div>
                <div className='w-full h-auto flex flex-1 flex-col mr-4 pl-6' > 
                    <p style={{color: '#1A1A1A'}} className='font-Graphik-SemiBold' >About Vendor</p>
                    <div className='mt-5 flex' >
                        <div className='w-20 h-20 rounded-full bg-green-300' >

                        </div>
                        <div className='ml-2' >
                            <p style={{color: '#0C0C0C'}} className='font-Graphik-Regular' >Adamu James</p>
                            <p style={{color: '#6B6B6B'}} className='font-Graphik-Regular mt-1 text-sm' >Jamie@emailapp.com</p>
                            <p style={{color: '#6B6B6B'}} className='font-Graphik-Regular mt-1 text-xs' >Member Snice 2020</p>
                            <button className=' px-4 py-1 font-Graphik-Regular text-sm rounded-full mt-2' style={{border: '1px solid #1A8F85', color: '#1A8F85'}} >View Profile</button>
                        </div>
                    </div>
                    <div className='mt-auto ml-auto flex items-center' >
                        <p onClick={()=> ClickHandler()} style={{color: '#F60D0D'}} className='font-Graphik-SemiBold cursor-pointer px-4 '>Reject</p>
                        <button style={{backgroundColor: '#1A8F85'}} className='px-4 py-3 font-Graphik-Regular text-sm text-white rounded-md ml-4' >Approve</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
