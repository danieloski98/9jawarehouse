import React from 'react';
import { Select } from '@chakra-ui/react'
import BusinessCard from '../../components/services/businesscard';
import ServiceNavbar from '../../components/services/ServiceNav';
import { FiFilter } from 'react-icons/fi'

export default function Services() {
  return (
    <div className="w-full h-screen flex flex-col ">
    <div className="w-full h-24 z-20">
        <ServiceNavbar />
    </div>

    <div className="w-full xl:px-10 lg:px-10 sm:px-5 md:px-5 flex h-auto py-8 items-center justify-between">
        <p className="font-light text-md">56 results for  fashion designers</p>
        <FiFilter size={25} color="grey" className="xl:hidden lg:hidden md:block sm:block" />
    </div>

    <div className="w-auto overflow-x-auto flex-nowrap px-5 xl:hidden lg:hidden md:flex sm:flex">
        <p className="flex-1">Hello</p>
                <p className="text-sm font-semibold mb-4">Tailor</p>
                <p className="text-sm font-semibold mb-4">Tailor</p>
                <p className="text-sm font-semibold mb-4">Tailor</p>
                <p className="text-sm font-semibold mb-4">Tailor</p>
                <p className="text-sm font-semibold mb-4">Tailor</p>
                <p className="text-sm font-semibold mb-4">Tailor</p>
                <p className="text-sm font-semibold mb-4">Tailor</p>
                <p className="text-sm font-semibold mb-4">Tailor</p>
                <p className="text-sm font-semibold mb-4">Tailor</p>
                <p className="text-sm font-semibold mb-4">Tailor</p>
                <p className="text-sm font-semibold mb-4">Tailor</p>
                <p className="text-sm font-semibold mb-4">Tailor</p>
                <p className="text-sm font-semibold mb-4">Tailor</p>
                <p className="text-sm font-semibold mb-4">Tailor</p>
                <p className="text-sm font-semibold mb-4">Tailor</p>
                <p className="text-sm font-semibold mb-4">Tailor</p>
                <p className="text-sm font-semibold mb-4">Tailor</p>
                <p className="text-sm font-semibold mb-4">Tailor</p>
                <p className="text-sm font-semibold mb-4">Tailor</p>
                <p className="text-sm font-semibold mb-4">Tailor</p>
                <p className="text-sm font-semibold mb-4">Tailor</p>
    </div>

    <div className="z-10 flex-1 h-full overflow-auto xl:p-0 lg:p-0 md:p-5 sm:p-5 flex justify-between">

        <div className="w-1/6 h-full xl:block lg:block md:hidden sm:hidden pb-5 mx-5">
            {/* <Sidebar page={page} setPage={changePage} /> */}
            <div className="w-full h-full bg-white border-2 border-gray-200 p-5 overflow-scroll">
                <p className="text-xl font-light text-gray-500 mb-6">Related Services</p>
                <p className="text-sm font-semibold mb-4">Tailor</p>
                <p className="text-sm font-semibold mb-4">Tailor</p>
                <p className="text-sm font-semibold mb-4">Tailor</p>
                <p className="text-sm font-semibold mb-4">Tailor</p>
                <p className="text-sm font-semibold mb-4">Tailor</p>
                <p className="text-sm font-semibold mb-4">Tailor</p>
                <p className="text-sm font-semibold mb-4">Tailor</p>
                <p className="text-sm font-semibold mb-4">Tailor</p>
                <p className="text-sm font-semibold mb-4">Tailor</p>
                <p className="text-sm font-semibold mb-4">Tailor</p>
                <p className="text-sm font-semibold mb-4">Tailor</p>

            </div>

            <div className="w-full flex justify-end">
                <p></p>
            </div>
        </div>

        <div className="xl:w-9/12 lg:w-9/12 md:w-full sm:w-full h-full  xl:ml-10 lg:ml-10 md:ml-0 sm:ml-0 p-0 flex flex-col">

            {/* Filter */}

           <div className="w-full h-12 xl:flex lg:flex md:hidden sm:hidden items-center">
               <p className="text-md font-light text-gray-500">Filter :</p>
               <div className="w-32 h-10 ml-6">
                   <Select border="none" bgColor="whitesmoke">
                       <option value="" selected>Service</option>
                       <option value="">One</option>
                       <option value="">One</option>
                   </Select>
               </div>
               <div className="w-32 h-10 ml-6">
                   <Select border="none" bgColor="whitesmoke" borderRadius="0">
                       <option value="" selected>State</option>
                       <option value="">One</option>
                       <option value="">One</option>
                   </Select>
               </div>
               <div className="w-32 h-10 ml-6">
                   <Select border="none" bgColor="whitesmoke">
                       <option value="" selected>Area</option>
                       <option value="">One</option>
                       <option value="">One</option>
                   </Select>
               </div>
               <button className="w-32 h-10 bg-themeGreen text-white font-light ml-6">Apply</button>
           </div>

           <div className="flex-1 h-full overflow-y-auto flex xl:flex-row lg:flex-row md:flex-col sm:flex-col xl:justify-between lg:justify-between md:justify-center sm:justify-center xl:pr-16 lg:pr-16 md:pr-0 sm:pr-0 pt-0 mt-6 xl:flex-wrap lg:flex-wrap sm:flex-nowrap md:flex-nowrap xl:pt-0 lg:pt-0 md:pt-64 sm:pt-96">
               
               <BusinessCard />
               <BusinessCard />
               <BusinessCard />
               <BusinessCard />
               <BusinessCard />
               <BusinessCard />
               <BusinessCard />
               <BusinessCard />
               <BusinessCard />
               
           </div>

        </div>

    </div>
    {/* <Footer /> */}
</div>
  );
}
