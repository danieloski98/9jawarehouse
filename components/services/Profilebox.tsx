import React from "react";
import { Input, Avatar } from "@chakra-ui/react";
import Image from 'next/image'
import Banner from '../../public/images/banner.png';

interface IProps {
  setPage: Function;
}

export default function ProfileBox() {
  return (
    <div className="w-full h-auto pb-10 border-2 border-gray-200 mb-8">
      <div className="w-full h-auto py-6 pb-10 flex flex-col bg-white">
    
        {/* details */}

        <div className="w-full flex xl:flex-row lg:flex-row md:flex-col sm:flex-col justify-between xl:px-10 lg:px-10 md:px-10 sm:px-5 mt-6">
          <div className="flex flex-1">
            <Avatar
              rc="https://bit.ly/broken-link"
              className="mr-6"
              size="lg"
            />
            <div className="flex flex-col justify-center">
              <p className="text-md font-light text-gray-600">
                Limmer makeover
              </p>
              <p className="text-sm text-themeGreen font-semibold">
                Makeup Artist
              </p>
            </div>
          </div>
          <div className="xl:mt-0 lg:mt-0 md:mt-6 sm:mt-6 ">
            {/* <button className="xl:w-40 lg:w-40 md:w-full sm:w-full h-12 border-2 border-themeGreen text-themeGreen">
              Edit
            </button> */}
          </div>
        </div>

        {/* description box */}

        <div className="w-full xl:px-10 lg:px-10 md:px-5 sm:px-5 mt-10 flex flex-col">
          <p className="text-2xl font-light text-gray-600">Description</p>
          <p className="text-sm font-semibold mt-4 text-gray-500 text-justify">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam,
            dolorem. Enim voluptates itaque suscipit sapiente quaerat vitae amet
            impedit quam, delectus, iusto quas. Esse porro voluptas quam eos.
            Quis accusamus corrupti rerum recusandae laboriosam vel cupiditate,
            itaque alias fuga eveniet ratione aut dicta sapiente libero rem
            tempore dignissimos natus quo.
          </p>
        </div>

        {/* contacts */}

        <div className="w-full flex xl:flex-row lg:flex-row md:flex-col sm:flex-col justify-between xl:px-10 lg:px-10 md:px-5 sm:px-5 mt-10">
          <div className="flex flex-col xl:mt-0 lg:mt-0 md:mt-4 sm:mt-4">
            <p className="text-md font-light text-gray-600">Location</p>
            <p className="text-sm text-gray-500 font-semibold">
              Choba, port harcourt, Nigeria.
            </p>
          </div>

          <div className="flex flex-col xl:mt-0 lg:mt-0 md:mt-4 sm:mt-4">
            <p className="text-md font-light text-gray-600">Phone</p>
            <p className="text-sm text-gray-500 font-semibold">08033783940</p>
          </div>

          <div className="flex flex-col xl:mt-0 lg:mt-0 md:mt-4 sm:mt-4">
            <p className="text-md font-light text-gray-600">Email</p>
            <p className="text-sm text-gray-500 font-semibold">
              9jawarehouse@9ja.com
            </p>
          </div>
        </div>

        {/* social media links */}

        <div className="w-full flex xl:flex-row lg:flex-row md:flex-col sm:flex-col justify-between xl:px-10 lg:px-10 md:px-5 sm:px-5 mt-10">
          <div className="flex flex-col xl:mt-0 lg:mt-0 md:mt-4 sm:mt-4">
            <p className="text-md font-light text-gray-600">
              Social Media Links
            </p>
            <p className="text-sm text-gray-500 font-semibold">
              Choba, port harcourt, Nigeria.
            </p>
          </div>

          <div className="flex flex-col xl:mt-0 lg:mt-0 md:mt-4 sm:mt-4">
            <p className="text-md font-light text-gray-600">Phone</p>
            <p className="text-sm text-gray-500 font-semibold">08033783940</p>
          </div>

          <div className="flex flex-col">
            {/* <p className="text-md font-light text-gray-600">Email</p>
        <p className="text-sm text-gray-500 font-semibold">9jawarehouse@9ja.com.fake</p> */}
          </div>
        </div>

        <div className="xl:mt-10 lg:mt-10 md:mt-6 sm:mt-6 xl:ml-10 lg:ml-10 md:mx-5 sm:mx-5 ">
            <button className="xl:w-40 lg:w-40 md:w-full sm:w-full h-12 border-2 border-themeGreen text-themeGreen">
              View Certificates
            </button>
          </div>

      </div>
    </div>
  );
}
