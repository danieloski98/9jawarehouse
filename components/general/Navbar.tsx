import React from 'react';
import { FiSearch, FiBell, FiMenu, FiChevronDown, FiX } from 'react-icons/fi'
import { Avatar, Drawer, DrawerOverlay, DrawerContent, DrawerBody, Menu, MenuButton, MenuList, MenuItem, Button, Accordion, AccordionButton, AccordionItem, AccordionPanel, AccordionIcon, Box, Divider, DrawerCloseButton, Spinner } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Link from 'next/link'

// redux
import {useSelector, useDispatch} from 'react-redux';
import { RootState } from '../../store/index';
import { setServices as SetServ } from '../../reducers/services.reducer'
import { updateUser } from '../../reducers/User.reducer'
import { updatePin } from '../../reducers/pin.reducer'

// images
import Image from 'next/image';
import Logo from '../../public/images/logo.svg';
import Sidebar from '../dashboard/Sidebar';
import { IServices } from '../../utils/types/services';
import { IServerReturnObject } from '../../utils/types/serverreturntype';
import url from '../../utils/url';
import { IUser } from '../../utils/types/user';

interface IProps {
  page: number;
  services?: IServices[];
  setPage: Function;
}

export default function Navbar({page, setPage}: IProps) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [showNoti, setShowNoti] = React.useState(false);
  const user = useSelector((state:RootState) => state.UserReducer.user);
  const pin = useSelector((state: RootState) => state.PinReducer.pin);
  const loggedIn = useSelector((state: RootState) => state.LoggedInReducer.loggedIn);
  console.log(user);
  const router = useRouter();

  const dispatch = useDispatch();
  const serv = useSelector((state: RootState) => state.ServicesReducer.services)

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

  return (
    <div className="w-full h-20 bg-white px-10 flex justify-between z-40">
        <div className="flex-1 flex items-center">
            <Image src={Logo} alt="logo" className="w-20 h-20" />
        </div>
        <div className="flex-1 xl:flex lg:flex md:hidden sm:hidden justify-end items-center z-20">
            <Menu size="lg" >
              <MenuButton
                righticon={<FiChevronDown size={20} color="grey" />}
              >
                <p className="flex mr-6">
                  <FiSearch size={20} className="text-themeGreen" />
                  <span className="ml-3 font-semibold text-sm cursor-pointer">Find Service</span>
                  <FiChevronDown size={20} color="grey" className="ml-1 mt-0" />
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
              <div className="flex font-light text-sm cursor-pointer">
                <p className="mr-3"><Link href="/auth/createaccount">Create Account</Link></p>
                <p><Link href="/auth/login">Login</Link></p>
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
              <div className="w-full h-64 mt-4">
                <p>You have no new Notification</p>
              </div>
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
                            <div className="w-11/12 mt-5 flex items-center justify-center mx-3 h-12 bg-green-100 text-green-600">
                                {!loading && <span>PIN - {pin}</span>}
                                {loading && <Spinner color="white" size="lg" />}
                            </div>
                          )
                      }


                      {
                          !user.pin && (
                            <button onClick={generatePin} className="w-11/12 mt-5 flex items-center justify-center mx-3 h-12 bg-green-100 text-green-600">
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
                            </AccordionItem>
                          )
                        }

                        <AccordionItem>
                            <AccordionButton>
                                <Box flex="1" textAlign="left">
                                  <p className="text-xl font-light text-themeGreen">Find Services</p>
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>

                            <AccordionPanel>
                              <div className="w-full h-64 overflow-y-auto flex flex-col">
                                {/* <p>Profile</p> */}
                                  {serv.map((item, index) => (
                                    <div key={index.toString()}>
                                      <p className="mt-3 mb-3" key={index.toString()}>
                                        <Link href={`/services/${item.name}`}>{item.name}</Link>
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

                  <p className="text-red-500 mt-5 text-sm font-light">Logout</p>


                </div>
              </DrawerBody>
            </DrawerContent>
        </Drawer>

    </div>
  );
}
