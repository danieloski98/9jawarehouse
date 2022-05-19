import React from 'react';
import Navbar from '../components/general/Navbar';
import ServiceNavbar from '../components/services/ServiceNav';
import { InputGroup, InputLeftElement, InputRightElement, Input, Spinner } from '@chakra-ui/react'
import { FiSearch, FiMenu } from 'react-icons/fi'
import { FiMail, FiLock, FiEye, FiEyeOff, FiUser } from 'react-icons/fi'
import { FaFacebookF } from 'react-icons/fa'
import Footer from '../components/Home/Footer';
import NormNavbar from '../components/general/NorNavbar';
import * as yup from 'yup';
import { useFormik } from 'formik'

const validationSchema = yup.object({
    email: yup.string().email().required('Email is Required'),
    fullname: yup.string().required('Full Name is required'),
    message: yup.string().required('This Field is required'),
});

import { FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa'
import url from '../utils/url';
import { IServerReturnObject } from '../utils/types/serverreturntype';

export default function ContactUs() {
    const [loading, setLoading] = React.useState(false);
    const formik = useFormik({
        initialValues: {
            email: '',
            fullname: '',
            message: ''
        },
        validationSchema,
        onSubmit: () => {}
    })

    const submit = async () => {
        if(!formik.isValid) {
            alert('please fill in the form properly');
            return;
        }
        setLoading(true);
        const request = await fetch(`${url}messages`, {
            method: 'post',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(formik.values)
        });
        const json = await request.json() as IServerReturnObject;
        formik.resetForm();
        setLoading(false);
        if (json.statusCode !== 200) {
            alert(json.errorMessage);
            return;
        } else {
            alert(json.successMessage);
            return;
        }
    }
  return (
    <div className="w-full xl:h-screen lg:h-screen md:h-auto sm:h-auto flex flex-col">

        <NormNavbar />

        <div className="flex-1 xl:px-24 lg:px-24 md:px-10 sm:px-10 flex xl:flex-row lg:flex-row md:flex-col sm:flex-col pt-24 pb-10">

            <div className="flex-1 xl:w-full lg:w-full md:w-full sm:w-full mr-10 flex ">
                <div className="xl:w-4/5 lg:w-4/5 md:w-full sm:w-full h-full ">
                    <p className="text-3xl text-themeGreen font-Circular-std-medium">Contact Us</p>
                    <p className="text-sm font-Cerebri-sans-book mt-3 text-gray-500"> Use the below prompt to contact us and we will respond to you within 24 hours.</p>

                    <div className="flex flex-col xl:w-full lg:w-full md:w-full sm:w-full mt-6">
                        <label className="font-Cerebri-sans-book text-sm">Email</label>
                        <InputGroup bgColor="#F1EEEE" className="mt-2" size="lg">
                            <InputLeftElement>
                                <FiMail size={25} color="gray" />
                            </InputLeftElement>
                            <Input fontSize="xs" bgColor="#F1EEEE" className="font-Cerebri-sans-book" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} onFocus={() => formik.setFieldTouched('email', true, true)} />
                        </InputGroup>
                        {
                            formik.touched.email && formik.errors.email && (
                                <p className="text-xs text-red-500 font-Cerebri-sans-book">{formik.errors.email}</p>
                            )
                        }
                    </div>

                    <div className="flex flex-col xl:w-full lg:w-full md:w-full sm:w-full mt-6">
                        <label className="font-Cerebri-sans-book text-sm">Full Name</label>
                        <InputGroup bgColor="#F1EEEE" className="mt-2" size="lg">
                            <InputLeftElement>
                                <FiUser size={25} color="gray" />
                            </InputLeftElement>
                            <Input fontSize="xs" bgColor="#F1EEEE" className="font-Cerebri-sans-book" name="fullname" value={formik.values.fullname} onChange={formik.handleChange} onBlur={formik.handleBlur} onFocus={() => formik.setFieldTouched('fullname', true, true)} />
                        </InputGroup>
                        {
                            formik.touched.fullname && formik.errors.fullname && (
                                <p className="text-xs text-red-500 font-Cerebri-sans-book">{formik.errors.fullname}</p>
                            )
                        }
                    </div>

                    <div className="flex flex-col xl:w-full lg:w-full md:w-full sm:w-full mt-6">
                        <label className="font-Cerebri-sans-book text-sm">Message</label>
                        <textarea className="w-full h-24 p-4 bg-gray-100 font-Cerebri-sans-book" name="message" value={formik.values.message} onChange={formik.handleChange} onBlur={formik.handleBlur} onFocus={() => formik.setFieldTouched('email', true, true)}></textarea>
                        {
                            formik.touched.message && formik.errors.message && (
                                <p className="text-xs text-red-500 font-Cerebri-sans-book">{formik.errors.message}</p>
                            )
                        }
                    </div>

                    <button onClick={submit} className="mt-5 w-full h-12 bg-themeGreen text-white text-sm font-Cerebri-sans-book">
                        {loading && (<Spinner size="md" color="white" />)}
                        {!loading && (<span>Send Message</span>)}
                    </button>

                </div>
            </div>

            <div className=" flex-1 xl:w-72 lg:w-72 md:w-full sm:w-full xl:h-96 lg:h-96 md:h-auto sm:h-auto xl:mt-0 lg:mt-0 md:mb-6 sm:mb-6 md:mt-6 sm:mt-6 flex flex-col xl:justify-center lg:justify-center">
                <div className="flex flex-col">
                    <p className="text-md font-Cerebri-sans-book">Phone</p>
                    <p className="mt-0 font-Cerebri-sans-book text-themeGreen">+447763417061 (WhatsApp Only)</p>
                </div>

                <div className="flex flex-col mt-5">
                    <p className="text-md font-Cerebri-sans-book">Email</p>
                    <p className="mt-0 font-Cerebri-sans-book text-themeGreen">support@9jawarehouse.com</p>
                </div>

                <div className="w-full flex mt-6">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex justify-center items-center mr-6 cursor-pointer">
                        <a href="https://www.twitter.com/9ja_warehouse"  target="_blank" rel="noreferrer">
                            <FaTwitter size={20} className='text-themeGreen ' />
                        </a>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gray-100  flex justify-center items-center mr-6 cursor-pointer">
                        <a href="https://www.instagram.com/9ja_warehouse"  target="_blank" rel="noreferrer">
                            <FaInstagram size={20} className='text-themeGreen ' />
                        </a>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gray-100  flex justify-center items-center mr-6 cursor-pointer">
                        <a href="https://web.facebook.com/9ja-Warehouse-112164614644154" target="_blank" rel="noreferrer">
                            <FaFacebookF size={20} className='text-themeGreen ' />
                        </a>
                    </div>
                </div>
            </div>

        </div>
        <div className="w-full">
        <Footer />
        </div>
    </div>
  );
}
