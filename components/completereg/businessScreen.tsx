import React from 'react';
import { Input, InputGroup, InputLeftElement, Select, Avatar, Textarea } from '@chakra-ui/react'
import { FiChevronLeft, FiCamera, FiX } from 'react-icons/fi'
import Image from 'next/image';
import { FormikProps } from 'formik';
import { IServices } from '../../utils/types/services';
import { ICertificate } from '../../utils/types/certificate';

interface IProps {
    next: Function;
    images: any[];
    profilePic: any;
    picker: Function;
    services: Array<IServices>;
    selectService: Function;
    selectedSerices: Array<string>;
    deleteService: Function;
    certificates: Array<ICertificate>;
    addCerts: Function;
    changeCert: Function;
    deleteCert: Function;
    formik: FormikProps<{
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        business_address: '',
        country: '',
        state: '',
        business_name: '',
        business_description: '',
        instagram: '',
        facebook: '',
        whatsapp: '',
        twitter: '',
        website: '',
        lga: ''
    }>;
}

export default function BusinessInfo({ next, images, picker, profilePic, formik, services, selectService, selectedSerices, deleteService, certificates, addCerts, changeCert, deleteCert }: IProps) {

    const nextPage = (page: number) => {
        // validate images
        if (images.length < 1) {
            alert('You must select at least 1 image to continue');
            return;
        }

        if (services.length < 1) {
            alert('You must select at least 1 service to continue');
            return;
        }

        if (profilePic === "" || profilePic === null) {
            alert('You have to choose a profile picture');
            return;
        }

        if (formik.errors.business_name || formik.errors.business_description) {
            alert('Please fillin the form correctly');
            return;
        }

        next(page);
    }

  return (
    <div className="w-full h-auto flex flex-col">
        <div className="flex items-center h-auto">
            <FiChevronLeft size={30} color="grey" onClick={() => next(1)} />
            <p className="text-2xl Cerebri-sans-book text-gray-600 ml-4">Business Information</p>
        </div>
        <p className="text-sm font-semibold text-gray-500 mt-4">
        Provide more information of your business or services you render 
        </p>

        <div className="flex flex-col mt-8">
            <p className="text-sm font-semibold text-gray-500 mt-4">Add featured images</p>
            <div className="w-auto h-24 overflow-x-scroll overflow-y-hidden flex mt-6 ">

                {images.length < 1 && (
                    <div onClick={() => picker(1)} className=" w-32 h-full bg-gray-200 flex justify-center items-center mr-4 cursor-pointer">
                        <FiCamera size={35} color="grey" />
                    </div>
                )}     
                {images.length > 0 && images.map((item, index) => (
                    <>
                        <div key={index.toString()} className=" w-32 h-full bg-gray-200 flex justify-center items-center mr-4 cursor-pointer">
                            <Image src={item} alt="img" width="100" height="100" className="object-contain" />
                        </div>
                    </>
                ))}    
                {images.length > 0 && images.length < 5 && (
                     <div onClick={() => picker(1)} className=" w-32 h-full bg-gray-200 flex justify-center items-center mr-4 cursor-pointer">
                        <FiCamera size={35} color="grey" />
                    </div>
                )}       
                
            </div>
        </div>

        <div className="flex h-auto flex-col mt-12">
            {profilePic === "" && (
                <div onClick={() => picker(2)} className="w-24 h-24 bg-gray-200 flex justify-center items-center mr-4 cursor-pointer rounded-full">
                    <FiCamera size={35} color="grey" />
                </div>
            )}
            {profilePic !== "" && (
                <div className="w-auto h-auto flex justify-start items-center mr-4 cursor-pointer rounded-full">
                    <Avatar onClick={() => picker(2)} src={profilePic} size="2xl" />
                </div>
            )}
            <p className="font-semibold text-sm text-gray-500 mt-4">Upload Profile Picture</p>
        </div>

        <div className="w-full flex xl:flex-row lg:flex-row md:flex-col sm:flex-col justify-between  mt-6 font-semibold text-sm text-gray-500">
            <div className="w-full">
                <label>Business Name</label>
                <div className="xl:w-11/12 lg:w-11/12 md:w-full sm:w-full">
                    <Input border="none" bgColor="whitesmoke" borderRadius={0} className="bg-gray-100 mt-3" name="business_name" value={formik.values.business_name} onChange={formik.handleChange} onFocus={() => formik.setFieldTouched('business_name', true, true)} />
                </div>
                {formik.touched.business_name && formik.errors.business_name && <p className="text-xs mt-1 Cerebri-sans-book text-red-400">{formik.errors.business_name}</p>}
            </div>
            <div className="w-full xl:mt-0 lg:mt-0 md:mt-2 sm:mt-2">
            
            </div>
        </div>

        <div className="w-full flex xl:flex-row lg:flex-row md:flex-col sm:flex-col justify-between mt-6 font-semibold text-sm text-gray-500">
            <div className="w-full">
                <label>Business description</label>
                <div className="w-full">
                    <Textarea  bgColor="whitesmoke" borderRadius={0} fontSize="xs" className="bg-gray-100 mt-3 w-full h-40 text-gray-500 font-semibold text-sm p-3" name="business_description" value={formik.values.business_description} onChange={formik.handleChange} onFocus={() => formik.setFieldTouched('business_description', true, true)}  />
                </div>
                {formik.touched.business_description && formik.errors.business_description && <p className="text-xs mt-1 Cerebri-sans-book text-red-400">{formik.errors.business_description}</p>}
            </div>
        </div>

        <div className="w-full flex xl:flex-row lg:flex-row md:flex-col sm:flex-col justify-between mt-6 font-semibold text-sm text-gray-500">

            <div className="w-full xl:mt-0 lg:mt-0 md:mt-2 sm:mt-2">
                <label>Services</label>
                <div className="xl:w-11/12 lg:w-11/12 md:w-full sm:w-full">
                    <Select border="none" bgColor="whitesmoke" borderRadius={0} className="bg-gray-100 mt-3" onChange={(e) => selectService(e.target.value)}>
                        {services.map((item, index) => (
                            <option key={index.toString()}>{item.name}</option>
                        ))}
                        {/* <option>Lagos</option> */}
                    </Select>
                </div>
            </div>

            <div className="w-full flex items-center ">
                {/* <p>Suggested: {services[0]} {services[1]}, {services[2]}</p> */}
            </div>
            
        </div>

        <div className="w-full flex flex-wrap mt-4">
            {selectedSerices.length > 0 && selectedSerices.map((item, index) => (
                        <div key={index.toString()} className="flex p-3 bg-green-100 text-green-600 text-sm Cerebri-sans-book mr-1">{item} <FiX size={20} color="green" className="ml-3 cursor-pointer" onClick={() => deleteService(index)} /> </div>
                    ))}
        </div>

        <p className="mt-6 font-semibold text-sm text-gray-500">Certification</p>

        {certificates.map((item, index) => (
            <>
                <div key={index.toString()} className="w-full flex xl:flex-row lg:flex-row md:flex-col sm:flex-col justify-between mt-6 font-semibold text-sm text-gray-500">
            <div className="w-full">
                <label>Certifcate</label>
                <div className="xl:w-11/12 lg:w-11/12 md:w-full sm:w-full">
                    <Input value={item.certificate} onChange={(e) => changeCert(index, 'certificate', e.target.value)} border="none" bgColor="whitesmoke" borderRadius={0} className="bg-gray-100 mt-3" />
                </div>
            </div>

            <div className="w-full xl:mt-0 lg:mt-0 md:mt-4 sm:mt-4">
                <label>Organisation</label>
                <div className="xl:w-11/12 lg:w-11/12 md:w-full sm:w-full">
                    <Input value={item.organization} onChange={(e) => changeCert(index, 'organization', e.target.value)} border="none" bgColor="whitesmoke" borderRadius={0} className="bg-gray-100 mt-3" />
                </div>  
            </div>

            <div className="w-full xl:mt-0 lg:mt-0 md:mt-4 sm:mt-4">
                <label>issued Year</label>
                <div className="xl:w-11/12 lg:w-11/12 md:w-full sm:w-full">
                    <Input value={item.year} onChange={(e) => changeCert(index, 'year', e.target.value)} type="date" border="none" bgColor="whitesmoke" borderRadius={0} className="bg-gray-100 mt-3" />
                </div>  
            </div>
        </div>
        
        <div className="w-full flex xl:flex-row lg:flex-row md:flex-col sm:flex-col justify-between mt-6 font-semibold text-sm text-gray-500">
            <div className="w-full">
                <label>Link</label>
                <div className="xl:w-11/12 lg:w-11/12 md:w-full sm:w-full">
                    <Input value={item.link} onChange={(e) => changeCert(index, 'link', e.target.value)}  border="none" bgColor="whitesmoke" borderRadius={0} className="bg-gray-100 mt-3" />
                </div>
            </div>

            <div className="w-full xl:mt-0 lg:mt-0 md:mt-4 sm:mt-4 flex items-center ">
                {certificates.length > 1 && (
                    <FiX size={25} color="red" className="mt-6 cursor-pointer" onClick={() => deleteCert(index)} />
                )}
            </div>

            <div className="w-full xl:mt-0 lg:mt-0 md:mt-4 sm:mt-4">
                
            </div>
        </div>
            </>
        ))}

        

        <p className="mt-6 Cerebri-sans-book text-md text-gray-500 cursor-pointer" onClick={() => addCerts()}>+ Add Another Certification</p>

        <div className="w-full flex justify-end mt-6">
            <button onClick={() => nextPage(3)} className="w-32 bg-themeGreen h-12 text-sm font-semibold text-white">Continue</button>
        </div>


    </div>
  );
}
