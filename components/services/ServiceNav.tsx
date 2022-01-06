import React from 'react';
import { FiSearch, FiBell, FiMenu, FiChevronDown, FiX, FiTrash2 } from 'react-icons/fi'
import { Avatar, Drawer, DrawerOverlay, DrawerContent, DrawerBody, Menu, MenuButton, MenuList, MenuItem, Button, InputGroup, Input, InputLeftElement, InputRightElement, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, Divider, DrawerCloseButton, Spinner } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useQuery } from 'react-query'

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
  const serv = useSelector((state: RootState) => state.ServicesReducer.services)

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
                <Input onKeyPress={handleKeydonw} onChange={(e) => setQuery(e.target.value)} fontSize="sm" className="font-Circular-std-book" />
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
                    <Input onKeyPress={handleKeydonw} onChange={(e) => setQuery(e.target.value)} fontSize="sm" className="font-Circular-std-book" />
                    <InputRightElement>
                        <FiX size={20} color="grey" />
                    </InputRightElement>
                </InputGroup>
            </div>
            <Menu preventOverflow={true}>
              <MenuButton
                righticon={<FiChevronDown size={20} color="grey" />}
              >
                <p className="flex mr-6 font-Circular-std-book text-sm">
                  <FiSearch size={20} className="text-themeGreen" />
                  <span className="ml-3">Find Service</span>
                  <FiChevronDown size={20} color="grey" className="ml-0 mt-0" />
                </p>
              </MenuButton>
              <MenuList w="1000px" maxH="500px" overflow="auto" className="grid grid-cols-4 font-light text-sm">
                {serv.map((item, index) => (
                  <MenuItem key={index.toString()}>
                    <Link prefetch={false} shallow={true} href={`/services/${item.name}`}>{item.name}</Link>
                  </MenuItem>
                ))}             
              </MenuList>
            </Menu>
            
            {loggedIn && <Avatar src={user.profile_pic} className="mr-6" size="sm" />}
            {loggedIn && <FiBell size={25} color="black" className='cursor-pointer' onClick={() => setShowNoti(true)} />}

            {!loggedIn && (
              <div className="flex font-Circular-std-book text-sm cursor-pointer">
                <p className="mr-3"><Link href="/auth/createaccount">Create Account</Link></p>
                <p><Link href="/auth/login">Login</Link></p>
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
                <div className="mt-8">
                  {notifications.map((item, index) => (
                    <div className="w-full h-auto px-0 py-6 flex border-b-2 border-gray-300" key={index.toString()}>
                      <div className="flex-1 flex flex-col justify-evenly pr-2">
                        <p className='font-light text-sm text-black mb-3'>{item.message}</p>
                        <div className="flex flex-col">
                          <Divider />
                          <p className='font-semibold text-xs text-gray-600 mt-3'>{new Date(item.created_at).toDateString()}</p>
                        </div>
                      </div>
                      <div className="w-12  cursor-pointer h-full flex flex-col justify-center items-center">
                        <FiTrash2 size={25} color="red" onClick={() => deleteNoti(item._id)} />
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

                    <Link href="/dashboard">
                        <a className="text-themeGreen mt-5 text-lg font-light">Dashboard</a>
                    </Link>

                    <Accordion className="mt-5" allowToggle allowMultiple defaultIndex={[0]}>
                        {/* <AccordionItem>
                            <AccordionButton>
                                <Box flex="1" textAlign="left">
                                  <p className="text-xl font-light text-themeGreen">Dashboard</p>
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>

                            <AccordionPanel>
                              <div className="w-full flex flex-col">
                                <p onClick={() => setPage(1)}>Profile</p>
                                <p className="mt-3" onClick={() => setPage(2)}>Customer Reviews</p>
                                <p className="mt-3" onClick={() => setPage(3)}>Subscriptions</p>
                                <p className="mt-3">Notifications</p>
                                <p className="mt-3" onClick={() => setPage(4)}>Settings</p>
                              </div>
                            </AccordionPanel>
                        </AccordionItem> */}

                        <AccordionItem>
                            <AccordionButton>
                                <Box flex="1" textAlign="left">
                                  <p className="text-xl font-light text-themeGreen">Find Services</p>
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>

                            <AccordionPanel>
                              <div className="w-full h-64 overflow-y-auto flex flex-col">
                                <p>Profile</p>
                                <p className="mt-3">Dry cleaner</p>
                                <p className="mt-3">Laundary</p>
                                <p className="mt-3">Cleaner</p>
                                <p className="mt-3">Barber</p>
                                {/* <p>Profile</p> */}
                                <p className="mt-3">Dry cleaner</p>
                                <p className="mt-3">Laundary</p>
                                <p className="mt-3">Cleaner</p>
                                <p className="mt-3">Barber</p>
                                {/* <p>Profile</p> */}
                                <p className="mt-3">Dry cleaner</p>
                                <p className="mt-3">Laundary</p>
                                <p className="mt-3">Cleaner</p>
                                <p className="mt-3">Barber</p>
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
