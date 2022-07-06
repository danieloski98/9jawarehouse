import React from 'react';
import EditProfile from '../components/dashboard/EditProfile';
import Profile from '../components/dashboard/Profile';
import Reviews from '../components/dashboard/Reviews';
import Settings from '../components/dashboard/Settings';
import Sidebar from '../components/dashboard/Sidebar';
import Subscription from '../components/dashboard/Subscription';
import Navbar from '../components/general/Navbar';
import { Modal, ModalOverlay, ModalContent, ModalBody, Spinner, useToast, ModalCloseButton, Input } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { queryClient } from './_app'
import Lottie from 'react-lottie-player';

// lottie file
import Pin from '../public/lottie/secondlf30_editor_tneex5bs.json';
import Sub from '../public/lottie/new1lf30_editor_75l0pyex.json';

// redux
import { RootState } from '../store/index'
import { updateUser } from '../reducers/User.reducer';
import { updatetoken } from '../reducers/Token.reducer';
import { updatePin } from '../reducers/pin.reducer'
import { login } from '../reducers/logged'
import { useDispatch, useSelector } from 'react-redux'
import url from '../utils/url';
import { IServerReturnObject } from '../utils/types/serverreturntype';
// import { socket } from '../utils/WebSocket';
import { pusher } from '../utils/Pusher';
import Footer from '../components/Home/Footer';
import { useQuery } from 'react-query';
import { IUser } from '../utils/types/user';
// import Footer from '../components/Home/Footer';
const getUser = async (_id: string) => {
    const request = await fetch(`${url}user/${_id}`);
    const json = await request.json() as IServerReturnObject;
    if (!request.ok) {
        throw new Error('An Error occured');
    }
    return json;
}

const INA = "z-10 h-auto xl:mt-2 lg:mt-2 md:mt-16 sm:mt-16 overflow-auto bg-gray-100 xl:py-10 lg:p-10 md:p-5 sm:p-5 flex justify-between";
const AC = "z-10 h-auto xl:mt-20 lg:mt-20 md:mt-16 sm:mt-16 overflow-auto bg-gray-100 xl:py-10 lg:p-10 md:p-5 sm:p-5 flex justify-between"

export default function Dashboard() {

  const [page, setPage] = React.useState(1 as number);
  const [loading, setLoading] = React.useState(true);
  const [pinloadin, setPinloading] = React.useState(false);
  const [pinmodal, setPinmodal] = React.useState(false);
  const [submodal, setSubmodal] = React.useState(false);
  const [verifyModal, setVerifyModal] = React.useState(false);
  const [code, setCode] = React.useState('');
  const [vloading, setVLoading] = React.useState(false);


  const user = useSelector((state: RootState) => state.UserReducer.user);
  const Toast = useToast();
  const router = useRouter();
  const dispatch = useDispatch();

  const query = useQuery(['getUserDetails', user._id], () => getUser(user._id), {
      refetchOnMount: true,
      onSuccess: (data) => {
          if (data.statusCode !== 200) {
            setLoading(false);
            router.push('/');
            alert(data.errorMessage);
            setLoading(false);
            return
          }
            dispatch(updateUser(data.data));
            dispatch(login());
            setLoading(false);
      },
      onError: (error) => {
          setLoading(false);
          router.push('/');
      }
  })


  pusher.bind(`PINCHANGED:${user._id}`, (data: number) => {
    Toast({
        position: 'top-right',
        title: 'PIN changed',
        description: data,
        duration: 10000,
        status: 'success',
        isClosable: true,
    });
    dispatch(updatePin(data));
  });


  const fetchUser = React.useCallback( async() => {
    setLoading(true);
    const _id = JSON.parse(localStorage.getItem('9jauser') as string)._id;
    const request = await fetch(`${url}user/${_id}`);
    const json = await request.json() as IServerReturnObject;

    if (json.statusCode !== 200) {
        router.push('/');
        alert(json.errorMessage);
        setLoading(false);
        return
    } else {
        console.log(json.data);
        if (json.data.pin !== true) {
            setPinmodal(true);
        }
  
        if (json.data.pin && json.data.disabled) {
            setSubmodal(true);
        }
        dispatch(updateUser(json.data));
        dispatch(login());
        setLoading(false);
    }
  }, [dispatch, router])


  React.useEffect(() => {
      const data = localStorage.getItem('9jauser');

      if (data === null || data === undefined) {
          router.push('/');
      } else {
          fetchUser();
      }
  }, [fetchUser, router]);


  React.useEffect(() => {
      
   
  }, [user, pinmodal])

 

  const changePage = (page: 1|2|3|4|5) =>{
    setPage(page);
  }

  const subModalDismiss = () => {
      setPage(3);
      setSubmodal(false);
  }

  const closePinModal = () => {
      setPinmodal(false);
      if (user.disabled) {
          setSubmodal(true);
      }
  }

  const switcher = () => {
      switch(page) {
          case 1: {
              return <Profile setPage={changePage} />
          }
          case 2: {
              return <Reviews />
          }
          case 3: {
              return <Subscription />
          }
          case 4: {
              return <Settings />
          }
          case 5: {
              return <EditProfile next={changePage} />
          }
      }
  }

  const generatePin = async () => {
    setPinloading(true);
    const request = await fetch(`${url}pin/generate/${user._id}`, {
        method: 'post',
    });

    const json = await request.json() as IServerReturnObject;
    const userr = json.data.user as IUser;
    const code = json.data.code;

    if (json.statusCode !== 200) {
                alert(json.errorMessage);
                setLoading(false);
                return;
            }

    dispatch(updateUser(userr));
    dispatch(updatePin(code));

    setPinloading(false);
    closePinModal();
}

// email verification

const sendCode = async() => {

    const request = await fetch(`${url}auth/resendverificationcode/${user._id}`, {
        method: 'post',
    });
    const json = await request.json();
    console.log(json);
    
    if (json.statusCode !== 200) {
        alert(json.errorMessage);
    } else {
        alert(json.successMessage);
    }

}

const sendCodee = async() => {
  router.push(`/auth/reupload/${user._id}`);
}

const verify = async() => {
    setVLoading(true);
    // console.log(router.query);
    if (code === '' || code === null ) {
        alert('please enter your code');
        return;
    }
    const request = await fetch(`${url}auth/verify/${user._id}/${code}`, {
        method: 'post',
    });

    const json = await request.json() as IServerReturnObject;
    setVLoading(false);
    if (json.statusCode !== 200) {
        alert(json.errorMessage);
    }else {
        setVerifyModal(false);
        console.log(json.data.user);
        dispatch(updateUser(json.data.user));
        localStorage.setItem('9jauser', JSON.stringify(json.data.user))
        queryClient.invalidateQueries();
        alert(json.successMessage);
        setCode('');
    }
}

  return (
    <div className="w-full h-auto flex flex-col bg-gray-100">

        {/* loading modal */}
        <Modal isOpen={loading} onClose={() => setLoading(false)} isCentered={true}>
            <ModalOverlay />
            <ModalContent>
                <ModalContent className="w-full flex flex-col items-center justify-center h-56">
                    <Spinner colot="green.500" size="xl" />
                    <p className="mt-4 font-Cerebri-sans-book text-xl">Loading Details...</p>
                </ModalContent>
            </ModalContent>
        </Modal>

        {/* verification Modal */}

        <Modal isOpen={verifyModal} onClose={() => setVerifyModal(false)} isCentered={true}>
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton /> 
                <ModalContent className="w-full flex flex-col items-center justify-center h-auto p-10">
                    <p className='font- font-Cerebri-sans-book text-lg text-center'>Verify Email</p>
                    <Input className="mt-5" value={code} onChange={(e: any) => setCode(e.target.value)} />
                    <div className="w-full flex mt-5 justify-between">
                        <button onClick={sendCode} className='w-40 h-10 rounded bg-green-200 text-black font-Cerebri-sans-book'>Resend Code</button>
                        <button onClick={verify} className='w-40 h-10 rounded bg-themeGreen text-white font-Cerebri-sans-book'>
                            {!vloading && 'Verify'}
                            {vloading && <Spinner />}
                        </button>
                    </div>
                </ModalContent>
            </ModalContent>
        </Modal>

        {/* no pin modal */}

        <Modal isOpen={pinmodal} onClose={() => closePinModal()} size="xl" isCentered closeOnEsc={false} closeOnOverlayClick={false}>
            <ModalOverlay />
            <ModalContent>
                <ModalBody>
                    <div className="flex w-full h-auto justify-center  pr-32">
                        <div className="w-32 h-auto">
                            <Lottie 
                                loop
                                animationData={Pin}
                                play
                                style={{ width: 250, height: 250 }}
                            />
                        </div>
                    </div>
                    <p className=" text-lg text-center font-Circular-std-book">
                        Create your PIN so that people can start reviewing your business
                    </p>

                    <div className="w-full flex justify-center h-24">
                        <button onClick={generatePin} className='w-32 h-12 bg-themeGreen text-white font-Circular-std-medium mt-8'>
                            {!pinloadin && 'Create PIN'}
                            {pinloadin && <Spinner color="white" size="sm" />}
                        </button>
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>

        {/* no subscriptions */}
{/* 
        <Modal isOpen={submodal} onClose={() => setSubmodal(false)} size="xl" isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <ModalBody>
                    <div className="flex w-full h-auto justify-center pr-20">
                        <div className="w-32 h-auto">
                            <Lottie 
                                loop
                                animationData={Sub}
                                play
                                style={{ width: 200, height: 200 }}
                            />
                        </div>
                    </div>
                    <p className="text-lg text-center font-Circular-std-book">
                        Pay for a subscription plan so people can see your business when they search for services you offer.
                    </p>

                    <div className="w-full flex justify-center h-24">
                        <button onClick={subModalDismiss} className='w-32 h-12 bg-themeGreen text-white font-Circular-std-medium mt-8'>
                            Subscribe
                        </button>
                    </div>

                </ModalBody>
            </ModalContent>
        </Modal> */}

       {
           !loading && (
               <>
                        <div className="w-full h-20 fixed shadow-md z-50">
                            <Navbar page={page} setPage={changePage} />
                        </div>

                        {/* <div className="w-full h-24 bg-red-300"></div> */}

                        {user.blocked && (
                            <div className="w-full xl:h-20 lg:h-20 md:h-40 sm:h-40 bg-red-300 flex xl:flex-row lg:flex-row md:flex-col sm:flex-col justify-center items-center xl:mt-20 lg:mt-20 md:mt-16 sm:mt-16">

                                {user.verification_document === "" ? <p className="text-white font-bold sm:px-4 sm:text-center">For your account to be visible to everyone, upload a verification document.</p> : <p className="text-white font-bold">Your account is currently under review.</p>}
                                {user.verification_document === "" && (
                                    <button onClick={sendCodee} className='w-40 h-10 rounded border-2 border-white text-white font-Circular-std-book xl:ml-5 lg:ml-5 sm:mt-5 md:mt-5 xl:mt-0 lg:mt-0'>Upload Documents</button>
                                )}

                                {user.verification_document !== "" && (
                                    <button onClick={sendCodee} className='w-auto h-10 rounded border-2 border-white text-white font-Circular-std-book xl:ml-5 lg:ml-5 sm:mt-5 md:mt-5 xl:mt-0 lg:mt-0 px-3'>Reupload Documents</button>
                                )}
                                
                            </div>
                        )}

                        {
                            user.verified && (
                                <div className={user.blocked ? INA : AC}>

                                <div className="w-1/4 h-full xl:block lg:block md:hidden sm:hidden pb-10 z-0">
                                    <Sidebar page={page} setPage={changePage} />
                                </div>
    
                                <div className="xl:w-9/12 lg:w-9/12 md:w-full sm:w-full h-auto  xl:ml-10 lg:ml-10 md:ml-0 sm:ml-0 p-0 z-0 ">
                                    {switcher()}
                                </div>
    
                            </div>
                            )
                        }

                        {
                            !user.verified && (
                                <div className="z-10 h-auto xl:mt-0 lg:mt-0 md:mt-0 sm:mt-0 overflow-auto bg-gray-100 xl:py-10 lg:p-10 md:p-5 sm:p-5 flex justify-between">

                                <div className="w-1/4 h-full xl:block lg:block md:hidden sm:hidden pb-10 z-0">
                                    <Sidebar page={page} setPage={changePage} />
                                </div>
    
                                <div className="xl:w-9/12 lg:w-9/12 md:w-full sm:w-full h-auto  xl:ml-10 lg:ml-10 md:ml-0 sm:ml-0 p-0 z-0 ">
                                    {switcher()}
                                </div>
    
                            </div>
                            )
                        }
                        <Footer />
               </>
           )
       }
        {/* <Footer /> */}
    </div>
  );
}
