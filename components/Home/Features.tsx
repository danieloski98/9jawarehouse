import React from 'react';
import { FiArrowDownRight, FiArrowRight } from 'react-icons/fi'
import { useRouter } from 'next/router'

// images
import Female from '../../public/images/femal_smile.svg';
import Male from '../../public/images/male_smile.svg';
import Image from 'next/image';


export default function Features() {
    const router = useRouter();

  return (
    <div className="w-full xl:h-auto lg:h-auto md:h-auto sm:h-auto flex flex-col py-10 mb-0">

        <div className="w-full h-2/4 flex xl:flex-row lg:flex-row md:flex-col sm:flex-col mb-10 xl:px-32 lg:px-32">

            <div className="flex-1  flex justify-center items-center">
                {/* <div className="w-40 h-40 bg-green-200 z-10"></div> */}
                <div className="w-80 h-72  z-20">
                    {/* <div className="w-40 h-72 relative top-80 bg-yellow-300"></div> */}
                    <Image alt="woman" src={Female} className="w-full h-full" />
                </div>
            </div>

            <div className="flex-1 flex flex-col justify-center items-start text-left xl:pl-20 lg:pl-20 md:pl-10 sm:pl-10 pr-6">
                
                <p className="xl:mt-6 lg:mt-6 md:mt-20 sm:mt-20 text-md font-Circular-std-medium text-gray-500 ">FOR VENDORS</p>
                <h3 className="mt-6 text-themeGreen text-4xl font-Circular-std-medium">Reach more businesses and customers with ease.</h3>
                <p className="mt-6 text-md font-Circular-std-book text-gray-500 xl:w-4/5 lg:w-4/5 md:w-full sm:w-full">Meet customers you are excited to work with and take your careers, services, or businesses to new heights.</p>

                <ul className="list-disc mt-6 ml-4 text-md font-Circular-std-book text-gray-500">
                    <li>Build a Profile that suits your work and services</li>
                    <li className="mt-3">Get real time, up to date and authentic reviews of your work and any services you rendered. </li>
                    <li className="mt-3">Control when, where, and how you work and interact with existing and new customers. </li>
                </ul>

                <button onClick={() => router.push('/auth/signup')} className="w-40 h-10 bg-themeGreen text-white text-sm mt-6 font-Circular-std-book">
                    Become a vendor
                </button>

            </div>

        </div>

        <div className="w-full h-2/4 flex xl:flex-row-reverse lg:flex-row-reverse md:flex-col sm:flex-col mb-0 xl:px-32 lg:px-32">

            <div className="flex-1  flex justify-center items-center">
                {/* <div className="w-40 h-40 bg-green-200 z-10"></div> */}
                <div className="w-80 h-72 bg-green-200 z-20 rounded-lg">
                    <Image alt="woman" src={Male} className="w-full h-full" />
                </div>
            </div>

            <div className="flex-1 flex flex-col justify-center items-start text-left xl:pl-20 lg:pl-20 md:pl-10 sm:pl-10 pr-6">
                <p className="mt-6 text-md font-Circular-std-medium text-gray-500 sm:mt-32">FOR CUSTOMERS</p>
                <h3 className="mt-6 text-themeGreen text-4xl font-Circular-std-medium">Hire one of the best professionals for your:</h3>
                

                <ul className="list-disc mt-6 ml-4 text-md font-Circular-std-book text-gray-500">
                    <li>Drop Shipping.</li>
                    <li className="mt-3">Catering Services.</li>
                    <li className="mt-3">Photography.</li>
                    <li className="mt-3">Events Management.</li>
                    <li className="mt-3">Fashion Designer.</li>
                    <li className="mt-3">Any other businesses and skills.</li>
                </ul>

                <p className="mt-6 text-md font-Circular-std-book text-green-600 flex cursor-pointer" onClick={() => router.push('/services?service=')}>See all businesses and services <FiArrowRight size={20} className="ml-6 cursor-pointer"  /> </p>

            </div>

        </div>
        
    </div>
  );
}
