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
    <div className="w-full xl:h-auto lg:h-auto md:h-auto sm:h-auto flex flex-col py-10 mb-10">

        <div className="w-full h-2/4 flex xl:flex-row lg:flex-row md:flex-col sm:flex-col mb-24">

            <div className="flex-1  flex justify-center items-center">
                {/* <div className="w-40 h-40 bg-green-200 z-10"></div> */}
                <div className="w-3/5 h-4/5  z-20">
                    <Image alt="woman" src={Female} className="w-full h-full rounded-lg" />
                </div>
            </div>

            <div className="flex-1 flex flex-col justify-center items-start text-left pl-20 pr-6">
                
                <p className="mt-6 text-sm font-Circular-std-medium text-gray-500">FOR VENDORS</p>
                <h3 className="mt-6 text-themeGreen text-4xl font-Circular-std-medium">Reach More Customers</h3>
                <p className="mt-6 text-sm font-Circular-std-book text-gray-500 xl:w-4/5 lg:w-4/5 md:w-full sm:w-full">Meet customers youre exicted to work with and take your career or business to new heights.</p>

                <ul className="list-disc mt-6 ml-4 text-sm font-Circular-std-book text-gray-500">
                    <li>Build a Profile that suits your work</li>
                    <li className="mt-3">Get Reviews on your work</li>
                    <li className="mt-3">Control when, where, and how you work</li>
                </ul>

                <button onClick={() => router.push('/auth/signup')} className="w-40 h-10 bg-themeGreen text-white text-sm mt-6 font-Circular-std-book">
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

            <div className="flex-1 flex flex-col justify-center items-start text-left pl-20 pr-6">
                <p className="mt-6 text-sm font-Circular-std-medium text-gray-500">FOR CUSTOMERS</p>
                <h3 className="mt-6 text-themeGreen text-4xl font-Circular-std-medium">Hire A Pro For Any Skill</h3>
                

                <ul className="list-disc mt-6 ml-4 text-sm font-Circular-std-book text-gray-500">
                    <li>Photography</li>
                    <li className="mt-3">Events</li>
                    <li className="mt-3">IT Specialists</li>
                    <li className="mt-3">Beauty and SPA</li>
                </ul>

                <p className="mt-6 text-sm font-Circular-std-book text-green-600 flex">See All Specialities <FiArrowRight size={20} className="ml-6 cursor-pointer" onClick={() => router.push('/services?service=')} /> </p>

            </div>

        </div>
        
    </div>
  );
}
