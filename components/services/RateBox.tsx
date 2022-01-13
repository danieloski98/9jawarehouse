import React from 'react';
import ReactStars from "react-rating-stars-component";
import { IComment } from '../../utils/types/comments';
import { Image } from '@chakra-ui/react'

const Comments = ({comment}: {comment: IComment}) => {
    const ratingChanged = (newRating: any) => {
        console.log(newRating);
      };
    return (
        <div className="w-full p-5 flex flex-col h-auto border-b-2 border-gray-200 mb-4">
            <p className="text-sm font-Circular-std-book text-gray-600">{new Date(comment.created_at).toDateString()}</p>
            
            <div className="mt-2 flex flex-col">
                {/* <p className="font-semibold text-sm text-gray-500">Overall Rating</p> */}
                <div className="flex h-5 items-center">
                    <p className="text-xxl font-light text-themeGreen mr-4">{comment.rating}/5</p>
                    <ReactStars
                        count={5}
                        onChange={ratingChanged}
                        size={20}
                        activeColor="#ffd700"
                        value={comment.rating}
                        isHalf={true}
                        edit={false}
                        color="lightgrey"
                    />
                    {/* <p className="text-sm font-semibold text-gray-600 ml-4">10 Reviews</p> */}
                </div>
            </div>

            <p className="mt-3 text-sm font-Circular-std-book text-gray-600">{comment.comment}</p>

           {
               comment.pictures.length > 0 && (
                <div className="w-full h-12 flex mt-4">
                {comment.pictures.map((item, index) => (
                    <div className="w-12 h-full rounded-md overflow-hidden mr-4" key={index.toString()}>
                        <Image src={item} alt="img" className="w-full h-full object-cover" />
                    </div>
                ))}
            </div>
               )
           }
        </div>
    )
}

export default function RateBox({comments, name}: {comments: Array<IComment>, name: string}) {
  return (
    <div id="comments" className="w-full h-auto pb-10 border-2 border-gray-200">
        <div className="w-full h-auto py-6 pb-10 flex flex-col bg-white p-5">
            <p className="text-2xl font-Circular-std-medium text-gray-600 ml-0">Customer Reviews for {name}</p>

           {comments.length > 0 && (
                <div className="w-full flex flex-col mt-6">
                    {
                        comments.map((item, index) => (
                            <Comments key={index.toString()} comment={item} />
                        ))
                    }
                    
                </div>
           )}
           {comments.length < 1 && (
               <div className="w-full h-32 flex flex-col justify-center items-center">
                   <p>This user has no Reviews</p>
               </div>
           )}
        </div>
    </div>
  );
}
