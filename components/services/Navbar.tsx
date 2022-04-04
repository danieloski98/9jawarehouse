import React from 'react'
import Link from 'next/link'
import { Avatar, Drawer, DrawerOverlay, DrawerContent, DrawerBody, Menu, MenuButton, MenuList, MenuItem, Button, InputGroup, Input, InputLeftElement, InputRightElement, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, Divider, DrawerCloseButton, Spinner, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverBody, ModalOverlay, PopoverHeader, Image } from '@chakra-ui/react'
import { Search } from 'react-iconly'
import { FiX} from 'react-icons/fi'
import { useRouter } from 'next/router'

export default function Navbar() {
    const [query, setQuery] = React.useState('');

    // hooks
    const router = useRouter();

    const handleKeydonw = (e: any) => {
        if (e.key === 'Enter') {
          router.push(`/services?service=${query}`);
        }
      }

  return (
    <div className="w-full h-20 shadow-md xl:px-10 lg:px-10 md:px-5 sm:px-5 flex ">

        {/* logo */}
        <div className="flex items-center justify-start bg-green-200 flex-none w-72">
          <Link href="/" passHref>
            <Image src="/images/nlogo.png" alt="logo" className="w-16 h-12 object-contain cursor-pointer" />
          </Link>
        </div>

        <div className="flex-1 bg-red-300 flex items-center">
            <div 
              className="w-auto h-full xl:flex lg:flex md:hidden sm:hidden mr-8 items-center">
                  <InputGroup>
                      <InputLeftElement h="55px" paddingLeft="20px">
                          <Search  size={20} primaryColor='grey' />
                      </InputLeftElement>
                      <Input type="text" name="search" bgColor="#F1EEEE" w="559px" h="55px" paddingLeft="60px" onKeyPress={handleKeydonw} value={query} onChange={(e) => setQuery(e.target.value)} fontSize="sm" className="font-Cerebri-sans-book" />
                      <InputRightElement h="60px">
                          {query !== '' && <FiX size={20} color="grey" onClick={() => setQuery('')} className='cursor-pointer' />}
                      </InputRightElement>
                  </InputGroup>
              </div>
        </div>
    </div>
  )
}
