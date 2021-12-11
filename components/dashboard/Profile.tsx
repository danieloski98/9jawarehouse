import React from "react";
import { Input, Avatar, Image as Img } from "@chakra-ui/react";
import Image from 'next/image'
import Banner from '../../public/images/banner.png';
import { FaFacebook, FaWhatsapp, FaInstagram, FaInternetExplorer, FaTwitter } from 'react-icons/fa'


// redux
import { RootState } from '../../store/index'
import { useSelector } from 'react-redux'

interface IProps {
  setPage: Function;
}

export default function Profile({ setPage }: IProps) {

  const userDetails = useSelector((state: RootState) => state.UserReducer.user);
  const pic = userDetails.pictures[0];

  return (
    <div className="w-full h-auto pb-10">
      <div className="w-full h-auto py-6 pb-10 flex flex-col bg-white">
        <p className="text-2xl font-light text-gray-600 ml-5">Profile</p>

        <div className="w-full h-64 mt-6">
          <Img src={pic} alt="banner" className="w-full h-64" />
        </div>

        {/* details */}

        <div className="w-full flex xl:flex-row lg:flex-row md:flex-col sm:flex-col justify-between xl:px-10 lg:px-10 md:px-10 sm:px-5 mt-6">
          <div className="flex flex-1">
            <Avatar
              src={userDetails.profile_pic}
              className="mr-6"
              size="lg"
            />
            <div className="flex flex-col justify-center">
              <p className="text-lg font-bold text-gray-600">
                {userDetails.business_name}
              </p>
              <div className="flex w-96 h-auto flex-nowrap mt-2">
                {userDetails.services.map((item, index) => (
                  <p key={index.toString()} className="text-xs text-themeGreen font-light">
                    {item},
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div className="xl:mt-0 lg:mt-0 md:mt-6 sm:mt-6 ">
            <button onClick={() => setPage(5)} className="xl:w-40 lg:w-40 md:w-full sm:w-full h-12 border-2 border-themeGreen text-themeGreen">
              Edit
            </button>
          </div>
        </div>

        {/* description box */}

        <div className="w-full xl:px-10 lg:px-10 md:px-5 sm:px-5 mt-10 flex flex-col">
          <p className="text-md font-semibold text-gray-600">Description</p>
          <p className="text-sm font-light mt-4 text-gray-500 text-justify">
           {userDetails.business_description}
          </p>
        </div>

        {/* contacts */}

        <div className="w-full flex xl:flex-row lg:flex-row md:flex-col sm:flex-col justify-between xl:px-10 lg:px-10 md:px-5 sm:px-5 mt-10">
          <div className="flex flex-col xl:mt-0 lg:mt-0 md:mt-4 sm:mt-4">
            <p className="text-md font-semibold text-gray-600">Location</p>
            <p className="text-sm text-gray-500 font-light">
              {userDetails.business_address}
            </p>
          </div>

          <div className="flex flex-col xl:mt-0 lg:mt-0 md:mt-4 sm:mt-4">
            <p className="text-md font-semibold text-gray-600">Phone</p>
            <p className="text-sm text-gray-500 font-light">{userDetails.phone}</p>
          </div>

          <div className="flex flex-col xl:mt-0 lg:mt-0 md:mt-4 sm:mt-4">
            <p className="text-md font-semibold text-gray-600">Email</p>
            <p className="text-sm text-gray-500 font-light">
              {userDetails.email}
            </p>
          </div>
        </div>

        {/* social media links */}

        <div className="w-full flex xl:flex-row lg:flex-row md:flex-col sm:flex-col justify-between xl:px-10 lg:px-10 md:px-5 sm:px-5 mt-10">
          <div className="flex flex-col flex-1 xl:mt-0 lg:mt-0 md:mt-4 sm:mt-4">
            <p className="text-md font-semibold text-gray-600">
              Social Media Links
            </p>
            <div className="flex w-full mt-2">
              {userDetails.facebook !== "" && (
                <a href={userDetails.facebook}>
                  <FaFacebook size={25} color="lightblue" />
                </a>
              )}

              {userDetails.instagram !== "" && (
                <a href={userDetails.instagram} className="ml-3">
                  <FaInstagram size={25} color="pink" />
                </a>
              )}

              {userDetails.twitter !== "" && (
                <a href={userDetails.twitter} className="ml-3">
                  <FaTwitter size={25} color="blue" />
                </a>
              )}

              {userDetails.whatsapp !== "" && (
                <a href={userDetails.whatsapp} className="ml-3">
                  <FaWhatsapp size={25} color="green" />
                </a>
              )}

              {userDetails.website !== "" && (
                <a href={userDetails.website} className="ml-3">
                  <FaInternetExplorer size={25} color="blue" />
                </a>
              )}        
            </div>
          </div>

          <div className="flex flex-col xl:mt-0 lg:mt-0 md:mt-4 sm:mt-4 flex-1 ml-1">
            <p className="text-md font-semibold text-gray-600">Certifications</p>
            {userDetails.certificates.length > 0 && userDetails.certificates.map((item, index) => (
              <div key={index.toString()} className="mt-2" >
                  <p className="text-sm font-light">{item.certificate}</p>
                  <p className="text-sm font-light mt-1">{item.organization}</p>
                  <p className="text-sm font-light mt-1">{item.year}</p>
                  <button className="w-40 h-10 border-2 border-themeGreen text-themeGreen mt-2">View</button>
              </div>
            ))}
          </div>

          <div className="flex flex-1 flex-col">
            {/* <p className="text-md font-light text-gray-600">Email</p>
        <p className="text-sm text-gray-500 font-semibold">9jawarehouse@9ja.com.fake</p> */}
          </div>
        </div>
      </div>
    </div>
  );
}
