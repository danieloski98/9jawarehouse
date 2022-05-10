import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton, Spinner, Table, Thead, Tbody, Tr, Td } from '@chakra-ui/react'
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

const SELECTED = 'xl:w-2/5 lg:w-2/5 md:w-full sm:w-full h-auto overflow-auto text-center p-5 flex flex-col border-2 border-yellow-300 rounded-md cursor-pointer mx-2 h-56 md:mb-5 sm:mb-5';
const NOTSELECTED = 'xl:w-2/5 lg:w-2/5 md:w-full sm:w-full text-center p-5 flex flex-col border-2 border-gray-300 rounded-md mx-2 cursor-pointer h-auto overflow-auto md:mb-5 sm:mb-5';

const SubModal = ({ open, onClose, user }: IProps) => {
    const [stage, setStage] = React.useState(1);
    const [sel, setSel] = React.useState(0);
    const [amount, setAmount] = React.useState(0);
    const [loading, setLoading] = React.useState(false);
    
    const ref = React.useRef<any>();

    React.useEffect(() => {
        switch(sel) {
            case 1: {
                setAmount(5000);
                break;
            }
            case 2: {
                setAmount(10000);
                break;
            }
            case 3: {
                setAmount(20000);
                break;
            }
        }
    }, [sel])

    const pay = async () => {
        setLoading(true);
        const request = await fetch(`${url}payment?plan=${sel}`, {
            method: 'post',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({amount, id: user._id})
        });

        const json = await request.json() as IServerReturnObject;
        if (json.statusCode !== 200) {
            setLoading(false);
            alert(json.errorMessage);
            return;
        }

        window.location = json.data.authorization_url;
    }

    return (
        <Modal isOpen={open} onClose={() => onClose()} isCentered={false} size="5xl" closeOnEsc={false} closeOnOverlayClick={false}>
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton onClick={() => {onClose(); setStage(1)}} />
                <ModalBody>
                    {stage === 1 && (
                        <div className="w-full flex flex-col py-10">
                        <p className=" font-Circular-std-book text-xl text-gray-500 text-center">Select A Subscription Plan</p>
                        <div className="w-full flex justify-center ">
                            {/* <p className=" font-Cerebri-sans-book mt-4 text-center text-gray-600 text-sm w-4/5">By choosing a Subscription Plan you will have access to all feature, if your account doesnt meet our criteria we will make a refund back to you</p> */}
                        </div>

                        <div className="w-full flex xl:flex-row lg:flex-row md:flex-col sm:flex-col justify-center mt-6">

                            <div onClick={() => setSel(1)} className={sel === 1 ? SELECTED:NOTSELECTED}>
                                <h1 className=' font-bold text-xl text-themeGreen'>BRONZE MEMBERSHIP</h1>
                                <div className="flex justify-center items-center mt-1">
                                    <span className="font-semibold text-md text-gray-500">N5,000</span> <span className="font-semibold text-md text-gray-500 ml-1"> for 1 Month</span>
                                </div>
                                <ul className='font-Cerebri-sans-book mt-4 text-sm text-gray-500 list-decimal list-outside text-left px-2'>
                                    <li className='mt-2'>One weekly post each on instagram, facebook and twitter.</li>
                                    <li className='mt-2'>One weekly post each on instagram reels.</li>
                                    <li className='mt-2'>One instagram story weekly.</li>
                                </ul>
                               
                                
                            </div>

                            <div onClick={() => setSel(2)} className={sel === 2 ? SELECTED:NOTSELECTED}>
                                <h1 className='font-bold text-xl text-themeGreen'>SILVER MEMBERSHIP</h1>
                                <div className="flex justify-center items-center mt-1">
                                    <span className="font-semibold text-md text-gray-500">N10,000</span> <span className="font-semibold text-md text-gray-500 ml-1"> for 3 Month</span>
                                </div>
                               <ul className='font-Cerebri-sans-book mt-4 text-sm text-gray-500 list-decimal list-outside text-left px-2'>
                                    <li className='mt-2'>Two weekly post each on instagram, facebook and twitter.</li>
                                    <li className='mt-2'>Two weekly post each on instagram reels.</li>
                                    <li className='mt-2'>Two instagram each story weekly.</li>
                                    <li className='mt-2'>One video post on instagram and facebook weekly.</li>
                                    <li className='mt-2'>Access to mentorship and business materials, rebranding and sale strategies.</li>
                                </ul>

                            </div>

                            <div onClick={() => setSel(3)} className={sel === 3 ? SELECTED:NOTSELECTED}>
                                <h1 className='font-bold text-xl text-themeGreen'>GOLD MEMBERSHIP</h1>
                                <div className="flex justify-center items-center mt-1">
                                    <span className="font-semibold text-md text-gray-500 mr-1">N20,000  </span> <span className="font-semibold text-md text-gray-500"> for 6 Month</span>
                                </div>
                                <ul className='font-Cerebri-sans-book mt-4 text-sm text-gray-500 list-decimal list-outside text-left px-2'>
                                    <li className='mt-2'>Three weekly post each on instagram, facebook and twitter.</li>
                                    <li className='mt-2'>Three weekly post each on instagram reels and facebook story.</li>
                                    <li className='mt-2'>Three instagram story weekly.</li>
                                    <li className='mt-2'>Three video post each on instagram and facebook weekly.</li>
                                    <li className='mt-2'>Access to mentorship and business materials, rebranding and sale strategies.</li>
                                    <li className='mt-2'>Monthly business feature on instagram and facebook.</li>
                                    <li className='mt-2'>Opportunity to go live on 9jawarehouse instagram page to discuss business</li>
                                    <li className='mt-2'>Opportutnity to be selected for business funding* (Terms and conditions applied).</li>
                                    <li className='mt-2'>Two advertisements per month on our App (When our app launch).</li>
                                </ul>
                                
                            </div>

                        </div>

                        <div className="w-full flex justify-center mt-6">
                            {sel !== 0 && (
                                <button onClick={pay} className="w-32 h-12 bg-themeGreen text-white text-sm font-li">
                                    {loading && <Spinner size="md" color="white" />}
                                    {!loading && <span>Subscribe</span>}
                                </button>
                            )}
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
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

// get all subs function
const getSubs = async(id: string) => {
    console.log(id);
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
    const { refetch } = useQuery(['getSubscriptions', user._id], () => getSubs(user._id), {
        onSuccess: (data) => {
            console.log(data.data);
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
                <p className="text-sm font-Cerebri-sans-book text-gray-500 mt-4">You are currently not on any subscription plan, To Access all features you will need to Subscribe to a plan</p>
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
                    <p className='font-Cerebri-sans-book'>Your subscription is active and will expire on <b>{user.nextPayment !== null ? new Date(user.nextPayment).toDateString() : 'Invlaid date'}</b></p>
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

        {/* {
            !loading && !error && subs.length < 1 && (
                <div className="w-full h-32 flex flex-col font-Cerebri-sans-book justify-center">
                    <p>You Currently do not have any subscription</p>
                </div>
            )
        } */}

        {
            !loading && !error && subs.length > 0 && show && (
                <Table>
                     <Thead className="">
                            <Tr>
                                <Td>Date</Td>
                                <Td>Period</Td>
                                <Td>Amount</Td>
                                <Td>Status</Td>
                            </Tr>
                    </Thead>

                    <Tbody>
                        {subs.map((item, index) => (
                            <SubscriptionShip key={index.toString()} details={item} />
                        ))}
                    </Tbody>
                </Table>
            )
        }


        </div>
    </div>
  );
}
