import React from 'react';
import { FiSearch, FiBell, FiMenu, FiChevronDown, FiX } from 'react-icons/fi'
import { Avatar, Drawer, DrawerOverlay, DrawerContent, DrawerBody, Menu, MenuButton, MenuList, MenuItem, Button, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, Divider  } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Link from 'next/link'

// redux
import {useSelector, useDispatch} from 'react-redux';
import { RootState } from '../../store/index';
import { setServices as SetServ } from '../../reducers/services.reducer'
import { updateUser } from '../../reducers/User.reducer';
import { login } from '../../reducers/logged'

// images
import Image from 'next/image';
import Logo from '../../public/images/logo.svg';
import Sidebar from '../dashboard/Sidebar';


export default function NormNavbar() {
  const [open, setOpen] = React.useState(false);
  const user = useSelector((state:RootState) => state.UserReducer.user);
  const loggedIn = useSelector((state: RootState) => state.LoggedInReducer.loggedIn);
  const serv = useSelector((state: RootState) => state.ServicesReducer.services)
  const dispatch = useDispatch();
  console.log(user);
  const router = useRouter();

  return (
    <div className="w-full h-20 bg-white px-10 flex justify-between fixed z-50">
        <div className="flex-1 flex items-center">
            <Link href="/">
                <a>
                    <Image src={Logo} alt="logo" className="w-20 h-20" />
                </a>
            </Link>
        </div>
        <div className="flex-1 xl:flex lg:flex md:hidden sm:hidden justify-end items-center">
            <Menu size="lg" preventOverflow={true}>
              <MenuButton
                rightIcon={<FiChevronDown size={20} color="grey" />}
              >
                <p className="flex mr-6">
                  <FiSearch size={20} className="text-themeGreen" />
                  <span className="ml-3 font-Cerebri-sans-book">Find Service</span>
                  <FiChevronDown size={20} color="grey" className="ml-1 mt-1" />
                </p>
              </MenuButton>
              <MenuList w="1000px" size maxH="500px" overflow="auto" className="grid grid-cols-4 font-Cerebri-sans-book text-sm">
                {serv.map((item, index) => (
                  <MenuItem key={index.toString()}>
                    <Link href={`/services`}>{item.name}</Link>
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
            
            {loggedIn && <Avatar src={user.profile_pic} className="mr-6" size="sm" />}
            {loggedIn && <FiBell size={25} color="black" />}

            {!loggedIn && (
              <div className="flex font-Cerebri-sans-book text-md cursor-pointer">
                <Link href="/auth/createaccount" passHref>
                  <p className="mr-6 font-Cerebri-sans-book text-md">
                    Create Account
                    </p>
                </Link>
                <p className='font-Cerebri-sans-book'><Link href="/auth/login">Login</Link></p>
              </div>
            )}
        </div>

        <div className="xl:hidden lg:hidden md:flex sm:flex items-center">
          <FiMenu size={30} color="grey" onClick={() => setOpen(true)} />
        </div>

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
                        <div className="w-full h-10 text-white flex justify-center items-center bg-themeGreen">
                            PIN: 9080998
                        </div>
                      )
                    }

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

                    <p className="text-red-500 mt-5 text-sm font-Cerebri-sans-book">Logout</p>
                  </div>


                </div>
              </DrawerBody>
            </DrawerContent>
        </Drawer>
    </div>
  );
}
