import React from 'react';
import ServiceNavbar from '../../../components/services/ServiceNav';
import { FiChevronLeft, FiChevronRight, FiPhone, FiMail } from 'react-icons/fi'
import { Breadcrumb, BreadcrumbItem, Image as Img, Modal, ModalOverlay, ModalContent, ModalBody, Spinner, Skeleton } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { Carousel } from 'react-responsive-carousel';
import { useQuery } from 'react-query'
import { Call, Message } from 'react-iconly'

// redux
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store/index'
import { updateUser     } from '../../../reducers/Activeuser.reducer'

// images
// import Image from 'next/image'
import Banner from '../../../public/images/banner.png'
import ProfileBox from '../../../components/services/Profilebox';
import RateBox from '../../../components/services/RateBox';
import ReviewModal from '../../../components/services/ReviewModal';
import { GetStaticPaths } from 'next';
import { IServerReturnObject } from '../../../utils/types/serverreturntype';
import url from '../../../utils/url';
import { IUser } from '../../../utils/types/user';
import { IComment } from '../../../utils/types/comments';
import Footer from '../../Home/Footer';


const ContactBox = ({user}: {user: IUser}) => {
    return (
        <div className="w-full p-5 border-2 border-gray-200 flex flex-col mb-8">
            <p className=" font-Circular-std-medium text-lg text-themeGreen">Contact</p>
            <p className="mt-2 text-sm font-Circular-std-book text-gray-500">You can only leave a review about this business if you have previously worked with them</p>
            {user === null && (
                <Skeleton className='w-full h-32' />
            )}
            {user !== null && (
                 <div className="flex mt-4">
                    <a href={`tel:${user.phone}`}>
                        <Call size={35} primaryColor="#004143" filled />
                        {/* <FiPhone size={25} color="gray" className="cursor-pointer"  /> */}
                    </a>
                    <a href={`mailto:${user.email}`} className='ml-3'>
                        <Message size={35} primaryColor="#004143" filled />
                        {/* <FiMail size={25} color="gray" className="ml-4 cursor-pointer" /> */}
                    </a>
                </div>
            )}
        </div>
    )
}

const ReviewBox = (props: { open: Function }) => {

    return (
        <div  className="w-full p-5 border-2 border-gray-200 flex flex-col">
            <p className="font-Circular-std-medium text-lg text-themeGreen">Review Business/Vendor</p>
            <p className="mt-2 text-sm font-Circular-std-book text-gray-500">Reach out to through phone or email vendor to start a conversation</p>

            <button onClick={() => props.open(true)} className="mt-3 w-32 bg-themeGreen h-10 text-sm text-white font-Cerebri-sans-book">Write a review</button>
            
        </div>
    )
}

const LoadingModal = ({ open, close}: {open: boolean, close: Function}) => (
    <Modal isOpen={open} isCentered onClose={() => close()} closeOnOverlayClick={false} closeOnEsc={false}>
        <ModalOverlay />
        <ModalContent>
            <ModalBody className='flex flex-col items-center justify-center'>
                <Spinner size="lg" color="green" className='="mt-6' />
                <p className="text-md font-light mt-4">Loading Details</p>
            </ModalBody>
        </ModalContent>
    </Modal>
)

// query functions
const getUsercomments = async (user_id: string) => {
    const request2 = await fetch(`${url}comments/${user_id}`);
    const json2 = await request2.json() as IServerReturnObject;
    if (!request2.ok) {
        throw new Error("An error occured");
    }
    return json2;
}

export default function Business() {

    const [showModal, setShowModal] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [banner, setBanner] = React.useState('');
    const [user, setUser] = React.useState({} as IUser);
    const [reviews, setReviews] = React.useState([] as Array<IComment>);
    const [commentsLoading, setCommentsLoading] = React.useState(true);
    const router = useRouter();

    const getCommentsQuery = useQuery(['getComments', router.query['id']], () => getUsercomments(router.query['id'] as string), {
        onSuccess: (data) => {
            setReviews(data.data);
            setCommentsLoading(false);
        },
        onError: (error) => {
            alert('An error occured while fetching comments');
        }
    })

    React.useEffect(() => {
        (async function() {
            const request = await fetch(`${url}user/${router.query['id']}`);
            
            const json = await request.json() as IServerReturnObject;
            
            // console.log(json);
            setUser(json.data);
            // setReviews(json2.data);
            setCommentsLoading(false);
            setLoading(false);
            // console.log(user);
        })()
    }, [router.query]);

    React.useEffect(() => {
        window.onpopstate = () => {
            const service = localStorage.getItem('activeService') as string;
            if (service === null || service === undefined) {
                router.push(`/services?service=${user.services[0]}&state=${user.state}&lga=${user.lga}`);
            } else {
                router.push(`/services?service=${service}&state=${user.state}`);
            }
            
        }
    })

    console.log(user);


  return (
    <div className="w-full h-auto flex flex-col overflow-y-auto overflow-x-hidden">

        <ServiceNavbar />

        {/* modal */}

       {user !== null && (
           <>
             <ReviewModal open={showModal} setOpen={setShowModal} id={user._id} user={user} />
             <LoadingModal open={loading} close={() => setLoading(false)} />
           </>
       )}

        <div className="w-full h-20 flex items-center xl:px-10 lg:px-10 md:px-5 sm:px-5 mt-32">
            <FiChevronLeft size={30} color="grey" className="cursor-pointer" onClick={() => router.back()} />
            <div className="ml-6 font-Cerebri-sans-book text-md">
                <Breadcrumb className="text-sm font-light text-gray-400">
                    <BreadcrumbItem>
                        <p onClick={() => router.push('/')} className='cursor-pointer hover:underline'>Home</p>
                    </BreadcrumbItem>

                    <BreadcrumbItem>
                        <p onClick={() => router.back()} className='cursor-pointer hover:underline'>Services</p>
                    </BreadcrumbItem>

                    {!loading && <BreadcrumbItem>
                                    <p className="text-gray-600">{user.business_name}</p>
                                </BreadcrumbItem>}
                </Breadcrumb>
            </div>
        </div>

        {/* Banner */}

        {!loading && (
            <div className="w-full h-64 overflow-hidden mt-6">
            <Carousel showArrows showIndicators showStatus={false} dynamicHeight={false} autoPlay interval={7000} infiniteLoop >
                {user.pictures.map((item, index) => (
                  <div key={index.toString()} className="w-full h-64">
                    <Img src={item} alt="img" className="w-full h-64" />
                  </div>
                ))}
              </Carousel>
           </div>
        )}

        <div className="flex-1 h-full flex xl:px-10 lg:px-10 md:px-5 sm:px-5 py-10 ">
            <div className="xl:w-3/4 lg:w-3/4 md:w-full sm:w-full xl:mr-12 lg:mr-12 md:mr-0 sm:mr-0 h-auto">
                {loading && <Skeleton height={200} />}
                {!loading && (
                    <>
                        <ProfileBox user={user} reviews={reviews.length} />
                        <div className="w-full xl:hidden lg:hidden md:block sm:block mb-10">
                            <ContactBox user={user} />
                            <ReviewBox open={setShowModal} />
                        </div>
                        <RateBox comments={reviews} name={user.business_name} />
                    </>
                )}
            </div>
            <div className="w-72 h-80 xl:flex lg:flex md:hidden sm:hidden flex-col">
                <ContactBox user={user} />
                <ReviewBox open={setShowModal} />
            </div>
        </div>

        <Footer />

    </div>
  );
}
