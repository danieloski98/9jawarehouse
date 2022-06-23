import React from 'react';
import { Image as Img } from '@chakra-ui/react';
import Image from 'next/image'
import { FiSearch, FiMenu, FiTrash2 } from 'react-icons/fi'
import { InputGroup, Input, InputLeftAddon, InputLeftElement, Drawer, DrawerOverlay, DrawerContent, DrawerBody, Avatar, Menu, MenuButton, MenuList, MenuItem, Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Divider, Modal, ModalContent, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverBody, ModalOverlay, Spinner, PopoverHeader, } from '@chakra-ui/react'
const colors = require('tailwindcss/colors')
import { useRouter } from 'next/router'
import { FiBell, FiChevronDown, FiX, FiChevronUp, FiChevronsDown } from 'react-icons/fi'
import Link from 'next/link'
import * as moment from 'moment';
import { Notification, Search } from 'react-iconly';

// redux
import {useSelector, useDispatch} from 'react-redux';
import { RootState } from '../../store/index';
import { setServices as SetServ } from '../../reducers/services.reducer'
import { updateUser } from '../../reducers/User.reducer'
import { updatePin } from '../../reducers/pin.reducer'
import { login, logout } from '../../reducers/logged';

// images
import Logo from '../../public/images/logo.svg';
import Woman from '../../public/images/woman.svg';
import url from '../../utils/url';
import { IServerReturnObject } from '../../utils/types/serverreturntype';
import { useQuery } from 'react-query';
import { INotification } from '../../utils/types/Notification';
import { IServices } from '../../utils/types/services';
import { queryClient } from '../../pages/_app';


// other components
export const LeftNavbar = () => {
    const dispatch = useDispatch();
    const serv = useSelector((state: RootState) => state.ServicesReducer.services);
    const loggedIn = useSelector((state: RootState) => state.LoggedInReducer.loggedIn);
    const user = useSelector((state: RootState) => state.UserReducer.user);
    const [sort, setSort] = React.useState(1);

    const compare = React.useCallback(( a: IServices, b: IServices ) => {
      if (sort === 1) {
          if (a.name < b.name) {
              return -1;
          }
      }

      if (sort === 2) {
          if (a.name < b.name) {
              return -1;
          }
      }
      return 0;
    }, [sort]);

    React.useMemo(() => {
        (async function() {
          const request1 = await fetch(`${url}services`);
          const json1 = await request1.json() as IServerReturnObject;
          const ser = json1.data;
    
          dispatch(SetServ(ser))
        })()
      }, [dispatch]);

    const [open, setOpen] = React.useState(false);
    const router = useRouter();

     const handleLogout = () => {
    localStorage.removeItem('9jauser');
    localStorage.removeItem('9jatoken');

    dispatch(logout())
  }

    return (
        <div className="w-full h-24 flex justify-between items-center px-5">
            <Img src="/images/nlogo.png" alt="logo" className=" w-20 h-16" />
            <div className=" xl:hidden lg:hidden md:flex sm:flex w-20 justify-end items-center">
                {/* <FiSearch size={25} color="grey" /> */}
                <FiMenu size={25} color="grey" onClick={() => setOpen(true)} />
            </div>

            {/* drawer */}
            <Drawer isOpen={open} onClose={() => setOpen(false)} placement="right" >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerBody>
                        <div className="w-full flex flex-col items-start text-md font-light text-gray-600">
                            {/* <Avatar src="https://bit.ly/broken-link" className="" size="sm" /> */}
                            {!loggedIn && (
                              <>
                                <p onClick={() => router.push('/auth/loginform')} className="mt-6 ml-5 text-xl font-Cerebri-sans-book text-themeGreen">Login</p>
                                <p onClick={() => router.push('/auth/signup')} className="mt-4 mb-4  ml-5 text-xl font-Cerebri-sans-book text-themeGreen">Become a vendor</p>
                              </>
                            )}

                          {loggedIn && (
                            <div className="w-full h-16 flex items-center" onClick={() => router.push('/dashboard')}>
                              <Avatar src={user.profile_pic} className="mr-0 cursor-pointer" size="sm"  />
                              <p className='font-Cerebri-sans-book ml-2 text-themeGreen'>Dashboard</p>
                            </div>
                          )}

                    <Accordion className="mt-5 w-full" allowToggle allowMultiple defaultIndex={[0]}>


                        <AccordionItem>
                            <AccordionButton>
                                <Box flex="1" textAlign="left">
                                  <p className="text-xl font-Cerebri-sans-book text-themeGreen">Find services</p>
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>

                            <AccordionPanel>
                              <div className="w-full h-64 overflow-y-auto flex flex-col">
                                {/* <p>Profile</p> */}
                                  {serv.length > 0 && [...serv].
                                  sort(compare).
                                  map((item: IServices, index: number) => (
                                    <div key={index.toString()}>
                                      <p className="mt-3 mb-3 font-Cerebri-sans-book" key={index.toString()}>
                                        <Link href={`/services?service=${item.name}`}>{item.name}</Link>
                                      </p>

                                      {index !== serv.length - 1 && (
                                        <Divider />
                                      )}
                                    </div>
                                  ))}
                              </div>
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                    {loggedIn && <p className="text-red-500 mt-5 text-xl font-Cerebri-sans-book ml-5" onClick={handleLogout}>Logout</p>
 }
                        </div>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>

        </div>
    )
}

// query frunction
const getNotifications = async (user_id: string) => {
  console.log(user_id);
  const request = await fetch(`${url}notifications/${user_id}`);
  const json = await request.json() as IServerReturnObject;
  if (!request.ok || json.statusCode !== 200) {
    throw new Error(json.errorMessage)
  }
  return json;
}

const RightNavBar = () => {
    const router = useRouter();
    const [loading, setLoading] = React.useState(true);
    const dispatch = useDispatch();
    const serv = useSelector((state: RootState) => state.ServicesReducer.services);
    const loggedIn = useSelector((state: RootState) => state.LoggedInReducer.loggedIn);
    const user = useSelector((state: RootState) => state.UserReducer.user);
    const [userMenuOpen, setUserMenuOpen] = React.useState(false);
    const [notificationOpen, setNotificationOpen] = React.useState(false);
    const [notiLoading, setNotiLoading] = React.useState(true);
    const [notiError, setNotiError] = React.useState(false);
    const [notifications, setNotifications] = React.useState([] as Array<INotification>);
    const [sort, setSort] = React.useState(1);

    const fetchUser = React.useCallback( async() => {
      setLoading(true);
      // dispatch(updateUser(JSON.parse(localStorage.getItem('9jauser') as string)))
      const _id = JSON.parse(localStorage.getItem('9jauser') as string)._id;
      const request = await fetch(`${url}user/${_id}`);
      const json = await request.json() as IServerReturnObject;
  
      if (json.statusCode !== 200) {
          router.push('/');
          alert(json.errorMessage);
          dispatch(logout());
          localStorage.removeItem('9jauser');
          setLoading(false);
          return
      } else {
          dispatch(updateUser(json.data));
          dispatch(login());
          setLoading(false);
      }
      }, [dispatch, router]);

    React.useEffect(() => {
      const data = localStorage.getItem('9jauser');

      if (data === null || data === undefined) {
          dispatch(logout());
          setLoading(false);
          router.push('/');
      } else {
          fetchUser();
      }
    }, []);

    const deleteNotification = React.useCallback(async (id: string) => {
      const request = await fetch(`${url}admin/notification/${id}`, {
          method: 'delete',
      });
      const json = await request.json() as IServerReturnObject;

      if (json.statusCode !== 200) {
          alert(json.errorMessage);
          return;
      } else {
          alert(json.successMessage);
          queryClient.invalidateQueries();
          return;
      }
    }, []);

    const compare = React.useCallback(( a: IServices, b: IServices ) => {
      if (sort === 1) {
          if (a.name < b.name) {
              return -1;
          }
      }

      if (sort === 2) {
          if (a.name < b.name) {
              return -1;
          }
      }
      return 0;
    }, [sort]);

     // query
    const getNotificationQuery = useQuery(['getNotifications', user._id], () => getNotifications(user._id), {
      onSuccess: (data) => {
        const dt = data.data as Array<INotification>;
        setNotifications(data.data);
        console.log(data.data);
        setNotiLoading(false);
        setNotiError(false)
      },
      onError: (error) => {
        console.log(error);
        setNotiLoading(false);
        setNotiError(true);
      }
    })


      React.useMemo(() => {
      (async function() {
        const request1 = await fetch(`${url}services`);
        const json1 = await request1.json() as IServerReturnObject;
        const ser = json1.data;

        dispatch(SetServ(ser))
      })()
      }, [dispatch]);

      const deleteNoti = async (id: string) => {
        setNotiLoading(true);
        const request = await fetch(`${url}notifications/${id}`, {
          method: 'delete',
        });
        const json = await request.json() as IServerReturnObject;
        setNotiLoading(false);
        if (json.statusCode !== 200) {
          alert(json.errorMessage);
          return;
        }else {
          alert(json.successMessage);
          return;
        }
      }

      const getDate = (date: any) => {
        const dt = moment.default(date);
        return dt.startOf('hours').fromNow();
      }

      const handleLogout = () => {
        localStorage.removeItem('9jauser');
        localStorage.removeItem('9jatoken');

        dispatch(logout())
      }

      function capitalizeFirstLetter(str: string) {
        return str.charAt(0).toUpperCase() + str.slice(1);
      }

    return (
        <div className="w-full h-24 flex justify-end pr-0 items-center text-white">

            {/* modal */}
            {/* <Modal isOpen={loading} onClose={() => setLoading(false)} isCentered={true}>
                <ModalOverlay />
                <ModalContent>
                    <ModalContent className="w-full flex flex-col items-center justify-center h-56">
                        <Spinner colot="green.500" size="xl" />
                        <p className="mt-4 font-Cerebri-sans-book text-xl">Loading Details...</p>
                    </ModalContent>
                </ModalContent>
            </Modal> */}

             <Menu size="lg" preventOverflow={true}>
              <MenuButton
                righticon={<FiChevronDown size={20} color="grey" />}
              >
                <p className="flex mr-0">
                  {/* <FiSearch size={20} className="text-white" /> */}
                  <span className="ml-3 font-Circular-std-book text-md cursor-pointer">Find service</span>
                  <FiChevronDown size={20} color="white" className="ml-1 mt-1" />
                </p>
              </MenuButton>
              <MenuList w="100vw" size maxH="500px" borderRadius={0} overflow="auto" mr="200px" zIndex="5" className="grid grid-cols-4 font-light text-sm px-12">
                {[...serv].
                sort(compare).
                map((item, index) => (
                  // <MenuItem key={index.toString()} >
                  <a href={`/services?service=${item.name}`} key={index} className="flex">
                      <p className="text-black text-xl text-md mb-4 mt-4 font-Circular-std-book">{item.name[0]}</p>
                      <p className="text-gray-600 font-Cerebri-sans-book text-md mb-4 mt-5">{item.name.slice(1)}</p>
                  </a>
                  // </MenuItem>
                ))}
              </MenuList>
            </Menu>

            
            {
              loggedIn && (
                <Menu isOpen={userMenuOpen} onClose={() => setUserMenuOpen(false)}>
                  <MenuButton
                    // righticon={<FiChevronDown size={20} color="grey" />}
                    className='hover:bg-green-200 rounded-md'
                    onClick={() => setUserMenuOpen(prev => !prev)}
                  >
                  <div className="z-30 w-24 py-2 h-16 rounded-md hover:bg-green-200 flex justify-center items-center cursor-pointer" >
                    <Avatar src={user.profile_pic} size="md" />
                    {userMenuOpen && (
                      <FiChevronUp size={25} className="ml-2 " color="white" />
                    )}
                    {!userMenuOpen && (
                      <FiChevronDown color="white" size={25} className="ml-2" />
                    )}
                  </div>
                  </MenuButton>
                  <MenuList w="100px" minW="173px" maxH="200px" marginRight="12px" overflow="auto" padding="0px" className="flex flex-col font-light text-sm p-0">
                        <p onClick={() => router.push('/dashboard')}  className="text-md text-themeGreen font-Circular-std-book mx-0 mt-0 flex items-center cursor-pointer h-12 hover:bg-gray-100 p-2">
                          <span>Dashboard</span>
                        </p>

                        <p onClick={handleLogout} className="text-md text-red-400 font-Circular-std-book mx-0 mt-0 flex items-center cursor-pointer h-12 hover:bg-gray-100 p-2">
                          <span>Logout</span>
                        </p>
         
                  </MenuList>
                </Menu>
              )
            }
            

            {loggedIn && (
              <Popover placement='bottom' size="xs" isOpen={notificationOpen} closeOnBlur={true} closeOnEsc={true} onClose={() => setNotificationOpen(false)}>
              <PopoverTrigger>
                <div className="w-12 h-12 flex items-center justify-center ml-0 hover:bg-green-200 rounded-md"  onClick={() => setNotificationOpen(prev => !prev)}>
                  <Notification size={25} primaryColor='white' filled style={{ color: 'grey' }}  />
                </div>
              </PopoverTrigger>
              <PopoverContent borderRadius={0}>
                <PopoverHeader>
                  <div className="w-full flex justify-between text-themeGreen text-sm py-2">
                    <p className='font-Circular-std-medium'>Notifications</p>
                    {/* <p className="font-Circular-std-book cursor-pointer">Mark All As Read</p> */}
                  </div>
                </PopoverHeader>
                {/* <PopoverArrow /> */}
                <PopoverBody className='' borderWidth={0}>
                  <div className="w-full h-64 overflow-y-auto p-2">
                        { notiLoading && (
                          <div className='w-full flex mt-6 justify-center'>
                            <Spinner size="md" color="green" />
                          </div>
                        )}

                        {!notiLoading && !notiError && notifications.length < 1 && (
                          <div className="w-full h-64 mt-4 font-Cerebri-sans-book text-gray-700">
                            <p>You have no new Notification</p>
                        </div>
                        )}

                        {!notiLoading && !notiError && notifications.length > 0 && (
                          <div className="mt-0 w-full ">
                            {notifications.map((item, index) => (
                                <div className="w-full h-auto px-0 py-2 flex flex-col" key={index.toString()}>
                                   <div className="w-full  cursor-pointer h-full flex justify-end items-center">
                                    <p className='font-Circular-std-medium text-xs text-gray-400 mt-3'>{new Date(item.created_at).toDateString()}</p>
                                  </div>
                                  <div className="flex-1 flex flex-col justify-evenly mt-3">
                                    <p className='font-Cerebri-sans-book text-sm text-black mb-3 mr-6'>{item.message}</p>
                                    <div className="w-full flex justify-end text-red-400 cursor-pointer text-sm font-Cerebri-sans-book" onClick={() => deleteNotification(item._id)}>
                                      <p>Clear</p>
                                    </div>
                                    <div className="flex flex-col mt-3">
                                      <Divider />
                                     
                                    </div>
                                  </div>
                                  
                                </div>
                              ))}
                          </div>
                        )}
                  </div>
                </PopoverBody>
              </PopoverContent>
            </Popover>
            )}

            {!loggedIn && (
              <p onClick={() => router.push('/auth/signup')} className="text-md font-Circular-std-book mx-5 flex items-center cursor-pointer">
                  <span>Become a vendor</span>
              </p>
            )}

            {!loggedIn && (
              <p onClick={() => router.push('/auth/loginform')} className="text-md font-Circular-std-book mx-5 flex items-center cursor-pointer">
                  <span>Login</span>
              </p>
            )}
    </div>
    )
}



export default function Banner() {
    const [query, setQuery] = React.useState('');
    const router = useRouter();

    const handleKeydonw = (e: any) => {
        if (e.key === 'Enter') {
          router.push(`/services?service=${query}`);
        }
      }
  return (
    <div className="w-full xl:h-screen lg:h-screen md:h-auto sm:h-auto flex">
        <div className="flex-1 flex flex-col">
            <LeftNavbar />
            <div className="flex-1 flex flex-col justify-center xl:px-10 lg:px-10 md:px-5 sm:px-5  xl:py-0 lg:py-0 md:py-12 sm:py-12">
                <div className="flex">
                  <h1 className="xl:text-4xl lg:text-4xl md:text-4xl sm:text-4xl font-Circular-std-medium text-darkGreen">
                      Discover The Best <span className="text-themeGreen">Vendors</span>  Near You!
                  </h1>
                  {/* <h1 className="xl:text-6xl lg:text-6xl md:text-4xl sm:text-4xl font-Circular-std-medium text-darkGreen mt-4">
                     
                  </h1> */}
                </div>
               <ol className='text-md text-gray-400 font-Cerebri-sans-book list-disc list-inside mt-5 ml-2'>
                <li>Get your business registered for <b>FREE</b>.</li>
                <li>Get noticed by potential investors.</li>
                <li> Get global visibility on your business. </li>
               </ol>

                <div className="xl:w-9/12 lg:w-9/12 h-auto md:w-full sm:w-full mt-6">
                    <InputGroup>
                        <InputLeftElement  height="60px" width="72px" bgColor="#1A8F85" borderLeftRadius={10}>
                        <div className=" w-full flex items-center justify-center rounded-l-md">
                            <FiSearch color="white" size={20} />
                        </div>
                        </InputLeftElement>
                        <Input  height="60px" onKeyPress={handleKeydonw} bgColor="#F1EEEE" onChange={(e: any) => setQuery(e.target.value)} placeholder="Search for anything in Nigeria….." fontSize="lg" paddingLeft="100px" className=' font-Cerebri-sans-book' />
                    </InputGroup>
                </div>
            </div>
        </div>
        <div className="flex-1 bg-themeGreen xl:flex lg:flex md:hidden sm:hidden flex flex-col">
            <RightNavBar />
            <div className="flex-1  overflow-hidden">
                <Image src={Woman} alt="logo" className=" w-full h-full object-contain" />
            </div>
        </div>
    </div>
  );
}
