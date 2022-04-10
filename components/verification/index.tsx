import React from 'react'
import { Spinner, Modal, ModalOverlay, ModalContent, ModalBody, Image as Img, Select, useToast } from '@chakra-ui/react'
import { FiArrowLeftCircle } from 'react-icons/fi'
import { useRouter } from 'next/router'
import * as yup from 'yup'
import Link from 'next/link'
import {FormikProps, useFormik} from 'formik'
// image
import Image from 'next/image';
import Girl from '../../public/images/girl2.png';
import Logo from '../../public/images/nlogo.png';
import Envelope from '../../public/images/envelope.svg';


import { FiSearch, FiMenu } from 'react-icons/fi'
import url from '../../utils/url';
import { IServerReturnObject } from '../../utils/types/serverreturntype';
import Form from './Form'
import DocForm from './DocForm'

const validationSchema = yup.object({
    first_name: yup.string().required('firstname is required'),
    last_name: yup.string().required('lastname is required'),
    business_name: yup.string().required('Business name is required'),
    business_description: yup.string().required('Business description'),
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


export default function VerificationDocuments() {
    const [loading, setLoading] = React.useState(false);
    const [openSuccessModal, setOpenSuccessModal] = React.useState(false);
    const docReader = React.useRef(new FileReader()).current;
    const cacReader = React.useRef(new FileReader()).current;
    const [cacName, setCacname] = React.useState('');
    const [docName, setDocName] = React.useState('');
    const [doc, setDoc] = React.useState('');
    const [cac, setCac] = React.useState('');
    const [docType, setDocType] = React.useState('Drivers License');
    const [stage, setStage] = React.useState(1);
    const toast = useToast();
    const router = useRouter();

    const formik = useFormik({
        initialValues: {first_name: '', last_name: '', business_name: '', business_description: ''},
        validationSchema,
        onSubmit: () => {},
    })

    const nextStep = () => {
        if (!formik.dirty) {
            alert('please fill in the form.');
            return;
        }
        if (!formik.isValid) {
            alert('please fill in the form correctly.');
            return;
        }
        setStage(2);
    }

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
        if (neededDoc.size > 5019878) {
            toast({
                status: 'warning',
                description: 'Can\'t use an image greater than 5MB',
                title: 'Image Too Large',
                position: 'top',
                isClosable: true,
                duration: 5000,
            });
            return;
        }
        setDocName(neededDoc.name);
        docReader.readAsDataURL(neededDoc);
    }

    const readerCac = (files: any[]) => {
        const neededDoc = files[0];
        if (neededDoc.size > 5019878) {
            toast({
                status: 'warning',
                description: 'Can\'t use an image greater than 5MB',
                title: 'Image Too Large',
                position: 'top',
                isClosable: true,
                duration: 5000,
            });
            return;
        }
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
                ...formik.values,
                cac: cac,
                verification_document_type: docType,
                verification_document: doc,
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
            <input type="file" accept="image/*" hidden id="doc" onChange={(e) => readerDoc(e.target.files as any)} />
            <input type="file" accept="image/*" hidden id="cac" onChange={(e) => readerCac(e.target.files as any)} />
            

        <div className="flex-1 flex flex-col">
            <LeftNavbar />
            <div className="flex-1 xl:pl-10 lg:pl-10 md:pl-5 sm:pl-5 xl:pr-0 lg:pr-0 md:pr-5 sm:pr-5 flex flex-col justify-center items-center">
                

                <div className="flex flex-col xl:w-4/6 lg:w-4/6 md:w-full sm:w-full">
                    <div className="flex">
                        {stage === 2 && <FiArrowLeftCircle color='black' size={25} className='mt-1' onClick={() => setStage(1)} />}
                        <div className='ml-5'>
                            <h3 className="text-3xl font-Cerebri-sans-book text-gray-700">Tell us more about you</h3>
                            <p className="text-sm font-Cerebri-sans-book mt-2 text-gray-500">Provide information about you and your business/service</p>
                        </div>
                    </div>
                    
                </div>   
               
               {stage === 1 ?  <Form formik={formik as FormikProps<{first_name: '', last_name: '', business_name: '', business_description: ''}>} nextStep={nextStep} /> : <DocForm 
                 doc={doc}
                 docName={docName}
                 pickDoc={pickDoc}
                 cac={cac}
                 cacName={cacName}
                 pickCac={pickCac}
                 submit={submit}
                 loading={loading}
                 docType={docType}
                 setDocType={setDocType}
               />}

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
