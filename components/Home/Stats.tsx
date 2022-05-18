import { url } from 'inspector';
import React from 'react';
import { FaUsers, FaStore, FaStar } from 'react-icons/fa'

export default function Stats() {
  return (
    <div className="stats w-full xl:h-64 lg:h-64 md:h-auto sm:h-auto xl:py-0 lg:py-0 md:py-6 sm:py-6 bg-green-700 flex xl:flex-row lg:flex-row md:flex-col sm:flex-col">
        <div className="xl:w-1/4 lg:w-1/4 md:w-full sm:w-full flex justify-center items-center">
            <h3 className="text-xl text-white font-Circular-std-medium">Projected Stats <br /> By Numbers</h3>
        </div>

        <div className="flex-1 flex xl:flex-row lg:flex-row md:flex-col sm:flex-col justify-between px-12 items-center text-white font-semibold text-md">
            <div className="flex md:my-6 sm:my-6 xl:my-0 lg:my-0 items-center">
                <FaUsers size={55} color="white" />
                <div className="ml-3 font-Circular-std-book">
                    <p className="text-3xl">10,000+</p>
                    <p>Visitors Weekly</p>
                </div>
            </div>
            <div className="flex md:my-6 sm:my-6 xl:my-0 lg:my-0">
            <FaStore size={55} color="white" />
                <div className="ml-3 font-Circular-std-book">
                    <p className="text-3xl">5,000+</p>
                    <p>Active Vendors</p>
                </div>
            </div>
            <div className="flex md:my-6 sm:my-6 xl:my-0 lg:my-0">
            <FaStar size={55} color="white" />
                <div className="ml-3 font-Circular-std-book">
                    <p className="text-3xl">100, 000+</p>
                    <p>Customer Reviews</p>
                </div>
            </div>
        </div>

    </div>
  );
}
