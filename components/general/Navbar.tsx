import React from 'react';
import { FiSearch, FiBell, FiMenu, FiChevronDown } from 'react-icons/fi'
import { Avatar, Drawer, DrawerOverlay, DrawerContent, DrawerBody, Menu, MenuButton, MenuList, MenuItem, Button} from '@chakra-ui/react'
import { useRouter } from 'next/router'

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
  const router = useRouter();

  return (
    <div className="w-full h-20 bg-white px-10 flex justify-between">
        <div className="flex-1 flex items-center">
            <Image src={Logo} alt="logo" className="w-20 h-20" />
        </div>
        <div className="flex-1 xl:flex lg:flex md:hidden sm:hidden justify-end items-center">
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
