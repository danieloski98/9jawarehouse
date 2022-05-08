import React from 'react'
import {Input, Textarea} from '@chakra-ui/react'
import { FormikProps } from 'formik'

interface IProps {
    formik: FormikProps<{first_name: '', last_name: '', business_name: '', business_description: ''}>;
    nextStep: Function;
}

export default function Form({formik, nextStep}: IProps) {
  return (
    <div className='xl:w-4/6 lg:w-4/6 md:w-full sm:w-full flex h-auto xl:items-end lg:items-end md:items-start sm:items-start mt-6 xl:flex-col lg:flex-col md:flex-col sm:flex-col'>
        <div className="w-full flex">
            <div className="flex flex-col flex-1 mr-10">
                <label className=' font-Circular-std-book text-black mb-3'>First Name</label>
                <Input borderWidth={0} height="63px" bg="#F1EEEE" borderRadius={0} name="first_name" value={formik.values.first_name} onChange={formik.handleChange} onBlur={formik.handleBlur} onFocus={() => formik.setFieldTouched('first_name', true, true)} />
                {
                    formik.touched.first_name && formik.errors.first_name && (
                        <p className='text-sm text-red-400 mt-2 font-Circular-std-book'>{formik.errors.first_name}</p>
                    )
                }
            </div>
            <div className="flex flex-col flex-1">
                <label className=' font-Circular-std-book text-black mb-3'>Last Name</label>
                <Input borderWidth={0} height="63px" bg="#F1EEEE" borderRadius={0} name="last_name" value={formik.values.last_name} onChange={formik.handleChange} onBlur={formik.handleBlur} onFocus={() => formik.setFieldTouched('last_name', true, true)} />
                {
                    formik.touched.last_name && formik.errors.last_name && (
                        <p className='text-sm text-red-400 mt-2 font-Circular-std-book'>{formik.errors.last_name}</p>
                    )
                }
            </div>
        </div>

        <div className="w-full flex flex-col mt-5">
            <label className=' font-Circular-std-book text-black mb-3'>Business Name</label>
            <Input borderWidth={0} height="63px" bg="#F1EEEE" borderRadius={0} name="business_name" value={formik.values.business_name} onChange={formik.handleChange} onBlur={formik.handleBlur} onFocus={() => formik.setFieldTouched('business_name', true, true)} />
            {
                formik.touched.business_name && formik.errors.business_name && (
                    <p className='text-sm text-red-400 mt-2 font-Circular-std-book'>{formik.errors.business_name}</p>
                )
            }
        </div>

        <div className="w-full flex flex-col mt-5">
            <label className=' font-Circular-std-book text-black mb-3'>Business Description</label>
            <Textarea borderWidth={0} height="63px" bg="#F1EEEE" borderRadius={0} name="business_description" value={formik.values.business_description} onChange={formik.handleChange} onBlur={formik.handleBlur} onFocus={() => formik.setFieldTouched('business_description', true, true)} />
            {
                formik.touched.business_description && formik.errors.business_description && (
                    <p className='text-sm text-red-400 mt-2 font-Circular-std-book'>{formik.errors.business_description}</p>
                )
            }
        </div>

        <div className="w-full flex mt-6 mb-6">
            <div className="flex flex-col flex-1 mr-10">
                {/* <label className=' font-Circular-std-book text-black mb-3'>Firstname</label>
                <Input borderWidth={0} height="63px" bg="#F1EEEE" borderRadius={0} /> */}
            </div>
            <div className="flex flex-col flex-1">
                <button onClick={() => nextStep()} className="w-full h-16 xl:mt-0 lg:mt-0 md:mt-4 sm:mt-4 bg-themeGreen text-white cursor-pointer flex items-center justify-center">
                    Next
                </button>
            </div>
        </div>
    </div>
  )
}
