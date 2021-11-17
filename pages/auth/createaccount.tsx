import React from 'react';
import { useRouter } from 'next/router'
import { LeftNavbar } from '../../components/Home/Banner'

// image
import Image from 'next/image';
import Girl from '../../public/images/girl2.png';
import Google from '../../public/images/google.svg';
import Mail from '../../public/images/mail.png';


export default function CreateAccount() {
    const router = useRouter();

  return (
    <div className="w-full h-screen flex">
        <div className="flex-1 flex flex-col">
            <LeftNavbar />
            <div className="flex-1 xl:pl-10 lg:pl-10 md:pl-5 sm:pl-5 xl:pr-0 lg:pr-0 md:pr-5 sm:pr-5 flex flex-col justify-center items-start">
                <h3 className="text-3xl font-semibold text-gray-700">Create An Account</h3>
                <p className="text-sm font-light mt-4 text-gray-500">you are one step away from growing your business. Lets get you onboard</p>

                <div className="xl:w-4/6 lg:w-4/6 md:w-full sm:w-full mt-6 h-12 bg-gray-200 cursor-pointer flex justify-center items-center">
                    <div className="w-8 h-8">
                        <Image src={Google} alt="google" className="w-8 h-8" />
                    </div>
                    <span className="ml-4 text-sm font-semibold">Continue Using Gooogle</span>
                </div>
                <div onClick={() => router.push('/auth/signup')} className="xl:w-4/6 lg:w-4/6 md:w-full sm:w-full mt-6 h-12 bg-themeGreen cursor-pointer flex justify-center items-center">
                    <div className="w-8 h-8">
                        <Image src={Mail} alt="google" className="w-8 h-8" />
                    </div>
                    <span className="ml-4 text-sm font-semibold text-white">Continue Using Your Email</span>
                </div>
                <div className="xl:w-4/6 lg:w-4/6 md:w-full sm:w-full text-center">
                    <p className="text-sm font-light mt-12 text-center text-gray-500">Already have an account? <span className="text-themeGreen" onClick={() => router.push('/auth/login')}>Log in</span></p>
                </div>
            </div>
        </div>
        <div className="w-2/5 h-full xl:block lg:block md:hidden sm:hidden">
            <Image src={Girl} alt="girl" className="w-full h-full" />
        </div>
    </div>
  );
}
