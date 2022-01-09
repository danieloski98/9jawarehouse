import React from 'react';
import { FiSearch, FiBell, FiMenu, FiChevronDown, FiChevronUp, FiX, FiTrash2 } from 'react-icons/fi'
import { Avatar, Drawer, DrawerOverlay, DrawerContent, DrawerBody, Menu, MenuButton, MenuList, MenuItem, Button, InputGroup, Input, InputLeftElement, InputRightElement, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, Divider, DrawerCloseButton, Spinner, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverBody, ModalOverlay, PopoverHeader } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useQuery } from 'react-query'
import * as moment from 'moment'

// images
import Image from 'next/image';
import Logo from '../../public/images/logo.svg';
import Sidebar from '../dashboard/Sidebar';

// redux
import {useSelector, useDispatch} from 'react-redux';
import { RootState } from '../../store/index';
import { setServices as SetServ } from '../../reducers/services.reducer'
import { updateUser } from '../../reducers/User.reducer'
import { updatePin } from '../../reducers/pin.reducer'
import { IServerReturnObject } from '../../utils/types/serverreturntype';
import { logout } from '../../reducers/logged'
import url from '../../utils/url';
import { INotification } from '../../utils/types/Notification';

// query frunction
const getNotifications = async (user_id: string) => {
  const request = await fetch(`${url}notifications/${user_id}`);
  const json = await request.json() as IServerReturnObject;
  if (!request.ok) {
    throw new Error('An Error Occured')
  }
  return json;
}

interface IProps {
  page: number;
  setPage: Function;
}



export default function ServiceNavbar() {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const [notiLoading, setNotiLoading] = React.useState(true);
  const [notiError, setNotiError] = React.useState(false);
  const [notifications, setNotifications] = React.useState([] as Array<INotification>);
  const [showNoti, setShowNoti] = React.useState(false);
  const router = useRouter();
  const user = useSelector((state:RootState) => state.UserReducer.user);
  const loggedIn = useSelector((state: RootState) => state.LoggedInReducer.loggedIn);
  const serv = useSelector((state: RootState) => state.ServicesReducer.services);
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);
  const dispatch = useDispatch();

  // query
  const getNotificationQuery = useQuery('getNotifications', () => getNotifications(user._id), {
    onSuccess: (data) => {
      const dt = data.data as Array<INotification>;
      setNotifications(dt);
      setNotiLoading(false);
      setNotiError(false)
    },
    onError: (error) => {
      console.log(error);
      setNotiLoading(false);
      setNotiError(true);
    }
  })

  const handleKeydonw = (e: any) => {
    if (e.key === 'Enter') {
      router.push(`/services/${query}`);
    }
  }

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

  return (
    <div className="w-full h-20 bg-white xl:px-10 lg:px-10 md:px-5 sm:px-5 flex justify-between fixed z-50">

        <div className="flex items-center">
            <Link href="/">
              <a>
                <Image src={Logo} alt="logo" className="w-20 h-20" />
              </a>
            </Link>
        </div>

        <div className="flex-1 h-full xl:hidden lg:hidden md:flex sm:flex items-center px-3">
            <InputGroup>
                <InputLeftElement>
                    <FiSearch size={25} color="grey" />
                </InputLeftElement>
                <Input onKeyPress={handleKeydonw} onChange={(e) => setQuery(e.target.value)} fontSize="sm" className="font-Cerebri-sans-book" />
                <InputRightElement>
                    <FiX size={20} color="grey" />
                </InputRightElement>
            </InputGroup>
        </div>

        <div className="flex-1 xl:flex lg:flex md:hidden sm:hidden justify-end items-center">
            <div className="w-2/4 h-full xl:flex lg:flex md:hidden sm:hidden mr-8 items-center">
                <InputGroup>
                    <InputLeftElement>
                        <FiSearch size={25} color="grey" />
                    </InputLeftElement>
                    <Input onKeyPress={handleKeydonw} onChange={(e) => setQuery(e.target.value)} fontSize="sm" className="font-Cerebri-sans-book" />
                    <InputRightElement>
                        <FiX size={20} color="grey" />
                    </InputRightElement>
                </InputGroup>
            </div>
            <Menu preventOverflow={true}>
              <MenuButton
                righticon={<FiChevronDown size={20} color="grey" />}
              >
                <p className="flex mr-6 font-Cerebri-sans-book text-sm">
                  <FiSearch size={20} className="text-themeGreen" />
                  <span className="ml-3">Find Service</span>
                  <FiChevronDown size={20} color="grey" className="ml-0 mt-0" />
                </p>
              </MenuButton>
              <MenuList w="1000px" maxH="500px" overflow="auto" className="grid grid-cols-4 font-light text-sm">
                {serv.map((item, index) => (
                  <MenuItem key={index.toString()}>
                    <Link prefetch={false} shallow={true} href={`/services?service=${item.name}`}>{item.name}</Link>
                  </MenuItem>
                ))}             
              </MenuList>
            </Menu>
            
            {loggedIn && (
              <Popover placement='bottom' size="xs" isOpen={userMenuOpen} closeOnBlur closeOnEsc onClose={() => setUserMenuOpen(false)}> 
              <PopoverTrigger>
                <div className=" flex items-center  ml-6 cursor-pointer w-auto h-auto" onClick={() => setUserMenuOpen(prev => !prev)}>
                  <Avatar src={user.profile_pic} size="sm" />
                  {userMenuOpen && (
                    <FiChevronUp size={15} className="ml-0 " color="black" />
                  )}
                  {!userMenuOpen && (
                    <FiChevronDown color="black" size={15} className="ml-0" />
                  )}
                </div>
              </PopoverTrigger>
              <PopoverContent>
                {/* <PopoverArrow /> */}
                <PopoverBody className='w-16'>
                  <div className="">
                  <p onClick={() => router.push('/dashboard')} className="text-sm text-themeGreen font-Circular-std-book mx-0 mt-3 flex items-center cursor-pointer">
                        <span>Dashboard</span>
                      </p>
                      <p onClick={handleLogout} className="text-sm text-red-400 font-Circular-std-book mx-0 mt-3 flex items-center cursor-pointer">
                        <span>Logout</span>
                      </p>
                  </div>
                </PopoverBody>
              </PopoverContent>
            </Popover>
            )}
            {loggedIn && <FiBell size={25} color="black" className='cursor-pointer ml-6' onClick={() => setShowNoti(true)} />}

            {!loggedIn && (
              <div className="flex font-Cerebri-sans-book text-sm cursor-pointer">
                <p className="mr-3"><Link href="/auth/signup">Create Account</Link></p>
                <p><Link href="/auth/loginform">Login</Link></p>
              </div>
            )}
        </div>

        <div className="xl:hidden lg:hidden md:flex sm:flex items-center">
          <FiMenu size={30} color="grey" onClick={() => setOpen(true)} />
        </div>

         {/* Notofication Drawer */}
         <Drawer isOpen={showNoti} onClose={() => setShowNoti(false)}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerBody>
              <p>Notifications</p>
              {!notiLoading && !notiError && notifications.length < 1 && (
                <div className="w-full h-64 mt-4">
                  <p>You have no new Notification</p>
              </div>
              )}

              {notiLoading && (
                <div className="w-full h-40 flex justify-center items-center mt-4">
                  <Spinner size="lg" color="green" />
                </div>
              )}

              {!notiLoading && !notiError && notifications.length > 0 && (
                <div className="mt-0 w-full ">
                {notifications.sort((a, b) => {
                  if (new Date(a.created_at) > new Date(b.created_at)) {
                    return -1;
                  }else {
                    return 1;
                  }
                }).map((item, index) => (
                    <div className="w-full h-auto px-0 py-2 flex flex-col" key={index.toString()}>
                       <div className="w-full  cursor-pointer h-full flex justify-end items-center">
                        <p className='font-Circular-std-medium text-xs text-gray-400 mt-3'>{getDate(item.created_at)}</p>
                      </div>
                      <div className="flex-1 flex flex-col justify-evenly mt-3">
                        <p className='font-Cerebri-sans-book text-sm text-black mb-3 mr-6'>{item.message}</p>
                        <div className="flex flex-col">
                          <Divider />
                         
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </DrawerBody>
          </DrawerContent>
        </Drawer>

         {/* navigation drawer for small screens and medium screens */}

         <Drawer isOpen={open} onClose={() => setOpen(false)}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerBody className="bg-gray-100">
                <div className="w-full h-auto bg-gray-100 p-0 flex flex-col">

                  {/* logo box */}

                  <div className="w-full h-20 flex justify-between items-center">

                    <Link href="/">
                      <a>
                        {/* <Image src={Logo} alt="logo" className="w-20 h-full" /> */}
                      </a>
                    </Link>

                    <FiX size={25} color="grey" onClick={() => setOpen(false)} />

                  </div>

                  {/* menu */}

                  <div className="w-full flex flex-col">
                    {/* <div className="w-full h-10 text-white flex justify-center items-center bg-themeGreen">
                        PIN: 9080998
                    </div> */}

                    {loggedIn && <Avatar src={user.profile_pic} className="mr-6 cursor-pointer" size="sm" onClick={() => router.push('/dashboard')} />}
                    {/* {loggedIn && <FiBell size={25} color="black" className='cursor-pointer' onClick={() => setShowNoti(true)} />} */}

                    {!loggedIn && (
                      <div className="flex flex-col font-Cerebri-sans-book text-md text-themeGreen cursor-pointer">
                        <p className="mr-3"><Link href="/auth/signup">Create Account</Link></p>
                        <p className='mt-4'><Link href="/auth/loginform">Login</Link></p>
                      </div>
                    )}

                    <Accordion className="mt-5" allowToggle allowMultiple defaultIndex={[0]}>

                        <AccordionItem>
                            <AccordionButton>
                                <Box flex="1" textAlign="left">
                                  <p className="text-xl font-light text-themeGreen">Find Services</p>
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>

                            <AccordionPanel>
                              <div className="w-full h-64 overflow-y-auto text-black font-Cerebri-sans-book flex flex-col">
                              {serv.map((item, index) => (
                                <p className='font-Cerebri-sans-book text-sm mb-4' key={index.toString()}>
                                  <Link prefetch={false} shallow={true} href={`/services?service=${item.name}`}>{item.name}</Link>
                                </p>
                              ))}  
                              </div>
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>

                    <p className="text-red-500 mt-5 text-sm font-light">Logout</p>
                  </div>


                </div>
              </DrawerBody>
            </DrawerContent>
        </Drawer>

    </div>
  );
}
