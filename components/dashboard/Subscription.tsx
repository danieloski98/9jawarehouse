import React from 'react';
import { AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogBody, AlertDialogCloseButton } from '@chakra-ui/react'
import Image from 'next/image';
import Good from '../../public/images/good.svg';


interface IProps {
    open: boolean;
    onClose: Function;
}

const SELECTED = 'xl:w-2/5 lg:w-2/5 md:2/4 sm:w-2/4 h-auto text-center p-5 flex flex-col border-2 border-yellow-300 rounded-md cursor-pointer mx-2';
const NOTSELECTED = 'xl:w-2/5 lg:w-2/5 md:2/4 sm:w-2/4 h-auto text-center p-5 flex flex-col border-2 border-gray-300 rounded-md mx-2 cursor-pointer';

const SubModal = ({ open, onClose }: IProps) => {
    const [stage, setStage] = React.useState(1);
    const [sel, setSel] = React.useState(1);
    
    const ref = React.useRef<any>();

    return (
        <AlertDialog isOpen={open} onClose={() => onClose()} isCentered leastDestructiveRef={ref} size={stage === 1 ? '2xl':'xl'} closeOnEsc={false} closeOnOverlayClick={false}>
            <AlertDialogOverlay />
            <AlertDialogContent>
                <AlertDialogCloseButton onClick={() => {onClose(); setStage(1)}} />
                <AlertDialogBody>
                    {stage === 1 && (
                        <div className="w-full flex flex-col py-10">
                        <p className="font-semibold text-xl text-gray-500 text-center">Select A Subscription Plan</p>
                        <div className="w-full flex justify-center ">
                            <p className="font-light mt-4 text-center text-gray-600 text-sm w-4/5">By choosing a Subscription Plan you will have access to all feature, if your account doesnt meet our criteria we will make a refund back to you</p>
                        </div>

                        <div className="w-full flex justify-center mt-6">

                            <div onClick={() => setSel(1)} className={sel === 1 ? SELECTED:NOTSELECTED}>
                                <p className="font-light text-xl text-themeGreen">Monthly Plan</p>
                                <p className="font-semibold mt-4 text-sm text-gray-500">You will have all full access on this account to all features. Auto Renewal will be activated </p>
                                <div className="flex justify-center items-center mt-6">
                                    <span className="text-xl font-light text-gray-500">N1,000</span> <span className="font-semibold text-sm text-gray-500 ml-4">/ Month</span>
                                </div>
                            </div>

                            <div onClick={() => setSel(2)} className={sel === 2 ? SELECTED:NOTSELECTED}>
                                <p className="font-light text-xl text-themeGreen">Yearly Plan</p>
                                <p className="font-semibold mt-4 text-sm text-gray-500">Save 20%  on this plan.
You will have all full access on this account to all features. Auto Renewal will be activated</p>
                                <div className="flex justify-center items-center mt-6">
                                    <span className="text-xl font-light text-gray-500">N10,000</span> <span className="font-semibold text-sm text-gray-500 ml-4">/ Month</span>
                                </div>
                            </div>

                        </div>

                        <div className="w-full flex justify-center mt-6">
                            <button onClick={() => setStage(2)} className="w-32 h-12 bg-themeGreen text-white text-sm font-li">Renew</button>
                        </div>
                    </div>
                    )}
                    {stage === 2 && (
                        <div className="w-full h-auto py-20 flex flex-col justify-center items-center">
                            <Image src={Good} alt="good" className="w-24 h-24" />
                            <p className="mt-6 text-xl font-semibold text-gray-600">Transaction Successful</p>
                            <p className="font-light text-sm mt-3 text-gray-500">You have successfully Renewed your Plan, Enjoy!</p>
                        </div>
                    )}
                </AlertDialogBody>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default function Subscription() {
    const [open, setOpen] = React.useState(false);
  return (
    <div className="w-full h-full pb-10">

        {/* modals */}

        <SubModal open={open} onClose={() => setOpen(false)} />

        <div className="w-full h-auto flex flex-col bg-white p-5">
        <p className="text-2xl font-light text-gray-600 ">Subscriptions</p>
        <p className="text-sm font-semibold text-gray-500 mt-4">You are currently on monthly plan, To Access all features you will need to upgrade to pro plan. Learn more</p>

        <div className="w-full flex xl:flex-row lg:flex-row md:flex-col sm:flex-col mt-6">
            <button onClick={() => setOpen(true)} className="xl:w-64 lg:w-64 md:w-full sm:w-full h-10 bg-themeGreen text-white font-semibold text-sm mb-4">Change Plan</button>
            <button className="xl:w-64 lg:w-64 md:w-full sm:w-full h-10 border-2 border-themeGreen text-themeGreen xl:ml-4  lg:ml-4 md:ml-0 sm:ml-0 font-semibold text-sm">Cancel Auto Renewal</button>
        </div>

        <p className="text-2xl font-light text-gray-600 mt-6">History</p>

        <div className="w-full overflow-auto">
            <div className="xl:w-full lg:w-full md:w-auto sm:w-auto h-16 bg-gray-100 rounded-md flex justify-between items-center px-4 mt-6 text-md font-light text-left">
                <p>Date</p>
                <p>Period</p>
                <p>Amount</p>
                <p>Status</p>
            </div>

            <div className="w-full h-16 rounded-md flex justify-between items-center xl:px-4 lg:px-4 md:px-0 sm:px-0 mt-4 mb-4 text-sm font-semibold">
                <p className="flex-1">{new Date().toDateString()}</p>
                <p className="flex-1">Monthly</p>
                <p className="flex-1">1,000</p>
                <button className="w-20 h-12 bg-green-100 text-themeGreen ">Active</button>
            </div>

            <div className="w-full h-16 rounded-md flex justify-between items-center xl:px-4 lg:px-4 md:px-0 sm:px-0 mt-4 mb-4 text-sm font-semibold">
                <p className="flex-1">{new Date().toDateString()}</p>
                <p className="flex-1">Monthly</p>
                <p className="flex-1">1,000</p>
                <button className="w-20 h-12 bg-green-100 text-themeGreen ">Active</button>
            </div>

            <div className="w-full h-16 rounded-md flex justify-between items-center xl:px-4 lg:px-4 md:px-0 sm:px-0 mt-4 mb-4 text-sm font-semibold">
                <p className="flex-1">{new Date().toDateString()}</p>
                <p className="flex-1">Monthly</p>
                <p className="flex-1">1,000</p>
                <button className="w-20 h-12 bg-green-100 text-themeGreen ">Active</button>
            </div>
        </div>

        </div>
    </div>
  );
}
