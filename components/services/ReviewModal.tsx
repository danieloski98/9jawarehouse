import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalBody, Input, Spinner, ModalCloseButton } from '@chakra-ui/react'
import { FiChevronLeft } from 'react-icons/fi'
import ReactStars from "react-rating-stars-component";
import { FiCamera, FiX } from 'react-icons/fi'

import Image from 'next/image';
import Good from '../../public/images/good.svg';

interface ICommentProps {
    change: Function; 
    formik: FormikProps<{fullname: '', email: '', comment: '', rating: 0}>;
    images: Array<string>;
    picker: Function;
    user: IUser;
}

// form
import * as yup from 'yup';
import { FormikProps, useFormik } from 'formik'
import url from '../../utils/url';
import { IServerReturnObject } from '../../utils/types/serverreturntype';
import { IComment } from '../../utils/types/comments';
import { IUser } from '../../utils/types/user';

// validation
const validationSchema = yup.object({
    fullname: yup.string().required(),
    email: yup.string().email().required(),
    rating: yup.number(),
    comment: yup.string().required(),
})

const CommentForm = ({formik, change, images, picker, user}: ICommentProps) => {
    const ratingChanged = (newRating: any) => {
        formik.setFieldValue('rating', newRating, false);
      };
    return (
        <div className="w-full flex flex-col p-5">
                    <p className="font-light text-xl text-themeGreen text-center">Write a Review for {user.business_name}</p>
                    <p className="font-light text-sm mt-3 text-center">You can only leave a review about this business if you have previously worked with them</p>

                    <div className="w-full h-auto flex xl:flex-row lg:flex-row md:flex-col sm:flex-col mt-6">
                        <div className="flex-1">
                            <div className="flex flex-col">
                                <label>Email</label>
                                <Input border="none" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} onFocus={() => formik.setFieldTouched('email', true, true)} bgColor="whitesmoke" borderRadius="0" />
                                {formik.touched.email && formik.errors.email && (
                                    <p className="text-sm font-semibold text-red-500 mt-2">{formik.errors.email}</p>
                                )}
                            </div>

                            <div className="flex flex-col mt-4">
                                <label>Full name</label>
                                <Input border="none" bgColor="whitesmoke" borderRadius="0" name="fullname" value={formik.values.fullname} onChange={formik.handleChange} onBlur={formik.handleBlur} onFocus={() => formik.setFieldTouched('fullname', true, true)} />
                                {formik.touched.fullname && formik.errors.fullname && (
                                    <p className="text-sm font-semibold text-red-500 mt-2">{formik.errors.fullname}</p>
                                )}
                            </div>

                            <div className="flex flex-col mt-4">
                                <label>Comment</label>
                                <textarea className="w-full h-20 bg-gray-100 p-2" name="comment" value={formik.values.comment} onChange={formik.handleChange} onBlur={formik.handleBlur} onFocus={() => formik.setFieldTouched('comment', true, true)}></textarea>
                                {formik.touched.comment && formik.errors.comment && (
                                    <p className="text-sm font-semibold text-red-500 mt-2">{formik.errors.comment}</p>
                                )}
                            </div>
                        </div>

                        {/* rating component */}

                        <div className="flex-1  xl:pl-16 lg:pl-16 md:pl-0 sm:pl-0 flex flex-col md:mt-8 sm:mt-8">
                            <p className="font-light text-md text-themeGreen">Give some stars</p>
                            <div>
                            <ReactStars
                                count={5}
                                
                                onChange={ratingChanged}
                                size={20}
                                activeColor="#ffd700"
                                value={3}
                                isHalf={true}
                                />
                                </div>

                                {
                                    images.length < 1 && (
                                        <div className="mt-8">
                                            <p className="text-md text-gray-500 font-light">Upload Pictures (Optional)</p>
                                            <button onClick={() => picker()} className="w-full h-12 bg-green-100 text-themeGreen mt-2">Tap To Upload Picture</button>
                                        </div>
                                    )   
                                }


                                <div className="w-auto h-16 overflow-x-scroll overflow-y-hidden flex mt-6 ">

                                {/* {images.length < 1 && (
                                    <div onClick={() => picker(1)} className=" w-16 h-full bg-gray-200 flex justify-center items-center mr-4 cursor-pointer">
                                        <FiCamera size={35} color="grey" />
                                    </div>
                                )}      */}
                                {images.length > 0 && images.map((item, index) => (
                                    <>
                                        <div key={index.toString()} className=" w-16 h-full bg-gray-200 flex justify-center items-center mr-4 cursor-pointer">
                                            <Image src={item} alt="img" width="100" height="100" className="object-contain" />
                                        </div>
                                    </>
                                ))}    
                                {images.length > 0 && images.length < 3 && (
                                    <div onClick={() => picker()} className=" w-16 h-full bg-gray-200 flex justify-center items-center mr-4 cursor-pointer">
                                        <FiCamera size={35} color="grey" />
                                    </div>
                                )}       

                                </div>
                        </div>

                    </div>

                    <div className="w-full h-10 flex justify-center mt-6">
                        <button onClick={() => change(2)} className="w-96 text-white text-sm bg-themeGreen">Send Review</button>
                    </div>
                    {/* <p className="font-light text-md mt-6 text-themeGreen text-center">Cancel</p> */}
                </div>
    )
}

const PinComponent = ({change, changePin, submit, loading, close}:{ change: Function, changePin: Function, submit: Function, loading: boolean, close: Function }) => {
    return (
        <div className="w-full flex flex-col py-6">
            <div className="w-full flex cursor-pointer" onClick={() => change(1)}>
                <FiChevronLeft size={25} color="grey" />
                <p className="text-md font-light ml-6">Back</p>
            </div>

            <p className="font-light text-xl text-themeGreen text-center mt-8">Verify Business/ vendor PIN</p>
            <p className="font-light text-sm mt-3 text-center">Enter 4 digit PIN from Limmer Makeover to approve your comments</p>

            <div className="w-full flex justify-center h-auto mt-6">
                <div className="xl:w-2/4 lg:w-2/4 md:w-full sm:w-full h-full">
                    <Input border="none" bgColor="whitesmoke" borderRadius="0" onChange={(e) => changePin(e.target.value)} />

                    <div className="w-full h-10 flex justify-center mt-6">
                        <button onClick={() => submit()} className="w-96 text-white text-sm bg-themeGreen">
                            {!loading && (
                                <span>Verify Pin</span>
                            )}
                            {loading && (
                                <Spinner color="white" size="lg" />
                            )}
                        </button>
                    </div>

                    <p className="font-light text-md mt-6 text-themeGreen text-center cursor-pointer" onClick={() => close()}>Cancel</p>

                </div>
            </div>

        </div>
    )
}


interface IProps {
    open: boolean;
    setOpen: Function;
    id: string;
    user: IUser;
}

export default function ReviewModal({ open, setOpen, id, user }: IProps) {
    const [stage, setStage] = React.useState(1);
    const [imgfiles, setFiles] = React.useState([] as Array<any>);
    const [images, setImages] = React.useState([] as Array<string>);
    const [pin, setPin] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    let fileReader = React.useRef(new FileReader).current;
     const picker = document.getElementById('picker');

    const formik: any = useFormik({
        initialValues: {fullname: '', email: '', comment: '', rating: 0},
        validationSchema,
        onSubmit: () => {},
    });

    // React.useEffect(() => {
    //     return () => {
    //         formik.resetForm();
    //     }
    // });

    React.useEffect(() => {
        fileReader.addEventListener('load', () => {
            const imgs = [...images, fileReader.result];
            setImages(imgs as Array<string>);
        });
        return () => {
            fileReader.removeEventListener('load', () => {});
        }
    }, [fileReader, images]);


     const pickImages = (call: number) => {
        picker?.click();
    }

    const changePin = (value: string) => {
        setPin(value);
    }


    const fileProcessor = (files: any[]) => {
        const imgs = [...imgfiles, files[0]];
        setFiles(imgs);
        fileReader.readAsDataURL(files[0]);
    }

    const submit = async () => {
        if (!formik.dirty) {
            alert('Filling the form to continue');
            return;
        }
        if (!formik.isValid) {
            alert('Please filling the form correctly');
            return;
        }

        setLoading(true);
        // submit the form
        const formData = new FormData();

        const request = await fetch(`${url}comments/${id}/${pin}`, {
            method: 'post',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(formik.values)
        });

        const json1 = await request.json() as IServerReturnObject;
        if (json1.statusCode !== 200) {
            setLoading(false);
            alert(json1.errorMessage);
            return;
        }else {
            // upload images
            if (images.length > 0) {
                const d = json1.data as IComment;
                const _id = d._id;

                imgfiles.map((item, index) => {
                    formData.append('file', item);
                })

                // upload images
                const request2 = await fetch(`${url}comments/uploads/${_id}`, {
                    method: 'post',
                    body: formData,
                });
                const jj = await request2.json() as IServerReturnObject;

                if(jj.statusCode !== 200) {
                    alert(jj.errorMessage);
                    setLoading(false);
                    return
                }else {
                    alert(jj.successMessage);
                    setLoading(false);
                    setStage(3);
                    return
                }
            } else {
                alert(json1.successMessage);
                setLoading(false);
                close();
            }
        }
    }
    const close = () => {
        setOpen(false);
    }


  return (
    <Modal isOpen={open} onClose={() => {setOpen(false); setStage(1)}} size={stage === 3 ? 'xl':"3xl"} >
        <input type="file" accept="image/*" id="picker" hidden onChange={(e) => fileProcessor(e.target.files as any)} />
        <ModalOverlay />
        <ModalContent>
            <ModalCloseButton />
            <ModalBody>
                {stage === 1 && <CommentForm user={user} change={setStage} formik={formik} images={images} picker={pickImages} />}
                {stage === 2 && <PinComponent change={setStage} changePin={changePin} submit={submit} loading={loading} close={close} />}
                {stage === 3 && (
                        <div className="w-full h-auto py-20 flex flex-col justify-center items-center">
                            <Image src={Good} alt="good" className="w-24 h-24" />
                            <p className="mt-6 text-xl font-semibold text-gray-600">Review Sent!</p>
                            <p className="font-light text-sm mt-3 text-gray-500">Your review have been sent to the admin for approval</p>
                        </div>
                    )}
            </ModalBody>
        </ModalContent>
    </Modal>
  );
}
