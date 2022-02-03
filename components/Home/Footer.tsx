import { url } from 'inspector';
import React from 'react';
import { FaUsers, FaStore, FaStar, FaInstagram, FaLinkedin, FaTwitter, FaFacebookF } from 'react-icons/fa'
import Link from 'next/link'

// images
import Logo from '../../public/images/logo.svg';
import { Image } from '@chakra-ui/react';

export default function Footer() {
  return (
    <div className="w-full xl:h-64 lg:h-64 md:h-auto sm:h-auto xl:py-0 lg:py-0 md:py-6 sm:py-6 xl:px-0 lg:px-0 md:px-10 sm:px-10 bg-green-800 flex xl:flex-row lg:flex-row md:flex-col sm:flex-col">

        <div className="xl:w-1/4 lg:w-1/4 md:w-full sm:w-full flex flex-col justify-center xl:items-center lg:items-center">
            <Link href="/" passHref>
              <Image src="/images/nlogo.png" alt="logo" className="w-16 h-12 object-contain cursor-pointer" />
            </Link>
            <p className="text-white text-sm font-Circular-std-medium">9jaWareHouse</p>
            <div className="flex mt-5 w-full xl:justify-center lg:justify-center md:justify-start sm:justify-start">
                    <div className="w-10 h-10 rounded-full bg-white flex justify-center items-center mr-6 cursor-pointer">
                        <a href="https://www.twitter.com/9ja_warehouse"  target="_blank" rel="noreferrer">
                            <FaTwitter size={20} className='text-themeGreen ' />
                        </a>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white flex justify-center items-center mr-6 cursor-pointer">
                        <a href="https://www.instagram.com/9ja_warehouse"  target="_blank" rel="noreferrer">
                            <FaInstagram size={20} className='text-themeGreen ' />
                        </a>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white flex justify-center items-center mr-6 cursor-pointer">
                        <a href="https://web.facebook.com/9ja-Warehouse-112164614644154" target="_blank" rel="noreferrer">
                            <FaFacebookF size={20} className='text-themeGreen ' />
                        </a>
                    </div>
            </div>
        </div>

        <div className="flex-1 flex xl:flex-row lg:flex-row md:flex-col sm:flex-col xl:items-center lg:items-center md:items-start sm:items-start xl:justify-between lg:justify-between md:justify-start sm:justify-start xl:px-20 lg:px-20 md:px-0 sm:px-0 sm:pt-10 md:pt-10 xl:pt-0 lg:pt-0 text-white font-semibold text-md">

            <div className="flex flex-col md:my-6 sm:my-6 xl:my-0 lg:my-0 w-full">
                <p className="text-md text-gray-300 font-Circular-std-medium">COMPANY</p>
                <div className="mt-6 text-sm font-Cerebri-sans-book rcular-std-book text-white flex flex-col">
                    <Link href="/aboutus">
                        <a className="cursor-pointer">About Us</a>
                    </Link>
                    {/* <p className="mt-3 cursor-pointer">Trust, safety & security</p> */}
                    <Link href="/policies">
                        <a className="mt-3 cursor-pointer">privacy Policy</a>
                    </Link>
                    <Link href="/terms">
                        <a className="mt-3 cursor-pointer">Terms & conditions</a>
                    </Link>
                </div>
            </div>
            <div className="flex flex-col md:my-6 sm:my-6 xl:my-0 lg:my-0 w-full">
                <p className="text-md text-gray-300 font-Circular-std-medium">RESOURCES</p>
                <div className="mt-6 text-sm font-Cerebri-sans-bookar-std-book text-white flex flex-col">
                    <Link href="/contactus">
                        <a className="cursor-pointer">Contact Us</a>
                    </Link>
                    {/* <p className="mt-3 cursor-pointer">Community</p> */}
                    <Link href="/faqs">
                        <a className="mt-3 cursor-pointer">FAQS</a>
                    </Link>
                </div>
            </div>
            <div className="flex flex-col md:my-6 sm:my-6 xl:my-0 lg:my-0 w-full">
                <p className="text-md text-gray-300 font-Circular-std-medium">FOR VENDORS</p>
                <div className="mt-6 text-sm font-Cerebri-sans-book text-white flex flex-col">
                    <Link href="/faqs">
                        <a className="cursor-pointer">How to change my plan</a>
                    </Link>
                    <Link href="/faqs">
                        <a className="mt-3 cursor-pointer">What is Vendor/Business Pin</a>
                    </Link>
                </div>
            </div>

        </div>
    </div>
  );
}
