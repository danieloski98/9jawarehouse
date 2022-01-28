import React from 'react';
import { useRouter } from 'next/router'
import { LeftNavbar } from '../components/Home/Banner'
import { Image as Img } from '@chakra-ui/react'

// image
import Image from 'next/image';
import Girl from '../public/images/girl2.png';



export default function UnderReview() {
    const router = useRouter();

  return (
    <div className="w-full h-screen flex">
        <div className="flex-1 flex flex-col">
            <LeftNavbar />
            <div className="flex-1 xl:pl-10 lg:pl-10 md:pl-5 sm:pl-5 xl:pr-0 lg:pr-0 md:pr-5 sm:pr-5 flex flex-col justify-center items-center">
                <div className="w-96 h-auto flex flex-col items-center">
                    <Img src="/images/time.png" className='w-24 h-24' />
                    <p className='mt-4 font-Cerebri-sans-book text-3xl text-black'>Account review in progress</p>
                    <p className="mt-7 font-Circular-std-book text-gray-400 text-sm text-center">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Bibendum est ultricies integer
                    </p>
                    <button className="mt-24 w-40 h-16 text-white font-Cerebri-sans-book text-sm bg-themeGreen" onClick={() => router.push('/')}>
                        Go to homepage
                    </button>
                </div>
            </div>
        </div>
        <div className="w-2/5 h-full xl:block lg:block md:hidden sm:hidden">
            <div className="w-full h-full">
                <Img src="/images/girl2.png" alt="girl" className="w-full h-full" />
            </div>
        </div>
    </div>
  );
}
