import React from 'react';

// components
import Navbar from '../components/general/Navbar';
import BigScreen from '../components/completereg/bigScreen';

export default function CompleteRegistration() {
  return (
    <div className="w-full h-screen flex flex-col">
        <Navbar page={1} setPage={() => {}} />
        <div className="w-full h-20 bg-white text-center shadow-lg z-20 xl:px-0 lg:px-0 md:px-5 sm:px-5 text-center">
            <p className="font-semibold text-sm text-gray-600 mt-6">Complete your 9jaWarehosue Account Set up</p>
        </div>

        <div className="flex-1 bg-gray-100 overflow-y-auto overflow-x-hidden z-10">
            <div className="bg-screen xl:px-10 lg:px-10 md:px-5 sm:px-5 py-10  w-full h-auto flex justify-center">
                <BigScreen />
            </div>
        </div>
    
    </div>
  );
}
