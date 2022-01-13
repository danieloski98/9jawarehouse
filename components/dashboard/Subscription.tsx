import React from 'react';
import { AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogBody, AlertDialogCloseButton, Spinner } from '@chakra-ui/react'
import Image from 'next/image';
import Good from '../../public/images/good.svg';
import { useQuery } from 'react-query';
import url from '../../utils/url';
import { IServerReturnObject } from '../../utils/types/serverreturntype';
import SubscriptionShip from './components/SubscriptionShips';
import { FiEye, FiEyeOff } from 'react-icons/fi'

// redux
import { useSelector } from 'react-redux';
import { RootState } from '../../store'
import { ISubscription } from '../../utils/types/Subscriptions';
import { IUser } from '../../utils/types/user';


interface IProps {
    open: boolean;
    onClose: Function;
    user: IUser;
}

const SELECTED = 'xl:w-2/5 lg:w-2/5 md:2/4 sm:w-2/4 h-auto text-center p-5 flex flex-col border-2 border-yellow-300 rounded-md cursor-pointer mx-2';
const NOTSELECTED = 'xl:w-2/5 lg:w-2/5 md:2/4 sm:w-2/4 h-auto text-center p-5 flex flex-col border-2 border-gray-300 rounded-md mx-2 cursor-pointer';

const SubModal = ({ open, onClose, user }: IProps) => {
    const [stage, setStage] = React.useState(1);
    const [sel, setSel] = React.useState(1);
    const [loading, setLoading] = React.useState(false);
    
    const ref = React.useRef<any>();

    const pay = async () => {
        setLoading(true);
        const request = await fetch(`${url}payment`, {
            method: 'post',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({amount: 2000, id: user._id})
        });

        const json = await request.json() as IServerReturnObject;
        if (json.statusCode !== 200) {
            alert(json.errorMessage);
            return;
        }

        window.location = json.data.authorization_url;
    }

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
                                    <span className="text-xl font-light text-gray-500">N2,000</span><span className="font-semibold text-sm text-gray-500 ml-4">Monthly</span>
                                </div>
                            </div>

                            {/* <div onClick={() => setSel(2)} className={sel === 2 ? SELECTED:NOTSELECTED}>
                                <p className="font-light text-xl text-themeGreen">Yearly Plan</p>
                                <p className="font-semibold mt-4 text-sm text-gray-500">Save 20%  on this plan.
You will have all full access on this account to all features. Auto Renewal will be activated</p>
                                <div className="flex justify-center items-center mt-6">
                                    <span className="text-xl font-light text-gray-500">N10,000</span> <span className="font-semibold text-sm text-gray-500 ml-4">/ Month</span>
                                </div>
                            </div> */}

                        </div>

                        <div className="w-full flex justify-center mt-6">
                            <button onClick={pay} className="w-32 h-12 bg-themeGreen text-white text-sm font-li">
                                {loading && <Spinner size="md" color="white" />}
                                {!loading && <span>Renew</span>}
                            </button>
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

// get all subs function
const getSubs = async(id: string) => {
    const request = await fetch(`${url}payment/subscriptions/${id}`);
    const json = await request.json() as IServerReturnObject;

    if (!request.ok) {
        throw new Error(" An error occured");
    }

    return json;
}

export default function Subscription() {
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [subs, setSubs] = React.useState([] as Array<ISubscription>);
    const [error, setError] = React.useState(false);
    const user = useSelector((state: RootState) => state.UserReducer.user);
    const [show, setShow] = React.useState(false);

    // request
    const { refetch } = useQuery(['getSubscriptions'], () => getSubs(user._id), {
        onSuccess: (data) => {
            setSubs(data.data);
            setLoading(false);
            setError(false);
        },
        onError: (error) => {
            console.log(error);
            setLoading(false);
            setError(true)
        }
    })

    const retry = async () => {
        setLoading(true);
        setError(false);
        await refetch();
    }

  return (
    <div className="w-full h-full pb-10">

        {/* modals */}

        <SubModal open={open} onClose={() => setOpen(false)} user={user} />

        <div className="w-full h-auto flex flex-col bg-white px-10 py-10">
        <p className="text-xl font-Circular-std-medium text-gray-600 ">Subscription Status</p>
        {
            user.disabled && (
                <p className="text-sm font-Cerebri-sans-book text-gray-500 mt-4">You are currently not on any subscription plan, To Access all features you will need to upgrade to a monthly plan</p>
            )
        }

        {
            user.disabled && (
                <div className="w-full flex xl:flex-row lg:flex-row md:flex-col sm:flex-col mt-6">
                    <button onClick={() => setOpen(true)} className="xl:w-64 lg:w-64 md:w-full sm:w-full h-10 bg-themeGreen text-white font-Cerebri-sans-book text-sm mb-4">Choose Plan</button>
                    {/* <button className="xl:w-64 lg:w-64 md:w-full sm:w-full h-10 border-2 border-themeGreen text-themeGreen xl:ml-4  lg:ml-4 md:ml-0 sm:ml-0 font-semibold text-sm">Enable Auto Renewal</button> */}
                </div>
            )
        }
        {
            !user.disabled && (
                <div className="w-full mt-4">
                    <p className='font-Cerebri-sans-book'>Your subscription is active and will expire on <b>{new Date(user.nextPayment).toDateString()}</b></p>
                </div>
            )
        }

        {!loading && !error && subs.length > 0  && (
            <div className="w-full flex justify-between items-center mt-4">
                <p className="text-md font-Circular-std-medium text-gray-600">Subscription History</p>
                {show ? <FiEyeOff size={30} className='text-themeGreen cursor-pointer' onClick={() => setShow(prev => !prev)} /> : <FiEye size={30} className='text-themeGreen cursor-pointer' onClick={() => setShow(prev => !prev)} />}
            </div>
        )}

        {
            !loading && error && (
                <div className="w-full h-40 flex flex-col justify-center items-center">
                    <p className='font-Cerebri-sans-book mt-2 text-md'>An Error Occured</p>
                    <button onClick={retry} className='w-40 h-12 bg-themeGreen text-white text-sm font-Cerebri-sans-bookmt-2'>Retry</button>
                </div>
            )
        }
       
        {
            loading && (
                <div className="w-full h-40 flex flex-col justify-center items-center">
                    <Spinner size="lg" color="green" />
                    <p className='font-Cerebri-sans-book mt-2 text-md'>Loading Your Subscriptions</p>
                </div>
            )
        }

        {
            !loading && !error && subs.length < 1 && (
                <div className="w-full h-32 flex flex-col font-Cerebri-sans-book justify-center">
                    <p>You Currently do not have any subscription</p>
                </div>
            )
        }

        {
            !loading && !error && subs.length > 0 && show && (
                <>
                     <div className="xl:w-full lg:w-full md:w-auto sm:w-auto h-16 bg-gray-100 rounded-md flex justify-between items-center px-4 mt-6 text-md font-Cerebri-sans-book text-left">
                            <p>Date</p>
                            <p>Period</p>
                            <p>Amount</p>
                            <p>Status</p>
                    </div>

                    {subs.map((item, index) => (
                        <SubscriptionShip key={index.toString()} details={item} />
                    ))}
                </>
            )
        }


        </div>
    </div>
  );
}
