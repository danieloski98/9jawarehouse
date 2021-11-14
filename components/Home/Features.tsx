import React from 'react';
import { FiArrowDownRight, FiArrowRight } from 'react-icons/fi'

// images
import Female from '../../public/images/femal_smile.svg';
import Male from '../../public/images/male_smile.svg';
import Image from 'next/image';

export default function componentName() {
  return (
    <div className="w-full xl:h-screen lg:h-screen md:h-auto sm:h-auto flex flex-col py-10 mb-10">

        <div className="w-full h-2/4 flex xl:flex-row lg:flex-row md:flex-col sm:flex-col mb-24">

            <div className="flex-1  flex justify-center items-center">
                {/* <div className="w-40 h-40 bg-green-200 z-10"></div> */}
                <div className="w-3/5 h-4/5  z-20">
                    <Image alt="woman" src={Female} className="w-full h-full rounded-lg" />
                </div>
            </div>

            <div className="flex-1 flex flex-col justify-center items-start text-left pl-20 pr-6">
                
                <p className="mt-6 text-sm font-medium text-gray-500">FOR VENDORS</p>
                <h3 className="mt-6 text-themeGreen text-4xl font-semibold">Reach More Customers</h3>
                <p className="mt-6 text-sm font-medium text-gray-500 xl:w-4/5 lg:w-4/5 md:w-full sm:w-full">Meet customers youre exicted to work with and take your career or business to new heights.</p>

                <ul className="list-disc mt-6 ml-4 text-sm font-medium text-gray-500">
                    <li>Build a Profile that suits your work</li>
                    <li className="mt-3">Get Reviews on your work</li>
                    <li className="mt-3">Control when, where, and how you work</li>
                </ul>

                <button className="w-40 h-10 bg-themeGreen text-white text-xs mt-6">
                    Become a Vendor
                </button>

            </div>

        </div>

        <div className="w-full h-2/4 flex xl:flex-row-reverse lg:flex-row-reverse md:flex-col sm:flex-col mb-10">

            <div className="flex-1  flex justify-center items-center">
                {/* <div className="w-40 h-40 bg-green-200 z-10"></div> */}
                <div className="w-3/5 h-4/5 bg-green-200 z-20 rounded-lg">
                    <Image alt="woman" src={Male} className="w-full h-full rounded-lg" />
                </div>
            </div>

            <div className="flex-1 flex flex-col xl:justify-center lg:justify-center md:justify-start sm:justify-start xl:items-start lg:items-start md:items-center sm:items-center text-left xl:pl-32 lg:pl-32 md:pl-0 sm:pl-0 pr-6">
                <p className="mt-6 text-sm font-medium text-gray-500">FOR CUSTOMERS</p>
                <h3 className="mt-6 text-themeGreen text-4xl font-semibold text-center">Hire A Pro</h3>
                

                <ul className="list-disc mt-6 xl:ml-4 lg:ml-4 md:ml-0 sm:ml-0 text-sm font-medium text-gray-500">
                    <li>Photography</li>
                    <li className="mt-3">Events</li>
                    <li className="mt-3">IT Specialists</li>
                    <li className="mt-3">Beauty and SPA</li>
                </ul>

                <p className="mt-6 text-sm font-medium text-green-600 flex">See All Specialities <FiArrowRight size={20} className="ml-6" /> </p>

            </div>

        </div>
        
    </div>
  );
}
