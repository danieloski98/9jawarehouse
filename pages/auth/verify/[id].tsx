import React from 'react';
import { InputGroup, InputLeftElement, InputRightElement, Input, Spinner } from '@chakra-ui/react'
import { FiMail, FiLock, FiEye, FiEyeOff, FiUser } from 'react-icons/fi'
import { useRouter } from 'next/router'

// image
import Image from 'next/image';
import Girl from '../../../public/images/girl2.png';
import Logo from '../../../public/images/logo.svg';
import Google from '../../../public/images/google.svg';
import Mail from '../../../public/images/mail.png';
import { FiSearch, FiMenu } from 'react-icons/fi'
import url from '../../../utils/url';


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

export default function VerifyAccount() {
    const [show, setShow] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [code, setCode] = React.useState('');
    const router = useRouter();

    const verify = async() => {
        setLoading(true);
        console.log(router.query);
        const request = await fetch(`${url}auth/verify/${router.query.id}/${code}`, {
            method: 'post',
        });

        const json = await request.json()

        if (json.statusCode !== 200) {
            alert(json.errorMessage);
        }else {
            router.push('/completeregistration')
            console.log(json);
        }
    }

  return (
    <div className="w-full h-screen flex">

        <div className="flex-1 flex flex-col">
            <LeftNavbar />
            <div className="flex-1 xl:pl-10 lg:pl-10 md:pl-5 sm:pl-5 xl:pr-0 lg:pr-0 md:pr-5 sm:pr-5 flex flex-col justify-center items-start">
                <h3 className="text-3xl font-semibold text-gray-700">Verify Your Account</h3>
                <p className="text-sm font-light mt-4 text-gray-500">We sent a 6 digit code to your email address</p>

                <div className="flex flex-col xl:w-4/6 lg:w-4/6 md:w-full sm:w-full mt-6">
                    <label className="font-light text-sm">Verification Code</label>
                    <InputGroup bgColor="#F1EEEE" className="mt-2" size="lg">
                        <InputLeftElement>
                            <FiLock size={25} color="gray" />
                        </InputLeftElement>
                        <Input name="code" onChange={(e) => setCode(e.target.value)} />
                    </InputGroup>
                </div>

                <div className="xl:w-4/6 lg:w-4/6 md:w-full sm:w-full mt-8 h-12 flex justify-between">
                    <button className="w-45/100 h-full bg-green-200 text-green-500 font-semibold text-xs">
                        Resend Code 4:59
                    </button>

                    <button onClick={verify} className="w-45/100 h-full bg-themeGreen text-white font-semibold text-xs">
                        {loading && <Spinner color="white" />}
                        {!loading && <span>Verify</span>}
                    </button>
                </div>

            </div>
        </div>

        <div className="w-2/5 h-full xl:block lg:block md:hidden sm:hidden">
            <Image src={Girl} alt="girl" className="w-full h-full" />
        </div>
    </div>
  );
}
