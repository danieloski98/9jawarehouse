import React from 'react'
import IdentificationCard from './verification/IdentificationCard'

export default function Verification() {

    const [tab, setTab] = React.useState(0)

    return (
        <div className='w-full py-10 px-10 bg-white mt-6 rounded-lg' > 
            <div className=''>
                <p style={{fontSize: '20px'}} className='font-Graphik-Medium'>Account Review</p>
                <p style={{color: '#8A8A8A'}} className='text-sm font-Graphik-Regular' >Carefully review all the documents submitted by this person before approval</p>
            </div>
            <div className='w-full flex items-center my-8' >
                <div className='w-24 h-24 rounded-full bg-purple-300' >

                </div>
                <div className='ml-2'>
                    <p className='font-Graphik-Medium text-lg'>Limmer Makeover</p>
                    <p style={{color: '#727272'}} className='text-sm font-Graphik-Regular my-1' >grace.lopez@gmail.app</p>
                    <p style={{color: '#727272'}} className='text-sm font-Graphik-Regular' >+234 (903) 576 8390</p>
                </div>
                <div style={{background: '#FBFBFB 0% 0% no-repeat padding-box', opacity: '1'}} className='ml-auto px-8 py-9 rounded-lg' >
                    <div className='w-full flex items-center'>
                    <p style={{color: '#04101F'}} className='text-sm font-Graphik-SemiBold' >Approval Progress</p>
                    <p style={{color: '#727272'}} className='text-sm ml-auto font-Graphik-Regular' >0/3</p>
                    </div>
                    <div style={{width:'322px', height: '8px', backgroundColor: '#4164E324', borderRadius: '8px'}} className='mt-4' />
                </div>
            </div>
            <div className='w-full flex text-sm items-center mt-6 rounded-lg py-2 px-1' style={{backgroundColor: '#004143'}} >
                <div onClick={()=> setTab(0)} style={tab === 0 ? {backgroundColor: '#1A8F8591'}: {}} className='w-full text-white cursor-pointer font-Graphik-Regular mx-3 py-3 rounded-lg flex justify-center items-center' >
                    Identity Card
                </div>
                <div onClick={()=> setTab(1)} style={tab === 1 ? {backgroundColor: '#1A8F8591' }: {}} className='w-full text-white cursor-pointer font-Graphik-Regular mx-3 py-3 rounded-lg flex justify-center items-center' >
                    Utility Bill
                </div>
                <div onClick={()=> setTab(2)} style={tab === 2 ? {backgroundColor: '#1A8F8591' }: {}} className='w-full text-white cursor-pointer font-Graphik-Regular mx-3 py-3 rounded-lg flex justify-center items-center' >
                    Corporate Affairs Commission
                </div> 
            </div>
            <div className='w-full mt-5' >

                {tab === 0 ?
                    <IdentificationCard />
                        :tab === 1 ?
                            <IdentificationCard />
                                :tab === 2 ?
                                    <IdentificationCard />
                :null}
            </div>
        </div>
    )
}
