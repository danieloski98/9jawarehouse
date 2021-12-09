import React from 'react';
import ReactStars from "react-rating-stars-component";
import { useQuery } from 'react-query'
import url from '../../utils/url';
import { IServerReturnObject } from '../../utils/types/serverreturntype';
import { Spinner } from '@chakra-ui/react'
import { IComment } from '../../utils/types/comments';

const getReviews = async() => {
    const result = await fetch(`${url}comments/61ae0a1fd9394d66befbdcfd`);
    const json = await result.json() as IServerReturnObject;

    if (!result.ok) {
        throw Error('An error occured while fetching your reviews')
    } else {
        return json;
    }
}

const Comments = ({ review }: {review: IComment}) => {
    const ratingChanged = (newRating: any) => {
        console.log(newRating);
      };
    return (
        <div className="w-full p-5 flex flex-col h-auto border-2 border-themeGreen mb-4">
            <p className="text-sm font-light text-gray-600">{new Date(review.created_at).toDateString()}</p>
            
            <div className="mt-6 flex flex-col">
                {/* <p className="font-semibold text-sm text-gray-500">Overall Rating</p> */}
                <div className="flex h-12 items-center">
                    <p className="text-xxl font-light text-themeGreen mr-4">{review.rating}</p>
                    <ReactStars
                        count={5}
                        onChange={ratingChanged}
                        size={20}
                        activeColor="#ffd700"
                        value={review.rating}
                        isHalf={true}
                    />
                    {/* <p className="text-sm font-semibold text-gray-600 ml-4">10 Reviews</p> */}
                </div>
            </div>

            <p className="mt-6 text-sm font-semibold text-gray-600">{review.comment}</p>
        </div>
    )
}

export default function Reviews() {
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false);
    const [text, setText] = React.useState("Loading Revieews");
    const [reviews, setReviews] = React.useState([] as IComment[]);

    const { refetch } = useQuery('getReviews', getReviews, {
        onSuccess: (data: IServerReturnObject) => {
            setLoading(false);
            if (data.statusCode !== 200) {
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
        <div className="w-full h-auto py-6 pb-10 flex flex-col bg-white p-5">
            <p className="text-2xl font-light text-gray-600 ml-0">Customer Reviews for Limmer</p>

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
                                <p className="font-semibold text-sm text-gray-500">Overall Rating</p>
                                <div className="flex h-12 items-center">
                                    <p className="text-3xl font-light text-themeGreen mr-4">4.7</p>
                                    <ReactStars
                                        count={5}
                                        onChange={ratingChanged}
                                        size={24}
                                        activeColor="#ffd700"
                                        value={3}
                                        isHalf={true}
                                    />
                                    <p className="text-sm font-semibold text-gray-600 ml-4">10 Reviews</p>
                                </div>
                            </div>

                            <p className="font-light text-xl mt-6 text-gray-500">Comments</p>

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
