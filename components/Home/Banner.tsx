import React from 'react';
import Image from 'next/image';
import { FiSearch, FiMenu } from 'react-icons/fi'
import { InputGroup, Input, InputLeftAddon, InputLeftElement, Drawer, DrawerOverlay, DrawerContent, DrawerBody, Avatar } from '@chakra-ui/react'
const colors = require('tailwindcss/colors')
import { useRouter } from 'next/router'

// images
import Logo from '../../public/images/logo.svg';
import Woman from '../../public/images/woman.svg';


// other components
export const LeftNavbar = () => {

    const [open, setOpen] = React.useState(false);
    const router = useRouter();

    return (
        <div className="w-full h-24 flex justify-between items-center px-5">
            <Image src={Logo} alt="logo" className=" w-20 h-20" />
            <div className=" xl:hidden lg:hidden md:flex sm:flex w-20 justify-between items-center">
                <FiSearch size={25} color="grey" />
                <FiMenu size={25} color="grey" onClick={() => setOpen(true)} />
            </div>

            {/* drawer */}
            <Drawer isOpen={open} onClose={() => setOpen(false)} placement="top" >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerBody>
                        <div className="w-full flex flex-col items-center text-md font-light text-gray-600">
                            <Avatar src="https://bit.ly/broken-link" className="" size="sm" />
                            <p onClick={() => router.push('/auth/login')} className="mt-6">Login</p>
                            <p onClick={() => router.push('/auth/createaccount')} className="mt-2 mb-4">Register</p>
                        </div>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>

        </div>
    )
}

const RightNavBar = () => {
    const router = useRouter();

    return (
        <div className="w-full h-24 flex justify-center items-center">
            <p onClick={() => router.push('/services') } className="text-sm font-semibold mx-5 flex items-center cursor-pointer">
                <FiSearch size={25} color="grey" />
                <span>Find Services</span>
            </p>

            <p onClick={() => router.push('/auth/createaccount')} className="text-sm font-semibold mx-5 flex items-center cursor-pointer">
                <span>Become A Vendor</span>
            </p>

            <p onClick={() => router.push('/auth/login')} className="text-sm font-semibold mx-5 flex items-center cursor-pointer">
                <span>Login</span>
            </p>
    </div>
    )
}



export default function Banner() {
  return (
    <div className="w-full h-screen flex">
        <div className="flex-1 flex flex-col">
            <LeftNavbar />
            <div className="flex-1 flex flex-col justify-center xl:px-10 lg:px-10 md:px-5 sm:px-5">
                <h1 className="xl:text-6xl lg:text-6xl md:text-4xl sm:text-4xl font-regular text-themeGreen">
                    Discover Vendors <br/>
                </h1>
                <h1 className="xl:text-6xl lg:text-6xl md:text-4xl sm:text-4xl font-regular text-themeGreen mt-4">
                    Near You
                </h1>
                <p className="xl:w-4/5 lg:w-4/5 md:w-full sm:w-full mt-5 text-md font-semibold text-gray-400">
                Less hassle searching for who is best fit  for Photography, Catering, Event planning, make-up artists, DJs, decorators and more
                </p>

                <div className="xl:w-9/12 lg:w-9/12 md:w-full sm:w-full mt-6">
                    <InputGroup>
                        <InputLeftAddon bgColor="#1A8F85">
                        <div className=" w-full flex items-center justify-center">
                            <FiSearch color="white" size={20} />
                        </div>
                        </InputLeftAddon>
                        <Input placeholder="search for services or businesses" />
                    </InputGroup>
                </div>
            </div>
        </div>
        <div className="flex-1 bg-yellow-200 xl:flex lg:flex md:hidden sm:hidden flex flex-col">
            <RightNavBar />
            <div className="flex-1 overflow-hidden">
                <Image src={Woman} alt="logo" className=" w-full h-full object-contain" />
            </div>
        </div>
    </div>
  );
}
