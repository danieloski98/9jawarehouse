import React from 'react';
import EditProfile from '../components/dashboard/EditProfile';
import Profile from '../components/dashboard/Profile';
import Reviews from '../components/dashboard/Reviews';
import Settings from '../components/dashboard/Settings';
import Sidebar from '../components/dashboard/Sidebar';
import Subscription from '../components/dashboard/Subscription';
import Navbar from '../components/general/Navbar';
import { Modal, ModalOverlay, ModalContent, ModalBody, Spinner, useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { queryClient } from './_app'

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
// import Footer from '../components/Home/Footer';
const getUser = async (_id: string) => {
    const request = await fetch(`${url}user/${_id}`);
    const json = await request.json() as IServerReturnObject;
    if (!request.ok) {
        throw new Error('An Error occured');
    }
    return json;
}

export default function Dashboard() {

  const [page, setPage] = React.useState(1 as number);
  const [loading, setLoading] = React.useState(true);
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

 

  const changePage = (page: 1|2|3|4|5) =>{
    setPage(page);
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

  return (
    <div className="w-full h-auto flex flex-col ">

        {/* modal */}
        <Modal isOpen={loading} onClose={() => setLoading(false)} isCentered={true}>
            <ModalOverlay />
            <ModalContent>
                <ModalContent className="w-full flex flex-col items-center justify-center h-56">
                    <Spinner colot="green.500" size="xl" />
                    <p className="mt-4 font-Cerebri-sans-book text-xl">Loading Details...</p>
                </ModalContent>
            </ModalContent>
        </Modal>

       {
           !loading && (
               <>
                        <div className="w-full h-20 fixed shadow-md z-50">
                            <Navbar page={page} setPage={changePage} />
                        </div>
                        <div className="z-10 h-auto xl:mt-20 lg:mt-20 md:mt-16 sm:mt-16 overflow-auto bg-gray-100 xl:py-10 lg:p-10 md:p-5 sm:p-5 flex justify-between">

                            <div className="w-1/4 h-full xl:block lg:block md:hidden sm:hidden pb-10 z-0">
                                <Sidebar page={page} setPage={changePage} />
                            </div>

                            <div className="xl:w-9/12 lg:w-9/12 md:w-full sm:w-full h-auto  xl:ml-10 lg:ml-10 md:ml-0 sm:ml-0 p-0 z-0 ">
                                {switcher()}
                            </div>

                        </div>
                        <Footer />
               </>
           )
       }
        {/* <Footer /> */}
    </div>
  );
}
