import React from "react";
import { Input, Avatar, Modal, ModalOverlay, ModalBody, ModalContent, Divider } from "@chakra-ui/react";
import Image from 'next/image'
import Banner from '../../public/images/banner.png';
import { IUser } from "../../utils/types/user";
import { FaFacebook, FaWhatsapp, FaInstagram, FaInternetExplorer, FaTwitter, FaLink, FaCopy } from 'react-icons/fa'

interface IProps {
  user: IUser;
}

const ConnectModal = ({icon, isOpen, close, value}: {icon: number; isOpen: boolean; close: Function, value: string}) => {
  const iconSwitcher  = () => {
    switch(icon) {
      case 1 : {
        return  <FaFacebook size={55} color="#0085CC" />
      }
      case 2: {
       return <FaInstagram size={55} color="#A46599" />
      } case 3: {
       return <FaTwitter size={55} color="#0ACAFF" />
      }
      case 4: {
       return <FaWhatsapp size={55} color="green" />
      }
      case 5: {
       return <FaLink size={55} color="#0ACAFF" />
      }
    }
  } 
 return (
   <Modal isCentered isOpen={isOpen} onClose={() => close()}>
     <ModalOverlay />
     <ModalContent>
       <ModalBody className="flex flex-col items-center justify-center">
         {iconSwitcher()}
         <div className="w-full h-12 flex justify-center items-center">
           <p className="font-light text-lg">{value}</p>
           <FaCopy size={20} className="ml-3 cursor-pointer text-themeGreen" />
         </div>
       </ModalBody>
     </ModalContent>
   </Modal>
 )
}

export default function ProfileBox({user}: IProps) {
   // states
   const [icon, setIcon] = React.useState(0);
   const [modalValue, setModalValue] = React.useState("");
   const [openModal, setOpenModal] = React.useState(false);

  const close = () => {
    setOpenModal(false);
  }

  const open = (ico: number, value: string) => {
    setIcon(ico);
    setModalValue(value);
    setOpenModal(true);
  }

  return (
    <div className="w-full h-auto pb-10 border-2 border-gray-200 mb-8">

      {/* modals */}
      <ConnectModal isOpen={openModal} close={close} value={modalValue} icon={icon} />

      <div className="w-full h-auto py-6 pb-10 flex flex-col bg-white">
    
        {/* details */}

        <div className="w-full flex xl:flex-row lg:flex-row md:flex-col sm:flex-col justify-between xl:px-10 lg:px-10 md:px-10 sm:px-5 mt-6">
          <div className="flex flex-1">
            <Avatar
              src={user.profile_pic}
              className="mr-6"
              size="lg"
            />
            <div className="flex flex-col justify-center">
              <p className="text-lg font-Circular-std-medium text-gray-600 cursor-pointer">
                <a href="#comments">{user.business_name} ({Math.round(user.rating) || 0})</a>
              </p>
              <div className="flex w-full flex-wrap">
              {user !== undefined && user.services.map((item, index) => (
                <p key={index.toString()} className="text-sm text-themeGreen font-Circular-std-book mr-2">
                  {item}, 
                </p>
              ))}
              </div>
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
            {user.business_description}
          </p>
        </div>

        {/* contacts */}

        <div className="w-full flex xl:flex-row lg:flex-row md:flex-col sm:flex-col justify-between xl:px-10 lg:px-10 md:px-5 sm:px-5 mt-10">
          <div className="flex flex-1 flex-col xl:mt-0 lg:mt-0 md:mt-4 sm:mt-4">
            <p className="text-md font-light text-gray-600">Location</p>
            <p className="text-sm text-gray-500 font-semibold">
             {user.business_address}
            </p>
          </div>

          <div className="flex flex-1 flex-col xl:mt-0 lg:mt-0 md:mt-4 sm:mt-4">
            <p className="text-md font-light text-gray-600">Phone</p>
            <p className="text-sm text-gray-500 font-semibold">{user.phone}</p>
          </div>

          <div className="flex flex-1 flex-col xl:mt-0 lg:mt-0 md:mt-4 sm:mt-4">
            <p className="text-md font-light text-gray-600">Email</p>
            <p className="text-sm text-gray-500 font-semibold">
              {user.email}
            </p>
          </div>
        </div>

        <div className="w-full flex xl:flex-row lg:flex-row md:flex-col sm:flex-col justify-between xl:px-10 lg:px-10 md:px-5 sm:px-5 mt-10">
          <div className="flex flex-1 flex-col xl:mt-0 lg:mt-0 md:mt-4 sm:mt-4">
            <p className="text-md font-light text-gray-600">Country</p>
            <p className="text-sm text-gray-500 font-semibold">
             {user.country}
            </p>
          </div>

          <div className="flex flex-1 flex-col xl:mt-0 lg:mt-0 md:mt-4 sm:mt-4">
            <p className="text-md font-light text-gray-600">State</p>
            <p className="text-sm text-gray-500 font-semibold">{user.state}</p>
          </div>

          <div className="flex flex-1 flex-col xl:mt-0 lg:mt-0 md:mt-4 sm:mt-4">
            <p className="text-md font-light text-gray-600">LGA</p>
            <p className="text-sm text-gray-500 font-semibold">
              {user.lga}
            </p>
          </div>
        </div>

        {/* social media links */}

        <div className="w-full flex xl:flex-row lg:flex-row md:flex-col sm:flex-col justify-between xl:px-10 lg:px-10 md:px-5 sm:px-5 mt-10">
          <div className="flex flex-col xl:mt-0 lg:mt-0 md:mt-4 sm:mt-4">
            <p className="text-md font-light text-gray-600">
              Social Media Links
            </p>
            <div className="flex w-full mt-2">
              {user.facebook !== "" && (
                <a href={user.facebook} className="cursor-pointer" title={user.facebook}>
                  <FaFacebook size={25} color="#0085CC" />
                </a>
              )}

              {user.instagram !== "" && (
                <a href={user.instagram} title={user.instagram} className="ml-3 cursor-pointer">
                  <FaInstagram size={25} color="#A46599" />
                </a>
              )}

              {user.twitter !== "" && (
                <a href={user.twitter} title={user.twitter} className="ml-3 cursor-pointer">
                  <FaTwitter size={25} color="#0ACAFF" />
                </a>
              )}

              {user.whatsapp !== "" && (
                <a href={user.whatsapp} title={user.whatsapp} className="ml-3 cursor-pointer">
                  <FaWhatsapp size={25} color="green" />
                </a>
              )}

              {user.website !== "" && (
                <a href={user.website} title={user.website} className="ml-3 cursor-pointer">
                  <FaLink size={25} color="#0ACAFF" />
                </a>
              )}        
            </div>
          </div>

          {/* <div className="flex flex-col xl:mt-0 lg:mt-0 md:mt-4 sm:mt-4">
            <p className="text-md font-light text-gray-600">Phone</p>
            <p className="text-sm text-gray-500 font-semibold">08033783940</p>
          </div> */}

          <div className="flex flex-col">
            {/* <p className="text-md font-light text-gray-600">Email</p>
        <p className="text-sm text-gray-500 font-semibold">9jawarehouse@9ja.com.fake</p> */}
          </div>
        </div>

        

      </div>
    </div>
  );
}
