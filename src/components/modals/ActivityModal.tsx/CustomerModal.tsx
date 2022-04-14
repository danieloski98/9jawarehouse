import React, { useCallback } from 'react'
import item from '../../../assets/images/item.png'
import { IComment } from '../../../types/comments';
import {Spinner, useToast} from '@chakra-ui/react'
import { IUser } from '../../../types/user';
import { theme } from '../../../utils/theme';
import { url } from '../../../utils/url';
import { IReturnObject } from '../../../types/ServerReturnType';
import {useNavigate} from 'react-router-dom'
import { queryClient } from '../../../App';
import Viewer from 'react-viewer';

interface IProps {
    close: Function;
    next: Function;
    comment: IComment;
}

export default function CustomerModal({close, next, comment}: IProps) {

    const [loading, setLoading] = React.useState(true);
    const [dloading, setDLoading] = React.useState(false);
    const [vendor, setVendor] = React.useState({} as IUser);
    const [ll, setLL] = React.useState(false);
    const [ visible, setVisible ] = React.useState(false);
    const [img, setImg] = React.useState('');
    
    const navigate = useNavigate();
    const toast = useToast();

    const ClickHandler =()=>{
        // close(false);
        navigate(`/dashboard/vendors/profile/${comment.business_id}`);
        // next(true)
    }

    React.useEffect(() => {
        (async function() {
            const request = await fetch(`${url}/user/${comment.business_id}`);
            const json = await request.json() as IReturnObject;
            setVendor(json.data);
            setLoading(false);
        })()
    }, [comment.business_id]);


    const approve = useCallback(async () => {
        setLL(true);
        const request = await fetch(`${url}/comments/admin/approve/${comment._id}`, {
            method: 'put'
        });
        const json = await request.json() as IReturnObject;
        setLL(false);
        if (json.statusCode !== 200) {
            toast({
                title: 'Error',
                description: json.errorMessage,
                position: 'top',
                isClosable: true,
                duration: 5000,
                status: 'error',
            });
            return;
        } else {
            toast({
                title: 'Success',
                description: json.successMessage,
                position: 'top',
                isClosable: true,
                duration: 5000,
                status: 'success',
            });
            queryClient.invalidateQueries();
            close(false);
        }
    }, [comment._id, toast, close]);

    const decline = useCallback(async () => {
        setDLoading(true);
        const request = await fetch(`${url}/comments/admin/decline/${comment._id}`, {
            method: 'put'
        });
        const json = await request.json() as IReturnObject;
        setDLoading(false);
        if (json.statusCode !== 200) {
            toast({
                title: 'Error',
                description: json.errorMessage,
                position: 'top',
                isClosable: true,
                duration: 5000,
                status: 'error',
            });
            return;
        } else {
            toast({
                title: 'Success',
                description: json.successMessage,
                position: 'top',
                isClosable: true,
                duration: 5000,
                status: 'success',
            });
            queryClient.invalidateQueries();
            close(false);
        }
    }, [comment._id, toast, close]);

    return (
        <div style={{width: '900px'}} className='bg-white rounded-lg px-10 py-6'  >
            <Viewer
                visible={visible}
                onClose={() => { setVisible(false); } }
                images={[{src: img, alt: ''}]}
            />
            <div className='w-full flex items-center' >
                <p className='font-Graphik-SemiBold' style={{color:'#0C0C0C'}} >Customer Review</p> 
                <svg onClick={()=> close(false)} className='ml-auto cursor-pointer' xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
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
                    {!comment.reviewed && (
                        <div style={{backgroundColor: '#A8B6283D', color: '#98A80B'}} className='w-32 py-2 font-Graphik-Medium flex justify-center items-center rounded-2xl' >
                            <div className='w-2 h-2 rounded-full mr-3' style={{backgroundColor: '#98A80B'}} />Pending
                        </div>
                    )}
                    {comment.reviewed && (
                        <div className='w-32 py-2 font-Graphik-Medium flex justify-center items-center rounded-2xl bg-green-200 text-green-600' >
                            <div className='w-2 h-2 rounded-full mr-3 bg-green-600' />Approved
                        </div>
                    )}
                    <p className='font-Graphik-Regular text-sm mt-2' >{new Date(comment.created_at).toDateString()}</p>
                    <div className='w-full grid grid-cols-2 gap-4 mt-8' >
                        {/* <div>
                            <p style={{color: '#1A1A1A'}} className='font-Graphik-SemiBold' >Service</p>
                            <p style={{color: '#6B6B6B'}} className='font-Graphik-Medium text-sm ' >Event Planing</p>
                        </div> */}
                        <div>
                            <p style={{color: '#1A1A1A'}} className='font-Graphik-SemiBold' >Created By</p>
                            <p style={{color: '#6B6B6B'}} className='font-Graphik-Medium text-sm ' >{comment.fullname}</p>
                        </div>
                        <div>
                            <p style={{color: '#1A1A1A'}} className='font-Graphik-SemiBold' >Email</p>
                            <p style={{color: '#6B6B6B'}} className='font-Graphik-Medium text-sm ' >{comment.email}</p>
                        </div>
                        <div>
                            <p style={{color: '#1A1A1A'}} className='font-Graphik-SemiBold' >Rating</p>
                            <div className='flex items-center' >
                                <div className='w-auto flex'> 
                                    <svg id="Group" xmlns="http://www.w3.org/2000/svg" width="15.422" height="14.706" viewBox="0 0 15.422 14.706">
                                        <path id="Path_18" data-name="Path 18" d="M13.7,960.408a.351.351,0,0,0-.319.243l-1.651,5.116-5.375-.011a.351.351,0,0,0-.206.634l4.355,3.152-1.672,5.111a.351.351,0,0,0,.54.392l4.343-3.169,4.344,3.169a.351.351,0,0,0,.54-.392l-1.672-5.111,4.355-3.152a.351.351,0,0,0-.206-.635l-5.375.011-1.653-5.117a.351.351,0,0,0-.348-.242Z" transform="translate(-6.001 -960.408)" fill="#f8d529"/>
                                    </svg>
                                    
                                </div>
                                <p style={{color: '#6B6B6B'}} className='font-Graphik-Medium text-sm ml-auto ' >{comment.rating} Stars</p>
                            </div>
                            {/* <p style={{color: '#6B6B6B'}} className='font-Graphik-Medium text-sm ' >Johnanderson@Gmail.Com</p> */}
                        </div>
                    </div> 
                    <div className='mt-5' >
                        <p style={{color: '#1A1A1A'}} className='font-Graphik-SemiBold' >Comments</p>
                        <p style={{color: '#6B6B6B'}} className='font-Graphik-Medium text-sm ' >{comment.comment}</p>
                    </div>
                    <div className='mt-5' >
                        <p style={{color: '#1A1A1A'}} className='font-Graphik-SemiBold' >Attachments</p>
                        <div className='flex mt-3' >
                            {comment.pictures.length > 0 && comment.pictures.map((item, index) => (
                                <img key={index.toString()} src={item} alt='' className='w-20 h-20 mx-1 rounded cursor-pointer' onClick={() => {setImg(item); setVisible(true)}} />
                            ))}
                            {comment.pictures.length < 1 && <p>No images uploaded</p>}
                        </div>
                    </div>
                </div>
                <div className='w-full h-auto flex flex-1 flex-col mr-4 pl-6' > 
                    <p style={{color: '#1A1A1A'}} className='font-Graphik-SemiBold' >About Vendor</p>
                    {loading && <Spinner size="lg" color={theme.primaryColor} />}
                    {!loading && vendor && (
                        <div className='mt-5 flex' >
                            <div className='w-20 h-20 rounded-full bg-green-300 overflow-hidden' >
                                <img src={vendor.profile_pic} alt="pic" className='w-full h-full' />
                            </div>
                            <div className='ml-2' >
                                <p style={{color: '#0C0C0C'}} className='font-Graphik-Regular' >{vendor.first_name} {vendor.last_name}</p>
                                <p style={{color: '#6B6B6B'}} className='font-Graphik-Regular mt-1 text-sm' >{vendor.email}</p>
                                <p style={{color: '#6B6B6B'}} className='font-Graphik-Regular mt-1 text-xs' >Member Snice {new Date(vendor.createAt).getFullYear()}</p>
                                <button onClick={()=> ClickHandler()} className=' px-4 py-1 font-Graphik-Regular text-sm rounded-full mt-2' style={{border: '1px solid #1A8F85', color: '#1A8F85'}} >View Profile</button>
                            </div>
                        </div>
                    )}
                    <div className='mt-auto ml-auto flex items-center' >
                        <p onClick={decline} style={{color: '#F60D0D'}} className='font-Graphik-SemiBold cursor-pointer px-4 '>
                            {!dloading && 'Reject'}
                           {dloading && <Spinner size="sm" color="green" />}
                        </p>
                        <button onClick={approve} style={{backgroundColor: '#1A8F85'}} className='px-4 py-3 font-Graphik-Regular text-sm text-white rounded-md ml-4' >
                           {!ll && ' Approve'}
                           {ll && <Spinner size="sm" color="white" />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
