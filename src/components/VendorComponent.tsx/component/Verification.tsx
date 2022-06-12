import React from 'react'
import { IReturnObject } from '../../../types/ServerReturnType';
import { IUser } from '../../../types/user'
import { url } from '../../../utils/url';
import DeclineNoteModal from '../../modals/DeclineNoteModal'
import IdentificationCard from './verification/IdentificationCard'
import {useToast, Spinner} from '@chakra-ui/react'
import { queryClient } from '../../../App';

export default function Verification({user}:{user: IUser}) {
    const [declinedModal, setDeclineModal] = React.useState(false);
    const [tab, setTab] = React.useState(2);
    const [loading, setLoading] = React.useState(false);

    const toast = useToast();

    const approve = async () => {
        setLoading(true);
        const request = await fetch(`${url}/user/admin/approve/${user._id}`, {
            method: 'put'
        });
        const json = await request.json() as IReturnObject;
        setLoading(false);
        if (json.statusCode !== 200) {
            toast({
                status: 'error',
                title: 'Error',
                description: json.errorMessage,
                isClosable: true,
                position: 'top',
                duration: 5000,
            });
        } else {
            toast({
                status: 'success',
                title: 'Success',
                description: json.successMessage,
                isClosable: true,
                position: 'top',
                duration: 5000,
            });
            queryClient.invalidateQueries();
        }
    }

    return (
        <div className='w-full py-10 px-10 bg-white mt-6 rounded-lg' > 

            {/* modal */}
            <DeclineNoteModal open={declinedModal} close={setDeclineModal} id={user._id} />

            <div className=''>
                <p style={{fontSize: '20px'}} className='font-Graphik-Medium'>Account Review</p>
                <p style={{color: '#8A8A8A'}} className='text-sm font-Graphik-Regular' >Carefully review all the documents submitted by this person before approval</p>
            </div>
            <div className='w-full flex items-center my-8' >
                <div className='w-24 h-24 rounded-full bg-purple-300' >

                </div>
                <div className='ml-2'>
                    <p className='font-Graphik-Medium text-lg'>{user.business_name}</p>
                    <p style={{color: '#727272'}} className='text-sm font-Graphik-Regular my-1' >{user.email}</p>
                    <p style={{color: '#727272'}} className='text-sm font-Graphik-Regular' >{user.phone}</p>
                </div>
                <div style={{background: '#FBFBFB 0% 0% no-repeat padding-box', opacity: '1', width: '322px' }} className='ml-auto px-8 py-9 rounded-lg' >
                    <div className='w-full flex items-center'>
                    <p style={{color: '#04101F'}} className='text-sm font-Graphik-SemiBold' >Approval Status</p>
                    <p style={{color: user.blocked ? 'red':'green'}} className='text-sm ml-auto font-Graphik-Bold' >{user.blocked ? 'INACTIVE' : 'ACTIVE'}</p>
                    </div>
                    {/* <div style={{width:'322px', height: '8px', backgroundColor: '#4164E324', borderRadius: '8px'}} className='mt-4' /> */}
                </div>
            </div>
            <div className='w-full flex text-sm items-center mt-6 rounded-lg py-2 px-1' style={{backgroundColor: '#004143'}} >
                <div onClick={()=> setTab(2)} style={tab === 2 ? {backgroundColor: '#1A8F8591'}: {}} className='w-full text-white cursor-pointer font-Graphik-Regular mx-3 py-3 rounded-lg flex justify-center items-center' >
                    Identity Card
                </div>
                {/* <div onClick={()=> setTab(1)} style={tab === 1 ? {backgroundColor: '#1A8F8591' }: {}} className='w-full text-white cursor-pointer font-Graphik-Regular mx-3 py-3 rounded-lg flex justify-center items-center' >
                    Utility Bill
                </div> */}
                <div onClick={()=> setTab(1)} style={tab === 1 ? {backgroundColor: '#1A8F8591' }: {}} className='w-full text-white cursor-pointer font-Graphik-Regular mx-3 py-3 rounded-lg flex justify-center items-center' >
                    Corporate Affairs Commission
                </div> 
            </div>
            <div className='w-full mt-5  flex flex-col' >

                {tab === 0 ?
                    <IdentificationCard img={user.verification_document} />
                        :tab === 1 ?
                            <IdentificationCard img={user.CAC}  />
                                :tab === 2 ?
                                    <IdentificationCard img={user.verification_document}  />
                :null}
                {user.blocked && (
                    <div className='ml-auto mt-10 flex w-full' style={{}} >
                        <button onClick={approve} className='w-full py-3 text-white font-Graphik-Regular text-sm rounded-md h-12 mr-4' style={{backgroundColor: '#1A8F85'}} >
                            {!loading && 'Approve Account'}
                            {loading && <Spinner size="sm" color="white" />}
                        </button>
                        <button onClick={() => setDeclineModal(true)} className='w-full py-3 text-white font-Graphik-Regular text-sm rounded-md h-12' style={{border: '1px solid #e00253', color: '#e00253'}} >Declined Request</button>
                    </div> 
                )}
            </div>
        </div>
    )
}
