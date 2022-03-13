import React from 'react'
import { IUser } from '../../../types/user'
import { Carousel } from 'react-responsive-carousel'
import { IComment } from '../../../types/comments';

export default function ProfileInformation({user}: {user: IUser}) {
    const [av, setAv] = React.useState(0);

    React.useEffect(() => {
        // let num: number = 0;

        // const comments = user.comments as Array<IComment>;
        // for (let i = 0; i < comments.length; i++) {
        //     num += comments[i].rating;
        // }
        // setAv(num/comments.length);
    }, [user.comments])

    return (
        <div className='w-full' >
            <div className='w-full my-5 pb-6 bg-white rounded-lg' >
                <div className='w-full h-56 bg-red-300 rounded-lg overflow-hidden z-10' >
                    {user.pictures !== undefined && (
                        <Carousel
                        className='w-full h-56 bg-green-300 p-0'
                        showArrows={true}
                        showIndicators={true}
                        showThumbs={true}
                        dynamicHeight={false}
                        width='100%'
                        swipeable={true}
                        interval={4000}
                        infiniteLoop={true}
                        emulateTouch={true}
                        autoPlay={true}
                        centerMode={false}
                    >
                        {user.pictures.map((item, index) => (
                         
                                <img src={item} alt="img" className='w-full h-56 object-cover' />
                        ))}
                    </Carousel>
                    )}
                </div>
                <div className='w-full flex px-8 z-' > 
                    <div className='w-36 bg-green-300 h-40 -mt-14 z-30 rounded-lg ml overflow-hidden' >
                        <img src={user.profile_pic} className="w-full h-full" alt="pic" />
                    </div>
                    <div className='pt-8 justify-between ml-5 flex flex-1 ' >
                        <div className='w-full px-4 mx-auto' >
                            <p className=' font-Graphik-SemiBold ' >{user.business_name}</p>
                            <p className=' font-Graphik-Regular text-sm ' >{user.email}</p>
                            <p className=' font-Graphik-Regular text-sm ' >Member since {new Date(user.createAt).toDateString()}</p>
                        </div>
                        {/* <div className='w-full px-4 mx-auto' >
                            <p style={{color: '#676767'}} className=' font-Graphik-Medium text-sm ' >Last Online</p>
                            <p className=' font-Graphik-SemiBold ' >2 hours ago</p>
                        </div> */}
                        <div className='w-full px-4 mx-auto' >
                            <p style={{color: '#676767'}} className=' font-Graphik-Medium text-sm ' >Total Reviews</p>
                            <p className=' font-Graphik-SemiBold ' >{user.comments?.length}</p>
                        </div>
                        <div className='w-full px-4 mx-auto' >
                            <p style={{color: '#676767'}} className=' font-Graphik-Medium text-sm ' >Average Rating</p>
                            <p className=' font-Graphik-SemiBold ' >{av}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full mb-6 bg-white rounded-lg py-8 px-5 pr-14' >
                <p style={{color: '#270223'}} className=' font-Graphik-SemiBold text-sm ' >Business Description</p>
                <p style={{color: '#828282'}} className=' mt-1 font-Graphik-Regular text-sm ' >{user.business_description !== undefined && user.business_description}</p>
                <div className='my-6 w-full grid grid-cols-4' >
                    <div className='' >
                        <p style={{color: '#270223'}} className=' font-Graphik-SemiBold text-sm ' >Date Joined</p>
                        <p style={{color: '#828282'}} className=' mt-1 font-Graphik-Regular text-sm ' >{user.createAt !== undefined && new Date(user.createAt).toDateString()}</p>
                    </div>
                    <div className='' >
                        <p style={{color: '#270223'}} className=' font-Graphik-SemiBold text-sm ' >Location</p>
                        <p style={{color: '#828282'}} className=' mt-1 font-Graphik-Regular text-sm ' >{user.lga !== undefined && user.lga},{user.state !== undefined && user.state}, Nigeria</p>
                    </div>
                    <div className='' >
                        <p style={{color: '#270223'}} className=' font-Graphik-SemiBold text-sm ' >Phone Number</p>
                        <p style={{color: '#828282'}} className=' mt-1 font-Graphik-Regular text-sm ' >{user.phone !== undefined && user.phone}</p>
                    </div>
                    <div className='' >
                        <p style={{color: '#270223'}} className=' font-Graphik-SemiBold text-sm ' >Business Address</p>
                        <p style={{color: '#828282'}} className=' mt-1 font-Graphik-Regular text-sm ' >{user.business_address !== undefined && user.business_address}</p>
                    </div>
                </div>
                <div className='w-full grid grid-cols-4' >
                    <div className='' >
                        <p style={{color: '#270223'}} className=' font-Graphik-SemiBold text-sm ' >Social media links</p>
                        <p style={{color: '#828282'}} className=' mt-1 font-Graphik-Regular text-sm ' >June 21, 2021</p>
                    </div>
                    <div className='' >
                        <p style={{color: '#270223'}} className=' font-Graphik-SemiBold text-sm ' >Certifiations</p>
                        {user.certificates !== undefined && user.certificates.length > 0 && user.certificates.map((item, index) => (
                            <div className='mb-3'>
                                <p style={{color: '#828282'}} className=' mt-1 font-Graphik-Regular text-sm ' >{item.certificate}</p>
                                <p style={{color: '#828282'}} className=' mt-1 font-Graphik-Regular text-sm ' >Issued on {new Date(item.year).toDateString()}</p>
                                <button  style={{color: '#828282', border: '1px solid #1A8F85'}} className='text-sm font-Graphik-Regular p-2 mt-5 rounded-lg'>View Certificate</button>
                            </div>
                        ))}
                        {user.certificates !== undefined && user.certificates.length < 1 && <p style={{color: '#828282'}} className=' mt-1 font-Graphik-Regular text-sm '>No Certificates</p>}
                    </div>
                </div>
            </div>
        </div>
    )
}
