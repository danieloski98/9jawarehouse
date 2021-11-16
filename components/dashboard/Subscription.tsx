import React from 'react';

export default function Subscription() {
  return (
    <div className="w-full h-full pb-10">
        <div className="w-full h-auto flex flex-col bg-white p-5">
        <p className="text-2xl font-light text-gray-600 ">Subscriptions</p>
        <p className="text-sm font-semibold text-gray-500 mt-4">You are currently on monthly plan, To Access all features you will need to upgrade to pro plan. Learn more</p>

        <div className="w-full flex xl:flex-row lg:flex-row md:flex-col sm:flex-col mt-6">
            <button className="xl:w-64 lg:w-64 md:w-full sm:w-full h-10 bg-themeGreen text-white font-semibold text-sm mb-4">Change Plan</button>
            <button className="xl:w-64 lg:w-64 md:w-full sm:w-full h-10 border-2 border-themeGreen text-themeGreen xl:ml-4  lg:ml-4 md:ml-0 sm:ml-0 font-semibold text-sm">Cancel Auto Renewal</button>
        </div>

        <p className="text-2xl font-light text-gray-600 mt-6">History</p>

        <div className="w-full overflow-auto">
            <div className="xl:w-full lg:w-full md:w-auto sm:w-auto h-16 bg-gray-100 rounded-md flex justify-between items-center px-4 mt-6 text-md font-light text-left">
                <p>Date</p>
                <p>Period</p>
                <p>Amount</p>
                <p>Status</p>
            </div>

            <div className="w-full h-16 rounded-md flex justify-between items-center xl:px-4 lg:px-4 md:px-0 sm:px-0 mt-4 mb-4 text-sm font-semibold">
                <p className="flex-1">{new Date().toDateString()}</p>
                <p className="flex-1">Monthly</p>
                <p className="flex-1">1,000</p>
                <button className="w-20 h-12 bg-green-100 text-themeGreen ">Active</button>
            </div>

            <div className="w-full h-16 rounded-md flex justify-between items-center xl:px-4 lg:px-4 md:px-0 sm:px-0 mt-4 mb-4 text-sm font-semibold">
                <p className="flex-1">{new Date().toDateString()}</p>
                <p className="flex-1">Monthly</p>
                <p className="flex-1">1,000</p>
                <button className="w-20 h-12 bg-green-100 text-themeGreen ">Active</button>
            </div>

            <div className="w-full h-16 rounded-md flex justify-between items-center xl:px-4 lg:px-4 md:px-0 sm:px-0 mt-4 mb-4 text-sm font-semibold">
                <p className="flex-1">{new Date().toDateString()}</p>
                <p className="flex-1">Monthly</p>
                <p className="flex-1">1,000</p>
                <button className="w-20 h-12 bg-green-100 text-themeGreen ">Active</button>
            </div>
        </div>

        </div>
    </div>
  );
}
