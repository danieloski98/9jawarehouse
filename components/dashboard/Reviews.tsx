import React from 'react';
import ReactStars from "react-rating-stars-component";
import { useQuery } from 'react-query'
import url from '../../utils/url';
import { IServerReturnObject } from '../../utils/types/serverreturntype';
import { Spinner, Image } from '@chakra-ui/react'
import { IComment } from '../../utils/types/comments';
import Viewer from 'react-viewer';

import { useSelector } from 'react-redux';
import { RootState } from '../../store/index'

const getReviews = async(id: string) => {
    const result = await fetch(`${url}comments/${id}`);
    const json = await result.json() as IServerReturnObject;

    if (!result.ok) {
        throw Error('An error occured while fetching your reviews')
    } else {
        return json;
    }
}

const Comments = ({ review }: {review: IComment}) => {
    const [ visible, setVisible ] = React.useState(false);
    const [img, setImg] = React.useState('');

    const ratingChanged = (newRating: any) => {
        console.log(newRating);
      };
    return (
        <div className="w-full p-5 flex flex-col h-auto border-1 border-gray-200 mb-4">
             <Viewer
                visible={visible}
                onClose={() => { setVisible(false); } }
                images={[{src: img, alt: ''}]}
                />
            <p className="text-sm font-Circular-std-book text-gray-600">{new Date(review.created_at).toDateString()}</p>

            <div className="flex mt-6">
                <p className="text-md font-Circular-std-medium text-gray-700">{review.fullname}</p>

                <div className="mt-1 ml-3 flex flex-col">
                {/* <p className="font-semibold text-sm text-gray-500">Overall Rating</p> */}
                    <div className="flex h-4 items-center">
                        <p className="text-xxl font-Cerebri-sans-book text-themeGreen mr-2">{review.rating}/5</p>
                        <ReactStars
                            count={5}
                            onChange={ratingChanged}
                            size={20}
                            activeColor="#ffd700"
                            value={review.rating}
                            isHalf={true}
                            edit={false}
                            color="lightgrey"
                        />
                        {/* <p className="text-sm font-semibold text-gray-600 ml-4">10 Reviews</p> */}
                    </div>
                </div>
            </div>
            
          

            <p className="mt-4 text-sm font-Cerebri-sans-book text-gray-600">{review.comment}</p>

            {review.pictures.length > 0 && (
                <div className="flex mt-6">
                    {review.pictures.map((items, index) => (
                        <div className="w-16 h-16 mr-2" key={index.toString()}>
                            <Image src={items} alt="img" className="w-full h-full cursor-pointer" onClick={() => {setImg(items); setVisible(true)}} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default function Reviews() {
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false);
    const [text, setText] = React.useState("Loading Revieews");
    const [reviews, setReviews] = React.useState([] as IComment[]);
    const user = useSelector((state: RootState) => state.UserReducer.user);

    const { refetch } = useQuery(['getReviews', user._id], () => getReviews(user._id), {
        onSuccess: (data: IServerReturnObject) => {
            setLoading(false);
            if (data.statusCode !== 200) {
                alert(data.errorMessage);
                setError(true);
                setText(data.errorMessage);
            } else {
                setText("");
                setReviews(data.data);
            }
        },
        onError: (error) => {
            setError(true);
            setText("An error occured while trying to fetch ypur reviews")
        }
    });

    const ratingChanged = (newRating: any) => {
        console.log(newRating);
      };
  return (
    <div className="w-full h-auto pb-10">
        <div className="w-full h-auto py-6 pb-10 flex flex-col bg-white px-10">
            <p className="text-2xl font-Circular-std-medium text-gray-600 ml-0">Customer Reviews for {user.business_name}</p>

            {
                loading && !error && (
                    <div className="w-full h-56 flex items-center justify-center">
                        <Spinner size="lg" color="green" />
                    </div>
                )
            }

            {
                !error && !loading && reviews.length > 0 && (
                    <>
                            <div className="mt-6 flex flex-col">
                                <p className=" font-Circular-std-book text-md text-gray-500">Overall Rating</p>
                                <div className="flex h-12 items-center">
                                    <p className="text-3xl font-Circular-std-medium text-themeGreen mr-4">{Math.round(user.rating)}/5</p>
                                    <span className='xl:block lg:block md:hidden sm:hidden'>
                                    <ReactStars
                                        count={5}
                                        onChange={ratingChanged}
                                        size={24}
                                        activeColor="#ffd700"
                                        value={user.rating}
                                        isHalf={true}
                                        edit={false}
                                        color="lightgrey"
                                    />
                                    </span>

                                    <span className='xl:hidden lg:hidden md:block sm:block'>
                                    <ReactStars
                                        count={5}
                                        onChange={ratingChanged}
                                        size={18}
                                        activeColor="#ffd700"
                                        value={user.rating}
                                        isHalf={true}
                                        edit={false}
                                        color="lightgrey"
                                    />
                                    </span>
                                    <p className="text-md font-Cerebri-sans-book text-gray-600 ml-4">{reviews.length} Reviews</p>
                                </div>
                            </div>

                            <p className="font-Circular-std-medium text-xl mt-6 text-gray-500">Comments</p>

                            <div className="w-full flex flex-col mt-6">
                                {reviews.map((item, index) => (
                                    <Comments key={index.toString()} review={item} />
                                ))}
                            </div>
                    </>
                )
            }

            {
                !error && !loading && reviews.length < 1 && (
                    <div className="w-full h-56 flex flex-col items-center justify-center font-light text-themeGreen text-xl">
                        Sorry seems like you have no reviews yet!.
                        <button onClick={() => refetch()} className="w-40 h-10 text-sm text-white bg-themeGreen mt-5">Refresh</button>
                    </div>
                )
            }

            {
                error && !loading && (
                    <div className="w-full flex">
                        <p>{text}</p>
                    </div>
                )
            }

        </div>
    </div>
  );
}
