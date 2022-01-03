import React from 'react'
import { InputGroup, InputLeftElement, InputRightElement, Input, Spinner, Modal, ModalOverlay, ModalContent, ModalBody } from '@chakra-ui/react'
import { FiMail, FiLock, FiEye, FiEyeOff, FiCode } from 'react-icons/fi'
import { useRouter } from 'next/router'
import { useFormik } from 'formik'
import * as yup from 'yup'
import Link from 'next/link'

// image
import Image from 'next/image';
import Girl from '../../public/images/girl2.png';
import Logo from '../../public/images/logo.svg';
import Envelope from '../../public/images/envelope.svg';
import Secure from '../../public/images/secure.svg';

import { FiSearch, FiMenu } from 'react-icons/fi'
import url from '../../utils/url';
import { IServerReturnObject } from '../../utils/types/serverreturntype';

const validationSchema = yup.object({
    newpassword: yup.string().required().min(8),
    confirmpassword: yup.string().required().min(8),
    otp: yup.string().required(),
})


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

// success modal
const SuccessModal = ({open, close}: {open: boolean, close: Function}) => (
    <Modal isOpen={open} onClose={() => close()} isCentered size="xl" closeOnEsc={false} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent>
            <ModalBody className='w-full h-full flex justify-center items-center flex-col py-10'>
                    <div className="w-40 h-20 mt-10">
                        <Image src={Secure} alt="mail" className="w-full h-full" />
                    </div>
                    <p className='font-Circular-std-book mt-10'>Your password has been updated!</p>
                    <Link href="/auth/loginform" passHref >
                        <button className="xl:w-4/6 lg:w-4/6 md:w-full sm:w-full mt-4 h-12 bg-themeGreen cursor-pointer flex justify-center items-center mb-10">
                            <span className="ml-4 text-sm font-Circular-std-book text-white">Proceed to Login</span>
                        </button>
                    </Link>
            </ModalBody>
        </ModalContent>
    </Modal>
)

export default function Resetpassword() {
    const [loading, setLoading] = React.useState(false);
    const [openSuccessModal, setOpenSuccessModal] = React.useState(false);

    const formik = useFormik({
        initialValues: {newpassword: '', confirmpassword: '', otp: ''},
        validationSchema,
        onSubmit: () => {},
    });

    const submit = async () => {
        if (!formik.dirty) {
            alert('Please put in your email');
            return;
        }
        if (!formik.isValid) {
            alert('Please fill in the form coorectly');
            return
        }
        setLoading(true);
        // make request
        const request = await fetch(`${url}auth/resetpassword/${formik.values.otp}`, {
            method: 'post',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({newpassword: formik.values.newpassword, confirmpassword: formik.values.confirmpassword}),
        });
        const json = await request.json() as IServerReturnObject;
        setLoading(false);

        if (json.statusCode !== 200) {
            alert(json.errorMessage);
            return;
        }else {
            setOpenSuccessModal(true);
        }
    }

    return (
        <div className="w-full h-screen flex">

            <SuccessModal open={openSuccessModal} close={() => setOpenSuccessModal(false)} />

        <div className="flex-1 flex flex-col">
            <LeftNavbar />
            <div className="flex-1 xl:pl-10 lg:pl-10 md:pl-5 sm:pl-5 xl:pr-0 lg:pr-0 md:pr-5 sm:pr-5 flex flex-col justify-center items-start">
                <h3 className="text-3xl font-Circular-std-medium text-gray-700">Reset Your Password</h3>
                <p className="text-sm font-Circular-std-book mt-4 text-gray-500">Lets help you create a new secure password</p>

                <div className="flex flex-col xl:w-4/6 lg:w-4/6 md:w-full sm:w-full mt-6">
                    <label className="font-Circular-std-book text-sm">New Password</label>
                    <InputGroup bgColor="#F1EEEE" className="mt-2" size="lg">
                        <InputLeftElement>
                            <FiLock size={25} color="gray" />
                        </InputLeftElement>
                        <Input type="password" name="newpassword" fontSize="sm" className="font-Circular-std-book" value={formik.values.newpassword} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    </InputGroup>
                    {formik.touched.newpassword && formik.errors.newpassword && (
                        <p className="text-red-500 font-Circular-std-book text-xs mt-1">{formik.errors.newpassword}</p>
                    )}
                </div>

                <div className="flex flex-col xl:w-4/6 lg:w-4/6 md:w-full sm:w-full mt-6">
                    <label className="font-Circular-std-book text-sm">Confirm Password</label>
                    <InputGroup bgColor="#F1EEEE" className="mt-2" size="lg">
                        <InputLeftElement>
                            <FiLock size={25} color="gray" />
                        </InputLeftElement>
                        <Input type="password" name="confirmpassword" fontSize="sm" className="font-Circular-std-book" value={formik.values.confirmpassword} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    </InputGroup>
                    {formik.touched.confirmpassword && formik.errors.confirmpassword && (
                        <p className="text-red-500 font-Circular-std-book text-xs mt-1">{formik.errors.confirmpassword}</p>
                    )}
                </div>

                <div className="flex flex-col xl:w-4/6 lg:w-4/6 md:w-full sm:w-full mt-6">
                    <label className="font-Circular-std-book text-sm">OTP Code</label>
                    <InputGroup bgColor="#F1EEEE" className="mt-2" size="lg">
                        <InputLeftElement>
                            <FiCode size={25} color="gray" />
                        </InputLeftElement>
                        <Input type="password" name="otp" fontSize="sm" className="font-Circular-std-book" value={formik.values.otp} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    </InputGroup>
                    {formik.touched.otp && formik.errors.otp && (
                        <p className="text-red-500 font-Circular-std-book text-xs mt-1">{formik.errors.otp}</p>
                    )}
                </div>

                <button disabled={loading} onClick={submit} className="xl:w-4/6 lg:w-4/6 md:w-full sm:w-full mt-8 h-12 bg-themeGreen cursor-pointer flex justify-center items-center">
                    {!loading && <span className="ml-4 text-sm ffont-Circular-std-book text-white">Submit</span>}
                    {loading && <Spinner color="white" size="sm" />}
                </button>

                {/* <div className="xl:w-4/6 lg:w-4/6 md:w-full sm:w-full text-center">
                    <p onClick={() => router.push('/auth/createaccount')} className="text-sm font-light mt-12 text-center text-gray-500">Dont Have An Account? <span className="text-themeGreen">Create Account</span></p>
                </div> */}

            </div>
        </div>

        <div className="w-2/5 h-full xl:block lg:block md:hidden sm:hidden">
            <Image src={Girl} alt="girl" className="w-full h-full" />
        </div>
        
    </div>
    )
}
