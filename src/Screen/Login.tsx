import React, {useCallback, useState} from 'react'
import logo from '../assets/images/logo.png' 
import {InputGroup, InputRightElement, Input, useToast, Spinner} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import SideImage from '../components/SideImage';

import {useFormik} from 'formik';
import * as yup from 'yup';
import { url } from '../utils/url';
import { IReturnObject } from '../types/ServerReturnType';
import { useRecoilState } from 'recoil';
import { AdminState } from '../states/AdminState';
import { TokenState } from '../types/Token.Type';
import { theme } from '../utils/theme';

const validationSchema = yup.object({
    email: yup.string().email('Invalid email').required('This field is required'),
    password: yup.string().required('This field is required'),
});

export default function Login() {
    const [loading, setLoading] = useState(false);

    // recoil states
    const [admin, setAdmin] = useRecoilState(AdminState);
    const [token, setToken] = useRecoilState(TokenState);

    const toast = useToast();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {email: '', password: ''},
        validationSchema,
        onSubmit: async () => {
           

        },
    });
    
    const submit = async() => {
         // validate fields
         if (!formik.dirty) {
            toast({
                title: 'Warning',
                description: 'Please fillin the form to continue',
                status: 'warning',
                duration: 3000,
            });
            return;
        }
        if (!formik.isValid) {
            toast({
                title: 'Error',
                description: 'Please fillin the form to correctly',
                status: 'error',
                duration: 3000,
                position: 'top',
            });
            return;
        }
        setLoading(true);
        // make request
        const request = await fetch(`${url}/admin/login`, {
            method: 'post',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(formik.values),
        });

        setLoading(false);
        const json = await request.json() as IReturnObject;

        if (json.statusCode !== 200) {
            toast({
                title: 'Error',
                description: json.errorMessage,
                status: 'error',
                duration: 3000,
                position: 'top',
            });
            return;
        } else {
            toast({
                title: 'Success',
                description: json.successMessage,
                status: 'success',
                duration: 3000,
                position: 'top',
            });
            localStorage.setItem('id', json.data.admin._id);
            localStorage.setItem('loggedIn', 'true');
            setAdmin(json.data.admin);
            setToken(json.data.token);
            // save details in localStorage;
            navigate('dashboard')
            return;
        }
    }

    return (
        <div className='w-full flex bg-white flex-row h-screen'> 
            <SideImage />
            <div className='w-full h-screen justify-center relative items-center px-10 flex flex-col'>
                
                <img style={{width: '70px', height:'70px'}} className='absolute top-8 right-16' alt='logo' src={logo} />

                <div style={{width: '500px'}} >
                    <p className='text-lg font-Graphik-Bold'>Login</p>
                    <p className='text-base font-Graphik-Regular mt-4 mb-6'>Manage 9Jawarehouse SEAMLESSLY</p> 
                    <div className='my-4 pt-4 w-full' >
                        <p className='text-sm mb-1 font-Graphik-Medium '>Email Address</p> 
                        <Input size='lg' placeholder="Email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} onFocus={() => formik.setFieldTouched('email', true, true)} />
                        {formik.touched.email && formik.errors.email && (
                            <p className='text-xs mt-2 text-red-300'>{formik.errors.email}</p>
                        )}
                    </div> 
                    <div className='my-4 pt-2 w-full' >
                        <p className='text-sm mb-1 font-Graphik-Medium '>Password</p>  
                        <InputGroup >
                            <InputRightElement 
                            children={
                                <svg className='mr-4 mt-1 cursor-pointer' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.3747 2.00024C14.6307 2.00024 16.6447 3.43324 17.3837 5.56724C17.5197 5.95824 17.3117 6.38524 16.9197 6.52124C16.5287 6.65824 16.1017 6.44924 15.9657 6.05724C15.4367 4.52824 13.9917 3.50024 12.3717 3.50024H12.3577C10.2657 3.50024 8.5617 5.19424 8.5527 7.28424L8.552 8.62625L16.184 8.62695C18.688 8.62695 20.726 10.6649 20.726 13.1699V17.4579C20.726 19.9629 18.688 22.0009 16.184 22.0009H8.542C6.037 22.0009 4 19.9629 4 17.4579V13.1699C4 11.1866 5.277 9.49593 7.05221 8.87786L7.0527 7.30124C7.0657 4.36324 9.4417 2.00024 12.3547 2.00024H12.3747ZM16.184 10.1269H8.542C6.864 10.1269 5.5 11.4919 5.5 13.1699V17.4579C5.5 19.1359 6.864 20.5009 8.542 20.5009H16.184C17.861 20.5009 19.226 19.1359 19.226 17.4579V13.1699C19.226 11.4919 17.861 10.1269 16.184 10.1269ZM12.3633 13.4527C12.7773 13.4527 13.1133 13.7887 13.1133 14.2027V16.4247C13.1133 16.8387 12.7773 17.1747 12.3633 17.1747C11.9493 17.1747 11.6133 16.8387 11.6133 16.4247V14.2027C11.6133 13.7887 11.9493 13.4527 12.3633 13.4527Z" fill="#727272"/>
                                </svg>
                            }
                            />
                            <Input size='lg' type="password" placeholder="Password" name="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} onFocus={() => formik.setFieldTouched('password', true, true)} /> 
                        </InputGroup>
                        {formik.touched.password && formik.errors.password && (
                            <p className='text-xs mt-2 text-red-300'>{formik.errors.password}</p>
                        )}
                    </div>   
                        <p onClick={()=> navigate('/resetpassword')} className='text-base cursor-pointer my-2 text-right font-Graphik-Regular '>Forgot Password?</p> 
                    <button onClick={()=> submit()} style={{ width: '166px' ,backgroundColor:'#1A8F85'}} className='text-base text-white  rounded  py-3 font-Graphik-SemiBold'>
                        {!loading && (<span>Log In</span>)}
                        {loading && <Spinner size="sm" color="white" />}
                    </button>
                </div>
            </div>
        </div>
    )
}
