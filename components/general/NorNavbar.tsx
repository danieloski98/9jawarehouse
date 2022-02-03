import React from 'react';
import { FiSearch, FiBell, FiMenu, FiChevronDown, FiX, FiChevronUp } from 'react-icons/fi'
import { Avatar, Drawer, DrawerOverlay, DrawerContent, DrawerBody, Menu, MenuButton, MenuList, MenuItem, Button, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, Divider, Spinner, DrawerCloseButton, Input, InputGroup, InputLeftElement, InputRightElement  } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import * as moment from 'moment'
import { Notification, Search } from 'react-iconly';

// redux
import {useSelector, useDispatch} from 'react-redux';
import { RootState } from '../../store/index';
import { setServices as SetServ } from '../../reducers/services.reducer'
import { updateUser } from '../../reducers/User.reducer';
import { login, logout } from '../../reducers/logged'

// images
import { Image } from '@chakra-ui/react';
import Logo from '../../public/images/nlogo.png';
import Sidebar from '../dashboard/Sidebar';
import { INotification } from '../../utils/types/Notification';
import { IServerReturnObject } from '../../utils/types/serverreturntype';
import url from '../../utils/url';
import { useQuery } from 'react-query';
import { IServices } from '../../utils/types/services';

// query frunction
const getNotifications = async (user_id: string) => {
  const request = await fetch(`${url}notifications/${user_id}`);
  const json = await request.json() as IServerReturnObject;
  if (!request.ok) {
    throw new Error('An Error Occured')
  }
  return json;
}

const getServices = async () => {
  const request = await fetch(`${url}services`);
  const json = await request.json() as IServerReturnObject;
  if (!request.ok) {
    throw new Error('An Error Occured')
  }
  return json;
}


export default function NormNavbar() {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);
  const [notiLoading, setNotiLoading] = React.useState(true);
  const [notiError, setNotiError] = React.useState(false);
  const [notifications, setNotifications] = React.useState([] as Array<INotification>);
  const [showNoti, setShowNoti] = React.useState(false);
  const user = useSelector((state:RootState) => state.UserReducer.user);
  const loggedIn = useSelector((state: RootState) => state.LoggedInReducer.loggedIn);
  const serv = useSelector((state: RootState) => state.ServicesReducer.services)
  const dispatch = useDispatch();
  console.log(user);
  const router = useRouter();

   // query
   const getNotificationQuery = useQuery(['getNotifications', user._id], () => getNotifications(user._id), {
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

  const geServicesQuery = useQuery('getServices', () => getServices(), {
    onSuccess: (data) => {
      const dt = data.data as Array<IServices>;
      dispatch(SetServ(dt));
    },
    onError: (error) => {
      console.log(error);
    }
  })

  const fetchUser = React.useCallback( async() => {
    // setLoading(true);
    const _id = JSON.parse(localStorage.getItem('9jauser') as string)._id;
    const request = await fetch(`${url}user/${_id}`);
    const json = await request.json() as IServerReturnObject;

    if (json.statusCode !== 200) {
        dispatch(logout())
        alert(json.errorMessage);
        // setLoading(false);
        return
    } else {
        dispatch(updateUser(json.data));
        dispatch(login());
        // setLoading(false);
    }
  }, [dispatch]);

   React.useEffect(() => {
      const data = localStorage.getItem('9jauser');

      if (data === null || data === undefined) {
          dispatch(logout())
      } else {
          fetchUser();
      }
  }, [fetchUser, router, dispatch]);

  const handleLogout = () => {
    localStorage.removeItem('9jauser');
    localStorage.removeItem('9jatoken');

    dispatch(logout())
  }

  const handleKeydonw = (e: any) => {
    if (e.key === 'Enter') {
      router.push(`/services/${query}`);
    }
  }

  const getDate = (date: any) => {
    const dt = moment.default(date);
    return dt.startOf('hours').fromNow();
  }

  return (
    <div className="w-full h-20 bg-white px-10 flex justify-between fixed z-50">
        <div className="flex items-center justify-center w-16 h-full overflow-hidden">
            <Link href="/" passHref>
                <Image src="/images/nlogo.png" fallbackSrc='https://via.placeholder.com/150' alt="logo" className="w-full h-full object-contain" />
            </Link>
        </div>
        <div className="flex-1 xl:flex lg:flex md:hidden sm:hidden justify-end items-center">

        <div className="flex-1 h-full xl:hidden lg:hidden md:flex sm:flex items-center px-3">
              <InputGroup>
                  <InputLeftElement  h="50px" paddingLeft="20px">
                      <FiSearch size={25} color="grey" />
                  </InputLeftElement>
                  <Input type="text" name="search" value={query} bgColor="#F1EEEE" paddingLeft="50px"  h="50px" onKeyPress={handleKeydonw} onChange={(e) => setQuery(e.target.value)} fontSize="sm" className="font-Cerebri-sans-book" />
                  <InputRightElement  h="50px">
                  {query !== '' && <FiX size={20} color="grey" onClick={() => setQuery('')} className='cursor-pointer' />}
                  </InputRightElement>
              </InputGroup>
          </div>
           
              <Menu size="lg" preventOverflow={true}>
                  <MenuButton
                    rightIcon={<FiChevronDown size={20} color="grey" />}
                  >
                    <p className="flex mr-6">
                      {/* <FiSearch size={20} className="text-white" /> */}
                      <span className="ml-3 font-Circular-std-book text-md cursor-pointer">Find Service</span>
                      <FiChevronDown size={20} color="black" className="ml-1 mt-1" />
                    </p>
                  </MenuButton>
                  <MenuList w="100vw" size maxH="500px" marginTop="20px" borderRadius={0} overflow="auto" mr="200px" className="grid grid-cols-4 font-light text-sm px-12">
                    {serv.map((item, index) => (
                      // <MenuItem key={index.toString()} >
                        <a href={`/services?service=${item.name}`} key={index}>
                            <p className="text-gray-600 font-Cerebri-sans-book text-md mb-4 mt-4">{item.name}</p>
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
                        className='hover:bg-green-100 rounded-md'
                        onClick={() => setUserMenuOpen(prev => !prev)}
                      >
                      <div className="z-30 w-24 py-2 h-16 rounded-md hover:bg-green-200 flex justify-center items-center cursor-pointer" >
                        <Avatar src={user.profile_pic} size="md" />
                        {userMenuOpen && (
                          <FiChevronUp size={25} className="ml-2 " color="black" />
                        )}
                        {!userMenuOpen && (
                          <FiChevronDown color="black" size={25} className="ml-2" />
                        )}
                      </div>
                      </MenuButton>
                      <MenuList w="100px" minW="173px" maxH="200px" marginRight="12px" overflow="auto" padding="0px" className="flex flex-col font-light text-sm p-0">
                            <p onClick={() => router.push('/dashboard')}  className="text-lg text-themeGreen font-Circular-std-book mx-0 mt-0 flex items-center cursor-pointer h-12 hover:bg-gray-100 p-3">
                              <span className="ml-2">Dashboard</span>
                            </p>

                            <p onClick={handleLogout} className="text-lg text-red-400 font-Circular-std-book mx-0 mt-0 flex items-center cursor-pointer h-12 hover:bg-gray-100 p-3">
                              <span className="ml-2">Logout</span>
                            </p>
                      </MenuList>
                    </Menu>
                  )
                }

            {loggedIn && (
              <div className="p-1 cursor-pointer rounded-md hover:bg-green-200">
                <span  onClick={() => setShowNoti(true)} >
                  <Notification size={25} filled primaryColor="grey" />
                </span>
                {/* <FiBell size={25} color="black" className='cursor-pointer'/> */}
              </div>
            )}

            {!loggedIn && (
              <div className="flex font-Cerebri-sans-book text-md cursor-pointer">
                <Link href="/auth/signup" passHref>
                  <p className="mr-6 font-Cerebri-sans-book text-md">
                    Become a vendor
                    </p>
                </Link>
                <p className='font-Cerebri-sans-book'><Link href="/auth/loginform">Login</Link></p>
              </div>
            )}
        </div>

        <div className="xl:hidden lg:hidden md:flex sm:flex items-center justify-end">
          
          {loggedIn && <span className='mr-4 ml-2' onClick={() => setShowNoti(true)}>
            <Notification size={25} primaryColor='grey' filled style={{ color: 'grey' }}  />
          </span>}
          <FiMenu size={30} color="grey" onClick={() => setOpen(true)} />
        </div>

        {/* Notification Drawer */}
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
                  {loggedIn && (
                      <div className="w-full h-16 flex items-center" onClick={() => router.push('/dashboard')}>
                        <Avatar src={user.profile_pic} className="mr-0 cursor-pointer" size="sm"  />
                        <p className='font-Cerebri-sans-book ml-2 text-themeGreen'>Dashboard</p>
                      </div>
                    )
                    }

                    {!loggedIn && (
                      <div className="flex flex-col font-Cerebri-sans-book text-md text-themeGreen cursor-pointer">
                        <p className="mr-3"><Link href="/auth/signup">Become a vendor</Link></p>
                        <p className='mt-4'><Link href="/auth/loginform">Login</Link></p>
                      </div>
                    )}


                    <Accordion className="mt-5" allowToggle allowMultiple defaultIndex={[0]}>

                        <AccordionItem>
                            <AccordionButton>
                                <Box flex="1" textAlign="left">
                                  <p className="text-xl font-Cerebri-sans-book text-themeGreen">Find Services</p>
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>

                            <AccordionPanel>
                              <div className="w-full h-64 overflow-y-auto flex flex-col">
                                {/* <p>Profile</p> */}
                                  {serv.map((item, index) => (
                                    <>
                                      <p className="mt-3 mb-3 font-Cerebri-sans-book" key={index.toString()}>
                                        <Link href={`/services`}>{item.name}</Link>
                                      </p>

                                      {index !== serv.length - 1 && (
                                        <Divider />
                                      )}
                                    </>
                                  ))}
                              </div>
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>

                    <p onClick={handleLogout} className="text-red-500 mt-5 text-xl ml-5 font-Cerebri-sans-book">Logout</p>
                  </div>


                </div>
              </DrawerBody>
            </DrawerContent>
        </Drawer>
    </div>
  );
}
