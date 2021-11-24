import React from 'react';
import { FiSearch, FiBell, FiMenu, FiChevronDown, FiX } from 'react-icons/fi'
import { Avatar, Drawer, DrawerOverlay, DrawerContent, DrawerBody, Menu, MenuButton, MenuList, MenuItem, Button, InputGroup, Input, InputLeftElement, InputRightElement, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Link from 'next/link'

// images
import Image from 'next/image';
import Logo from '../../public/images/logo.svg';
import Sidebar from '../dashboard/Sidebar';

interface IProps {
  page: number;
  setPage: Function;
}

export default function ServiceNavbar() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

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
                <Input />
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
                    <Input />
                    <InputRightElement>
                        <FiX size={20} color="grey" />
                    </InputRightElement>
                </InputGroup>
            </div>
            <Menu size="lg" preventOverflow={true}>
              <MenuButton
                rightIcon={<FiChevronDown size={20} color="grey" />}
              >
                <p className="flex mr-6">
                  <FiSearch size={20} className="text-themeGreen" />
                  <span className="ml-3">Find Service</span>
                  <FiChevronDown size={20} color="grey" className="ml-1 mt-1" />
                </p>
              </MenuButton>
              <MenuList w="1000px" size maxH="500px" overflow="auto" className="grid grid-cols-4 font-light text-sm">
                <MenuItem>Download</MenuItem>
                <MenuItem>Create a Copy</MenuItem>
                <MenuItem>Mark as Draft</MenuItem>
                <MenuItem>Delete</MenuItem>
                <MenuItem>Attend a Workshop</MenuItem>
                <MenuItem>Download</MenuItem>
                <MenuItem>Create a Copy</MenuItem>
                <MenuItem>Mark as Draft</MenuItem>
                <MenuItem>Delete</MenuItem>
                <MenuItem>Attend a Workshop</MenuItem>
                <MenuItem>Download</MenuItem>
                <MenuItem>Create a Copy</MenuItem>
             
              </MenuList>
            </Menu>
            
            <Link href="/dashboard">
              <a>
                <Avatar src="https://bit.ly/broken-link" className="mr-6" size="sm" />
              </a>
            </Link>

            <FiBell size={25} color="black" />
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
                    <div className="w-full h-10 text-white flex justify-center items-center bg-themeGreen">
                        PIN: 9080998
                    </div>

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
