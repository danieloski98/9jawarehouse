import React from 'react';
import { Input, InputGroup, InputLeftElement, Select, Spinner } from '@chakra-ui/react'
import { FiChevronLeft, FiCamera, FiX } from 'react-icons/fi'
import { useRouter } from 'next/router'
import { FormikProps } from 'formik';
// require('dotenv').config();

interface IProps {
    next: Function;
    submit: Function;
    loading: boolean;
    formik: FormikProps<{
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        address: '',
        country: '',
        state: '',
        business_name: '',
        description: '',
        instagram: '',
        facebook: '',
        whatsapp: '',
        twitter: '',
        website: '',
        lga: ''
    }>;
}

export default function SocialMediaInfo({ next, formik, submit, loading }: IProps) {

const router = useRouter();
    

const sub = () => {
    submit()
}

  return (
    <div className="w-full h-auto flex flex-col">
        <div className="flex items-center h-auto">
            <FiChevronLeft size={30} color="grey" className='cursor-pointer' onClick={() => next(2)} />
            <p className="text-2xl Cerebri-sans-book text-gray-600 ml-4">Connect Social Media account</p>
        </div>
        <p className="text-sm font-semibold text-gray-500 mt-4">
        Link your profile to your social media, portfolio or website 
        </p>

        {/* start */}

        <div className="w-full flex xl:flex-row lg:flex-row md:flex-col sm:flex-col justify-between  mt-6 font-semibold text-sm text-gray-500">
            <div className="w-full">
                <label>Instagram</label>
                <div className="xl:w-11/12 lg:w-11/12 md:w-full sm:w-full">
                    <Input border="none" bgColor="whitesmoke" borderRadius={0} className="bg-gray-100 mt-3" name="instagram" value={formik.values.instagram} onChange={formik.handleChange} onFocus={() => formik.setFieldTouched('instagram', true, true)} />
                </div>
                {formik.touched.instagram && formik.errors.instagram && <p className="text-xs mt-1 Cerebri-sans-book text-red-400">{formik.errors.instagram}</p>}
            </div>
            <div className="w-full xl:mt-0 lg:mt-0 md:mt-2 sm:mt-2">
               
            </div>
        </div>

        <div className="w-full flex xl:flex-row lg:flex-row md:flex-col sm:flex-col justify-between mt-6 font-semibold text-sm text-gray-500">
            <div className="w-full">
                <label>Twitter</label>
                <div className="xl:w-11/12 lg:w-11/12 md:w-full sm:w-full">
                    <Input border="none" bgColor="whitesmoke" borderRadius={0} className="bg-gray-100 mt-3" name="twitter" value={formik.values.twitter} onChange={formik.handleChange} onFocus={() => formik.setFieldTouched('twitter', true, true)} />
                </div>
                {formik.touched.twitter && formik.errors.twitter && <p className="text-xs mt-1 Cerebri-sans-book text-red-400">{formik.errors.twitter}</p>}
            </div>
            <div className="w-full xl:mt-0 lg:mt-0 md:mt-2 sm:mt-2">
                
            </div>
        </div>

        <div className="w-full flex xl:flex-row lg:flex-row md:flex-col sm:flex-col justify-between mt-6 font-semibold text-sm text-gray-500">
            <div className="w-full">
                <label>Facebook</label>
                <div className="xl:w-11/12 lg:w-11/12 md:w-full sm:w-full">
                    <Input border="none" bgColor="whitesmoke" borderRadius={0} className="bg-gray-100 mt-3" name="facebook" value={formik.values.facebook} onChange={formik.handleChange} onFocus={() => formik.setFieldTouched('facebook', true, true)} />
                </div>
                {formik.touched.facebook && formik.errors.facebook && <p className="text-xs mt-1 Cerebri-sans-book text-red-400">{formik.errors.facebook}</p>}
            </div>
            <div className="w-full xl:mt-0 lg:mt-0 md:mt-2 sm:mt-2">
                
            </div>
        </div>

        <div className="w-full flex xl:flex-row lg:flex-row md:flex-col sm:flex-col justify-between mt-6 font-semibold text-sm text-gray-500">
            <div className="w-full">
                <label>Website</label>
                <div className="xl:w-11/12 lg:w-11/12 md:w-full sm:w-full">
                    <Input border="none" bgColor="whitesmoke" borderRadius={0} className="bg-gray-100 mt-3" name="website" value={formik.values.website} onChange={formik.handleChange} onFocus={() => formik.setFieldTouched('website', true, true)} />
                </div>
                {formik.touched.website && formik.errors.website && <p className="text-xs mt-1 Cerebri-sans-book text-red-400">{formik.errors.website}</p>}
            </div>

            <div className="w-full">
                
            </div>
        </div>

        <div className="w-full flex xl:flex-row lg:flex-row md:flex-col sm:flex-col justify-between mt-6 font-semibold text-sm text-gray-500">
            <div className="w-full">
                <label>whatsapp</label>
                <div className="xl:w-11/12 lg:w-11/12 md:w-full sm:w-full">
                    <Input border="none" bgColor="whitesmoke" borderRadius={0} className="bg-gray-100 mt-3" name="whatsapp" value={formik.values.whatsapp} onChange={formik.handleChange} onFocus={() => formik.setFieldTouched('whatsapp', true, true)} />
                </div>
                {formik.touched.whatsapp && formik.errors.whatsapp && <p className="text-xs mt-1 Cerebri-sans-book text-red-400">{formik.errors.whatsapp}</p>}
            </div>

            <div className="w-full">
                
            </div>
        </div>

        <div className="w-full flex justify-end mt-6">
            <button onClick={() => submit()} className="w-32 bg-themeGreen h-12 text-sm font-semibold text-white">
                {!loading && (
                    <span>Save</span>
                )}
                {loading && (
                    <Spinner color="white" size="md" />
                )}
            </button>
        </div>


    </div>
  );
}
