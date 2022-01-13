import React from 'react';
import Navbar from '../components/general/Navbar';
import ServiceNavbar from '../components/services/ServiceNav';
import { InputGroup, InputLeftElement, InputRightElement, Input } from '@chakra-ui/react'
import { FiSearch, FiMenu } from 'react-icons/fi'
import { FiMail, FiLock, FiEye, FiEyeOff, FiUser } from 'react-icons/fi'
import Footer from '../components/Home/Footer';

// images
import Image from 'next/image'
import Guy from '../public/images/guy4.png';
import Banner from '../public/images/banner.png';
import NormNavbar from '../components/general/NorNavbar';

export default function AboutUs() {
  return (
    <div className="w-full h-auto flex flex-col">

        <NormNavbar />

        {/* Banner */}

        <div className="w-full h-auto bg-gray-100 overflow-hidden">
            <Image src={Banner} alt="banner" className="w-full h-full object-cover" />
        </div>

        <div className="w-full flex flex-col items-center mt-6">
            <div className="xl:w-4/5 lg:w-4/5 md:w-full sm:w-full h-auto flex flex-col py-6 xl:px-0 lg:px-0 md:px-5 sm:px-5">

                <div className="w-full flex flex-col">
                    <p className="text-4xl font-Circular-std-medium text-themeGreen">About 9jaWarehouse</p>
                    <p className="mt-6 font-Cerebri-sans-book text-gray-500 text-justify">We are a business platform that helps link businesses services to potential clients, give businesses visibility, support, young and emerging entrepreneurs, invest, support, and promote small scale businesses. 
                    </p>
                </div>

                <div className="w-full flex flex-col mt-8">
                    <p className="text-4xl font-Circular-std-medium text-themeGreen">Mission</p>
                    <p className="mt-6 font-Cerebri-sans-book text-gray-500 text-justify"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Bibendum est ultricies integer quis. Iaculis urna id volutpat lacus laoreet. Mauris vitae ultricies leo integer malesuada. Ac odio tempor orci dapibus ultrices in. Egestas diam in arcu cursus euismod. Dictum fusce ut placerat orci nulla. Tincidunt ornare massa eget egestas purus viverra accumsan in nisl. Tempor id eu nisl nunc mi ipsum faucibus. Fusce id velit ut tortor pretium. Massa ultricies mi quis hendrerit dolor magna eget. Nullam eget felis eget nunc lobortis. Faucibus ornare suspendisse sed nisi. Sagittis eu volutpat odio facilisis mauris sit amet.
                    </p>
                </div>

                <div className="w-full flex flex-col mt-12 mb-12 xl:items-start lg:items-start md:items-center sm:items-center ">
                    <p className="text-4xl font-Circular-std-medium text-themeGreen">Meet the Team</p>
                    <div className="w-full grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-1 sm:grid-cols-1 mt-6">

                        <div className="flex-col flex xl:w-64 lg:w-64 md:w-full sm:w-full items-center mb-4">
                           <div className="w-64 h-64 overflow-hidden">
                                <Image src={Guy} alt="man" className="w-40 h-64" />
                           </div>
                           <p className="text-center font-Circular-std-medium text-lg mt-2">Mr. John Asiruwa</p>
                           <p className="mt-0 text-center font-Cerebri-sans-book text-sm">Founder / CEO</p>
                        </div>

                        <div className="flex-col flex xl:w-64 lg:w-64 md:w-full sm:w-full items-center mb-4">
                           <div className="w-64 h-64 overflow-hidden">
                                <Image src={Guy} alt="man" className="w-40 h-64" />
                           </div>
                           <p className="text-center font-Circular-std-medium text-lg mt-2">Mr. John Asiruwa</p>
                           <p className="mt-0 text-center font-Cerebri-sans-book text-sm">Founder / CEO</p>
                        </div>

                        <div className="flex-col flex xl:w-64 lg:w-64 md:w-full sm:w-full items-center mb-4">
                           <div className="w-64 h-64 overflow-hidden">
                                <Image src={Guy} alt="man" className="w-40 h-64" />
                           </div>
                           <p className="text-center font-Circular-std-medium text-lg mt-2">Mr. John Asiruwa</p>
                           <p className="mt-0 text-center ffont-Cerebri-sans-book text-sm">Founder / CEO</p>
                        </div>

                       
                    </div>
                </div>

            </div>
        </div>

        <Footer />
    </div>
  );
}
