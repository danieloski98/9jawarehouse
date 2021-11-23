import React from 'react';
import ReactStars from "react-rating-stars-component";

const Comments = () => {
    const ratingChanged = (newRating: any) => {
        console.log(newRating);
      };
    return (
        <div className="w-full p-5 flex flex-col h-auto border-2 border-gray-200 mb-4">
            <p className="text-sm font-light text-gray-600">12 Jan, 2020</p>
            
            <div className="mt-6 flex flex-col">
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

            <p className="mt-6 text-sm font-semibold text-gray-600">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero fugiat officiis vero veritatis sit sequi consectetur minus consequuntur nam at.</p>
        </div>
    )
}

export default function RateBox() {
    const ratingChanged = (newRating: any) => {
        console.log(newRating);
      };
  return (
    <div className="w-full h-auto pb-10 border-2 border-gray-200">
        <div className="w-full h-auto py-6 pb-10 flex flex-col bg-white p-5">
            <p className="text-2xl font-light text-gray-600 ml-0">Customer Reviews for Limmer</p>

            {/* <div className="mt-6 flex flex-col">
                <p className="font-semibold text-sm text-gray-500">Overall Rating</p>
                <div className="flex h-12 items-center">
                    <p className="text-3xl font-light text-themeGreen mr-4">4.7</p>
                    <ReactStars
                        count={5}
                        onChange={ratingChanged}
                        size={24}
                        activeColor="#ffd700"
                        value={3}
                        isHalf={true}
                    />
                    <p className="text-sm font-semibold text-gray-600 ml-4">10 Reviews</p>
                </div>
            </div> */}

            {/* <p className="font-light text-xl mt-6 text-gray-500">Comments</p> */}

            <div className="w-full flex flex-col mt-6">
                <Comments />
                <Comments />
                <Comments />
                <Comments />
                <Comments />
                <Comments />
                <Comments />
            </div>
        </div>
    </div>
  );
}
