import React from 'react';
import { FiSearch, FiBell, FiMenu } from 'react-icons/fi'
import { Avatar, Drawer, DrawerOverlay, DrawerContent, DrawerBody } from '@chakra-ui/react'

// images
import Image from 'next/image';
import Logo from '../../public/images/logo.svg';
import Sidebar from '../dashboard/Sidebar';

interface IProps {
  page: number;
  setPage: Function;
}

export default function Navbar({page, setPage}: IProps) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="w-full h-20 bg-white px-10 flex justify-between">
        <div className="flex-1 flex items-center">
            <Image src={Logo} alt="logo" className="w-20 h-20" />
        </div>
        <div className="flex-1 xl:flex lg:flex md:hidden sm:hidden justify-end items-center">
            <p className="flex mr-6">
                <FiSearch size={20} className="text-themeGreen" />
                <span>Find Service</span>
            </p>
            <Avatar src="https://bit.ly/broken-link" className="mr-6" size="sm" />

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
                  <Sidebar page={page} setPage={setPage} />
                </div>
              </DrawerBody>
            </DrawerContent>
        </Drawer>
    </div>
  );
}
