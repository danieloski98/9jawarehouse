import React from 'react';
import { Input, InputGroup, InputLeftElement, Select } from '@chakra-ui/react'
import { states } from './index';
import { FormikContextType, FormikProps } from 'formik';

interface IProps {
    next: Function;
    states: states[];
    formik: FormikProps<{
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        address: '',
        country: '',
        state: '',
        business_name: '',
        business_description: '',
        instagram: '',
        facebook: '',
        whatsapp: '',
        twitter: '',
        website: '',
        lga: ''
    }>;
}

export default function PersonalInfo({ next, states, formik }: IProps) {

    const [lgas, setLgas] = React.useState([] as Array<string>);

    React.useMemo(() => {
        (async function() {
            const request = await fetch(`http://locationsng-api.herokuapp.com/api/v1/states/${formik.values.state}/lgas`);
            const json = await request.json() as Array<string>;
            setLgas(json);
        })()
    }, [formik.values.state])
  return (
    <div className="w-full h-auto flex flex-col">
        <p className="text-2xl font-light text-gray-600">Personal Information</p>
        <p className="text-sm font-semibold text-gray-500 mt-4">
        Fill out the following fields below with valid informations to enable customers to find you easily 
        </p>

        <div className="w-full flex xl:flex-row lg:flex-row md:flex-col sm:flex-col justify-between  mt-6 font-semibold text-sm text-gray-500">
            <div className="w-full">
                <label>Firstname</label>
                <div className="xl:w-11/12 lg:w-11/12 md:w-full sm:w-full">
                    <Input border="none" bgColor="whitesmoke" borderRadius={0} className="bg-gray-100 mt-3" name="first_name" value={formik.values.first_name} onChange={formik.handleChange} onFocus={() => formik.setFieldTouched('first_name', true, true)} />
                </div>
                {formik.touched.first_name && formik.errors.first_name && <p className="text-xs mt-1 font-light text-red-400">{formik.errors.first_name}</p>}
            </div>
            <div className="w-full xl:mt-0 lg:mt-0 md:mt-2 sm:mt-2">
                <label>Lastname</label>
                <div className="xl:w-11/12 lg:w-11/12 md:w-full sm:w-full">
                    <Input border="none" bgColor="whitesmoke" borderRadius={0} className="bg-gray-100 mt-3" name="last_name" value={formik.values.last_name} onChange={formik.handleChange} onFocus={() => formik.setFieldTouched('last_name', true, true)} />
                </div>
                {formik.touched.last_name && formik.errors.last_name && <p className="text-xs mt-1 font-light text-red-400">{formik.errors.last_name}</p>}
            </div>
        </div>

        <div className="w-full flex xl:flex-row lg:flex-row md:flex-col sm:flex-col justify-between mt-6 font-semibold text-sm text-gray-500">
            <div className="w-full">
                <label>Email</label>
                <div className="xl:w-11/12 lg:w-11/12 md:w-full sm:w-full">
                    <Input border="none" bgColor="whitesmoke" borderRadius={0} className="bg-gray-100 mt-3" name="email" value={formik.values.email} onChange={formik.handleChange} onFocus={() => formik.setFieldTouched('email', true, true)} />
                </div>
                {formik.touched.email && formik.errors.email && <p className="text-xs mt-1 font-light text-red-400">{formik.errors.email}</p>}
            </div>
            <div className="w-full xl:mt-0 lg:mt-0 md:mt-2 sm:mt-2">
                <label>Phone</label>
                <div className="w-full xl:w-11/12 lg:w-11/12 md:w-full sm:w-full">
                    <InputGroup>
                        <InputLeftElement>
                            <div className="flex items-center w-full h-full pt-6 pl-0 text-xs">
                            <span>+234</span>
                            </div>
                        </InputLeftElement>
                        <Input border="none" bgColor="whitesmoke" borderRadius={0} fontSize="xs" className="bg-gray-100 mt-3 " name="phone" value={formik.values.phone} onChange={formik.handleChange} onFocus={() => formik.setFieldTouched('phone', true, true)} />
                    </InputGroup>
                </div>
                {formik.touched.phone && formik.errors.phone && <p className="text-xs mt-1 font-light text-red-400">{formik.errors.phone}</p>}
            </div>
        </div>

        <div className="w-full flex xl:flex-row lg:flex-row md:flex-col sm:flex-col justify-between mt-6 font-semibold text-sm text-gray-500">
            <div className="w-full">
                <label>House / Business Address</label>
                <div className="xl:w-11/12 lg:w-11/12 md:w-full sm:w-full">
                    <Input border="none" bgColor="whitesmoke" borderRadius={0} className="bg-gray-100 mt-3" name="address" value={formik.values.address} onChange={formik.handleChange} onFocus={() => formik.setFieldTouched('address', true, true)} />
                </div>
                {formik.touched.address && formik.errors.address && <p className="text-xs mt-1 font-light text-red-400">{formik.errors.address}</p>}
            </div>
            <div className="w-full xl:mt-0 lg:mt-0 md:mt-2 sm:mt-2">
                <label>Country</label>
                <div className="xl:w-11/12 lg:w-11/12 md:w-full sm:w-full">
                    <Input disabled border="none" bgColor="whitesmoke" borderRadius={0} className="bg-gray-100 mt-3" name="country" value={formik.values.country} onChange={formik.handleChange} onFocus={() => formik.setFieldTouched('country', true, true)} />
                </div>
                {formik.touched.country && formik.errors.country && <p className="text-xs mt-1 font-light text-red-400">{formik.errors.country}</p>}
            </div>
        </div>

        <div className="w-full flex xl:flex-row lg:flex-row md:flex-col sm:flex-col justify-between mt-6 font-semibold text-sm text-gray-500">
            <div className="w-full">
                <label>State</label>
                <div className="xl:w-11/12 lg:w-11/12 md:w-full sm:w-full">
                    <Select border="none" bgColor="whitesmoke" borderRadius={0} className="bg-gray-100 mt-3" name="state" value={formik.values.state} onChange={formik.handleChange} onFocus={() => formik.setFieldTouched('state', true, true)}>
                        {states.map((item, index) => (
                            <option value={item.name} key={index.toString()}>{item.name}</option>
                        ))}
                    </Select>
                </div>
                {formik.touched.state && formik.errors.state && <p className="text-xs mt-1 font-light text-red-400">{formik.errors.state}</p>}
            </div>

            <div className="w-full">
            <label>LGA</label>
                <div className="xl:w-11/12 lg:w-11/12 md:w-full sm:w-full">
                    <Select border="none" bgColor="whitesmoke" borderRadius={0} className="bg-gray-100 mt-3" name="lga" value={formik.values.lga} onChange={formik.handleChange} onFocus={() => formik.setFieldTouched('lga', true, true)}>
                        {lgas.length > 0 && lgas.map((item, index) => (
                            <option value={item} key={index.toString()}>{item}</option>
                        ))}
                    </Select>
                </div>
                {formik.touched.lga && formik.errors.lga && <p className="text-xs mt-1 font-light text-red-400">{formik.errors.lga}</p>}
            </div>
        </div>

        <div className="w-full flex justify-end mt-6">
            <button onClick={() => next(2)} className="w-32 bg-themeGreen h-12 text-sm font-semibold text-white">Continue</button>
        </div>


    </div>
  );
}
