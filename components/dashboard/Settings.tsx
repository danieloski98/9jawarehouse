import React from 'react';
import { Input, Spinner, InputGroup, InputRightElement } from '@chakra-ui/react'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import * as yup from 'yup'
import { useFormik } from 'formik'

// redux
import { RootState } from '../../store/index'
import { useSelector } from 'react-redux'
import url from '../../utils/url';
import { IServerReturnObject } from '../../utils/types/serverreturntype';

const validationSchema = yup.object({
    newpassword: yup.string().required(),
    oldpassword: yup.string().required(),
})

export default function Settings() {
  const [loading, setLoading] = React.useState(false);
  const [show1, setShow1] = React.useState(false);
  const [show2, setShow2] = React.useState(false);
  const user = useSelector((state: RootState) => state.UserReducer.user);
  const formik = useFormik({
      initialValues: {newpassword: '', oldpassword: ''},
      validationSchema,
      onSubmit: () => {},
  })

  const submit = async() => {
      if (!formik.dirty) {
          alert('Please fillin the form');
          return;
      }

      if (!formik.isValid) {
          alert('Please fillin the form correctly');
          return;
      }
      setLoading(true);
      const request = await fetch(`${url}auth/changepassword/${user._id}`, {
          method: 'post',
          headers: {
              'content-type': 'application/json'
          },
          body: JSON.stringify(formik.values),
      });

      const json = await request.json() as IServerReturnObject;

      if ( json.statusCode !== 200) {
          alert(json.errorMessage);
          setLoading(false);
          return;
      } else {
          alert(json.successMessage);
          setLoading(false);
          return;
      }
  }

  return (
    <div className="w-full h-auto flex flex-col bg-white p-5">
        <p className="text-2xl font-Circular-std-medium text-gray-600 ml-0">Settings</p>

        <div className="xl:w-5/6 lg:w-5/6 md:w-full sm:w-full xl:ml-5 lg:ml-5 md:ml-0 sm:ml-0 mt-6 py-8 border-b-2 border-gray-200 flex-col">
            <p className="text-lg font-Circular-std-book text-gray-600">Account</p>

            <div className="xl:w-2/4 lg:w-2/4 md:w-full sm:w-full flex flex-col mt-4">
                <p className="text-sm font-Circular-std-book text-gray-600">Email</p>

                <Input border="none" bgColor="whitesmoke" fontSize="sm" borderRadius={0} disabled className="bg-gray-100 mt-3 font-Circular-std-book" value={user.email} />
            </div>
        </div>

        <div className="xl:w-5/6 lg:w-5/6 md:w-full sm:w-full xl:ml-5 lg:ml-5 md:ml-0 sm:ml-0 mt-6 py-8 flex-col">
            <p className="text-lg font-Circular-std-book text-gray-600">Password</p>

            <div className="xl:w-2/4 lg:w-2/4 md:w-full sm:w-full flex flex-col mt-4">
                <p className="text-sm font-Circular-std-book text-gray-600">Current Password</p>

                <InputGroup>
                    <InputRightElement>
                        {show1 && <FiEyeOff color="grey" size={25} className='mt-5 cursor-pointer' onClick={() => setShow1(prev => !prev)} />}
                        {!show1 && <FiEye color="grey" size={25} className='mt-5 cursor-pointer' onClick={() => setShow1(prev => !prev)} />}
                    </InputRightElement>
                    <Input type={show1 ? 'text':'password'} border="none" bgColor="whitesmoke" borderRadius={0} className="bg-gray-100 mt-3 font-Circular-std-book" name="oldpassword" onChange={formik.handleChange} onBlur={formik.handleBlur} onFocus={() => formik.setFieldTouched('oldpassword', true, true)} />
                </InputGroup>
                {
                    formik.touched.oldpassword && formik.errors.oldpassword && (
                        <p className='mt-1 text-red-500 text-xs font-Circular-std-book'>{formik.errors.oldpassword}</p>
                    )
                }
            </div>

            <div className="xl:w-2/4 lg:w-2/4 md:w-full sm:w-full flex flex-col mt-4">
                <p className="text-sm font-Circular-std-book text-gray-600">New Password</p>

                <InputGroup>
                    <InputRightElement>
                        {show2 && <FiEyeOff color="grey" size={25} className='mt-5 cursor-pointer' onClick={() => setShow2(prev => !prev)} />}
                        {!show2 && <FiEye color="grey" size={25} className='mt-5 cursor-pointer' onClick={() => setShow2(prev => !prev)} />}
                    </InputRightElement>
                    <Input type={show2 ? 'text':'password'} border="none" bgColor="whitesmoke" borderRadius={0} className="bg-gray-100 mt-3 font-Circular-std-book" name="newpassword" onChange={formik.handleChange} onBlur={formik.handleBlur} onFocus={() => formik.setFieldTouched('newpassword', true, true)} />
                </InputGroup>
                {
                    formik.touched.newpassword && formik.errors.newpassword && (
                        <p className='mt-1 text-red-500 text-xs font-Circular-std-book'>{formik.errors.newpassword}</p>
                    )
                }
            </div>

            <button onClick={submit} className="w-1/4 mt-4 h-12 p-3 text-sm text-white font-Circular-std-book bg-themeGreen">
                {!loading && <span>Save</span>}
                {loading && <Spinner color="white" size="md" />}
            </button>
        </div>

    </div>
  );
}
