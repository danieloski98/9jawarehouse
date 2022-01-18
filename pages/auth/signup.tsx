import React from 'react';
import { InputGroup, InputLeftElement, InputRightElement, Input, Spinner, Image as Img } from '@chakra-ui/react'
import { FiMail, FiLock, FiEye, FiEyeOff, FiUser } from 'react-icons/fi'
import { useRouter } from 'next/router'

// form
import * as yup from 'yup';
import { useFormik } from 'formik'

// validationschema
const validationSchema = yup.object({
    email: yup.string().required().email(),
    username: yup.string().required().min(3, 'minimium of 3 characters'),
    password: yup.string().required().min(8)
})

// image
import Image from 'next/image';
import Girl from '../../public/images/girl2.png';
import Logo from '../../public/images/nlogo.png';
import { FiSearch, FiMenu } from 'react-icons/fi'
import url from '../../utils/url';

// components
// other components
const LeftNavbar = () => {
    return (
        <div className="w-full h-24 flex justify-between items-center px-5">
            <Img src="/images/nlogo.png" alt="logo" className=" w-20 h-16" />
            <div className=" xl:hidden lg:hidden md:flex sm:flex w-20 justify-between items-center">
                <FiSearch size={25} color="grey" />
                <FiMenu size={25} color="grey" />
            </div>
        </div>
    )
}

export default function Signup() {
    const [show, setShow] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const router = useRouter();

    // formik
    const formik = useFormik({
        initialValues: {
            email: '',
            username: '',
            password: '',
        },
        validationSchema,
        onSubmit: () => {},
    });

    const submit = async() => {
        if (!formik.isValid) {
            alert('Please fillin the form correctly');
            return;
        }
        if (!formik.dirty) {
            alert('Please filling the form to continue');
            return;
        }

        // create the object
        setLoading(true);

        const obj = {
            ...formik.values,
            passwordless: false,
        }

        // make request
        const request = await fetch(`${url}auth/register`, {
            method: 'post',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(obj)
        });

        const json = await request.json();

        setLoading(false);

        if (json.statusCode !== 200) {
            alert(json.errorMessage);
        }else {
            router.push(`/auth/verify/${json.data._id}`)
        }
    }
    

  return (
    <div className="w-full h-screen flex">

        <div className="flex-1 flex flex-col">
            <LeftNavbar />
            <div className="flex-1 xl:pl-10 lg:pl-10 md:pl-5 sm:pl-5 xl:pr-0 lg:pr-0 md:pr-5 sm:pr-5 flex flex-col justify-center items-center">

                <div className="flex flex-col xl:w-4/6 lg:w-4/6 md:w-full sm:w-full">
                    <h3 className="text-3xl font-Circular-std-medium text-gray-700">Create An Account</h3>
                    <p className="text-sm font-Cerebri-sans-book mt-4 text-gray-500">You are one step away from joining 9ja warehouse</p>
                </div>

                <div className="flex flex-col xl:w-4/6 lg:w-4/6 md:w-full sm:w-full mt-6">
                    <label className="font-Cerebri-sans-book text-sm">Email</label>
                    <InputGroup  className="mt-2" size="lg">
                        <InputLeftElement>
                            <FiMail size={25} color="gray" />
                        </InputLeftElement>
                        <Input type="text" bgColor="#F1EEEE" name="email" className="font-Cerebri-sans-book" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    </InputGroup>
                    {formik.touched.email && formik.errors.email && (
                            <p className="mt-1 text-sm text-red-400 font-Cerebri-sans-book">{formik.errors.email}</p>
                    )}
                </div>

                <div className="flex flex-col xl:w-4/6 lg:w-4/6 md:w-full sm:w-full mt-6">
                    <label className="font-Cerebri-sans-book text-sm">Username</label>
                    <InputGroup bgColor="#F1EEEE" className="mt-2" size="lg">
                        <InputLeftElement>
                            <FiUser size={25} color="gray" />
                        </InputLeftElement>
                        <Input type="text" name="username" className="font-Cerebri-sans-book" value={formik.values.username} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    </InputGroup>
                    {formik.touched.username && formik.errors.username && (
                            <p className="mt-1 text-sm text-red-400 font-Cerebri-sans-book">{formik.errors.username}</p>
                    )}
                </div>

                <div className="flex flex-col xl:w-4/6 lg:w-4/6 md:w-full sm:w-full mt-6">
                    <label className="font-Cerebri-sans-book text-sm">Password</label>
                    <InputGroup bgColor="#F1EEEE" className="mt-2" size="lg">
                        <InputLeftElement>
                            <FiLock size={25} color="gray" />
                        </InputLeftElement>
                        <Input type={show ? 'text':'password'}  name="password" className="font-Cerebri-sans-book" onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        <InputRightElement>
                            {!show && <FiEye size={25} color="gray" onClick={() => setShow(true)} />}
                            {show && <FiEyeOff size={25} color="gray" onClick={() => setShow(false)} />}
                        </InputRightElement>
                    </InputGroup>
                    {formik.touched.password && formik.errors.password && (
                            <p className="mt-1 text-sm text-red-400 font-Cerebri-sans-book">{formik.errors.password}</p>
                    )}
                </div>

                <button disabled={loading}  onClick={submit} className="xl:w-4/6 lg:w-4/6 md:w-full sm:w-full mt-8 h-12 bg-themeGreen cursor-pointer flex justify-center items-center">
                    {loading && <Spinner color="white" />}
                    {!loading && <span className="ml-4 text-sm font-Cerebri-sans-book text-white">Create Account</span>}
                </button>

                <div className="xl:w-4/6 lg:w-4/6 md:w-full sm:w-full text-center">
                    <p onClick={() => router.push('/auth/loginform')} className="text-sm font-Cerebri-sans-book mt-12 text-center text-gray-500 cursor-pointer">Already have an account? <span className="text-themeGreen">Log in</span></p>
                </div>

            </div>
        </div>

        <div className="w-2/5 h-full xl:block lg:block md:hidden sm:hidden">
            <Image src={Girl} alt="girl" className="w-full h-full" />
            <div className="z-20 absolute flex flex-col top-96 pt-24 px-8 bottom-0 ">
                <p className='font-Circular-std-medium text-2xl text-white'>Join 9ja Warehouse!</p>
                <p className='mt-4 font-Cerebri-sans-book text-sm  text-white'> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Bibendum est ultricies integer quis. Iaculis urna id volutpat lacus laoreet. Mauris vitae ultricies leo integer malesuada. Ac odio tempor orci dapibus ultrices in. Egestas diam in arcu cursus euismod. Dictum fusce ut placerat orci nulla.</p>
            </div>
        </div>
    </div>
  );
}
