import React from 'react';
import { Input, InputGroup, InputLeftElement, Select } from '@chakra-ui/react'

interface IProps {
    next: Function;
}

export default function PersonalInfo({ next }: IProps) {
  return (
    <div className="w-full h-auto flex flex-col">
        <p className="text-2xl font-light text-gray-600">Personal Information</p>
        <p className="text-sm font-semibold text-gray-500 mt-4">
        Fill out the following fields below with valid information's to enable customers to find you easily 
        </p>

        <div className="w-full flex xl:flex-row lg:flex-row md:flex-col sm:flex-col justify-between  mt-6 font-semibold text-sm text-gray-500">
            <div className="w-full">
                <label>Firstname</label>
                <div className="xl:w-11/12 lg:w-11/12 md:w-full sm:w-full">
                    <Input border="none" bgColor="whitesmoke" borderRadius={0} className="bg-gray-100 mt-3" />
                </div>
            </div>
            <div className="w-full xl:mt-0 lg:mt-0 md:mt-2 sm:mt-2">
                <label>Lastname</label>
                <div className="xl:w-11/12 lg:w-11/12 md:w-full sm:w-full">
                    <Input border="none" bgColor="whitesmoke" borderRadius={0} className="bg-gray-100 mt-3" />
                </div>
            </div>
        </div>

        <div className="w-full flex xl:flex-row lg:flex-row md:flex-col sm:flex-col justify-between mt-6 font-semibold text-sm text-gray-500">
            <div className="w-full">
                <label>Email</label>
                <div className="xl:w-11/12 lg:w-11/12 md:w-full sm:w-full">
                    <Input border="none" bgColor="whitesmoke" borderRadius={0} className="bg-gray-100 mt-3" />
                </div>
            </div>
            <div className="w-full xl:mt-0 lg:mt-0 md:mt-2 sm:mt-2">
                <label>Phone</label>
                <div className="w-full xl:w-11/12 lg:w-11/12 md:w-full sm:w-full">
                    <InputGroup>
                        <InputLeftElement>
                            <div className="flex items-center w-full h-full pt-6">
                            <span>+234</span>
                            </div>
                        </InputLeftElement>
                        <Input border="none" bgColor="whitesmoke" borderRadius={0} className="bg-gray-100 mt-3" />
                    </InputGroup>
                </div>
            </div>
        </div>

        <div className="w-full flex xl:flex-row lg:flex-row md:flex-col sm:flex-col justify-between mt-6 font-semibold text-sm text-gray-500">
            <div className="w-full">
                <label>House / Business Address</label>
                <div className="xl:w-11/12 lg:w-11/12 md:w-full sm:w-full">
                    <Input border="none" bgColor="whitesmoke" borderRadius={0} className="bg-gray-100 mt-3" />
                </div>
            </div>
            <div className="w-full xl:mt-0 lg:mt-0 md:mt-2 sm:mt-2">
                <label>Country</label>
                <div className="xl:w-11/12 lg:w-11/12 md:w-full sm:w-full">
                    <Select border="none" bgColor="whitesmoke" borderRadius={0} className="bg-gray-100 mt-3">
                        <option>Lagos</option>
                    </Select>
                </div>
            </div>
        </div>

        <div className="w-full flex xl:flex-row lg:flex-row md:flex-col sm:flex-col justify-between mt-6 font-semibold text-sm text-gray-500">
            <div className="w-full">
                <label>State</label>
                <div className="xl:w-11/12 lg:w-11/12 md:w-full sm:w-full">
                    <Select border="none" bgColor="whitesmoke" borderRadius={0} className="bg-gray-100 mt-3">
                        <option>Lagos</option>
                    </Select>
                </div>
            </div>

            <div className="w-full">
                
            </div>
        </div>

        <div className="w-full flex justify-end mt-6">
            <button onClick={() => next(2)} className="w-32 bg-themeGreen h-12 text-sm font-semibold text-white">Continue</button>
        </div>


    </div>
  );
}
