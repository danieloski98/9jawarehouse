import React from 'react';
import { InputGroup, InputLeftElement, InputRightElement, Input, Spinner } from '@chakra-ui/react'
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

const validationSchema = yup.object({
    email: yup.string().required().email(),
    password: yup.string().required(),
})

// image
import Image from 'next/image';
import Girl from '../../public/images/girl2.png';
import Logo from '../../public/images/logo.svg';
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
            <Image src={Logo} alt="logo" className=" w-20 h-20" />
            <div className=" xl:hidden lg:hidden md:flex sm:flex w-20 justify-between items-center">
                <FiSearch size={25} color="grey" />
                <FiMenu size={25} color="grey" />
            </div>
        </div>
    )
}

export default function LoginForm() {
    const [show, setShow] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const dispatch = useDispatch();
    const router = useRouter();

    const formik = useFormik({
        initialValues: {email: '', password: ''},
        validationSchema,
        onSubmit: () => {},
    });

    const submit = async() => {
        try {
            if (!formik.dirty) {
                alert('Please fill in the form to continue');
                return;
            }

            if (!formik.isValid) {
                alert('Please fill in the form correctly');
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
                alert(json.errorMessage);
                return;
            } else if (json.statusCode === 200) {
                alert(json.successMessage);
                
                // save to localstorage
                const save = localStorage.setItem('9jauser', JSON.stringify(json.data.user));
                const token = localStorage.setItem('9jatoken', json.data.token);

                dispatch(updateUser(json.data.user))
                dispatch(updatetoken(json.data.token));
                dispatch(login());
                setTimeout(() => {
                    router.push('/dashboard')
                }, 3000)
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
            <div className="flex-1 xl:pl-10 lg:pl-10 md:pl-5 sm:pl-5 xl:pr-0 lg:pr-0 md:pr-5 sm:pr-5 flex flex-col justify-center items-start">
                <h3 className="text-3xl font-semibold text-gray-700">Login In an existing account</h3>
                <p className="text-sm font-light mt-4 text-gray-500">Welcome back!</p>

                <div className="flex flex-col xl:w-4/6 lg:w-4/6 md:w-full sm:w-full mt-6">
                    <label className="font-light text-sm">Email</label>
                    <InputGroup bgColor="#F1EEEE" className="mt-2" size="lg">
                        <InputLeftElement>
                            <FiMail size={25} color="gray" />
                        </InputLeftElement>
                        <Input name="email" fontSize="sm" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    </InputGroup>
                    {formik.touched.email && formik.errors.email && (
                        <p className="text-red-500 font-semibold text-xs mt-1">{formik.errors.email}</p>
                    )}
                </div>

                <div className="flex flex-col xl:w-4/6 lg:w-4/6 md:w-full sm:w-full mt-6">
                    <label className="font-light text-sm">Password</label>
                    <InputGroup bgColor="#F1EEEE" className="mt-2" size="lg">
                        <InputLeftElement>
                            <FiLock size={25} color="gray" />
                        </InputLeftElement>
                        <Input type={show ? 'text':'password'} fontSize="sm" name="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        <InputRightElement>
                            {!show && <FiEye size={25} color="gray" onClick={() => setShow(true)} />}
                            {show && <FiEyeOff size={25} color="gray" onClick={() => setShow(false)} />}
                        </InputRightElement>
                    </InputGroup>
                    {formik.touched.password && formik.errors.password && (
                        <p className="text-red-500 font-semibold text-xs mt-1">{formik.errors.password}</p>
                    )}
                </div>

                <div onClick={submit} className="xl:w-4/6 lg:w-4/6 md:w-full sm:w-full mt-8 h-12 bg-themeGreen cursor-pointer flex justify-center items-center">
                    {!loading && <span className="ml-4 text-sm font-semibold text-white">Login</span>}
                    {loading && <Spinner color="white" size="sm" />}
                </div>

                <div className="xl:w-4/6 lg:w-4/6 md:w-full sm:w-full text-center">
                    <p onClick={() => router.push('/auth/createaccount')} className="text-sm font-light mt-12 text-center text-gray-500">Dont Have An Account? <span className="text-themeGreen">Create Account</span></p>
                </div>

            </div>
        </div>

        <div className="w-2/5 h-full xl:block lg:block md:hidden sm:hidden">
            <Image src={Girl} alt="girl" className="w-full h-full" />
        </div>
        
    </div>
  );
}
