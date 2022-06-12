import React from 'react';
import { Progress } from '@chakra-ui/react'
import PersonalInfo from './PersonalInfo';
import BusinessInfo from './businessScreen';
import SocialMediaInfo from './socialMedia';
import {useRouter} from 'next/router'
import { useToast } from '@chakra-ui/react'


import * as yup from 'yup';
import { useFormik } from 'formik';
import { states } from '../../components/completereg/index';
import { IServices } from '../../utils/types/services';
import { ICertificate } from '../../utils/types/certificate';
import url from '../../utils/url';
import { IServerReturnObject } from '../../utils/types/serverreturntype';
import { IState } from '../../utils/types/Lga&State';
import { clearTimeout } from 'timers';

import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../../reducers/User.reducer';
import { RootState } from '../../store/index'
// import { setTimeout } from 'timers/promises';

// validationSchema
const validationSchema = yup.object({
    first_name: yup.string().required('This field is required'),
    last_name: yup.string().required('This field is required'),
    email: yup.string().required('This field is required'),
    phone: yup.string().required('This field is required'),
    business_address: yup.string().required('This field is required'),
    country: yup.string().required('This field is required'),
    state: yup.string().required('This field is required'),
    lga: yup.string().required('This field is required'),
    business_name: yup.string().required('This field is required'),
    business_description: yup.string().required('This field is required'),
    instagram: yup.string(),
    facebook: yup.string(),
    whatsapp: yup.string(),
    twitter: yup.string(),
    website: yup.string(),
});

type InitialValues = {
        first_name: string;
        last_name: string;
        email: string;
        phone: string;
        business_address: string;
        country: string;
        state: string;
        business_name: string;
        business_description: string;
        instagram: string;
        facebook: string;
        whatsapp: string;
        twitter: string;
        website: string;
        lga: string;
}

export const initialValues =  {
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    business_address: '',
    country: 'Nigeria',
    state: '',
    business_name: '',
    business_description: '',
    instagram: '',
    facebook: '',
    whatsapp: '',
    twitter: '',
    website: '',
    lga: ''
}

const ACTIVE = 'w-8 h-8 rounded-full bg-themeGreen text-white text-sm flex justify-center items-center';
const INACTIVE = 'w-8 h-8 rounded-full bg-green-200 text-green-600 text-sm flex justify-center items-center';

export default function BigScreen({ states, services}: {states: IState[], services: IServices[]}) {
    const [step, setStep] = React.useState(1);
    const [progress, setProgress] = React.useState(33);
    const [images, setImages] = React.useState([] as any[]);
    const [imagesFiles, setImagesFiles] = React.useState([] as any[]);
    const [profilePic, setProfilePic] = React.useState({});
    const [profile, setProfile] = React.useState("");
    const [service, setServices] = React.useState([] as Array<string>);
    const [certificates, setCertificates] = React.useState([] as Array<ICertificate>);
    let fileReader = React.useRef(new FileReader).current;
    let fileReader2 = React.useRef(new FileReader).current;
    const picker = document.getElementById('picker');
    const router = useRouter();
    const [caller, setCaller] = React.useState(1);
    const [loading, setLoading] = React.useState(false);
    const dispatch = useDispatch();
    const toast = useToast();
    const user = useSelector((state: RootState) => state.UserReducer.user);


    React.useEffect(() => {
        setCertificates([
        ])
    }, []);

    React.useEffect(() => {
        fileReader.addEventListener('load', () => {
            const imgs = [...images, fileReader.result];
            setImages(imgs);
            return;
        });

        return () => {
            fileReader.removeEventListener('load', () => {});
        }
    }, [fileReader, caller, images])

    React.useEffect(() => {
        fileReader2.addEventListener('load', () => {
            setProfile(fileReader2.result as string);
            return;
        });

        return () => {
            fileReader2.removeEventListener('load', () => {});
        }
    }, [fileReader2])

    const formik = useFormik<InitialValues>({
        initialValues: {...initialValues, first_name: user.first_name, last_name: user.last_name, email: user.email, business_name: user.business_name, business_description: user.business_description},
        validationSchema,
        onSubmit: () => {},
        enableReinitialize: true,
    });

    const move = (val: number) => {
        if (val === 1) {
            setProgress(33)
            setStep(val);
            window.scroll({ top: 0, behavior: 'smooth' });
            return;
        }
        if (val === 2) {
            setProgress(66)
            setStep(val);
            window.scroll({ top: 0, behavior: 'smooth' });
            return;
        }
        if (val === 3) {
            setProgress(100)
            setStep(val);
            window.scroll({ top: 0, behavior: 'smooth' });
            return;
        }
    }

    const switcher = () => {
        switch(step) {
            case 1: {
                return <PersonalInfo next={move} states={states} formik={formik} />
            }
            case 2: {
                return <BusinessInfo next={move} images={images} profilePic={profile} picker={pickImages} formik={formik} services={services} selectService={selectService} selectedSerices={service} deleteService={deleteService} certificates={certificates} addCerts={addCert} changeCert={changeCertValue} deleteCert={deleteCert} deleteImage={deleteImgs}  />
            }
            case 3: {
                return <SocialMediaInfo next={move} formik={formik} submit={submit} loading={loading} />
            }
        }
    }

    const heading = () => {
        switch(step) {
            case 1: {
                return 'Personal Information'
            }
            case 2: { 
                return 'Business Information'
            }
            case 3: {
                return 'Social Media Information'
            }
        }
    }

    const deleteImgs = (index: number) => {
        const img = [...images];
        const files = [...imagesFiles];
        files.splice(index, 1);
        setImagesFiles(files);
        img.splice(index, 1);
        setImages(img);
      }

    const pickImages = (call: number) => {
        setCaller(call);
        picker?.click();
    }

    const fileProcessor = (files: any[]) => {
        if (caller === 1) {
            if (imagesFiles.length >= 3) {
                alert('You can only pick 3 images');
                return
            }
            const imgs = [...imagesFiles, files[0]];
            setImagesFiles(imgs);
            fileReader.readAsDataURL(files[0]);
            return;
        } 
        if (caller === 2) {
            setProfilePic(files[0]);
            fileReader2.readAsDataURL(files[0]);
            return;
        }
        
    }

    const selectService = (servi: string) => {
        if (service.includes(servi)) {
            alert('You have already selected this service');
            return;
        }
        if (service.length < 3) {
            const serv = [...service, servi];
            setServices(serv);
            return;
        } else {
            alert('You can only pick 3 services')
            return;
        }
        
    }

    const deleteService = (index: number) => {
        const servi = service.filter((it, i) => i !== index);
        setServices(servi);
    }

    const addCert = () => {
        const cert: ICertificate = {
            certificate: '',
            organization: '',
            link: '',
            year: '',
        };
        const certs = [...certificates, cert];
        setCertificates(certs);
    }

    const changeCertValue = (index: number, name: 'year' | 'link' | 'organization' | 'certificate', value: string) =>{
       const newObj = [...certificates]
       newObj[index][name] = value;
       setCertificates(newObj);
    }

    const deleteCert = (index: number) => {
        const certs = certificates.filter((item, ind) => ind !== index)
        setCertificates(certs);
    }

    const submit = async() => {
        const imgs = new FormData();
        const pp = new FormData();
       

        if (!formik.isValid || !formik.dirty) {
            alert('Fill in the form correctly to continue');
            return;
        }

        if (service.length < 1) {
            setLoading(false);
            alert('Must select at least 1 service');
            return;
        }

        setLoading(true);
        const result1 = await fetch(`${url}user/${router.query['id']}`, {
            method: 'post',
            headers: {
                'content-type': "application/json"
            },
            body: JSON.stringify({
                ...formik.values,
                certificates,
                services: service,
            })
        })

        const json1 = await result1.json() as IServerReturnObject;

        if(json1.statusCode !== 200) {
            alert(json1.errorMessage);
            setLoading(false);
            return;
        }
        // save to localstorage
        const save = localStorage.setItem('9jauser', JSON.stringify(json1.data.user));
        if (json1.statusCode === 200) {
            // send images
            imagesFiles.map((item) => {
                imgs.append('pic', item);
            })

            const result = await fetch(`${url}user/${router.query['id']}/images`, {
                method: 'put',
                body: imgs,
            });

            const json = await result.json() as IServerReturnObject;

            if (json.statusCode !== 200) {
                toast({
                    title: 'Error',
                    description: json.errorMessage,
                    status: 'error',
                    position: 'top',
                    duration: 4000,
                });
                setLoading(false);
                return;
            }

            if (json.statusCode === 200) {
                pp.append('pic', profilePic as any);
                const result = await fetch(`${url}user/${router.query['id']}/profilepic`, {
                    method: 'put',
                    body: pp,
                });
    
                const json = await result.json() as IServerReturnObject;

                if (json.statusCode !== 200) {
                    toast({
                        title: 'Error',
                        description: json.errorMessage,
                        status: 'error',
                        position: 'top',
                        duration: 4000,
                    });
                    setLoading(false);
                    return;
                }
                    
                    toast({
                        title: 'Message',
                        description: 'Update Successfull',
                        status: 'success',
                        position: 'top',
                        duration: 4000,
                    });
                    setLoading(false);

                    dispatch(updateUser(json.data.user));
                    router.push('/dashboard');
                setLoading(false);
            }
        }
    }
    
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">
        <input hidden type="file" id="picker" accept="image/*" onChange={(e) => fileProcessor(e.target.files as any)} />
        <div className="xl:flex lg:flex md:hidden sm:hidden justify-center">

            <div className="flex items-center">
                <div className={step >= 1 ? ACTIVE:INACTIVE}>1</div>
                <p className="ml-4 font-Circular-std-medium text-sm text-gray-500">Personnal Information</p>
            </div>

            <div className="flex ml-6 items-center">
                <div className={step >= 2 ? ACTIVE:INACTIVE}>2</div>
                <p className="ml-4 font-Circular-std-medium text-sm text-gray-500">Business Information</p>
            </div>

            <div className="flex ml-6 items-center">
                <div className={step >= 3 ? ACTIVE:INACTIVE}>3</div>
                <p className="ml-4 font-Circular-std-medium text-sm text-gray-500">Social Media</p>
            </div>

        </div>

         {/* small screen tabs */}

         <div className="xl:hidden lg:hidden md:flex sm:flex justify-center">
             <div className="flex items-center">
                <div className={ACTIVE}>{step}</div>
                <p className="ml-4 font-Circular-std-medium text-sm text-gray-500">{heading()}</p>
            </div>
         </div>


        <div className="xl:w-3/4 lg:w-3/4 md:w-full sm:w-full h-auto bg-white mt-6 flex flex-col">
            <Progress value={progress} colorScheme="teal" />
            <div className="flex-1  xl:p-10 lg:p-10 md:p-5 sm:p-5">
                {switcher()}
            </div>
        </div>
    </div>
  );
}
