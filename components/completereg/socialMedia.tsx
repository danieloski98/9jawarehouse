import React from 'react';
import { Input, InputGroup, InputLeftElement, Select } from '@chakra-ui/react'
import { FiChevronLeft, FiCamera, FiX } from 'react-icons/fi'
import { useRouter } from 'next/router'

interface IProps {
    next: Function;
}

export default function SocialMediaInfo({ next }: IProps) {
    const router = useRouter();

  return (
    <div className="w-full h-auto flex flex-col">
        <div className="flex items-center h-auto">
            <FiChevronLeft size={30} color="grey" onClick={() => next(2)} />
            <p className="text-2xl font-light text-gray-600 ml-4">Connect Social Media account</p>
        </div>
        <p className="text-sm font-semibold text-gray-500 mt-4">
        Link your profile to your social media, portfolio or website 
        </p>

        {/* start */}

        <div className="w-full flex xl:flex-row lg:flex-row md:flex-col sm:flex-col justify-between  mt-6 font-semibold text-sm text-gray-500">
            <div className="w-full">
                <label>Instagram</label>
                <div className="xl:w-11/12 lg:w-11/12 md:w-full sm:w-full">
                    <Input border="none" bgColor="whitesmoke" borderRadius={0} className="bg-gray-100 mt-3" />
                </div>
            </div>
            <div className="w-full xl:mt-0 lg:mt-0 md:mt-2 sm:mt-2">
               
            </div>
        </div>

        <div className="w-full flex xl:flex-row lg:flex-row md:flex-col sm:flex-col justify-between mt-6 font-semibold text-sm text-gray-500">
            <div className="w-full">
                <label>Twitter</label>
                <div className="xl:w-11/12 lg:w-11/12 md:w-full sm:w-full">
                    <Input border="none" bgColor="whitesmoke" borderRadius={0} className="bg-gray-100 mt-3" />
                </div>
            </div>
            <div className="w-full xl:mt-0 lg:mt-0 md:mt-2 sm:mt-2">
                
            </div>
        </div>

        <div className="w-full flex xl:flex-row lg:flex-row md:flex-col sm:flex-col justify-between mt-6 font-semibold text-sm text-gray-500">
            <div className="w-full">
                <label>Facebook</label>
                <div className="xl:w-11/12 lg:w-11/12 md:w-full sm:w-full">
                    <Input border="none" bgColor="whitesmoke" borderRadius={0} className="bg-gray-100 mt-3" />
                </div>
            </div>
            <div className="w-full xl:mt-0 lg:mt-0 md:mt-2 sm:mt-2">
                
            </div>
        </div>

        <div className="w-full flex xl:flex-row lg:flex-row md:flex-col sm:flex-col justify-between mt-6 font-semibold text-sm text-gray-500">
            <div className="w-full">
                <label>Website</label>
                <div className="xl:w-11/12 lg:w-11/12 md:w-full sm:w-full">
                    <Input border="none" bgColor="whitesmoke" borderRadius={0} className="bg-gray-100 mt-3" />
                </div>
            </div>

            <div className="w-full">
                
            </div>
        </div>

        <div className="w-full flex xl:flex-row lg:flex-row md:flex-col sm:flex-col justify-between mt-6 font-semibold text-sm text-gray-500">
            <div className="w-full">
                <label>whatsapp</label>
                <div className="xl:w-11/12 lg:w-11/12 md:w-full sm:w-full">
                    <Input border="none" bgColor="whitesmoke" borderRadius={0} className="bg-gray-100 mt-3" />
                </div>
            </div>

            <div className="w-full">
                
            </div>
        </div>

        <div className="w-full flex justify-end mt-6">
            <button onClick={() => router.push('/dashboard')} className="w-32 bg-themeGreen h-12 text-sm font-semibold text-white">Save</button>
        </div>


    </div>
  );
}
