import { Checkbox, Input, InputGroup, InputRightElement, Select, Spinner, useToast } from '@chakra-ui/react'
import React from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import {FiUser} from 'react-icons/fi'
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { AdminState } from '../../states/AdminState';
import * as yup from 'yup';
import {useFormik} from 'formik';
import { url } from '../../utils/url';
import { IReturnObject } from '../../types/ServerReturnType';

const validationSchema = yup.object({
    email: yup.string().email('Invalid email').required('This field is required'),
    password: yup.string().required('This field is required'),
    fullname: yup.string().required('Fullname is required'),
});

export default function AddNewRole() {
    // recoild state
    const [admin, setAdmin] = useRecoilState(AdminState);
    // react state
    const [picture, setPicture] = React.useState(admin.picture);
    const [permissions, setPermissions] = React.useState([] as Array<string>);
    const [type, setType] = React.useState(3);
    const [vendors, setVendors] = React.useState(false);
    const [subs, setSubs] = React.useState(false);
    const [cat, setCat] = React.useState(false);
    const [re, setRe] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    // ref

    const toast = useToast();

    React.useEffect(() => {
        setPermissions(permissions);
        console.log(permissions);
        setVendors(permissions.includes('VENDOR'));
        setSubs(permissions.includes('SUBSCRIPTION'));
        setCat(permissions.includes('CATEGORY'));
        setRe(permissions.includes('REVIEW'));
    }, [permissions])


    const navigate = useNavigate(); 

    const formik = useFormik({
        initialValues: {email: '', password: '', fullname: ''},
        validationSchema,
        onSubmit: async () => {},
    });

    const check = (value: string) => {
        if (permissions.includes(value)) {
            // remove it from permissions list
            const pp = [...permissions];
            const index = pp.indexOf(value);
            pp.splice(index, 1);
            setPermissions(pp);
            return;
        }
        if (!permissions.includes(value)) {
            const pp = [...permissions, value];
            setPermissions(pp);
        }
    }

    const submit = async () => {
        if (!formik.dirty) {
            toast({
                title: 'Error',
                description: 'please fillin the form',
                status: 'warning',
                duration: 3000,
                position: 'top',
                isClosable: true,
            });
            return;
        }

        if (!formik.isValid) {
            toast({
                title: 'Error',
                description: 'please fillin the form correctly',
                status: 'error',
                duration: 3000,
                position: 'top',
                isClosable: true,
            });
            return;
        }

        if (permissions.length < 1) {
            if (!formik.isValid) {
                toast({
                    title: 'Error',
                    description: 'please pick at least 1 permission for this user',
                    status: 'error',
                    duration: 3000,
                    position: 'top',
                    isClosable: true,
                });
                return;
            }
        }
        setLoading(true);
        const obj = {
            ...formik.values,
            permissions,
            type,
        }
        const request = await fetch(`${url}/admin/createaccount`, {
            method: 'post',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(obj),
        });
        const json = await request.json() as IReturnObject;
        setLoading(false);
        if (json.statusCode !== 200) {
            toast({
                title: 'Error',
                description: json.errorMessage,
                status: 'error',
                duration: 3000,
                position: 'top',
                isClosable: true,
            });
            return;
        } else {
            toast({
                title: 'Success',
                description: json.successMessage,
                status: 'success',
                duration: 3000,
                position: 'top',
                isClosable: true,
            });
            navigate('/dashboard/rolemanagement')
            return;
        }
    }
    
    return (
        <div className='w-full py-10 px-10' > 
            <div className='w-full flex' >   
                <div onClick={()=> navigate('/dashboard/rolemanagement')} className='w-5 h-5 cursor-pointer mr-4 rounded-full flex border-2 border-black justify-center mt-1 items-center' >
                    <IoIosArrowBack size='20px' />
                </div>
                <div className=''>
                    <p style={{fontSize: '20px'}} className='font-Graphik-Medium'>Create New User</p>
                    {/* <p style={{color: '#8A8A8A'}} className='text-sm font-Graphik-Regular' >Showing customers with deactivated profiles. Data is deleted after 60 days</p> */}
                </div> 
            </div> 
            <div className='my-12 bg-white rounded-xl p-8' >
                {/* <p className='font-Graphik-Medium text-lg' >Add Profile Photo</p>
                <div style={{width: '139px', height: '131px', backgroundColor: '#F0F0F0'}} className='bg-#F0F0F0 rounded-lg my-6' >
                    {picture === undefined && (
                        <div className='w-full h-full flex justify-center items-center'>
                            <FiUser size={70} color="grey" />
                        </div>
                    )}
                    {picture === '' && (
                        <div className='w-full h-full flex justify-center items-center'>
                            <FiUser size={70} color="grey" />
                        </div>
                    )}
                    {picture !== undefined && picture !== '' && (
                        <img src={picture} className="w-full h-full object-cover" alt="pic" />
                    )}
                </div> */}
                <div className='flex w-full mt-4' > 
                    <div className='w-full mr-6' >
                        <div> 
                            <p className='text-sm mb-1 font-Graphik-Medium '>Name</p> 
                            <Input size='lg' placeholder="Name" name="fullname" value={formik.values.fullname} onChange={formik.handleChange} onBlur={formik.handleBlur} onFocus={() => formik.setFieldTouched('fullname', true, true)} />
                            {formik.touched.fullname && formik.errors.fullname && (
                                <p className='text-xs mt-2 text-red-300'>{formik.errors.fullname}</p>
                            )}
                        </div>
                        <div> 
                            <p className='text-sm mb-1 mt-6 font-Graphik-Medium '>User Type</p> 
                            <Select size='lg' value={type} onChange={(e) => setType(parseInt(e.target.value))}>
                                <option value={1}>Super Admin</option>
                                <option value={2}>Admin</option>
                                <option value={3}>Viewer</option>
                            </Select>
                        </div>
                        <div> 
                            <p className='text-sm mb-1 mt-6 font-Graphik-Medium '>Password</p>  
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
                    </div>
                    <div className='w-full ml-6' > 
                        <div> 
                            <p className='text-sm mb-1 font-Graphik-Medium '>Email Address</p> 
                            <Input size='lg' placeholder="Email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} onFocus={() => formik.setFieldTouched('email', true, true)} />
                            {formik.touched.email && formik.errors.email && (
                            <p className='text-xs mt-2 text-red-300'>{formik.errors.email}</p>
                            )}
                        </div>

                        <p className='text-sm mb-1 mt-6 font-Graphik-Medium '>Permissions</p> 
                        <div className='flex items-center mt-4 ' >
                            {/* <div className='flex items-center mr-3' >
                                <Checkbox />
                                <p className='ml-3 font-Graphik-Regular text-sm' >Customers</p>
                            </div> */}
                            <div className='flex items-center mr-3' >
                                <Checkbox isChecked={vendors} onChange={() => check('VENDOR') } />
                                <p className='ml-3 font-Graphik-Regular text-sm' >Vendors</p>
                            </div>
                            <div className='flex items-center' >
                                <Checkbox isChecked={subs} onChange={() => check('SUBSCRIPTION') } />
                                <p className='ml-3 font-Graphik-Regular text-sm' >Subscriptions</p>
                            </div> 
                        </div>
                        <div className='flex items-center my-6' > 
                            <div className='flex items-center mr-3' >
                                <Checkbox isChecked={cat} onChange={() => check('CATEGORY') } />
                                <p className='ml-3 font-Graphik-Regular text-sm' >Categories</p>
                            </div>
                            <div className='flex items-center' >
                            <Checkbox isChecked={re} value="REVIEW" onChange={(e) => check(e.target.value) }  />
                            <p className='ml-3 font-Graphik-Regular text-sm' >Customer Reviews</p>
                        </div>
                            {/* <div className='flex items-center mr-3' >
                                <Checkbox />
                                <p className='ml-3 font-Graphik-Regular text-sm' >Support Tickets</p>
                            </div> */}
                        </div>
                        
                    </div>
                </div>
                    <button onClick={submit} style={{backgroundColor: '#1A8F85'}} className='px-4 py-3 font-Graphik-Regular text-sm text-white flex items-center rounded-md mt-8' >
                        {!loading && <span>Create User</span>}
                        {loading && (<Spinner size="sm" color="white" />)}
                    </button>
            </div>
        </div>
    )
}
