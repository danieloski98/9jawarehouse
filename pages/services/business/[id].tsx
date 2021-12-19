import React from 'react';
import ServiceNavbar from '../../../components/services/ServiceNav';
import { FiChevronLeft, FiChevronsLeft, FiPhone, FiMail } from 'react-icons/fi'
import { Breadcrumb, BreadcrumbItem, Image } from '@chakra-ui/react'

// redux
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/index'

// images
// import Image from 'next/image'
import Banner from '../../../public/images/banner.png'
import ProfileBox from '../../../components/services/Profilebox';
import RateBox from '../../../components/services/RateBox';
import ReviewModal from '../../../components/services/ReviewModal';
import { GetStaticPaths } from 'next';

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {

    return {
        paths: [], //indicates that no page needs be created at build time
        fallback: 'blocking' //indicates the type of fallback
    }
}

export async function getStaticProps() {
    return {
        props: {},
    }
}


const ContactBox = () => {
    return (
        <div className="w-full p-5 border-2 border-gray-200 flex flex-col mb-8">
            <p className="font-light text-lg text-themeGreen">Contact</p>
            <p className="mt-2 text-sm font-semibold text-gray-500">You can only leave a review about this business if you have previously worked with them</p>
            <div className="flex mt-4">
                <FiPhone size={25} color="gray" className="cursor-pointer"  />
                <FiMail size={25} color="gray" className="ml-4 cursor-pointer" />
            </div>
        </div>
    )
}

const ReviewBox = (props: { open: Function }) => {

    return (
        <div className="w-full p-5 border-2 border-gray-200 flex flex-col">
            <p className="font-light text-lg text-themeGreen">Review Business/Vendor</p>
            <p className="mt-2 text-sm font-semibold text-gray-500">Reach out to through phone or email vendor to start a conversation</p>

            <button onClick={() => props.open(true)} className="mt-3 w-32 bg-themeGreen h-10 text-sm text-white">Write a review</button>
            
        </div>
    )
}

export default function Business() {

    const [showModal, setShowModal] = React.useState(false);
    const user = useSelector((state: RootState) => state.ActiveUser.user);
    const banner = user.pictures[0];

  return (
    <div className="w-full h-auto flex flex-col overflow-y-auto overflow-x-hidden">

        <ServiceNavbar />

        {/* modal */}

        <ReviewModal open={showModal} setOpen={setShowModal} />

        <div className="w-full h-20 flex items-center xl:px-10 lg:px-10 md:px-5 sm:px-5 mt-16">
            <FiChevronLeft size={30} color="grey" />
            <div className="ml-6">
                <Breadcrumb className="text-sm font-light text-gray-400">
                    <BreadcrumbItem>
                        <p>Home</p>
                    </BreadcrumbItem>

                    <BreadcrumbItem>
                        <p>Services</p>
                    </BreadcrumbItem>

                    <BreadcrumbItem>
                        <p className="text-gray-600">{user.business_name}</p>
                    </BreadcrumbItem>
                </Breadcrumb>
            </div>
        </div>

        {/* Banner */}

        <div className="w-full h-72 bg-gray-200 overflow-hidden">
            <Image src={banner} alt="banner" className="w-full h-full" />
        </div>

        <div className="flex-1 h-full flex px-10 py-10 ">
            <div className="xl:w-3/4 lg:w-3/4 md:w-full sm:w-full xl:mr-12 lg:mr-12 md:mr-0 sm:mr-0 h-auto">
                <ProfileBox user={user} />
                <RateBox />
            </div>
            <div className="w-64 h-80 xl:flex lg:flex md:hidden sm:hidden flex-col">
                <ContactBox />
                <ReviewBox open={setShowModal} />
            </div>
        </div>

    </div>
  );
}
