import React from 'react';
import { FiUser, FiStar, FiDollarSign, FiSettings, FiHelpCircle } from 'react-icons/fi'
import { Spinner } from '@chakra-ui/react'
import Link from 'next/link'
import { User, Star, Setting, TimeCircle, InfoCircle } from 'react-iconly'

// redux
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store/index'
import { updateUser } from '../../reducers/User.reducer'
import { updatePin } from '../../reducers/pin.reducer'

import { IServerReturnObject } from '../../utils/types/serverreturntype';
import { IUser } from '../../utils/types/user';
import url from '../../utils/url';

const ACTIVE = 'flex justify-between border-r-4 border-themeGreen h-12 text-themeGreen cursor-pointer';
const INACTIVE = 'flex justify-between h-12 text-gray-500 hover:bg-gray-100 cursor-pointer'

interface IProps {
    page: number;
    setPage: Function;
}

export default function Sidebar({page, setPage}: IProps) {
    const userDetails = useSelector((state: RootState) => state.UserReducer.user);
    const pin = useSelector((state: RootState) => state.PinReducer.pin);
    const dispatch = useDispatch();

    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        (async function() {
            if (userDetails.pin) {
                // fetch new Pin
                const request = await fetch(`${url}pin/${userDetails._id}`);
                const json = await request.json() as IServerReturnObject;

                if (json.statusCode !== 200) {
                    alert(json.errorMessage);
                    setLoading(false);
                    return;
                }
              
                dispatch(updatePin(json.data.code));

                setLoading(false);
            } else {
                setLoading(false);
            }
        })()
    });

    const generatePin = async () => {
        setLoading(true);
        const request = await fetch(`${url}pin/generate/${userDetails._id}`, {
            method: 'post',
        });

        const json = await request.json() as IServerReturnObject;
        const user = json.data.user as IUser;
        const code = json.data.pin;

        if (json.statusCode !== 200) {
                    alert(json.errorMessage);
                    setLoading(false);
                    return;
                }

        dispatch(updateUser(user));
        dispatch(updatePin(code));

        setLoading(false);
    }

  return (
    <div className="w-full h-auto flex flex-col pb-10 z-10">

        <div className="w-full flex flex-col py-6 bg-white">
            <p className="mt-6 ml-6 text-md font-Circular-std-medium text-gray-500 mb-8">Quick Menu</p>

            <div className={page === 1 ? ACTIVE:INACTIVE} onClick={() => setPage(1)}>
                <div className="flex items-center pl-6">
                    <User size={25} primaryColor='grey' filled />
                    <p className="ml-4 text-sm font-Cerebri-sans-book ">Profile</p>
                </div>
            </div>

            <div className={page === 2 ? ACTIVE:INACTIVE} onClick={() => setPage(2)}>
                <div className="flex items-center pl-6">
                    <Star size={25} filled primaryColor='grey' />
                    <p className="ml-4 text-sm font-Cerebri-sans-book ">Customer Reviews</p>
                </div>
            </div>

            {/* <div className={page === 3 ? ACTIVE:INACTIVE} onClick={() => setPage(3)}>
                <div className="flex items-center pl-6">
                    <TimeCircle size={25} filled primaryColor='grey' />
                    <p className="ml-4 text-sm font-Cerebri-sans-book  ">Subscriptions</p>
                </div>
            </div> */}

            <div className={page === 4 ? ACTIVE:INACTIVE} onClick={() => setPage(4)}>
                <div className="flex items-center pl-6">
                    <Setting size={25} primaryColor="grey" filled />
                    <p className="ml-4 text-sm font-Cerebri-sans-book ">Settings</p>
                </div>
            </div>

            {
                userDetails.pin && (
                    <div className="w-11/12 mt-5 flex items-center font-Cerebri-sans-book  justify-center mx-3 h-12 bg-green-100 text-green-600">
                        {!loading && <span>PIN - {pin}</span>}
                        {loading && <Spinner color="white" size="lg" />}
                    </div>
                )
            }


            {
                !userDetails.pin && (
                    <button onClick={generatePin} className="w-11/12 mt-5 flex items-center justify-center mx-3 h-12 bg-green-100 font-Cerebri-sans-book  text-green-600">
                       {!loading && <span>Generate PIN</span>}
                       {loading && <Spinner color="white" size="lg" />}
                    </button>
                )
            }
        </div>

        <div className="w-full h-auto bg-white mt-6 flex flex-col p-6">

            <div className="w-full flex">
                <InfoCircle size={20} primaryColor="grey" />
                <p className="ml-4 text-md font-Cerebri-sans-book ">Help Center</p>
            </div>

                <Link href="/faqs" passHref >
                    <p className="mt-3 p-3 h-12 cursor-pointer bg-themeGreen text-white text-sm font-Cerebri-sans-book  flex justify-center items-center">
                        FAQ
                    </p>
                </Link>

            <p className="ml-0 text-md font-Cerebri-sans-book  mt-8">For Further Assistance </p>

            <Link href="/contactus" passHref>
                <p className="mt-3 p-3 h-12 cursor-pointer bg-themeGreen text-white text-sm font-Cerebri-sans-book  flex justify-center items-center">
                    Contact Support
                </p>
            </Link>

            

        </div>


    </div>
  );
}
