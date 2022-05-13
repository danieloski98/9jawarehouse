import React from 'react';
import { Input, InputGroup, InputLeftElement, Select } from '@chakra-ui/react'
import { states } from './index';
import { FormikContextType, FormikProps } from 'formik';
import { ILga, IState } from '../../utils/types/Lga&State';
import url from '../../utils/url';
import { IServerReturnObject } from '../../utils/types/serverreturntype';

interface IProps {
    next: Function;
    states: IState[];
    formik: FormikProps<{
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        business_address: '',
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
    } | any>;
}

export default function PersonalInfo({ next, states, formik }: IProps) {

    const [lgas, setLgas] = React.useState([] as Array<ILga>);

    React.useMemo(() => {
        (async function() {
            const request = await fetch(`${url}states/lgas/${formik.values.state}`);
            const json = await request.json() as IServerReturnObject;
            const lga = json.data as ILga[];
            setLgas(lga);
        })()
    }, [formik.values.state]);

  const nextPage = (page: number) => {
      //validate
      if (!formik.dirty) {
          alert('Fillin the form correctly to continue');
          return;
      }
      if (formik.errors.first_name || formik.errors.last_name || formik.errors.email || formik.errors.phone || formik.errors.business_address || formik.errors.country || formik.errors.state || formik.errors.lga) {
          alert('Please fillin the form correctly');
          return;
      } else {
          next(page);
      }
  }

  return (
    <div className="w-full h-auto flex flex-col">
        <p className="text-2xl Cerebri-sans-book text-gray-600">Personal Information</p>
        <p className="text-sm font-semibold text-gray-500 mt-4">
        Fill out the following fields below with valid information to enable customers to find you easily 
        </p>

        <div className="w-full flex xl:flex-row lg:flex-row md:flex-col sm:flex-col justify-between  mt-6 font-semibold text-sm text-gray-500">
            <div className="w-full">
                <label>First Name</label>
                <div className="xl:w-11/12 lg:w-11/12 md:w-full sm:w-full">
                    <Input disabled border="none" bgColor="whitesmoke" borderRadius={0} className="bg-gray-100 mt-3" name="first_name" value={formik.values.first_name} onChange={formik.handleChange} onFocus={() => formik.setFieldTouched('first_name', true, true)} />
                </div>
                {formik.touched.first_name && formik.errors.first_name && <p className="text-xs mt-1 Cerebri-sans-book text-red-400">{formik.errors.first_name}</p>}
            </div>
            <div className="w-full xl:mt-0 lg:mt-0 md:mt-2 sm:mt-2">
                <label>Last Name</label>
                <div className="xl:w-11/12 lg:w-11/12 md:w-full sm:w-full">
                    <Input disabled border="none" bgColor="whitesmoke" borderRadius={0} className="bg-gray-100 mt-3" name="last_name" value={formik.values.last_name} onChange={formik.handleChange} onFocus={() => formik.setFieldTouched('last_name', true, true)} />
                </div>
                {formik.touched.last_name && formik.errors.last_name && <p className="text-xs mt-1 Cerebri-sans-book text-red-400">{formik.errors.last_name}</p>}
            </div>
        </div>

        <div className="w-full flex xl:flex-row lg:flex-row md:flex-col sm:flex-col justify-between mt-6 font-semibold text-sm text-gray-500">
            <div className="w-full">
                <label>Email</label>
                <div className="xl:w-11/12 lg:w-11/12 md:w-full sm:w-full">
                    <Input disabled border="none" bgColor="whitesmoke" borderRadius={0} className="bg-gray-100 mt-3" name="email" value={formik.values.email} onChange={formik.handleChange} onFocus={() => formik.setFieldTouched('email', true, true)} />
                </div>
                {formik.touched.email && formik.errors.email && <p className="text-xs mt-1 Cerebri-sans-book text-red-400">{formik.errors.email}</p>}
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
                {formik.touched.phone && formik.errors.phone && <p className="text-xs mt-1 Cerebri-sans-book text-red-400">{formik.errors.phone}</p>}
            </div>
        </div>

        <div className="w-full flex xl:flex-row lg:flex-row md:flex-col sm:flex-col justify-between mt-6 font-semibold text-sm text-gray-500">
            <div className="w-full">
                <label>House or Business Address</label>
                <div className="xl:w-11/12 lg:w-11/12 md:w-full sm:w-full">
                    <Input border="none" bgColor="whitesmoke" borderRadius={0} className="bg-gray-100 mt-3" name="business_address" value={formik.values.business_address} onChange={formik.handleChange} onFocus={() => formik.setFieldTouched('address', true, true)} />
                </div>
                {formik.touched.business_address && formik.errors.business_address && <p className="text-xs mt-1 Cerebri-sans-book text-red-400">{formik.errors.business_address}</p>}
            </div>
            <div className="w-full xl:mt-0 lg:mt-0 md:mt-2 sm:mt-2">
                <label>Country</label>
                <div className="xl:w-11/12 lg:w-11/12 md:w-full sm:w-full">
                    <Input disabled border="none" bgColor="whitesmoke" borderRadius={0} className="bg-gray-100 mt-3" name="country" value={formik.values.country} onChange={formik.handleChange} onFocus={() => formik.setFieldTouched('country', true, true)} />
                </div>
                {formik.touched.country && formik.errors.country && <p className="text-xs mt-1 Cerebri-sans-book text-red-400">{formik.errors.country}</p>}
            </div>
        </div>

        <div className="w-full flex xl:flex-row lg:flex-row md:flex-col sm:flex-col justify-between mt-6 font-semibold text-sm text-gray-500">
            <div className="w-full">
                <label>State</label>
                <div className="xl:w-11/12 lg:w-11/12 md:w-full sm:w-full">
                    <Select border="none" bgColor="whitesmoke" borderRadius={0} fontSize="sm" className="bg-gray-100 mt-3" name="state" value={formik.values.state} onChange={formik.handleChange} onFocus={() => formik.setFieldTouched('state', true, true)}>
                        <option selected value="1">Select Your State</option>
                        {states !== undefined && states.map((item, index) => (
                            <option value={item.officialName} key={index.toString()}>{item.officialName}</option>
                        ))}
                    </Select>
                </div>
                {formik.touched.state && formik.errors.state && <p className="text-xs mt-1 Cerebri-sans-book text-red-400">{formik.errors.state}</p>}
            </div>

            <div className="w-full">
            <label>LGA</label>
                <div className="xl:w-11/12 lg:w-11/12 md:w-full sm:w-full">
                    <Select border="none" bgColor="whitesmoke" borderRadius={0} fontSize="sm" className="bg-gray-100 mt-3" name="lga" value={formik.values.lga} onChange={formik.handleChange} onFocus={() => formik.setFieldTouched('lga', true, true)}>
                    <option selected value="1">Select Your LGA</option>
                        {lgas !== undefined && lgas.length > 0 && lgas.map((item, index) => (
                            <option value={item.LGA} key={index.toString()}>{item.LGA}</option>
                        ))}
                    </Select>
                </div>
                {formik.touched.lga && formik.errors.lga && <p className="text-xs mt-1 Cerebri-sans-book text-red-400">{formik.errors.lga}</p>}
            </div>
        </div>

        <div className="w-full flex justify-end mt-6">
            <button onClick={() => nextPage(2)} className="w-32 bg-themeGreen h-12 text-sm font-semibold text-white">Continue</button>
        </div>


    </div>
  );
}
