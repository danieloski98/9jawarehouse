import { InputGroup, InputLeftElement, Input, Drawer, DrawerOverlay, DrawerContent, DrawerBody, DrawerHeader, Spinner, Badge } from '@chakra-ui/react'
import React from 'react'
import { useRecoilState } from 'recoil'
import { AdminState } from '../states/AdminState'
import { IReturnObject } from '../types/ServerReturnType'
import { url } from '../utils/url'
import NotificationModal from './modals/NotificationModal'
import { useQuery } from 'react-query'
import { INotification } from '../types/Notification'
import { queryClient } from '../App'

const getNotifications = async () => {
    const request = await fetch(`${url}/admin/notifications`);
    const json = await request.json() as IReturnObject;

    if (!request.ok) {
        throw new Error("Something happend while getting the notifications");
    }
    return json;
}

export default function Navbar(props: any) {
    const [admin, setAdmin] = useRecoilState(AdminState);
    const [open, setOpen] = React.useState(false);
    const [notifications, setNotifications] = React.useState([] as Array<INotification>);
    const [notiLoading, setNotiloading] = React.useState(true);
    const [notiError, setNotiError] = React.useState(false);
    const [unread, setUnread] = React.useState(0); 

    const icon = `https://avatars.dicebear.com/api/human/${admin.email}.png`;

    const notificationsQuery = useQuery('getNotifications', getNotifications, {
        onSuccess: (data) => {
            setNotifications(data.data);
            const un = notifications.filter((item) => !item.read);
            setUnread(un.length);
            setNotiloading(false);
        },
        onError: (err) => {
            setNotiloading(false);
            setNotiError(true);
            alert('An error occured while getting notifications')
        }
    });

    const deleteNotification = React.useCallback(async (id: string) => {
        const request = await fetch(`${url}/admin/notification/${id}`, {
            method: 'delete',
        });
        const json = await request.json() as IReturnObject;

        if (json.statusCode !== 200) {
            alert(json.errorMessage);
            return;
        } else {
            alert(json.successMessage);
            queryClient.invalidateQueries();
            return;
        }
    }, []);

    const sort = (a: INotification, b: INotification) => {
        if (a.created_at < b.created_at) {
                return 1;
        } else {
            return -1;
        }
    }

    return (
        <div className='w-full flex items-center bg-white py-7 px-10 border-b-2 border-gray-400' >

            {/* drawer */}
            <Drawer isOpen={open} onClose={() => setOpen(false)}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader>
                        <p>Notifications</p>
                    </DrawerHeader>
                    <DrawerBody>
                        {notiLoading && (
                            <div className="w-full h-20 flex justify-center items-center">
                                <Spinner color="green" size="lg" />
                            </div>
                        )}
                        {!notiLoading && notiError && (
                            <p>An error occured while getting notifications</p>
                        )}
                        {!notiLoading && !notiError && notifications.length < 1 && (
                            <p>No new notifications</p>
                        )}
                        {!notiLoading && !notiError && notifications.length > 0 && notifications
                        .sort(sort)
                        .map((item, index) => (
                            <div className="w-full h-auto p-0 flex flex-col mb-5">
                                <p className='text-sm font-Graphik-Regular text-black'>{item.message}</p>
                                <p className='text-xs mt-3 text-gray-500 font-Graphik-Regular'>{new Date(item.created_at).toDateString()}</p>
                                <div className="w-full flex justify-end">
                                <button onClick={() => deleteNotification(item._id)}>
                                    <span className='text-xs text-red-300'>Clear</span>
                                </button>
                                </div>
                            </div>
                        ))}
                    </DrawerBody>
                </DrawerContent>
            </Drawer>

            <div style={{width: '650px'}}>
                {/* <InputGroup>
                    <InputLeftElement
                        pointerEvents='none'
                        children={
                            <svg className='mt-2' xmlns="http://www.w3.org/2000/svg" width="20.575" height="21.033" viewBox="0 0 20.575 21.033">
                                <g id="Iconly_Light_Search" data-name="Iconly/Light/Search" transform="translate(0.75 0.75)">
                                    <g id="Search" transform="translate(-0.778 -0.778)">
                                        <circle id="Ellipse_739" cx="8.989" cy="8.989" r="8.989" transform="translate(0.778 0.778)" fill="none" stroke="rgba(167,167,167,0.71)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
                                        <path id="Line_181" d="M0,0,3.524,3.515" transform="translate(16.018 16.485)" fill="none" stroke="rgba(167,167,167,0.71)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
                                    </g>
                                </g>
                            </svg> 
                        }
                    />
                    <Input backgroundColor='#FBFBFB' size='lg' fontSize='sm' border='1px solid #70707017' placeholder='Search For Vendors' />
                </InputGroup> */}
            </div>
            <div className='flex flex-1 ml-auto items-center' >
                <div className="w-16 flex justify-center">
                    <svg onClick={()=> setOpen(true)} className='cursor-pointer' id="Iconly_Light_Notification" data-name="Iconly/Light/Notification" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <g id="Notification" transform="translate(3.5 2)">
                            <path id="Path_425" d="M0,11.787v-.219A3.6,3.6,0,0,1,.6,9.75,4.87,4.87,0,0,0,1.8,7.436c0-.666,0-1.342.058-2.009C2.155,2.218,5.327,0,8.461,0h.078c3.134,0,6.306,2.218,6.617,5.427.058.666,0,1.342.049,2.009A4.955,4.955,0,0,0,16.4,9.759a3.506,3.506,0,0,1,.6,1.809v.209a3.566,3.566,0,0,1-.844,2.39A4.505,4.505,0,0,1,13.3,15.538a45.078,45.078,0,0,1-9.615,0A4.554,4.554,0,0,1,.835,14.167,3.6,3.6,0,0,1,0,11.787Z" transform="translate(0 0)" fill="none" stroke="#0c0c0c" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
                            <path id="Path_421" d="M0,0A3.061,3.061,0,0,0,2.037,1.127,3.088,3.088,0,0,0,4.288.5,2.886,2.886,0,0,0,4.812,0" transform="translate(6.055 18.852)" fill="none" stroke="#0c0c0c" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
                        </g>
                    </svg>
                   
                       {notifications.length > 0 && (
                            <sup className='bg-green-300 w-auto p-1 h-auto rounded-full flex justify-center items-center text-xs'>
                                {notifications.length}
                            </sup>
                       )}
                    
                </div>
                <div className='ml-0'>
                    <p className='text-sm font-Graphik-Medium'>{admin.fullname}</p>
                    <p className='text-xs font-Graphik-Regular' >{admin.email}</p>
                </div>
                <div className='w-12 h-12 mx-4 bg-green-200 rounded-full flex justify-center items-center ' >
                    <img src={icon} className="w-10 h-10" alt="icon" />
                    
                </div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="16.121" height="8.811" viewBox="0 0 16.121 8.811">
                <g id="Iconly_Light_Arrow_-_Down_2" data-name="Iconly/Light/Arrow - Down 2" transform="translate(1.061 1.061)">
                    <g id="Arrow_-_Down_2" data-name="Arrow - Down 2">
                    <path id="Stroke_1" data-name="Stroke 1" d="M14,0,7,7,0,0" fill="none" stroke="#c8c8c8" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
                    </g>
                </g>
            </svg> 
        </div>
    )
}
