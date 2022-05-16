import React from "react";
import { Input, Avatar, Modal, ModalOverlay, ModalBody, ModalContent, Divider } from "@chakra-ui/react";
import Image from 'next/image'
import Banner from '../../public/images/banner.png';
import { IUser } from "../../utils/types/user";
import ReactStars from "react-rating-stars-component";
import { FaFacebook, FaWhatsapp, FaInstagram, FaInternetExplorer, FaTwitter, FaLink, FaCopy } from 'react-icons/fa'

interface IProps {
  user: IUser;
  reviews: number;
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

export default function ProfileBox({user, reviews}: IProps) {
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
    <div className="w-full h-auto pb-0 border-2 border-gray-200 mb-8">

      {/* modals */}
      <ConnectModal isOpen={openModal} close={close} value={modalValue} icon={icon} />

      <div className="w-full h-auto py-6 pb-10 flex flex-col bg-white">
    
        {/* details */}

        <div className="w-full flex xl:flex-row lg:flex-row md:flex-col sm:flex-col justify-between xl:px-10 lg:px-10 md:px-10 sm:px-5 mt-6">
          <div className="flex xl:justify-start lg:justify-start  md:items-center sm:items-center flex-1 xl:flex-row lg:flex-row md:flex-col sm:flex-col">
            <Avatar
              src={user.profile_pic}
              className="mr-6"
              // size="lg"
              w="124px"
              h="124px"
            />
            <div className="flex flex-col justify-center xl:items-start lg:items-start md:items-center sm:items-center md:mt-2 sm:mt-2">
              <p className="text-xl font-Circular-std-medium text-gray-700 cursor-pointer">
                <a href="#comments">{user.business_name}</a>
              </p>
              <div className="flex xl:justify-start lg:justify-start md:justify-center sm:justify-center w-full flex-wrap md:mt-3 sm:mt-3">
              {user !== undefined && user.services.map((item, index) => (
               <>
                 <p key={index.toString()} className="text-md text-themeGreen font-Cerebri-sans-book">
                  {item}
                </p>
                <span className="mx-2 text-themeGreen">{index === user.services.length - 1 ? '':'|'}</span>
               </>

              ))}
              </div>
              <div className="flex items-center text-sm font-Cerebri-sans-book text-gray-600 mt-4">
                <span className="mr-4">{Math.ceil(user.rating)}/5</span>
                <ReactStars
                        count={5}
                        size={18}
                        activeColor="#ffd700"
                        value={Math.ceil(user.rating)}
                        isHalf={true}
                        edit={false}
                        color="lightgrey"
                />
                <span className="ml-4">({reviews})Reviews</span>
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

        <div className="w-full xl:px-10 lg:px-10 md:px-5 sm:px-5 mt-10 flex flex-col xl:text-left lg:text-left md:text-left sm:text-left">
          <p className="text-lg font-Circular-std-medium text-themeGreen">Business Description</p>
          <p className="text-md font-Cerebri-sans-book mt-2 text-gray-500 xl:text-justify lg:text-justify md:text-justify sm:text-justify">
            {user.business_description}
          </p>
        </div>

        {/* contacts */}

        <div className="w-full flex xl:flex-row lg:flex-row md:flex-col sm:flex-col justify-between xl:px-10 lg:px-10 md:px-5 sm:px-5 xl:mt-10 lg:mt-10 xl:text-left lg:text-left md:text-left sm:text-left">
          <div className="flex flex-1 flex-col xl:mt-0 lg:mt-0 md:mt-4 sm:mt-4">
            <p className="text-lg font-Circular-std-medium text-themeGreen">Location</p>
            <p className="text-md font-Cerebri-sans-book mt-2 text-gray-500">
             {user.business_address}
            </p>
          </div>

          <div className="flex flex-1 flex-col xl:mt-0 lg:mt-0 md:mt-4 sm:mt-4">
            <p className="text-lg font-Circular-std-medium text-themeGreen">Phone</p>
            <p className="text-md font-Cerebri-sans-book mt-2 text-gray-500">+234{user.phone}</p>
          </div>

          <div className="flex flex-1 flex-col xl:mt-0 lg:mt-0 md:mt-4 sm:mt-4">
            <p className="text-lg font-Circular-std-medium text-themeGreen">Email</p>
            <p className="text-md font-Cerebri-sans-book mt-2 text-gray-500">
              {user.email}
            </p>
          </div>
        </div>

        <div className="w-full flex xl:flex-row lg:flex-row md:flex-col sm:flex-col justify-between xl:px-10 lg:px-10 md:px-5 sm:px-5 xl:mt-10 lg:mt-10 xl:text-left lg:text-left md:text-left sm:text-left">
          <div className="flex flex-1 flex-col xl:mt-0 lg:mt-0 md:mt-4 sm:mt-4">
            <p className="text-lg font-Circular-std-medium text-themeGreen">Country</p>
            <p className="text-md font-Cerebri-sans-book mt-2 text-gray-500">
             {user.country}
            </p>
          </div>

          <div className="flex flex-1 flex-col xl:mt-0 lg:mt-0 md:mt-4 sm:mt-4">
            <p className="text-lg font-Circular-std-medium text-themeGreen">State</p>
            <p className="text-md font-Cerebri-sans-book mt-2 text-gray-500">{user.state}</p>
          </div>

          <div className="flex flex-1 flex-col xl:mt-0 lg:mt-0 md:mt-4 sm:mt-4">
            <p className="text-lg font-Circular-std-medium text-themeGreen">LGA</p>
            <p className="text-md font-Cerebri-sans-book mt-2 text-gray-500">
              {user.lga}
            </p>
          </div>
        </div>

        {/* social media links */}

        <div className="w-full flex xl:flex-row lg:flex-row md:flex-col sm:flex-col justify-between xl:px-10 lg:px-10 md:px-5 sm:px-5 mt-10">
          <div className="flex flex-col sm:items-left md:items-left xl:mt-0 lg:mt-0 md:mt-4 sm:mt-4">
            <p className="text-lg font-Circular-std-medium text-themeGreen">
              Social Media Links
            </p>
            <div className="flex md:justify-start sm:justify-start w-full mt-2">
              {user.facebook !== "" && (
                <a href={user.facebook} className="cursor-pointer" target="_blank" rel="noreferrer" title={user.facebook}>
                  <FaFacebook size={25} color="#0085CC" />
                </a>
              )}

              {user.instagram !== "" && (
                <a href={user.instagram} title={user.instagram} target="_blank" rel="noreferrer" className="ml-3 cursor-pointer">
                  <FaInstagram size={25} color="#A46599" />
                </a>
              )}

              {user.twitter !== "" && (
                <a href={user.twitter} title={user.twitter} target="_blank" rel="noreferrer" className="ml-3 cursor-pointer">
                  <FaTwitter size={25} color="#0ACAFF" />
                </a>
              )}

              {user.whatsapp !== "" && (
                <a href={user.whatsapp} title={user.whatsapp} target="_blank" rel="noreferrer" className="ml-3 cursor-pointer">
                  <FaWhatsapp size={25} color="green" />
                </a>
              )}

              {user.website !== "" && (
                <a href={user.website} title={user.website} target="_blank" rel="noreferrer" className="ml-3 cursor-pointer">
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

         {/* certificates */}
          {
           user.certificates.length > 0 && (         <div className="flex flex-col xl:items-start lg:items-start md:items-start sm:items-start xl:mt-10 lg:mt-10 md:mt-6 sm:mt-6 flex-1 xl:ml-10 lg:ml-10 md:mx-5 sm:mx-5">
            <p className="text-lg font-Circular-std-medium text-themeGreen">Certifications</p>
            <div className="xl:flex lg:flex md:hidden sm:hidden mt-6 flex-wrap text-left w-full">
                <p className="text-sm font-Circular-std-medium text-themeGreen flex-1">Certificate</p>
                <p className="text-sm font-Circular-std-medium text-themeGreen mt-1 flex-1">Organization</p>
                <p className="text-sm font-Circular-std-medium text-themeGreen mt-1 flex-1">Year Issued</p>
                <p className="text-sm font-Circular-std-medium text-themeGreen mt-1 flex-1">Action</p>
            </div>

            <div className="mt-5 pr-20 xl:block lg:block md:hidden sm:hidden">
              <Divider />
            </div>

          <div className="flex w-full flex-col flex-wrap">
          {user.certificates.length > 0 && user.certificates.map((item, index) => (
              <div key={index.toString()} className="w-full mt-2 mb-0 mr-6 flex xl:flex-row lg:flex-row md:flex-col sm:flex-col xl:items-center lg:items-center md:items-start sm:items-start font-Circular-std-book" >
                  <p className="text-md font-Cerebri-sans-book mt-2 text-gray-500 flex-1">{item.certificate}</p>
                  <p className="text-md font-Cerebri-sans-book mt-2 text-gray-500 flex-1">{item.organization}</p>
                  <p className="text-md font-Cerebri-sans-book mt-2 text-gray-500 flex-1">{item.year}</p>
                  <a href={item.link} target="_blank" rel="noreferrer" className="flex-1 sm:mt-1 md:mt-1">
                    <button className="w-20 h-8 rounded-full border-2 border-themeGreen text-themeGreen mt-0 font-Circular-std-book text-xs">View</button>
                  </a>
              </div>
            ))}
          </div>
          </div>)
          }

        

      </div>
    </div>
  );
}
