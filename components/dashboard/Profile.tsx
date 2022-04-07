import React from "react";
import { Input, Avatar, Image as Img, Modal, ModalOverlay, ModalBody, ModalContent, Divider } from "@chakra-ui/react";
import Image from 'next/image'
import Banner from '../../public/images/banner.png';
import { FaFacebook, FaWhatsapp, FaInstagram, FaInternetExplorer, FaTwitter, FaLink, FaCopy } from 'react-icons/fa'
import { FiCircle } from 'react-icons/fi'
import { Carousel } from 'react-responsive-carousel';


// redux
import { RootState } from '../../store/index'
import { useSelector } from 'react-redux'
import { ICertificate } from "../../utils/types/certificate";

interface IProps {
  setPage: Function;
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

export default function Profile({ setPage }: IProps) {

  window.scroll({ top: -1 })

  // states
  const [icon, setIcon] = React.useState(0);
  const [modalValue, setModalValue] = React.useState("");
  const [openModal, setOpenModal] = React.useState(false);
  const [pic, setPic] = React.useState('');

  const userDetails = useSelector((state: RootState) => state.UserReducer.user);

  React.useEffect(() => {
    if (userDetails !== undefined || userDetails !== {}) {
      setPic(userDetails.pictures[0]);
    }
  }, [userDetails]);

  const close = () => {
    setOpenModal(false);
  }

  const open = (ico: number, value: string) => {
    setIcon(ico);
    setModalValue(value);
    setOpenModal(true);
  }

  return (
    <div className="w-full h-full pb-0 flex flex-col z-10">

      {/* modal */}
      <ConnectModal isOpen={openModal} close={close} value={modalValue} icon={icon} />

      <div className="w-full h-20 flex items-center bg-white px-10">
        <p className="text-2xl font-Circular-std-medium text-gray-600">Profile</p>
      </div>

      

      <div className="flex-1 overflow-y-auto flex flex-col bg-white pb-10">
        

       <div className="w-full h-64 z-30">
        <Carousel showArrows showIndicators dynamicHeight={false} autoPlay interval={7000} infiniteLoop>
            {userDetails.pictures.map((item, index) => (
              <div key={index.toString()} className="w-full h-64 bg-gray-200">
                <Img src={item} alt="img" className="w-full h-64 object-cover" />
              </div>
            ))}
          </Carousel>
       </div>

      

        {/* details */}

        <div className="w-full flex xl:flex-row lg:flex-row md:flex-col sm:flex-col justify-between xl:px-10 lg:px-10 md:px-10 sm:px-5 mt-6">
          <div className="flex xl:flex-row lg:flex-row md:flex-col sm:flex-col md:items-center sm:items-center  flex-1">
            <Avatar
              src={userDetails.profile_pic}
              className="xl:mr-6 lg:mr-6 sm:mr-0 md:mr-0 sm:mt-6 md:mt-6"
              size="lg"
              w="124px"
              h="124px"
            />
            <div className="flex flex-col justify-center xl:items-start lg:items-start md:items-center sm:items-center">
              <p className="text-lg font-Circular-std-medium text-gray-600 md:mt-6 sm:mt-6">
                {userDetails.business_name}
              </p>
              <div className="flex w-full h-auto flex-wrap mt-2 xl:justify-start lg:justify-start md:justify-center sm:justify-center">
                {userDetails.services.map((item: string, index: number) => (
                 <>
                   <p key={index.toString()} className="text-sm text-themeGreen md:text-center sm:text-center font-Cerebri-sans-book px-1">
                    {item}
                  </p> 
                  <span className="mx-2 text-themeGreen">{index === userDetails.services.length - 1 ? '':'.'}</span>
                 </>
                ))}
              </div>
            </div>
          </div>
          <div className="xl:mt-0 lg:mt-0 md:mt-6 sm:mt-6 ">
            <button onClick={() => setPage(5)} className="xl:w-40 lg:w-40 md:w-full sm:w-full h-12 border-2 border-themeGreen text-themeGreen font-Cerebri-sans-book">
              Edit
            </button>
          </div>
        </div>

        {/* description box */}

        <div className="w-full xl:px-10 lg:px-10 md:px-5 sm:px-5 mt-10 flex flex-col">
          <p className="text-md font-Circular-std-medium text-gray-600 text-start">Description</p>
          <p className="text-sm font-Cerebri-sans-book mt-4 text-gray-500 xl:text-justify lg:text-justify ">
           {userDetails.business_description}
          </p>
        </div>

        {/* contacts */}

        <div className="w-full flex xl:flex-row lg:flex-row md:flex-col sm:flex-col justify-between xl:px-10 lg:px-10 md:px-5 sm:px-5 xl:mt-10 lg:mt-10">
          <div className="flex flex-col items-start flex-1 xl:mt-0 lg:mt-0 md:mt-4 sm:mt-4">
            <p className="text-md font-Circular-std-medium text-gray-600">Location</p>
            <p className="text-sm text-gray-500 font-Cerebri-sans-book">
              {userDetails.business_address}
            </p>
          </div>

          <div className="flex flex-col items-start flex-1 xl:mt-0 lg:mt-0 md:mt-4 sm:mt-4">
            <p className="text-md font-Circular-std-medium text-gray-600">Phone</p>
            <p className="text-sm text-gray-500 font-Cerebri-sans-book">{userDetails.phone}</p>
          </div>

          <div className="flex flex-col items-start flex-1 xl:mt-0 lg:mt-0 md:mt-4 sm:mt-4">
            <p className="text-md font-Circular-std-medium text-gray-600">Email</p>
            <p className="text-sm text-gray-500 font-Cerebri-sans-book">
              {userDetails.email}
            </p>
          </div>
        </div>


        <div className="w-full flex xl:flex-row lg:flex-row md:flex-col sm:flex-col justify-between xl:px-10 lg:px-10 md:px-5 sm:px-5 xl:mt-10 lg:mt-10">
          <div className="flex flex-col items-start flex-1 xl:mt-0 lg:mt-0 md:mt-4 sm:mt-4">
            <p className="text-md font-Circular-std-medium text-gray-600">Country</p>
            <p className="text-sm text-gray-500 font-Cerebri-sans-book">
              {userDetails.country}
            </p>
          </div>

          <div className="flex flex-col items-start flex-1 xl:mt-0 lg:mt-0 md:mt-4 sm:mt-4">
            <p className="text-md font-Circular-std-medium text-gray-600">State</p>
            <p className="text-sm text-gray-500 font-Cerebri-sans-book">{userDetails.state}</p>
          </div>

          <div className="flex flex-col items-start flex-1 xl:mt-0 lg:mt-0 md:mt-4 sm:mt-4">
            <p className="text-md font-Circular-std-medium text-gray-600">LGA</p>
            <p className="text-sm text-gray-500 font-Cerebri-sans-book">
              {userDetails.lga}
            </p>
          </div>
        </div>

        {/* social media links */}

        <div className="w-full flex xl:flex-row lg:flex-row md:flex-col sm:flex-col justify-between xl:px-10 lg:px-10 md:px-5 sm:px-5 mt-10">
          <div className="flex flex-col flex-1 items-start xl:mt-0 lg:mt-0 md:mt-0 sm:mt-0">
            <p className="text-md font-Circular-std-medium text-gray-600">
              Social Media Links
            </p>
            <div className="flex w-full mt-2">
              {userDetails.facebook !== "" && (
                <p className="cursor-pointer" title={userDetails.facebook} onClick={() => open(1, userDetails.facebook)}>
                  <FaFacebook size={25} color="#0085CC" />
                </p>
              )}

              {userDetails.instagram !== "" && (
                <p title={userDetails.instagram} className="ml-3 cursor-pointer" onClick={() => open(2, userDetails.instagram)}>
                  <FaInstagram size={25} color="#A46599" />
                </p>
              )}

              {userDetails.twitter !== "" && (
                <p title={userDetails.twitter} className="ml-3 cursor-pointer" onClick={() => open(3, userDetails.twitter)}>
                  <FaTwitter size={25} color="#0ACAFF" />
                </p>
              )}

              {userDetails.whatsapp !== "" && (
                <p title={userDetails.whatsapp} className="ml-3 cursor-pointer" onClick={() => open(4, userDetails.whatsapp)}>
                  <FaWhatsapp size={25} color="green" />
                </p>
              )}

              {userDetails.website !== "" && (
                <p title={userDetails.website} className="ml-3 cursor-pointer" onClick={() => open(5, userDetails.website)}>
                  <FaLink size={25} color="#0ACAFF" />
                </p>
              )}        
            </div>
          </div>


          <div className="flex flex-1 flex-col">
            {/* <p className="text-md font-light text-gray-600">Email</p>
        <p className="text-sm text-gray-500 font-semibold">9jawarehouse@9ja.com.fake</p> */}
          </div>
        </div>

        {/* certificates */}
        {
          userDetails.certificates.length > 0 && (
            <div className="flex flex-col xl:mt-10 lg:mt-10 md:mt-4 sm:mt-4 flex-1 xl:ml-10 lg:ml-10 md:ml-5 sm:ml-5">
            <p className="text-md font-semibold text-gray-600">Certifications</p>
            <div className="xl:flex lg:flex md:hidden sm:hidden mt-6 flex-wrap text-left">
                <p className="text-sm flex-1">Certificate</p>
                <p className="text-sm mt-1 flex-1">organization</p>
                <p className="text-sm mt-1 flex-1">year Issued</p>
                <p className="text-sm mt-1 flex-1">Action</p>
            </div>

            <div className="mt-5 pr-20 xl:block lg:block md:hidden sm:hidden">
              <Divider />
            </div>

          <div className="flex flex-col flex-wrap">
          {userDetails.certificates.length > 0 && userDetails.certificates.map((item, index) => (
              <div key={index.toString()} className="mt-2 mb-5 mr-6 flex xl:flex-row lg:flex-row md:flex-col sm:flex-col xl:items-center lg:items-center md:items-start sm:items-start font-Circular-std-book" >
                  <p className="text-sm flex-1">{item.certificate}</p>
                  <p className="text-sm mt-1 flex-1">{item.organization}</p>
                  <p className="text-sm mt-1 flex-1">{item.year}</p>
                  <a href={item.link} target="_blank" rel="noreferrer" className="flex-1 md:mt-3 sm:mt-3">
                    <button className="w-20 h-8 rounded-full border-2 border-themeGreen text-themeGreen mt-0 font-Circular-std-book text-xs sm:mt-1 md:mt-1">View</button>
                  </a>
              </div>
            ))}
          </div>
          </div>
          )
        }

      </div>
    </div>
  );
}
