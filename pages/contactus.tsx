import React from 'react';
import Navbar from '../components/general/Navbar';
import ServiceNavbar from '../components/services/ServiceNav';
import { InputGroup, InputLeftElement, InputRightElement, Input } from '@chakra-ui/react'
import { FiSearch, FiMenu } from 'react-icons/fi'
import { FiMail, FiLock, FiEye, FiEyeOff, FiUser } from 'react-icons/fi'
import Footer from '../components/Home/Footer';

export default function ContactUs() {
  return (
    <div className="w-full h-screen flex flex-col">
        <ServiceNavbar />
        <div className="flex-1 px-12 flex pt-24 pb-10">

            <div className="w-3/4 mr-10 flex">
                <div className="w-2/4 h-full ">
                    <p className="text-3xl text-themeGreen font-light">Contact Us</p>
                    <p className="text-sm font-semibold mt-3 text-gray-500">Create screens directly in Method or add your images from Sketch. You can even sync designs from your cloud storage!</p>

                    <div className="flex flex-col xl:w-full lg:w-full md:w-full sm:w-full mt-6">
                        <label className="font-light text-sm">Email</label>
                        <InputGroup bgColor="#F1EEEE" className="mt-2" size="lg">
                            <InputLeftElement>
                                <FiMail size={25} color="gray" />
                            </InputLeftElement>
                            <Input />
                        </InputGroup>
                    </div>

                    <div className="flex flex-col xl:w-full lg:w-full md:w-full sm:w-full mt-6">
                        <label className="font-light text-sm">Fullname</label>
                        <InputGroup bgColor="#F1EEEE" className="mt-2" size="lg">
                            <InputLeftElement>
                                <FiUser size={25} color="gray" />
                            </InputLeftElement>
                            <Input />
                        </InputGroup>
                    </div>

                    <div className="flex flex-col xl:w-full lg:w-full md:w-full sm:w-full mt-6">
                        <label className="font-light text-sm">Message</label>
                        <textarea className="w-full h-24 p-4 bg-gray-100"></textarea>
                    </div>

                    <button className="mt-5 w-full h-10 bg-themeGreen text-white text-sm">Send Message</button>

                </div>
            </div>

            <div className="bg-gray-20 w-72 h-96">
                <div className="flex flex-col">
                    <p className="text-xl font-light">Phone</p>
                    <p className="mt-0 font-semibold text-themeGreen">+1 234 567 89 10</p>
                </div>

                <div className="flex flex-col mt-5">
                    <p className="text-xl font-light">Email</p>
                    <p className="mt-0 font-semibold text-themeGreen">Support@9jawarehouse.com</p>
                </div>

                <div className="w-full flex"></div>
            </div>

        </div>
        <Footer />
    </div>
  );
}
