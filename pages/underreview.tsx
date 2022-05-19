import React, { useState } from 'react';
import { useRouter } from 'next/router'
import { LeftNavbar } from '../components/Home/Banner'
import { Image as Img } from '@chakra-ui/react'
import Link from 'next/link'

// image
import Image from 'next/image';
import Girl from '../public/images/girl2.png';



export default function UnderReview() {
    const router = useRouter();
    const [id, setId] = useState(router.query['id'] as string);

  return (
    <div className="w-full h-screen flex">
        <div className="flex-1 flex flex-col">
            <LeftNavbar />
            <div className="flex-1 xl:pl-10 lg:pl-10 md:pl-5 sm:pl-5 xl:pr-0 lg:pr-0 md:pr-5 sm:pr-5 flex flex-col justify-center items-center">
                <div className="w-96 h-auto flex flex-col items-center">
                    <Img src="/images/time.png" className='w-24 h-24' />
                    <p className='mt-4 font-Cerebri-sans-book text-3xl text-black'>Account review in progress</p>
                    <p className="mt-7 font-Circular-std-book text-gray-600 text-md text-center">
                        Our team is reviewing your account to ensure correctness of your information. We will send you an email on the outcome of the verification as soon as it is completed or if we need anything more from you. Thank you for your patience.
                    </p>
                    <p className="mt-7 font-Circular-std-book text-gray-600 text-md text-center">
                        In the meantime, if you have questions feel free to email us on  
                        <Link href="/contactus" passHref><b className='text-lg cursor-pointer underline'> support@9jawarehouse.com</b></Link>. 
                    </p>
                   <div className="flex">
                        <button className="mt-24 w-40 h-16 mr-4 text-white font-Cerebri-sans-book text-sm bg-themeGreen" onClick={() => router.push('/')}>
                            Go to homepage
                        </button>
                        <button className="mt-24 w-40 h-16 text-white font-Cerebri-sans-book text-sm bg-themeGreen" onClick={() => router.push(`/auth/verification/${id}`)}>
                            Reupload Documents
                        </button>
                   </div>
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
