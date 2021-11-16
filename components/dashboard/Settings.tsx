import React from 'react';
import { Input } from '@chakra-ui/react'

export default function Settings() {
  return (
    <div className="w-full h-auto flex flex-col bg-white p-5">
        <p className="text-2xl font-light text-gray-600 ml-0">Settings</p>

        <div className="xl:w-5/6 lg:w-5/6 md:w-full sm:w-full xl:ml-5 lg:ml-5 md:ml-0 sm:ml-0 mt-6 py-8 border-b-2 border-gray-200 flex-col">
            <p className="text-lg font-light text-gray-600">Account</p>

            <div className="xl:w-2/4 lg:w-2/4 md:w-full sm:w-full flex flex-col mt-4">
                <p className="text-sm font-semibold text-gray-600">Email</p>

                <Input border="none" bgColor="whitesmoke" borderRadius={0} className="bg-gray-100 mt-3" />
            </div>
        </div>

        <div className="xl:w-5/6 lg:w-5/6 md:w-full sm:w-full xl:ml-5 lg:ml-5 md:ml-0 sm:ml-0 mt-6 py-8 flex-col">
            <p className="text-lg font-light text-gray-600">Password</p>

            <div className="xl:w-2/4 lg:w-2/4 md:w-full sm:w-full flex flex-col mt-4">
                <p className="text-sm font-semibold text-gray-600">Current Password</p>

                <Input border="none" bgColor="whitesmoke" borderRadius={0} className="bg-gray-100 mt-3" />
            </div>

            <div className="xl:w-2/4 lg:w-2/4 md:w-full sm:w-full flex flex-col mt-4">
                <p className="text-sm font-semibold text-gray-600">New Password</p>

                <Input border="none" bgColor="whitesmoke" borderRadius={0} className="bg-gray-100 mt-3" />
            </div>

            <button className="w-1/4 mt-4 h-12 p-3 text-sm text-white font-semibold bg-themeGreen">Save</button>
        </div>

    </div>
  );
}
