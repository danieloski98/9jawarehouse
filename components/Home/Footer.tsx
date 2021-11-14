import { url } from 'inspector';
import React from 'react';
import { FaUsers, FaStore, FaStar } from 'react-icons/fa'

// images
import Logo from '../../public/images/logo.svg';
import Image from 'next/image';

export default function Footer() {
  return (
    <div className="w-full xl:h-64 lg:h-64 md:h-auto sm:h-auto xl:py-0 lg:py-0 md:py-6 sm:py-6 bg-green-800 flex xl:flex-row lg:flex-row md:flex-col sm:flex-col">

        <div className="xl:w-1/4 lg:w-1/4 md:w-full sm:w-full flex flex-col justify-center items-center">
            <Image src={Logo} alt="logo" className="w-24 h-24" />
            <p className="text-white text-sm font-light">9jaWareHouse</p>
        </div>

        <div className="flex-1 flex xl:flex-row lg:flex-row md:flex-col sm:flex-col justify-between px-20 items-start pt-10 text-white font-semibold text-md">
            <div className="flex flex-col md:my-6 sm:my-6 xl:my-0 lg:my-0">
                <p className="text-lg text-gray-400 font-semibold">COMPANY</p>
                <div className="mt-6 text-sm font-light text-white">
                    <p className="cursor-pointer">About Us</p>
                    <p className="mt-3 cursor-pointer">Trust, safety & security</p>
                    <p className="mt-3 cursor-pointer">privacy Policy</p>
                    <p className="mt-3 cursor-pointer">Terms & conditions</p>
                </div>
            </div>
            <div className="flex flex-col md:my-6 sm:my-6 xl:my-0 lg:my-0">
                <p className="text-lg text-gray-400 font-semibold">RESOURCES</p>
                <div className="mt-6 text-sm font-light text-white">
                    <p className="cursor-pointer">Contact Us</p>
                    <p className="mt-3 cursor-pointer">Community</p>
                    <p className="mt-3 cursor-pointer">FAQ</p>
                </div>
            </div>
            <div className="flex flex-col md:my-6 sm:my-6 xl:my-0 lg:my-0">
                <p className="text-lg text-gray-400 font-semibold">FOR VENDORS</p>
                <div className="mt-6 text-sm font-light text-white">
                    <p className="cursor-pointer">How to change my plan</p>
                    <p className="mt-3 cursor-pointer">What is Vendor/Business Pin</p>
                </div>
            </div>
        </div>
    </div>
  );
}
