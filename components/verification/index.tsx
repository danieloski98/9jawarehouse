import React from 'react'
import { Spinner, Modal, ModalOverlay, ModalContent, ModalBody, Image as Img, Select, useToast } from '@chakra-ui/react'
import {  } from 'react-icons/fi'
import { useRouter } from 'next/router'
import { useFormik } from 'formik'
import * as yup from 'yup'
import Link from 'next/link'
// image
import Image from 'next/image';
import Girl from '../../public/images/girl2.png';
import Logo from '../../public/images/nlogo.png';
import Envelope from '../../public/images/envelope.svg';


import { FiSearch, FiMenu } from 'react-icons/fi'
import url from '../../utils/url';
import { IServerReturnObject } from '../../utils/types/serverreturntype';

const validationSchema = yup.object({
    email: yup.string().required().email(),
})


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


export default function Forgotpassword() {
    const [loading, setLoading] = React.useState(false);
    const [openSuccessModal, setOpenSuccessModal] = React.useState(false);
    const docReader = React.useRef(new FileReader()).current;
    const cacReader = React.useRef(new FileReader()).current;
    const [cacName, setCacname] = React.useState('');
    const [docName, setDocName] = React.useState('');
    const [doc, setDoc] = React.useState('');
    const [cac, setCac] = React.useState('');
    const [docType, setDocType] = React.useState('Drivers License');
    const toast = useToast();
    const router = useRouter();

    React.useEffect(() => {
        docReader.onload = () => {
            setDoc(docReader.result as string);
        }
        return () => {
            docReader.removeEventListener('load', () => {});
        }
    }, [docReader])

    React.useEffect(() => {
        cacReader.onload = () => {
            setCac(cacReader.result as string);
        }
        return () => {
            cacReader.removeEventListener('load', () => {});
        }
    }, [cacReader])


    const pickDoc = () => {
        const dd = document.getElementById('doc');
        dd?.click();
    }

    const pickCac = () => {
        const dd = document.getElementById('cac');
        dd?.click();
    }

    const readerDoc = (files: File[]) => {
        const neededDoc = files[0];
        setDocName(neededDoc.name);
        docReader.readAsDataURL(neededDoc);
    }

    const readerCac = (files: any[]) => {
        const neededDoc = files[0];
        setCacname(neededDoc.name);
        cacReader.readAsDataURL(neededDoc);
    }

    const submit = async () => {
        
        if (doc === '') {
            toast({
                title: 'Warning',
                description: 'Please select a document to continue',
                status: 'warning',
                isClosable: true,
                position: 'top',
            });
            return;
        }
        setLoading(true);
        const request = await fetch(`${url}user/${router.query['id']}/verification`, {
            method: 'put',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                verification_document_type: docType,
                verification_document: doc,
                cac: cac !== '' ? cac:''
            })
        })
        const json = await request.json() as IServerReturnObject;
        setLoading(false);
        if (json.statusCode !== 200) {
            toast({
                title: 'Error',
                description: json.errorMessage,
                position: 'top',
                status: 'error',
                isClosable: true,
                duration: 5000
            });
            return;
        } else {
            toast({
                title: 'Message',
                description: json.successMessage,
                position: 'top',
                status: 'success',
                isClosable: true,
                duration: 5000
            });
            router.push('/underreview');
        }
    }

    return (
        <div className="w-full h-screen flex">
            <input type="file" accept="image/*, application/pdf, application/msword" hidden id="doc" onChange={(e) => readerDoc(e.target.files as any)} />
            <input type="file" accept="image/*, application/pdf, application/msword" hidden id="cac" onChange={(e) => readerCac(e.target.files as any)} />
            

        <div className="flex-1 flex flex-col">
            <LeftNavbar />
            <div className="flex-1 xl:pl-10 lg:pl-10 md:pl-5 sm:pl-5 xl:pr-0 lg:pr-0 md:pr-5 sm:pr-5 flex flex-col justify-center items-center">
                

                <div className="flex flex-col xl:w-4/6 lg:w-4/6 md:w-full sm:w-full">
                    <h3 className="text-3xl font-Cerebri-sans-book text-gray-700">Tell us more about you</h3>
                    <p className="text-sm font-Cerebri-sans-book mt-2 text-gray-500">Provide information about you and your business/service</p>
                </div>

               <div className="xl:w-4/6 lg:w-4/6 md:w-full sm:w-full flex h-auto xl:items-end lg:items-end md:items-start sm:items-start mt-16 xl:flex-row lg:flex-row md:flex-col sm:flex-col">
                   <div className="flex-col w-full flex flex-1 mr-3" >
                       <label htmlFor="" className='mb-3 font-Circular-std-book text-black'>Select Identity Document</label>
                       <div className="w-full h-16">
                       <Select bg="whitesmoke" h="63px" value={docType} onChange={(e) => setDocType(e.target.value)} fontSize="sm" borderRadius={0} borderWidth="0px" className='font-Circular-std-book'>
                           <option value="Drivers License">Driver Lincense</option>
                           <option value="NIN">NIN</option>
                           <option value="company ID">Company ID</option>
                       </Select>
                       </div>
                   </div>
                   <div className="flex-1 h-16 w-2/4 flex flex-col">
                       {doc !== '' && (
                           <div className="flex w-full items-center">
                               <div onClick={pickDoc} className="w-full h-16 xl:mt-0 lg:mt-0 md:mt-4 sm:mt-4 bg-yellow-100 text-yellow-500 cursor-pointer flex items-center justify-center px-3 overflow-hidden">
                                    {docName}
                                </div>
                                <p onClick={pickDoc} className='ml-2 font-Circular-std-book cursor-pointer text-themeGreen'>Change</p>
                           </div>
                       )}
                       {
                           doc === '' && (
                            <button onClick={pickDoc} className="w-full h-16 xl:mt-0 lg:mt-0 md:mt-4 sm:mt-4 bg-green-100 text-green-500 cursor-pointer flex items-center justify-center">
                                Tap To Upload Document
                            </button>
                           )
                       }
                   </div>
               </div>

               <div className="xl:w-4/6 lg:w-4/6 md:w-full sm:w-full flex h-auto xl:items-end lg:items-end md:items-start sm:items-start xl:mt-16 lg:mt-16 md:mt-6 sm:mt-6 xl:flex-row lg:flex-row md:flex-col sm:flex-col">
                   <div className="flex-col w-2/4 flex flex-1 mr-3" >
                       <label htmlFor="" className='mb-3 font-Circular-std-book text-black'>CAC Document <span className='text-gray-400'>(optional)</span></label>
                       {cac !== '' && (
                           <div className="flex items-center">
                               <div onClick={pickCac} className="w-full h-16 xl:mt-0 lg:mt-0 md:mt-4 sm:mt-4 bg-yellow-100 text-yellow-500 cursor-pointer flex items-center justify-center overflow-hidden">
                                    {cacName}
                                </div>
                                <p onClick={pickCac} className='ml-2 font-Circular-std-book cursor-pointer text-themeGreen'>Change</p>
                           </div>
                       )}
                       {
                           cac === '' && (
                            <button onClick={pickCac} className="w-full h-16 xl:mt-0 lg:mt-0 md:mt-4 sm:mt-4 bg-green-100 text-green-500 cursor-pointer flex items-center justify-center">
                                Tap To Upload Document
                            </button>
                           )
                       }
                   </div>
                   <div className="flex-1 h-full flex flex-col">
                       
                   </div>
               </div>

               <div className="xl:w-4/6 lg:w-4/6 md:w-full sm:w-full flex h-auto xl:items-end lg:items-end md:items-start sm:items-start xl:mt-16 lg:mt-16 md:mt-6 sm:mt-6 xl:flex-row lg:flex-row md:flex-col sm:flex-col mb-8">
                   <div className="flex-col flex flex-1 mr-3" >
                       {/* <label htmlFor="" className='mb-3 font-Circular-std-book text-black'>CAC Document (optional)</label>
                       <div className="w-full h-16 bg-green-100 text-green-500 cursor-pointer flex items-center justify-center">
                           Tap To Upload Document
                       </div> */}
                   </div>
                   <div className="flex-1 h-16 w-full flex flex-col">
                   <button onClick={submit} className="w-full sm:w-full mt-0 xl:h-16 lg:h-16 md:h-12 sm:h-12 bg-themeGreen cursor-pointer flex justify-center items-center">
                        {!loading && <span className="ml-0 text-sm font-Cerebri-sans-book text-white">Submit</span>}
                        {loading && <Spinner color="white" size="sm" />}
                    </button>
                   </div>
               </div>

                

                {/* <div className="xl:w-4/6 lg:w-4/6 md:w-full sm:w-full text-center">
                    <p onClick={() => router.push('/auth/createaccount')} className="text-sm font-light mt-12 text-center text-gray-500">Dont Have An Account? <span className="text-themeGreen">Create Account</span></p>
                </div> */}

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
    )
}
