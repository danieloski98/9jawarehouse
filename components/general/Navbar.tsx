import React from 'react';
import { FiSearch, FiBell, FiMenu, FiChevronDown, FiChevronUp, FiX, FiTrash2 } from 'react-icons/fi'
import { Avatar, Drawer, DrawerOverlay, DrawerContent, DrawerBody, Menu, MenuButton, MenuList, MenuItem, Button, Accordion, AccordionButton, AccordionItem, AccordionPanel, AccordionIcon, Box, Divider, DrawerCloseButton, Spinner,  Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverBody, ModalOverlay, PopoverHeader } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useQuery } from 'react-query'
import * as moment from 'moment'
import { Notification, Search } from 'react-iconly';
// redux
import {useSelector, useDispatch} from 'react-redux';
import { RootState } from '../../store/index';
import { setServices as SetServ } from '../../reducers/services.reducer'
import { updateUser } from '../../reducers/User.reducer'
import { updatePin } from '../../reducers/pin.reducer'
import { logout } from '../../reducers/logged'

// images
import Image from 'next/image';
import Logo from '../../public/images/logo.svg';
import Sidebar from '../dashboard/Sidebar';
import { IServices } from '../../utils/types/services';
import { IServerReturnObject } from '../../utils/types/serverreturntype';
import url from '../../utils/url';
import { IUser } from '../../utils/types/user';
import { INotification } from '../../utils/types/Notification';

interface IProps {
  page: number;
  services?: IServices[];
  setPage: Function;
}

// query frunction
const getNotifications = async (user_id: string) => {
  const request = await fetch(`${url}notifications/${user_id}`);
  const json = await request.json() as IServerReturnObject;
  if (!request.ok) {
    throw new Error('An Error Occured')
  }
  return json;
}

export default function Navbar({page, setPage}: IProps) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [notiLoading, setNotiLoading] = React.useState(true);
  const [notiError, setNotiError] = React.useState(false);
  const [notifications, setNotifications] = React.useState([] as Array<INotification>);
  const [showNoti, setShowNoti] = React.useState(false);
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);
  const user = useSelector((state:RootState) => state.UserReducer.user);
  const pin = useSelector((state: RootState) => state.PinReducer.pin);
  const loggedIn = useSelector((state: RootState) => state.LoggedInReducer.loggedIn);
  console.log(user);
  const router = useRouter();

  const dispatch = useDispatch();
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

  React.useMemo(() => {
    (async function() {
      const request1 = await fetch(`${url}services`);
      const json1 = await request1.json() as IServerReturnObject;
      const ser = json1.data;

      dispatch(SetServ(ser))
    })()
  }, [dispatch]);

  React.useEffect(() => {
        (async function() {
            if (user.pin) {
                // fetch new Pin
                const request = await fetch(`${url}pin/${user._id}`);
                const json = await request.json() as IServerReturnObject;

                if (json.statusCode !== 200) {
                  alert(json.errorMessage);
                  setLoading(false);
                  return;
                }
              
                dispatch(updatePin(json.data.code));

                setLoading(false);
            }
        })()
    }, [dispatch, user._id, user.pin]);

    const generatePin = async () => {
      setLoading(true);
      const request = await fetch(`${url}pin/generate/${user._id}`, {
          method: 'post',
      });
  
      const json = await request.json() as IServerReturnObject;
      const userr = json.data.user as IUser;
      const code = json.data.pin;

      if (json.statusCode !== 200) {
        alert(json.errorMessage);
        setLoading(false);
        return;
      }
  
      dispatch(updateUser(userr));
      dispatch(updatePin(code));
  
      setLoading(false);
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

  const navigate = (num: number) => {
    setOpen(false);
    setPage(num)
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
    <div className="w-full h-16 py-0 bg-white px-10 flex justify-between items-center">
        <div className="flex-1 flex items-center h-auto w-auto overflow-hidden ">
            <Link href="/" passHref>
              <Image src={Logo} alt="logo" className="w-20 h-20 cursor-pointer" />
            </Link>
        </div>
        <div className="flex-1 xl:flex lg:flex md:hidden sm:hidden justify-end items-center z-20">

            <Menu>
              <MenuButton
                righticon={<FiChevronDown size={20} color="grey" />}
                
              >
                <p className="flex mr-4">
                  <Search  size={20} primaryColor='grey' />
                  <span className="ml-3 font-Cerebri-sans-book  text-sm cursor-pointer">Find Service</span>
                  <FiChevronDown size={20} color="grey" className="ml-1 mt-0" />
                </p>
              </MenuButton>
              <MenuList w="100vw" maxH="500px" overflow="auto" className="grid grid-cols-4 font-light text-sm pl-10">
                {serv.map((item, index) => (
                  <MenuItem key={index.toString()}>
                    <Link prefetch={false} shallow={true} passHref href={`/services?service=${item.name}`}>
                      <p className='font-Cerebri-sans-book '>
                      {item.name}
                      </p>
                      </Link>
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>

            

            {
              loggedIn && (
                <Menu>
                  <MenuButton
                    righticon={<FiChevronDown size={20} color="grey" />}
                    className='hover:bg-green-200 rounded-md'
                  >
                  <div className="z-30 w-16 h-12 rounded-md hover:bg-green-200 flex justify-center items-center cursor-pointer" onClick={() => setUserMenuOpen(prev => !prev)}>
                    <Avatar src={user.profile_pic} size="sm" />
                    {userMenuOpen && (
                      <FiChevronUp size={15} className="ml-0 " color="black" />
                    )}
                    {!userMenuOpen && (
                      <FiChevronDown color="black" size={15} className="ml-0" />
                    )}
                  </div>
                  </MenuButton>
                  <MenuList w="100px" minW="10px" maxH="200px" overflow="auto" className="flex flex-col font-light text-sm p-0">
                      <MenuItem className='h-6'>
                        <p onClick={handleLogout} className="text-sm text-red-400 h-auto font-Circular-std-book mx-0 mt-0 flex items-center cursor-pointer">
                          <span>Logout</span>
                        </p>
                      </MenuItem>          
                  </MenuList>
                </Menu>
              )
            }
            

            {loggedIn && (
              <div className="p-1 cursor-pointer rounded-md hover:bg-green-200 ml-2">
                <span onClick={() => setShowNoti(true)}>
                  <Notification size={25} primaryColor='grey' filled style={{ color: 'grey' }}  />
                </span>
              </div>
            )}

            {!loggedIn && (
              <div className="flex font-Cerebri-sans-book text-sm cursor-pointer">
                <p className="mr-3"><Link href="/auth/signup">Create Account</Link></p>
                <p><Link href="/auth/loginform">Login</Link></p>
              </div>
            )}
        </div>

        <div className="xl:hidden lg:hidden md:flex sm:flex items-center">
          <FiMenu size={30} color="grey" onClick={() => setOpen(true)} />
          {loggedIn && <FiBell size={25} color="black" className='ml-5 cursor-pointer' onClick={() => setShowNoti(true)} />}
        </div>


        {/* Notofication Drawer */}
        <Drawer isOpen={showNoti} onClose={() => setShowNoti(false)}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerBody>
              <p>Notifications</p>
              {!notiLoading && !notiError && notifications.length < 1 && (
                <div className="w-full h-64 mt-4 font-Cerebri-sans-book">
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
                    {
                      loggedIn && (
                       <div className='w-full'>
                          {
                          user.pin && (
                            <div className="w-11/12 mt-5 flex items-center justify-center mx-3 h-12 bg-green-100 text-green-600 font-Cerebri-sans-book">
                                {!loading && <span>PIN - {pin}</span>}
                                {loading && <Spinner color="white" size="lg" />}
                            </div>
                          )
                      }


                      {
                          !user.pin && (
                            <button onClick={generatePin} className="w-11/12 mt-5 flex items-center justify-center mx-3 h-12 bg-green-100 text-green-600 font-Cerebri-sans-book">
                                {!loading && <span>Generate PIN</span>}
                                {loading && <Spinner color="white" size="lg" />}
                            </button>
                          )
                      }
                       </div>
                      )
                    }

                    <Accordion className="mt-5" allowToggle allowMultiple defaultIndex={[0]}>
                        {
                          loggedIn && (
                            <AccordionItem>
                                <AccordionButton>
                                    <Box flex="1" textAlign="left">
                                      <p className="text-xl font-Cerebri-sans-book text-themeGreen">Dashboard</p>
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>

                                <AccordionPanel>
                                  <div className="w-full flex flex-col font-Cerebri-sans-book">
                                    <p onClick={() => navigate(1)}>Profile</p>
                                    <p className="mt-3" onClick={() => navigate(2)}>Customer Reviews</p>
                                    <p className="mt-3" onClick={() => navigate(3)}>Subscriptions</p>
                                    <p className="mt-3">Notifications</p>
                                    <p className="mt-3" onClick={() => navigate(4)}>Settings</p>
                                  </div>
                                </AccordionPanel>
                            </AccordionItem>
                          )
                        }

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

                   
                  </div>

                  <p className="text-red-500 mt-5 text-sm font-Cerebri-sans-book">Logout</p>


                </div>
              </DrawerBody>
            </DrawerContent>
        </Drawer>

    </div>
  );
}
