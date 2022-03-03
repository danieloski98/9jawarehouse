import React from 'react'

export default function ProfileInformation() {
    return (
        <div className='w-full' >
            <div className='w-full my-5 pb-6 bg-white rounded-lg' >
                <div className='w-full h-56 bg-red-300 rounded-lg' >

                </div>
                <div className='w-full flex px-8 ' > 
                    <div className='w-36 bg-green-300 h-40 -mt-14 rounded-lg ml' >

                    </div>
                    <div className='pt-8 justify-between ml-5 flex flex-1 ' >
                        <div className='w-full px-4 mx-auto' >
                            <p className=' font-Graphik-SemiBold ' >Limmer makeover</p>
                            <p className=' font-Graphik-Regular text-sm ' >Jamie@emailapp.com</p>
                            <p className=' font-Graphik-Regular text-sm ' >Member since June 2021</p>
                        </div>
                        <div className='w-full px-4 mx-auto' >
                            <p style={{color: '#676767'}} className=' font-Graphik-Medium text-sm ' >Last Online</p>
                            <p className=' font-Graphik-SemiBold ' >2 hours ago</p>
                        </div>
                        <div className='w-full px-4 mx-auto' >
                            <p style={{color: '#676767'}} className=' font-Graphik-Medium text-sm ' >Total Reviews</p>
                            <p className=' font-Graphik-SemiBold ' >10</p>
                        </div>
                        <div className='w-full px-4 mx-auto' >
                            <p style={{color: '#676767'}} className=' font-Graphik-Medium text-sm ' >Average Rating</p>
                            <p className=' font-Graphik-SemiBold ' >4.6</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full mb-6 bg-white rounded-lg py-8 px-5 pr-14' >
                <p style={{color: '#270223'}} className=' font-Graphik-SemiBold text-sm ' >Business Description</p>
                <p style={{color: '#828282'}} className=' mt-1 font-Graphik-Regular text-sm ' >We render all kinds of beauty services ranging from bridal makeup, traditional wedding makeup, bridal shower makeup, photo shoot makeup etc, fixing of nails, manicure and pedicure, gele styling. We are just a phone call away.</p>
                <div className='my-6 w-full grid grid-cols-4' >
                    <div className='' >
                        <p style={{color: '#270223'}} className=' font-Graphik-SemiBold text-sm ' >Date Joined</p>
                        <p style={{color: '#828282'}} className=' mt-1 font-Graphik-Regular text-sm ' >June 21, 2021</p>
                    </div>
                    <div className='' >
                        <p style={{color: '#270223'}} className=' font-Graphik-SemiBold text-sm ' >Location</p>
                        <p style={{color: '#828282'}} className=' mt-1 font-Graphik-Regular text-sm ' >Ajah,lagos, Nigeria</p>
                    </div>
                    <div className='' >
                        <p style={{color: '#270223'}} className=' font-Graphik-SemiBold text-sm ' >Phone Number</p>
                        <p style={{color: '#828282'}} className=' mt-1 font-Graphik-Regular text-sm ' >+23409138637892</p>
                    </div>
                    <div className='' >
                        <p style={{color: '#270223'}} className=' font-Graphik-SemiBold text-sm ' >Business Hours</p>
                        <p style={{color: '#828282'}} className=' mt-1 font-Graphik-Regular text-sm ' >7:00 AM - 9:00 PM</p>
                        <p style={{color: '#828282'}} className=' mt-1 font-Graphik-Regular text-sm ' >Monday - Saturday</p>
                    </div>
                </div>
                <div className='w-full grid grid-cols-4' >
                    <div className='' >
                        <p style={{color: '#270223'}} className=' font-Graphik-SemiBold text-sm ' >Social media links</p>
                        <p style={{color: '#828282'}} className=' mt-1 font-Graphik-Regular text-sm ' >June 21, 2021</p>
                    </div>
                    <div className='' >
                        <p style={{color: '#270223'}} className=' font-Graphik-SemiBold text-sm ' >Certifiations</p>
                        <p style={{color: '#828282'}} className=' mt-1 font-Graphik-Regular text-sm ' >Professional Make up artist</p>
                        <p style={{color: '#828282'}} className=' mt-1 font-Graphik-Regular text-sm ' >Issued on the 12-02-2021</p>
                        <button  style={{color: '#828282', border: '1px solid #1A8F85'}} className='text-sm font-Graphik-Regular p-2 mt-5 rounded-lg'>View Certificate</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
