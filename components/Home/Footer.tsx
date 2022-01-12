import { url } from 'inspector';
import React from 'react';
import { FaUsers, FaStore, FaStar, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa'
import Link from 'next/link'

// images
import Logo from '../../public/images/logo.svg';
import Image from 'next/image';

export default function Footer() {
  return (
    <div className="w-full xl:h-64 lg:h-64 md:h-auto sm:h-auto xl:py-0 lg:py-0 md:py-6 sm:py-6 bg-green-800 flex xl:flex-row lg:flex-row md:flex-col sm:flex-col">

        <div className="xl:w-1/4 lg:w-1/4 md:w-full sm:w-full flex flex-col justify-center items-center">
            <Image src={Logo} alt="logo" className="w-24 h-24" />
            <p className="text-white text-sm font-Circular-std-medium">9jaWareHouse</p>
            <div className="flex mt-5 w-full md:justify-center sm:justify-center">
                    <div className="w-10 h-10 rounded-full bg-white flex justify-center items-center mr-6 cursor-pointer">
                        <FaInstagram size={20} className='text-themeGreen ' />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white flex justify-center items-center mr-6 cursor-pointer">
                        <FaTwitter size={20} className='text-themeGreen ' />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white flex justify-center items-center mr-6 cursor-pointer">
                        <FaLinkedin size={20} className='text-themeGreen ' />
                    </div>
            </div>
        </div>

        <div className="flex-1 flex xl:flex-row lg:flex-row md:flex-col sm:flex-col justify-between px-20 items-start pt-10 text-white font-semibold text-md">
            <div className="flex flex-col md:my-6 sm:my-6 xl:my-0 lg:my-0">
                <p className="text-md text-gray-300 font-Circular-std-medium">COMPANY</p>
                <div className="mt-6 text-sm font-Circular-std-book text-white flex flex-col">
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
            <div className="flex flex-col md:my-6 sm:my-6 xl:my-0 lg:my-0">
                <p className="text-md text-gray-300 font-Circular-std-medium">RESOURCES</p>
                <div className="mt-6 text-sm font-Circular-std-book text-white flex flex-col">
                    <Link href="/contactus">
                        <a className="cursor-pointer">Contact Us</a>
                    </Link>
                    {/* <p className="mt-3 cursor-pointer">Community</p> */}
                    <Link href="/faqs">
                        <a className="mt-3 cursor-pointer">FAQS</a>
                    </Link>
                </div>
            </div>
            <div className="flex flex-col md:my-6 sm:my-6 xl:my-0 lg:my-0">
                <p className="text-md text-gray-300 font-Circular-std-medium">FOR VENDORS</p>
                <div className="mt-6 text-sm font-Circular-std-book text-white flex flex-col">
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
