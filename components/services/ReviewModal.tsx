import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalBody, Input } from '@chakra-ui/react'
import { FiChevronLeft } from 'react-icons/fi'
import ReactStars from "react-rating-stars-component";

import Image from 'next/image';
import Good from '../../public/images/good.svg';

const CommentForm = (props: {change: Function}) => {
    const ratingChanged = (newRating: any) => {
        console.log(newRating);
      };
    return (
        <div className="w-full flex flex-col p-5">
                    <p className="font-light text-xl text-themeGreen text-center">Write a Review for Limmer makeover</p>
                    <p className="font-light text-sm mt-3 text-center">You can only leave a review about this business if you have previously worked with them</p>

                    <div className="w-full h-auto flex xl:flex-row lg:flex-row md:flex-col sm:flex-col mt-6">
                        <div className="flex-1">
                            <div className="flex flex-col">
                                <label>Email</label>
                                <Input border="none" bgColor="whitesmoke" borderRadius="0" />
                            </div>

                            <div className="flex flex-col mt-4">
                                <label>Full name</label>
                                <Input border="none" bgColor="whitesmoke" borderRadius="0" />
                            </div>

                            <div className="flex flex-col mt-4">
                                <label>Comment</label>
                                <textarea className="w-full h-20 bg-gray-100 p-2"></textarea>
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

                                <div className="mt-8">
                                    <p className="text-md text-gray-500 font-light">Upload Pictures (Optional)</p>
                                    <button className="w-full h-12 bg-green-100 text-themeGreen mt-2">Tap To Upload Picture</button>
                                </div>
                        </div>

                    </div>

                    <div className="w-full h-10 flex justify-center mt-6">
                        <button onClick={() => props.change(2)} className="w-96 text-white text-sm bg-themeGreen">Send Review</button>
                    </div>
                    <p className="font-light text-md mt-6 text-themeGreen text-center">Cancel</p>
                </div>
    )
}

const PinComponent = (props:{ change: Function }) => {
    return (
        <div className="w-full flex flex-col py-6">
            <div className="w-full flex">
                <FiChevronLeft size={25} color="grey" />
                <p className="text-md font-light ml-6">Back</p>
            </div>

            <p className="font-light text-xl text-themeGreen text-center mt-8">Verify Business/ vendor PIN</p>
            <p className="font-light text-sm mt-3 text-center">Enter 6 digit PIN from Limmer Makeover to approve your comments</p>

            <div className="w-full flex justify-center h-auto mt-6">
                <div className="xl:w-2/4 lg:w-2/4 md:w-full sm:w-full h-full">
                    <Input border="none" bgColor="whitesmoke" borderRadius="0" />

                    <div className="w-full h-10 flex justify-center mt-6">
                        <button onClick={() => props.change(3)} className="w-96 text-white text-sm bg-themeGreen">Verify Pin</button>
                    </div>

                    <p className="font-light text-md mt-6 text-themeGreen text-center cursor-pointer">Cancel</p>

                </div>
            </div>

        </div>
    )
}

interface IProps {
    open: boolean;
    setOpen: Function;
}

export default function ReviewModal({ open, setOpen }: IProps) {
    const [stage, setStage] = React.useState(1);

  return (
    <Modal isOpen={open} onClose={() => {setOpen(false); setStage(1)}} size={stage === 3 ? 'xl':"3xl"} >
        <ModalOverlay />
        <ModalContent>
            <ModalBody>
                {stage === 1 && <CommentForm change={setStage} />}
                {stage === 2 && <PinComponent change={setStage} />}
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
