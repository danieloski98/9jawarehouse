import React from 'react'

export default function IdentificationCard({img}: {img: string}) {
    return (
        <>
            <div className='w-full flex' >
            <div style={{ height: '279px', background: '#F6F6F6 0% 0% no-repeat padding-box', border: '1px solid #ECECEC'}} className='flex justify-center items-center w-full' >
                <div style={{width: '663px', height: '244px', borderRadius: '5px'}} className=' bg-gray-300 overflow-hidden rounded-md' >
                    {img !== '' && <img src={img} alt="img" className='w-full h-full cursor-pointer object-contain' />}
                    {img === '' && (
                        <div className='w-full h-full flex justify-center items-center'>
                            <p>No Document Uploaded</p>
                        </div>
                    )}
                </div>
            </div>
            {/* <div className='ml-6 mr-6 mt-3 mt-10' >
                <div style={{width: '41px', height: '37px', boxShadow: '0px 3px 6px #00000029', background: 'var(--unnamed-color-ffffff) 0% 0% no-repeat padding-box', borderRadius: '5px'}} className='flex justify-center items-center font-Graphik-Bold text-xl cursor-pointer' >
                    +
                </div>
                <div style={{width: '41px', height: '37px', boxShadow: '0px 3px 6px #00000029', background: 'var(--unnamed-color-ffffff) 0% 0% no-repeat padding-box', borderRadius: '5px'}} className='flex justify-center items-center mt-2 font-Graphik-Bold text-xl cursor-pointer' >
                    -
                </div>
            </div>
            <div className='ml-auto mt-10' style={{width: '250px'}} >
                <button className='w-full py-3 text-white font-Graphik-Regular text-sm rounded-md' style={{backgroundColor: '#1A8F85'}} >Approve Document</button>
                <button className='w-full py-3 text-white font-Graphik-Regular text-sm rounded-md mt-4' style={{border: '1px solid #e00253', color: '#e00253'}} >Approve Document</button>
            </div> */}
        </div>
        </>
    )
}
