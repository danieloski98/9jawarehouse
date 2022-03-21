import { Input, InputGroup, InputLeftElement, useToast, Spinner } from '@chakra-ui/react'
import { Select } from '@chakra-ui/select'
import { Textarea } from '@chakra-ui/textarea'
import React from 'react'
import { IUser } from '../../../types/user';
import * as yup from 'yup'
import {useFormik} from 'formik'
import { ILga, IState } from '../../../types/Lga&State';
import { IServices } from '../../../types/services';
import { url } from '../../../utils/url';
import { IReturnObject } from '../../../types/ServerReturnType';
import {FiX} from 'react-icons/fi'
import { queryClient } from '../../../App';

interface IProps {
    close: Function;
    user: IUser;
}

// validationSchema
const validationSchema = yup.object({
    first_name: yup.string().required('This field is required'),
    last_name: yup.string().required(),
    email: yup.string().required(),
    phone: yup.string().required(),
    business_address: yup.string().required(),
    country: yup.string().required(),
    state: yup.string().required(),
    lga: yup.string().required(),
    business_name: yup.string().required(),
    business_description: yup.string().required(),
    instagram: yup.string(),
    facebook: yup.string(),
    whatsapp: yup.string(),
    twitter: yup.string(),
    website: yup.string(),
});


export default function EditUserProfileModal({close, user}: IProps) {
    const [loading, setLoading] = React.useState(false);
    const [services, setServices] = React.useState([] as Array<IServices>);
    const [states, setStates] = React.useState([] as Array<IState>);
    const [lgas, setLgas] = React.useState([] as Array<ILga>);
    const [service, setService] = React.useState(user.services);
    const toast = useToast();


  
    const formik: any = useFormik({
        initialValues: {
            firstname: user.first_name,
            lastname: user.last_name,
            email: user.email,
            phone: user.phone,
            business_address: user.business_address,
            country: 'Nigeria',
            state: user.state,
            business_name: user.business_name,
            description: user.business_description,
            instagram: user.linkedin,
            facebook: user.facebook,
            whatsapp: user.whatsapp,
            twitter: user.twitter,
            website: user.website,
            lga: user.lga
        },
        validationSchema,
        onSubmit: () => {},
        enableReinitialize: true
    });

    React.useMemo(() => {
        console.log(user);
        (async function() {
          const request1 = await fetch(`${url}/services`);
          const request2 = await fetch(`${url}/states`);
          const json1 = await request1.json() as IReturnObject;
          const json2 = await request2.json() as IReturnObject;
          const ser = json1.data;
          const stat = json2.data as IState[];
    
          setServices(ser);
          setStates(stat);
        })()
      }, [user]);

      React.useMemo(() => {
        (async function() {
            const request = await fetch(`${url}/states/lgas/${formik.values.state}`);
            const json = await request.json() as IReturnObject;
            const lga = json.data as ILga[];
            setLgas(lga);
        })()
    }, [formik.values.state]);

    const deleteService = (index: number) => {
        const servi = service.filter((it, i) => i !== index);
        setService(servi as any);
    }

    const selectService = (servi: string) => {
        if (service.includes(servi)) {
            alert('You have already selected this service');
            return;
        }
        if (service.length < 3) {
            const serv = [...service, servi];
            setService(serv as any);
            return;
        } else {
            alert('You can only pick 3 services')
            return;
        }
        
    }

    const submit = async() => {
        setLoading(true);

        const result1 = await fetch(`${url}/user/${user._id}`, {
            method: 'post',
            headers: {
                'content-type': "application/json"
            },
            body: JSON.stringify({
                ...formik.values,
                services: service,
            })
        })

        const json1 = await result1.json() as IReturnObject;

        if(json1.statusCode !== 200) {
            setLoading(false);
            toast({
                title: 'Error',
                description: json1.errorMessage,
                status: 'error',
                position: 'top',
                duration: 4000,
                isClosable: true
            });
            return;
            
        }
        // save to localstorage
        if (json1.statusCode === 200) {
            setLoading(false);
            queryClient.invalidateQueries();
            close(false)
            toast({
                title: 'Success',
                description: json1.successMessage,
                status: 'success',
                position: 'top',
                duration: 4000,
                isClosable: true
            });
            return;
        }
        
    }

    return (
        <div style={{width: '960px', height: '920px'}} className='bg-white rounded-lg px-10 py-4 pb-14'  > 
            <div className='w-full flex items-center' >
                <p className='font-Graphik-SemiBold text-2xl mt-6' style={{color:'#0C0C0C'}} >Edit User Profile</p> 
                <svg onClick={()=> close(false)} className='ml-auto cursor-pointer' xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                    <g id="Iconly_Light_Close_Square" data-name="Iconly/Light/Close Square" transform="translate(0.75 0.75)">
                        <g id="Close_Square" data-name="Close Square">
                        <path id="Stroke_1" data-name="Stroke 1" d="M4.792,0,0,4.792" transform="translate(6.853 6.845)" fill="none" stroke="#1a1a1a" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
                        <path id="Stroke_2" data-name="Stroke 2" d="M4.8,4.8,0,0" transform="translate(6.85 6.843)" fill="none" stroke="#1a1a1a" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
                        <path id="Stroke_3" data-name="Stroke 3" d="M13.584,0H4.915C1.894,0,0,2.139,0,5.166v8.168C0,16.361,1.885,18.5,4.915,18.5h8.668c3.031,0,4.917-2.139,4.917-5.166V5.166C18.5,2.139,16.614,0,13.584,0Z" fill="none" stroke="#1a1a1a" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
                        </g>
                    </g>
                </svg>
            </div>
            <div className='w-full flex' >
                <div className='w-full mr-10' >
                    <div className='my-4 pt-4 w-full' >
                        <p className='text-sm mb-1 font-Graphik-Medium '>Business name</p> 
                        <div className="w-full">
                            <Input className="bg-gray-100 mt-3" name="business_name" value={formik.values.business_name} onChange={formik.handleChange} onFocus={() => formik.setFieldTouched('business_name', true, true)} />
                        </div>
                        {formik.touched.business_name && formik.errors.business_name && <p className="text-xs mt-1 Cerebri-sans-book text-red-400">{formik.errors.business_name}</p>}
                    </div> 
                    <div className='my-4 pt-4 w-full' >
                        <p className='text-sm mb-1 font-Graphik-Medium '>Email Address</p> 
                        <Input className="bg-gray-100 mt-3" name="email" value={formik.values.email} onChange={formik.handleChange} onFocus={() => formik.setFieldTouched('email', true, true)} />
                        {formik.touched.email && formik.errors.email && <p className="text-xs mt-1 Cerebri-sans-book text-red-400">{formik.errors.email}</p>}
                    </div> 
                    <div className='my-4 pt-4 w-full' >
                        <p className='text-sm mb-1 font-Graphik-Medium '>Phone Number</p> 
                        <div className="w-full">
                        <InputGroup>
                            <InputLeftElement>
                                <div className="flex items-center w-full h-full pt-6 pl-3 text-xs">
                                <span>+234</span>
                                </div>
                            </InputLeftElement>
                            <Input fontSize="xs" className="bg-gray-100 mt-3 " name="phone" value={formik.values.phone} onChange={formik.handleChange} onFocus={() => formik.setFieldTouched('phone', true, true)} />
                        </InputGroup>
                    </div>
                    {formik.touched.phone && formik.errors.phone && <p className="text-xs mt-1 Cerebri-sans-book text-red-400">{formik.errors.phone}</p>}
                    </div> 
                    <div className='my-4 pt-4 w-full' >
                        <p className='text-sm mb-1 font-Graphik-Medium '>LGA</p> 
                        <div className="w-full">
                            <Select fontSize="sm" className="bg-gray-100 mt-3" name="lga" value={formik.values.lga} onChange={formik.handleChange} onFocus={() => formik.setFieldTouched('lga', true, true)}>
                            <option selected value="1">Select Your LGA</option>
                                {lgas !== undefined && lgas.length > 0 && lgas.map((item, index) => (
                                    <option value={item.LGA} key={index.toString()}>{item.LGA}</option>
                                ))}
                            </Select>
                        </div>
                        {formik.touched.lga && formik.errors.lga && <p className="text-xs mt-1 Cerebri-sans-book text-red-400">{formik.errors.lga}</p>}
                    </div> 
                    <div className='my-4 pt-4 w-full' >
                        <p className='text-sm mb-1 font-Graphik-Medium '>Service</p> 
                        <div className="">
                            <Select className="bg-gray-100 mt-3" onChange={(e) => selectService(e.target.value)}>
                                <option selected>Pick a Service</option>
                                {services.map((item, index) => (
                                    <option key={index.toString()}>{item.name}</option>
                                ))}
                                {/* <option>Lagos</option> */}
                            </Select>
                        </div>
                        <div className="flex mt-3 flex-wrap">
                        {service && service.map((item, index) => (
                             <div key={index.toString()} className="flex p-2 w-auto bg-green-100 mb-2 text-green-600 text-sm Cerebri-sans-book mr-1">{item} <FiX size={20} color="green" className="ml-3 cursor-pointer" onClick={() => deleteService(index)} /> </div>

                        ))}
                        </div>
                    </div> 
                    <div className='my-0 pt-1 w-full' >
                        <p className='text-sm mb-1 font-Graphik-Medium '>Facebook URL</p> 
                        <div className="xl:w-11/12 lg:w-11/12 md:w-full sm:w-full">
                            <Input border="none" bgColor="whitesmoke" borderRadius={0} className="bg-gray-100 mt-3" name="facebook" value={formik.values.facebook} onChange={formik.handleChange} onFocus={() => formik.setFieldTouched('facebook', true, true)} />
                        </div>
                        {formik.touched.facebook && formik.errors.facebook && <p className="text-xs mt-1 Cerebri-sans-book text-red-400">{formik.errors.facebook}</p>}
                    </div> 
                    <div className='my-2 pt-4 w-full' >
                        <p className='text-sm mb-1 font-Graphik-Medium '>Whatsapp Number</p> 
                      
                        <div className="xl:w-11/12 lg:w-11/12 md:w-full sm:w-full">
                            <Input border="none" bgColor="whitesmoke" borderRadius={0} className="bg-gray-100 mt-3" name="whatsapp" value={formik.values.whatsapp} onChange={formik.handleChange} onFocus={() => formik.setFieldTouched('whatsapp', true, true)} />
                        </div>
                        {formik.touched.whatsapp && formik.errors.whatsapp && <p className="text-xs mt-1 Cerebri-sans-book text-red-400">{formik.errors.whatsapp}</p>}
                    </div> 
                </div>
                <div className='w-full ml-10' >
                    <div className='my-4 pt-4 w-full' >
                        <p className='text-sm mb-1 font-Graphik-Medium '>Business Description</p> 
                        <div className="w-full">
                            <Textarea  fontSize="xs" className="bg-gray-100 mt-3 w-full h-40 text-gray-500 font-semibold text-sm p-3" name="business_description" value={formik.values.business_description} onChange={formik.handleChange} onFocus={() => formik.setFieldTouched('business_description', true, true)}  />
                        </div>
                        {formik.touched.business_description && formik.errors.business_description && <p className="text-xs mt-1 Cerebri-sans-book text-red-400">{formik.errors.business_description}</p>}
                    </div> 
                    <div className='my-4 pt-4 w-full' >
                        <p className='text-sm mb-1 font-Graphik-Medium '>Business address</p> 
                        <div className="">
                        <Input className="bg-gray-100 mt-3" name="business_address" value={formik.values.business_address} onChange={formik.handleChange} onFocus={() => formik.setFieldTouched('address', true, true)} />
                    </div>
                    {formik.touched.business_address && formik.errors.business_address && <p className="text-xs mt-1 Cerebri-sans-book text-red-400">{formik.errors.business_address}</p>}
                    </div> 
                    <div className='my-4 pt-4 w-full' >
                        <p className='text-sm mb-1 font-Graphik-Medium '>State</p> 
                        <div className="">
                            <Select  fontSize="sm" className="bg-gray-100 mt-3" name="state" value={formik.values.state} onChange={formik.handleChange} onFocus={() => formik.setFieldTouched('state', true, true)}>
                                <option selected value="1">Select Your State</option>
                                {states !== undefined && states.map((item, index) => (
                                    <option value={item.officialName} key={index.toString()}>{item.officialName}</option>
                                ))}
                            </Select>
                        </div>
                        {formik.touched.state && formik.errors.state && <p className="text-xs mt-1 Cerebri-sans-book text-red-400">{formik.errors.state}</p>}
                    </div> 
                    <div className='my-4 pt-4 w-full' >
                        <p className='text-sm mb-1 font-Graphik-Medium '>Instagram URL</p> 
                        <div className="">
                            <Input className="bg-gray-100 mt-3" name="instagram" value={formik.values.instagram} onChange={formik.handleChange} onFocus={() => formik.setFieldTouched('instagram', true, true)} />
                        </div>
                        {formik.touched.instagram && formik.errors.instagram && <p className="text-xs mt-1 Cerebri-sans-book text-red-400">{formik.errors.instagram}</p>}
                    </div> 
                    <div className='my-4 pt-4 w-full' >
                        <p className='text-sm mb-1 font-Graphik-Medium '>Twitter URL</p> 
                        <div className="">
                            <Input className="bg-gray-100 mt-3" name="twitter" value={formik.values.twitter} onChange={formik.handleChange} onFocus={() => formik.setFieldTouched('twitter', true, true)} />
                        </div>
                        {formik.touched.twitter && formik.errors.twitter && <p className="text-xs mt-1 Cerebri-sans-book text-red-400">{formik.errors.twitter}</p>}
                    </div> 
                    <div className='my-4 pt-4 w-full' >
                        <p className='text-sm mb-1 font-Graphik-Medium '>Website URL</p> 
                        <div className="">
                            <Input className="bg-gray-100 mt-3" name="website" value={formik.values.website} onChange={formik.handleChange} onFocus={() => formik.setFieldTouched('website', true, true)} />
                        </div>
                        {formik.touched.website && formik.errors.website && <p className="text-xs mt-1 Cerebri-sans-book text-red-400">{formik.errors.website}</p>}
                    </div> 
                    <button onClick={submit} disabled={loading} style={{backgroundColor: '#1A8F85'}} className='w-full py-3 font-Graphik-Bold text-sm text-white rounded-md mt-8' >
                        {!loading && 'Update Information'}
                        {loading && <Spinner color="white" size="sm" />}
                    </button>
                </div>
            </div>
        </div>
    )
}

