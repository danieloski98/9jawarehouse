import React from 'react';
import { InputGroup, InputLeftElement, InputRightElement, Input, Spinner, Image as Img, useToast } from '@chakra-ui/react'
import { FiMail, FiLock, FiEye, FiEyeOff, FiUser } from 'react-icons/fi'
import { useRouter } from 'next/router'

// redux
import { RootState } from '../../store/index'
import { useSelector, useDispatch } from 'react-redux'
import { updateUser } from '../../reducers/User.reducer';
import { updatetoken } from '../../reducers/Token.reducer';
import { login } from '../../reducers/logged';

import * as yup from 'yup'
import { useFormik } from 'formik'
import Link from 'next/link'

const validationSchema = yup.object({
    email: yup.string().required().email(),
    password: yup.string().required(),
})

// image
import Image from 'next/image';
import Girl from '../../public/images/bg.png';
import Logo from '../../public/images/nlogo.png';
import Google from '../../public/images/google.svg';
import Mail from '../../public/images/mail.png';
import { FiSearch, FiMenu } from 'react-icons/fi'
import url from '../../utils/url';
import { IServerReturnObject } from '../../utils/types/serverreturntype';

// components
// other components
const LeftNavbar = () => {
    return (
        <div className="w-full h-24 flex justify-between items-center px-5">
            <Link href="/" passHref>
                <Img src="/images/nlogo.png" alt="logo" className=" w-20 h-16 cursor-pointer" />
            </Link>
            
            <div className=" xl:hidden lg:hidden md:flex sm:flex w-20 justify-between items-center">
                {/* <FiSearch size={25} color="grey" />
                <FiMenu size={25} color="grey" /> */}
            </div>
        </div>
    )
}

export default function LoginForm() {
    const [show, setShow] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const dispatch = useDispatch();
    const router = useRouter();
    const toast = useToast();

    const formik = useFormik({
        initialValues: {email: '', password: ''},
        validationSchema,
        onSubmit: () => {},
    });

    const submit = async() => {
        try {
            if (!formik.dirty) {
                toast({
                    title: 'Warning',
                    description: 'Please fill in the form to continue',
                    status: 'warning',
                    position: 'top',
                    duration: 4000
                });
                return;
            }

            if (!formik.isValid) {
                toast({
                    title: 'Warning',
                    description: 'Please fill in the form correctly',
                    status: 'warning',
                    position: 'top',
                    duration: 4000
                });
                return;
            }

            setLoading(true);
            const request = await fetch(`${url}auth/login`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(formik.values)
            })

            const json = await request.json() as IServerReturnObject;
            setLoading(false);
            console.log(json.data);

            if (json.statusCode !== 200) {
                toast({
                    title: 'Error',
                    description: json.errorMessage,
                    status: 'error',
                    position: 'top',
                    duration: 4000
                });
                return;
            } else if (json.statusCode === 200) {
                if (json.data.user.blocked) {
                    // save to localstorage
                    const save = localStorage.setItem('9jauser', JSON.stringify(json.data.user));
                    const token = localStorage.setItem('9jatoken', json.data.token);
                    dispatch(updateUser(json.data.user))
                    dispatch(updatetoken(json.data.token));
                    router.push(`/underreview?id=${json.data.user._id}`);
                    return;
                }
                if (!json.data.user.pin) {
                    // save to localstorage
                    const save = localStorage.setItem('9jauser', JSON.stringify(json.data.user));
                    const token = localStorage.setItem('9jatoken', json.data.token);

                    dispatch(updateUser(json.data.user))
                    dispatch(updatetoken(json.data.token));
                    dispatch(login());
                    router.push(`/registration/${json.data.user._id}`);
                    return;
                }
                // alert(json.successMessage);
                
                // save to localstorage
                const save = localStorage.setItem('9jauser', JSON.stringify(json.data.user));
                const token = localStorage.setItem('9jatoken', json.data.token);

                dispatch(updateUser(json.data.user))
                dispatch(updatetoken(json.data.token));
                dispatch(login());
                router.push('/dashboard')
                return;
            }
        } catch (error) {
            alert('Internal Server error');
        }
    }

  return (
    <div className="w-full h-screen flex">

        <div className="flex-1 flex flex-col">
            <LeftNavbar />
            <div className="flex-1 xl:pl-10 lg:pl-10 md:pl-5 sm:pl-5 xl:pr-0 lg:pr-0 md:pr-5 sm:pr-5 flex flex-col justify-center items-center">
                

                <div className="flex flex-col xl:w-4/6 lg:w-4/6 md:w-full sm:w-full">
                    <h3 className="text-3xl font-Circular-std-medium text-gray-700">Login In an existing account</h3>
                    <p className="text-sm font-Cerebri-sans-book mt-4 text-gray-500">Welcome back!</p>
                </div>

                <div className="flex flex-col xl:w-4/6 lg:w-4/6 md:w-full sm:w-full mt-6">
                    <label className="font-Cerebri-sans-book text-sm">Email</label>
                    <InputGroup bgColor="#F1EEEE" className="mt-2" size="lg">
                        <InputLeftElement>
                            <FiMail size={25} color="gray" />
                        </InputLeftElement>
                        <Input name="email" fontSize="sm" className="font-Cerebri-sans-book" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    </InputGroup>
                    {formik.touched.email && formik.errors.email && (
                        <p className="text-red-500 font-Cerebri-sans-book text-xs mt-1">{formik.errors.email}</p>
                    )}
                </div>

                <div className="flex flex-col xl:w-4/6 lg:w-4/6 md:w-full sm:w-full mt-6">
                    <label className="font-light text-sm">Password</label>
                    <InputGroup bgColor="#F1EEEE" className="mt-2" size="lg">
                        <InputLeftElement>
                            <FiLock size={25} color="gray" />
                        </InputLeftElement>
                        <Input type={show ? 'text':'password'} fontSize="sm" className="font-Cerebri-sans-book" name="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        <InputRightElement>
                            {!show && <FiEye size={25} color="gray" onClick={() => setShow(true)} />}
                            {show && <FiEyeOff size={25} color="gray" onClick={() => setShow(false)} />}
                        </InputRightElement>
                    </InputGroup>
                    {formik.touched.password && formik.errors.password && (
                        <p className="text-red-500 font-Cerebri-sans-book text-xs mt-1">{formik.errors.password}</p>
                    )}
                </div>

                <p onClick={() => router.push('/auth/forgotpassword')} className='font-semibold text-sm my-5 cursor-pointer text-themeGreen'>Forgot your password ?</p>

                <div onClick={submit} className="xl:w-4/6 lg:w-4/6 md:w-full sm:w-full mt-2 h-12 bg-themeGreen cursor-pointer flex justify-center items-center">
                    {!loading && <span className="ml-4 text-sm font-Cerebri-sans-book text-white">Login</span>}
                    {loading && <Spinner color="white" size="sm" />}
                </div>

                <div className="xl:w-4/6 lg:w-4/6 md:w-full sm:w-full text-center">
                    <p onClick={() => router.push('/auth/signup')} className="text-sm font-Cerebri-sans-book mt-12 text-center text-gray-500 cursor-pointer">Dont Have An Account? <span className="text-themeGreen cursor-pointer">Create Account</span></p>
                </div>

            </div>
        </div>

        <div className="w-2/5 h-full  xl:block lg:block md:hidden sm:hidden">
            <Img src="/images/bg.png" alt="girl" className="w-full h-full object-cover" />
            <div className="z-20 absolute flex flex-col top-96 pt-24 px-8 bottom-0 ">
                <p className='font-Circular-std-medium text-2xl text-white'>Join 9ja Warehouse!</p>
                <p className='mt-4 font-Cerebri-sans-book text-sm  text-white'> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Bibendum est ultricies integer quis. Iaculis urna id volutpat lacus laoreet. Mauris vitae ultricies leo integer malesuada. Ac odio tempor orci dapibus ultrices in. Egestas diam in arcu cursus euismod. Dictum fusce ut placerat orci nulla.</p>
            </div>
        </div>
        
    </div>
  );
}
