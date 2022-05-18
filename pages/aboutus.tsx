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
import Chi from '../public/images/chi.jpg';

import Peace from '../public/images/peace.jpeg';
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
                    <p className="mt-6 font-Cerebri-sans-book text-gray-500 text-justify">
                    Founded in August 2021 and based Nigeria, 9jaWarehouse is a trusted community marketplace for people to list, showcase and advertise to the world their expertise in different businesses and skillsets online. From small scale business to large scale businesses, from providing skilled services to mentoring and rebranding businesses, 9jaWarehouse provides that unique and trusted platform to meet your needs. With a world class customer service and a continuously growing community, 9jaWarehouse provides that safe space for business and individuals to develop.
                    </p>
                </div>

                {/* <div className="w-full flex flex-col mt-8">
                    <p className="text-4xl font-Circular-std-medium text-themeGreen">Mission</p>
                    <p className="mt-6 font-Cerebri-sans-book text-gray-500 text-justify">
                    Founded in August 2021 and based Nigeria, 9jaWarehouse is a trusted community marketplace for people to list, showcase and advertise to the world their expertise in different businesses and skillsets online. From small scale business to large scale businesses, from providing skilled services to mentoring and rebranding businesses, 9jaWarehouse provides that unique and trusted platform to meet your needs. With a world class customer service and a continuously growing community, 9jaWarehouse provides that safe space for business and individuals to develop.
                    </p>
                </div> */}

                <div className="w-full flex flex-col mt-12 mb-12 xl:items-start lg:items-start md:items-center sm:items-center ">
                    <p className="text-4xl font-Circular-std-medium text-themeGreen">Meet the Team</p>
                    <div className="w-full grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-1 sm:grid-cols-1 mt-6">

                        <div className="flex-col flex xl:w-64 lg:w-64 md:w-full sm:w-full items-center mb-4">
                           <div className="w-64 h-64 overflow-hidden">
                                <Image src={Guy} alt="man" className="w-40 h-64" />
                           </div>
                           <p className="text-center font-Circular-std-medium text-lg mt-2">Mr. John Asiruwa</p>
                           <p className="mt-0 text-center font-Cerebri-sans-book text-sm">Founder / CEO</p>
                           <p className="mt-2 text-center font-Cerebri-sans-book text-sm">I am John Asiruwa. I am an Mechanical Engineer and a Project Manager. I am interested in professional development of young minds in both business and academics.</p>
                        </div>

                        <div className="flex-col flex xl:w-64 lg:w-64 md:w-full sm:w-full items-center mb-4">
                           <div className="w-64 h-64 overflow-hidden">
                                <Image src={Chi} alt="man" className="w-40 h-64" />
                           </div>
                           <p className="text-center font-Circular-std-medium text-lg mt-2">Chidinma Okoye </p>
                           <p className="mt-0 text-center font-Cerebri-sans-book text-sm">social media manager / Trainer</p>
                           <p className="mt-2 text-center font-Cerebri-sans-book text-sm"> She is an E-commerce guru and Medical Lab scientist. A Social media manager and Brand strategist for Small business owners. She has groomed and help establish hundreds of E-commerce merchants through her trainings</p>
                        </div>

                        <div className="flex-col flex xl:w-64 lg:w-64 md:w-full sm:w-full items-center mb-4">
                           <div className="w-64 h-64 overflow-hidden">
                                <Image src={Peace} alt="man" className="w-40 h-64" />
                           </div>
                           <p className="text-center font-Circular-std-medium text-lg mt-2">Peace Akokadike</p>
                           <p className="mt-0 text-center ffont-Cerebri-sans-book text-sm">Academic and Business Mentor</p>
                           <p className="mt-2 text-center font-Cerebri-sans-book text-sm">I am Peace Akokadike. I have a Bachelors and Masters Degree in Nursing. Over the years, I have derived joy in helping and supporting young people who are interested in pursuing their academic and budisnes goals.</p>
                        </div>

                       
                    </div>
                </div>

            </div>
        </div>

        <Footer />
    </div>
  );
}
