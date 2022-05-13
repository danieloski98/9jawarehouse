import React from 'react';
import { FiSearch, FiBell, FiMenu, FiChevronDown, FiChevronUp, FiX, FiTrash2 } from 'react-icons/fi'
import { Avatar, Drawer, DrawerOverlay, DrawerContent, DrawerBody, Menu, MenuButton, MenuList, MenuItem, Button, Accordion, AccordionButton, AccordionItem, AccordionPanel, AccordionIcon, Box, Divider, DrawerCloseButton, Spinner,  Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverBody, ModalOverlay, PopoverHeader, Input, InputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/react'
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
import { Image } from '@chakra-ui/react';
import Logo from '../../public/images/nlogo.png';
import Sidebar from '../dashboard/Sidebar';
import { IServices } from '../../utils/types/services';
import { IServerReturnObject } from '../../utils/types/serverreturntype';
import url from '../../utils/url';
import { IUser } from '../../utils/types/user';
import { INotification } from '../../utils/types/Notification';
import { queryClient } from '../../pages/_app';

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
  const [query, setQuery] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  const [notiLoading, setNotiLoading] = React.useState(true);
  const [notiError, setNotiError] = React.useState(false);
  const [notifications, setNotifications] = React.useState([] as Array<INotification>);
  const [showNoti, setShowNoti] = React.useState(false);
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);
  const user = useSelector((state:RootState) => state.UserReducer.user);
  const pin = useSelector((state: RootState) => state.PinReducer.pin);
  const loggedIn = useSelector((state: RootState) => state.LoggedInReducer.loggedIn);
  const [sort, setSort] = React.useState(1);

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
      setNotiLoading(false);
      setNotiError(true);
    }
  })

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
            }else {
              setLoading(false)
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

  const handleKeydonw = (e: any) => {
    if (e.key === 'Enter') {
      router.push(`/services?service=${query}`);
    }
  }

  const getDate = (date: any) => {
    const dt = moment.default(date);
    return dt.startOf('seconds').fromNow();
  }


  const handleLogout = () => {
    localStorage.removeItem('9jauser');
    localStorage.removeItem('9jatoken');
    dispatch(logout());
    router.push('/');
  }

  const deleteNotification = React.useCallback(async (id: string) => {
    const request = await fetch(`${url}notifications/${id}`, {
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

  return (
    <div className="w-full h-20 py-0 bg-white xl:px-10 lg:px-10 md:px-5 sm:px-5 flex justify-between items-center">
        <div className="w-20 h-16 flex items-center ">
            <Link href="/" passHref>
              <Image src="/images/nlogo.png" alt="logo" className="w-20 h-16 cursor-pointer" />
            </Link>
        </div>

        <div className="flex-1 h-full xl:hidden lg:hidden md:flex sm:flex items-center px-3">
              <InputGroup>
                  <InputLeftElement  h="50px" paddingLeft="20px">
                      <FiSearch size={25} color="grey" />
                  </InputLeftElement>
                  <Input type="text" name="search" autoComplete="off" value={query} bgColor="#F1EEEE" paddingLeft="50px"  h="50px" onKeyPress={handleKeydonw} onChange={(e: any) => setQuery(e.target.value)} fontSize="sm" className="font-Cerebri-sans-book" />
                  <InputRightElement  h="50px">
                  {query !== '' && <FiX size={20} color="grey" onClick={() => setQuery('')} className='cursor-pointer' />}
                  </InputRightElement>
              </InputGroup>
          </div>


        <div className="flex-1 xl:flex lg:flex md:hidden sm:hidden justify-end items-center z-20">

        <div 
              className="w-auto h-full xl:flex lg:flex md:hidden sm:hidden mr-8 items-center">
                  <InputGroup>
                      <InputLeftElement h="55px" paddingLeft="20px">
                          <Search  size={20} primaryColor='grey' />
                      </InputLeftElement>
                      <Input type="text" name="search" value={query} autoComplete="off" bgColor="#F1EEEE" w="559px" h="55px" paddingLeft="60px" onKeyPress={handleKeydonw} onChange={(e: any) => setQuery(e.target.value)} fontSize="sm" className="font-Cerebri-sans-book" />
                      <InputRightElement h="60px">
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
                    {[...serv]
                    .sort(compare)
                    .map((item, index) => (
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
                         
                           <p onClick={handleLogout} className="text-lg text-red-400 font-Circular-std-book mx-0 mt-0 flex items-center cursor-pointer h-12 hover:bg-gray-100 p-3">
                              <span className="ml-2">Logout</span>
                            </p>
                      </MenuList>
                    </Menu>
                  )
                }
            

            {loggedIn && (
              <div className="p-1 cursor-pointer rounded-md hover:bg-green-200 ml-2 flex">
                <span onClick={() => setShowNoti(true)}>
                  <Notification size={25} primaryColor='grey' filled style={{ color: 'grey' }}  />
                </span>
               {notifications.length > 0 &&  <sup className='text-themeGreen font-bold text-md'>{notifications.length}</sup>}
              </div>
            )}

            {!loggedIn && (
              <div className="flex font-Cerebri-sans-book text-sm cursor-pointer">
                <p className="mr-3"><Link href="/auth/signup">Become a vendor</Link></p>
                <p><Link href="/auth/loginform">Login</Link></p>
              </div>
            )}
        </div>

        <div className="xl:hidden lg:hidden md:flex sm:flex items-center justify-end">
          
          {loggedIn && 
          <div className="p-1 cursor-pointer rounded-md hover:bg-green-200 ml-2 flex mr-4">
            <span className='mr-0 ml-2' onClick={() => setShowNoti(true)}>
              <Notification size={25} primaryColor='grey' filled style={{ color: 'grey' }}  />
            </span>
            <sup className='text-themeGreen font-bold text-md'>{notifications.length}</sup>
          </div>
          }
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
                                    <div className="w-full flex justify-end text-red-400 cursor-pointer text-sm font-Cerebri-sans-book" onClick={() => deleteNotification(item._id)}>
                                      <p>Clear</p>
                                    </div>
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
                                  {[...serv]
                                  .sort(compare)
                                  .map((item, index) => (
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

                  {loggedIn && <p onClick={handleLogout} className="text-red-500 mt-5 ml-5 text-xl font-Cerebri-sans-book">Logout</p>}


                </div>
              </DrawerBody>
            </DrawerContent>
        </Drawer>

    </div>
  );
}
