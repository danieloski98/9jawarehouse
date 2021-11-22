import React from 'react';
import Image from 'next/image'
import Img from '../../public/images/girl2.png'
import { Avatar } from '@chakra-ui/react'
import ReactStars from "react-rating-stars-component";

export default function BusinessCard() {
    const ratingChanged = (newRating: any) => {
        console.log(newRating);
      };
  return (
    <div className="xl:w-30/100 lg:30/100 md:w-full sm:w-full h-auto flex flex-col border-2 border-gray-300 mb-6 py-4">
        <div className="w-full h-auto py-4 flex items-center justify-center">
            <Avatar src="/images/girl2.png" size="xl" />
        </div>

        <div className="w-full h-auto flex flex-col items-center">
            <p className="font-light text-md text-gray-600">Business Name</p>
            <p className="font-semibold text-sm text-gray-500">Business Type</p>
            <div className="mt-0 flex flex-col">
                    {/* <p className="font-semibold text-sm text-gray-500">Overall Rating</p> */}
                    <div className="flex h-12 items-center">
                        <p className="text-xxl font-light text-themeGreen mr-4">4.7</p>
                        <ReactStars
                            count={5}
                            onChange={ratingChanged}
                            size={20}
                            activeColor="#ffd700"
                            value={3}
                            isHalf={true}
                        />
                        {/* <p className="text-sm font-semibold text-gray-600 ml-4">10 Reviews</p> */}
                    </div>
                </div>
                <button className="w-24 bg-themeGreen text-white text-sm font-semibold h-10">View</button>
        </div>

    </div>
  );
}
