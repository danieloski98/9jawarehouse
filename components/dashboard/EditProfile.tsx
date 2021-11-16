import React from "react";
import { Input, InputGroup, InputLeftElement, Select } from "@chakra-ui/react";
import { FiChevronLeft, FiCamera, FiX } from "react-icons/fi";

interface IProps {
  next: Function;
}

export default function EditProfile({ next }: IProps) {
  return (
    <div className="w-full h-auto pb-10">
      <div className="w-full h-auto bg-white flex flex-col p-6">
        <div className="flex items-center h-auto">
          <FiChevronLeft
            size={30}
            color="grey"
            className="cursor-pointer"
            onClick={() => next(1)}
          />
          <p className="text-2xl font-light text-gray-600 ml-4">Edit Profile</p>
        </div>

        <div className="flex flex-col mt-8">
          <p className="text-sm font-semibold text-gray-500 mt-4">
            Add featured images
          </p>
          <div className="w-auto h-24 overflow-x-auto overflow-y-hidden flex mt-6 flex-nowrap">
            <div className="w-24 min-w-24 h-full bg-gray-200 flex justify-center items-center mr-4 cursor-pointer">
              <FiCamera size={35} color="grey" />
            </div>
            <div className="w-24 h-full bg-gray-200 flex justify-center items-center mr-4 cursor-pointer">
              <FiCamera size={35} color="grey" />
            </div>
            <div className="w-24 h-full bg-gray-200 flex justify-center items-center mr-4 cursor-pointer">
              <FiCamera size={35} color="grey" />
            </div>
            <div className="w-24 h-full bg-gray-200 flex justify-center items-center mr-4 cursor-pointer">
              <FiCamera size={35} color="grey" />
            </div>
            <div className="w-24 h-full bg-gray-200 flex justify-center items-center mr-4 cursor-pointer">
              <FiCamera size={35} color="grey" />
            </div>
            <div className="w-24 h-full bg-gray-200 flex justify-center items-center mr-4 cursor-pointer">
              <FiCamera size={35} color="grey" />
            </div>
            <div className="w-24 h-full bg-gray-200 flex justify-center items-center mr-4 cursor-pointer">
              <FiCamera size={35} color="grey" />
            </div>
          </div>
        </div>

        <div className="flex h-auto flex-col mt-12">
          <div className="w-24 h-24 bg-gray-200 flex justify-center items-center mr-4 cursor-pointer rounded-full">
            <FiCamera size={35} color="grey" />
          </div>
          <p className="font-semibold text-sm text-gray-500 mt-4">
            Upload Profile Picture
          </p>
        </div>

        <div className="w-full flex xl:flex-row lg:flex-row md:flex-col sm:flex-col justify-between  mt-6 font-semibold text-sm text-gray-500">
          <div className="w-full">
            <label>Business Name</label>
            <div className="xl:w-11/12 lg:w-11/12 md:w-full sm:w-full">
              <Input
                border="none"
                bgColor="whitesmoke"
                borderRadius={0}
                className="bg-gray-100 mt-3"
              />
            </div>
          </div>
          <div className="w-full xl:mt-0 lg:mt-0 md:mt-2 sm:mt-2"></div>
        </div>

        <div className="w-full flex xl:flex-row lg:flex-row md:flex-col sm:flex-col justify-between mt-6 font-semibold text-sm text-gray-500">
          <div className="w-full">
            <label>Business description</label>
            <div className="w-full">
              <textarea className="bg-gray-100 mt-3 w-full h-40 text-gray-500 font-semibold text-sm" />
            </div>
          </div>
        </div>

        <div className="w-full flex xl:flex-row lg:flex-row md:flex-col sm:flex-col justify-between mt-6 font-semibold text-sm text-gray-500">
          <div className="w-full xl:mt-0 lg:mt-0 md:mt-2 sm:mt-2">
            <label>Services</label>
            <div className="xl:w-11/12 lg:w-11/12 md:w-full sm:w-full">
              <Select
                border="none"
                bgColor="whitesmoke"
                borderRadius={0}
                className="bg-gray-100 mt-3"
              >
                <option>Lagos</option>
              </Select>
            </div>
          </div>

          <div className="w-full flex items-center ">
            <p>Suggested: Event planner, catering</p>
          </div>
        </div>

        <div className="w-full flex mt-4">
          <div className="flex p-3 bg-green-100 text-green-600 text-sm font-light">
            Caterer <FiX size={20} color="green" className="ml-3" />{" "}
          </div>
        </div>

        <p className="mt-6 font-semibold text-sm text-gray-500">Certificate</p>

        <div className="w-full flex xl:flex-row lg:flex-row md:flex-col sm:flex-col justify-between mt-6 font-semibold text-sm text-gray-500">
          <div className="w-full">
            <label>Certifcate</label>
            <div className="xl:w-11/12 lg:w-11/12 md:w-full sm:w-full">
              <Input
                border="none"
                bgColor="whitesmoke"
                borderRadius={0}
                className="bg-gray-100 mt-3"
              />
            </div>
          </div>

          <div className="w-full xl:mt-0 lg:mt-0 md:mt-4 sm:mt-4">
            <label>Organisation</label>
            <div className="xl:w-11/12 lg:w-11/12 md:w-full sm:w-full">
              <Input
                border="none"
                bgColor="whitesmoke"
                borderRadius={0}
                className="bg-gray-100 mt-3"
              />
            </div>
          </div>

          <div className="w-full xl:mt-0 lg:mt-0 md:mt-4 sm:mt-4">
            <label>issued Year</label>
            <div className="xl:w-11/12 lg:w-11/12 md:w-full sm:w-full">
              <Input
                type="date"
                border="none"
                bgColor="whitesmoke"
                borderRadius={0}
                className="bg-gray-100 mt-3"
              />
            </div>
          </div>
        </div>

        <div className="w-full flex xl:flex-row lg:flex-row md:flex-col sm:flex-col justify-between mt-6 font-semibold text-sm text-gray-500">
          <div className="w-full">
            <label>Link</label>
            <div className="xl:w-11/12 lg:w-11/12 md:w-full sm:w-full">
              <Input
                border="none"
                bgColor="whitesmoke"
                borderRadius={0}
                className="bg-gray-100 mt-3"
              />
            </div>
          </div>

          <div className="w-full xl:mt-0 lg:mt-0 md:mt-4 sm:mt-4"></div>

          <div className="w-full xl:mt-0 lg:mt-0 md:mt-4 sm:mt-4"></div>
        </div>

        <p className="mt-6 font-semibold text-sm text-gray-500">
          + Add Another Certification
        </p>

        <div className="w-full flex xl:flex-row lg:flex-row md:flex-col sm:flex-col justify-between  mt-6 font-semibold text-sm text-gray-500">
          <div className="w-full">
            <label>Instagram</label>
            <div className="xl:w-11/12 lg:w-11/12 md:w-full sm:w-full">
              <Input
                border="none"
                bgColor="whitesmoke"
                borderRadius={0}
                className="bg-gray-100 mt-3"
              />
            </div>
          </div>
          <div className="w-full xl:mt-0 lg:mt-0 md:mt-2 sm:mt-2"></div>
        </div>

        <div className="w-full flex xl:flex-row lg:flex-row md:flex-col sm:flex-col justify-between mt-6 font-semibold text-sm text-gray-500">
          <div className="w-full">
            <label>Twitter</label>
            <div className="xl:w-11/12 lg:w-11/12 md:w-full sm:w-full">
              <Input
                border="none"
                bgColor="whitesmoke"
                borderRadius={0}
                className="bg-gray-100 mt-3"
              />
            </div>
          </div>
          <div className="w-full xl:mt-0 lg:mt-0 md:mt-2 sm:mt-2"></div>
        </div>

        <div className="w-full flex xl:flex-row lg:flex-row md:flex-col sm:flex-col justify-between mt-6 font-semibold text-sm text-gray-500">
          <div className="w-full">
            <label>Facebook</label>
            <div className="xl:w-11/12 lg:w-11/12 md:w-full sm:w-full">
              <Input
                border="none"
                bgColor="whitesmoke"
                borderRadius={0}
                className="bg-gray-100 mt-3"
              />
            </div>
          </div>
          <div className="w-full xl:mt-0 lg:mt-0 md:mt-2 sm:mt-2"></div>
        </div>

        <div className="w-full flex xl:flex-row lg:flex-row md:flex-col sm:flex-col justify-between mt-6 font-semibold text-sm text-gray-500">
          <div className="w-full">
            <label>Website</label>
            <div className="xl:w-11/12 lg:w-11/12 md:w-full sm:w-full">
              <Input
                border="none"
                bgColor="whitesmoke"
                borderRadius={0}
                className="bg-gray-100 mt-3"
              />
            </div>
          </div>

          <div className="w-full"></div>
        </div>

        <div className="w-full flex xl:flex-row lg:flex-row md:flex-col sm:flex-col justify-between mt-6 font-semibold text-sm text-gray-500">
          <div className="w-full">
            <label>whatsapp</label>
            <div className="xl:w-11/12 lg:w-11/12 md:w-full sm:w-full">
              <Input
                border="none"
                bgColor="whitesmoke"
                borderRadius={0}
                className="bg-gray-100 mt-3"
              />
            </div>
          </div>

          <div className="w-full"></div>
        </div>

        <div className="w-full flex justify-end mt-6">
          <button
            onClick={() => next(3)}
            className="w-32 bg-themeGreen h-12 text-sm font-semibold text-white"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
