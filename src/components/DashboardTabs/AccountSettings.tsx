import { Input, InputGroup, InputRightElement, Spinner, toast, useToast } from '@chakra-ui/react'
import React, {useState} from 'react'
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useRecoilState } from 'recoil';
import { AdminState } from '../../states/AdminState';
import { url } from '../../utils/url';
import { IReturnObject } from '../../types/ServerReturnType';
import { theme } from '../../utils/theme';
import { queryClient } from '../../App';

const validationSchema = yup.object({
    email: yup.string().email('Invalid email'),
    password: yup.string(),
    fullname: yup.string(),
});

export default function AccountSettings() {
    const [loading, setLoading] = useState(false);

    const toast = useToast();

    // recoil state
    const [admin, setAdmin] = useRecoilState(AdminState);

    const formik = useFormik({
        initialValues: {email: admin.email, password: admin.password, fullname: admin.fullname},
        validationSchema,
        onSubmit: () => {},
        enableReinitialize: true,
    });

    const submit = async () => {
        setLoading(true);
        const request = await fetch(`${url}/admin/${admin._id}`, {
            method: 'put',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(formik.values),
        });
        setLoading(false);
        const json = await request.json() as IReturnObject;

        if (json.statusCode !== 200) {
            toast({
                status: 'error',
                title: 'error',
                description: json.errorMessage,
                position: 'bottom',
                duration: 5000,
            });
            return;
        } else {
            toast({
                status: 'success',
                title: 'Success',
                description: json.successMessage,
                position: 'bottom',
                duration: 5000,
            });
            queryClient.invalidateQueries();
        }
    }

    return (
        <div className='w-full py-10 px-10' >
            <div className='w-full flex items-center' > 
                <div className=''>
                    <p style={{fontSize: '20px'}} className='font-Graphik-Medium'>Account Settings</p>
                    <p style={{color: '#8A8A8A'}} className='text-sm font-Graphik-Regular' >Manage your profile on 9jawarehouse</p>
                </div> 
            </div>
            <div className='my-12 bg-white rounded-xl p-8' >
                <p className='font-Graphik-Medium text-lg' >My Account</p>
                {/* <div style={{width: '139px', height: '131px', backgroundColor: '#F0F0F0'}} className='bg-#F0F0F0 rounded-lg my-6' >

                </div> */}
                <div className='grid grid-cols-2 gap-y-8 gap-x-16 mt-6' > 
                    <div> 
                        <p className='text-sm mb-1 font-Graphik-Medium '>Name</p> 
                        <Input size='lg' placeholder="Email" name="fullname" value={formik.values.fullname} onChange={formik.handleChange} onBlur={formik.handleBlur} onFocus={() => formik.setFieldTouched('fullname', true, true)} />
                        {formik.touched.fullname && formik.errors.fullname && (
                            <p className='text-xs mt-2 text-red-300'>{formik.errors.fullname}</p>
                        )}
                    </div>
                    <div> 
                        <p className='text-sm mb-1 font-Graphik-Medium '>Email Address</p> 
                        <Input disabled={admin.type !== 1} title={admin.type !== 1 ? 'You cant change your email': ''} size='lg' placeholder="Email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} onFocus={() => formik.setFieldTouched('email', true, true)} />
                        {formik.touched.email && formik.errors.email && (
                            <p className='text-xs mt-2 text-red-300'>{formik.errors.email}</p>
                        )}
                    </div>
                    <div> 
                        <p className='text-sm mb-1 font-Graphik-Medium '>Old Password</p>  
                            <InputGroup >
                                <InputRightElement 
                                children={
                                    <svg className='mr-4 mt-1 cursor-pointer' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.3747 2.00024C14.6307 2.00024 16.6447 3.43324 17.3837 5.56724C17.5197 5.95824 17.3117 6.38524 16.9197 6.52124C16.5287 6.65824 16.1017 6.44924 15.9657 6.05724C15.4367 4.52824 13.9917 3.50024 12.3717 3.50024H12.3577C10.2657 3.50024 8.5617 5.19424 8.5527 7.28424L8.552 8.62625L16.184 8.62695C18.688 8.62695 20.726 10.6649 20.726 13.1699V17.4579C20.726 19.9629 18.688 22.0009 16.184 22.0009H8.542C6.037 22.0009 4 19.9629 4 17.4579V13.1699C4 11.1866 5.277 9.49593 7.05221 8.87786L7.0527 7.30124C7.0657 4.36324 9.4417 2.00024 12.3547 2.00024H12.3747ZM16.184 10.1269H8.542C6.864 10.1269 5.5 11.4919 5.5 13.1699V17.4579C5.5 19.1359 6.864 20.5009 8.542 20.5009H16.184C17.861 20.5009 19.226 19.1359 19.226 17.4579V13.1699C19.226 11.4919 17.861 10.1269 16.184 10.1269ZM12.3633 13.4527C12.7773 13.4527 13.1133 13.7887 13.1133 14.2027V16.4247C13.1133 16.8387 12.7773 17.1747 12.3633 17.1747C11.9493 17.1747 11.6133 16.8387 11.6133 16.4247V14.2027C11.6133 13.7887 11.9493 13.4527 12.3633 13.4527Z" fill="#727272"/>
                                    </svg>
                                }
                                />
                                <Input size='lg' placeholder="Password" type="password" name="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} onFocus={() => formik.setFieldTouched('password', true, true)} /> 
                            </InputGroup>
                            {formik.touched.password && formik.errors.password && (
                            <p className='text-xs mt-2 text-red-300'>{formik.errors.password}</p>
                        )}
                    </div>
                    <div> 
                        <p className='text-sm mb-1 font-Graphik-Medium '>New Password</p>  
                            <InputGroup >
                                <InputRightElement 
                                children={
                                    <svg className='mr-4 mt-1 cursor-pointer' width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.3747 2.00024C14.6307 2.00024 16.6447 3.43324 17.3837 5.56724C17.5197 5.95824 17.3117 6.38524 16.9197 6.52124C16.5287 6.65824 16.1017 6.44924 15.9657 6.05724C15.4367 4.52824 13.9917 3.50024 12.3717 3.50024H12.3577C10.2657 3.50024 8.5617 5.19424 8.5527 7.28424L8.552 8.62625L16.184 8.62695C18.688 8.62695 20.726 10.6649 20.726 13.1699V17.4579C20.726 19.9629 18.688 22.0009 16.184 22.0009H8.542C6.037 22.0009 4 19.9629 4 17.4579V13.1699C4 11.1866 5.277 9.49593 7.05221 8.87786L7.0527 7.30124C7.0657 4.36324 9.4417 2.00024 12.3547 2.00024H12.3747ZM16.184 10.1269H8.542C6.864 10.1269 5.5 11.4919 5.5 13.1699V17.4579C5.5 19.1359 6.864 20.5009 8.542 20.5009H16.184C17.861 20.5009 19.226 19.1359 19.226 17.4579V13.1699C19.226 11.4919 17.861 10.1269 16.184 10.1269ZM12.3633 13.4527C12.7773 13.4527 13.1133 13.7887 13.1133 14.2027V16.4247C13.1133 16.8387 12.7773 17.1747 12.3633 17.1747C11.9493 17.1747 11.6133 16.8387 11.6133 16.4247V14.2027C11.6133 13.7887 11.9493 13.4527 12.3633 13.4527Z" fill="#727272"/>
                                    </svg>
                                }
                                />
                                <Input size='lg' placeholder="Password" type="password" /> 
                            </InputGroup>
                    </div>
                </div>
                    <button disabled={loading} onClick={submit} style={{backgroundColor: '#1A8F85'}} className='px-4 py-3 font-Graphik-Regular text-sm text-white flex items-center rounded-md mt-8' >
                        {!loading && (<span>Update</span>)}
                        {loading && <Spinner size="md" color='white' />}
                    </button>
            </div>
        </div>
    )
}