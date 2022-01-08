import React from 'react';
import Image from 'next/image';
import { FiSearch, FiMenu } from 'react-icons/fi'
import { InputGroup, Input, InputLeftAddon, InputLeftElement, Drawer, DrawerOverlay, DrawerContent, DrawerBody, Avatar, Menu, MenuButton, MenuList, MenuItem, Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Divider, } from '@chakra-ui/react'
const colors = require('tailwindcss/colors')
import { useRouter } from 'next/router'
import { FiBell, FiChevronDown, FiX } from 'react-icons/fi'
import Link from 'next/link'

// redux
// redux
import {useSelector, useDispatch} from 'react-redux';
import { RootState } from '../../store/index';
import { setServices as SetServ } from '../../reducers/services.reducer'
import { updateUser } from '../../reducers/User.reducer'
import { updatePin } from '../../reducers/pin.reducer'

// images
import Logo from '../../public/images/logo.svg';
import Woman from '../../public/images/woman.svg';
import url from '../../utils/url';
import { IServerReturnObject } from '../../utils/types/serverreturntype';


// other components
export const LeftNavbar = () => {
    const dispatch = useDispatch();
    const serv = useSelector((state: RootState) => state.ServicesReducer.services);

    React.useMemo(() => {
        (async function() {
          const request1 = await fetch(`${url}services`);
          const json1 = await request1.json() as IServerReturnObject;
          const ser = json1.data;
    
          dispatch(SetServ(ser))
        })()
      }, [dispatch]);

    const [open, setOpen] = React.useState(false);
    const router = useRouter();

    return (
        <div className="w-full h-24 flex justify-between items-center px-5">
            <Image src={Logo} alt="logo" className=" w-20 h-20" />
            <div className=" xl:hidden lg:hidden md:flex sm:flex w-20 justify-end items-center">
                {/* <FiSearch size={25} color="grey" /> */}
                <FiMenu size={25} color="grey" onClick={() => setOpen(true)} />
            </div>

            {/* drawer */}
            <Drawer isOpen={open} onClose={() => setOpen(false)} placement="right" >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerBody>
                        <div className="w-full flex flex-col items-start text-md font-light text-gray-600">
                            {/* <Avatar src="https://bit.ly/broken-link" className="" size="sm" /> */}
                            <p onClick={() => router.push('/auth/loginform')} className="mt-6 text-md font-Cerebri-sans-book text-themeGreen">Login</p>
                            <p onClick={() => router.push('/auth/signup')} className="mt-4 mb-4 text-md font-Cerebri-sans-book text-themeGreen">Register</p>

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
                                    <div key={index.toString()}>
                                      <p className="mt-3 mb-3 font-Cerebri-sans-book" key={index.toString()}>
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
                    </DrawerBody>
                </DrawerContent>
            </Drawer>

        </div>
    )
}

const RightNavBar = () => {
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

    return (
        <div className="w-full h-24 flex justify-center items-center text-white">
             <Menu size="lg" preventOverflow={true}>
              <MenuButton
                rightIcon={<FiChevronDown size={20} color="grey" />}
              >
                <p className="flex mr-6">
                  <FiSearch size={20} className="text-white" />
                  <span className="ml-3 font-Circular-std-book text-md cursor-pointer">Find Service</span>
                  <FiChevronDown size={20} color="white" className="ml-1 mt-1" />
                </p>
              </MenuButton>
              <MenuList w="1000px" size maxH="500px" overflow="auto" mr="200px" className="grid grid-cols-4 font-light text-sm">
                {serv.map((item, index) => (
                  <MenuItem key={index.toString()}>
                    <a href={`/services?service=${item.name}`}>
                        <p className="text-gray-600 font-Circular-std-book">{item.name}</p>
                    </a>
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>

            <p onClick={() => router.push('/auth/signup')} className="text-md font-Circular-std-book mx-5 flex items-center cursor-pointer">
                <span>Become A Vendor</span>
            </p>

            <p onClick={() => router.push('/auth/loginform')} className="text-md font-Circular-std-book mx-5 flex items-center cursor-pointer">
                <span>Login</span>
            </p>
    </div>
    )
}



export default function Banner() {
    const [query, setQuery] = React.useState('');
    const router = useRouter();

    const handleKeydonw = (e: any) => {
        if (e.key === 'Enter') {
          router.push(`/services?service=${query}`);
        }
      }
  return (
    <div className="w-full xl:h-screen lg:h-screen md:h-auto sm:h-auto flex">
        <div className="flex-1 flex flex-col">
            <LeftNavbar />
            <div className="flex-1 flex flex-col justify-center xl:px-10 lg:px-10 md:px-5 sm:px-5  xl:py-0 lg:py-0 md:py-12 sm:py-12">
                <h1 className="xl:text-6xl lg:text-6xl md:text-4xl sm:text-4xl font-Circular-std-medium text-themeGreen">
                    Discover Vendors <br/>
                </h1>
                <h1 className="xl:text-6xl lg:text-6xl md:text-4xl sm:text-4xl font-Circular-std-medium text-themeGreen mt-4">
                    Near You
                </h1>
                <p className="xl:w-4/5 lg:w-4/5 md:w-full sm:w-full mt-5 text-xl font-Circular-std-book text-gray-400">
                Less hassle searching for who is best fit  for Photography, Catering, Event planning, make-up artists, DJs, decorators and more
                </p>

                <div className="xl:w-9/12 lg:w-9/12 md:w-full sm:w-full mt-6">
                    <InputGroup>
                        <InputLeftElement bgColor="#1A8F85">
                        <div className=" w-full flex items-center justify-center">
                            <FiSearch color="white" size={20} />
                        </div>
                        </InputLeftElement>
                        <Input onKeyPress={handleKeydonw} onChange={(e) => setQuery(e.target.value)} placeholder="search for services or businesses" fontSize="md" paddingLeft="50px" className='font-Circular-std-book' />
                    </InputGroup>
                </div>
            </div>
        </div>
        <div className="flex-1 bg-themeGreen xl:flex lg:flex md:hidden sm:hidden flex flex-col">
            <RightNavBar />
            <div className="flex-1 overflow-hidden">
                <Image src={Woman} alt="logo" className=" w-full h-full object-contain" />
            </div>
        </div>
    </div>
  );
}
