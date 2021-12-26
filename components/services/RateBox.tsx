import React from 'react';
import ReactStars from "react-rating-stars-component";
import { IComment } from '../../utils/types/comments';

const Comments = ({comment}: {comment: IComment}) => {
    const ratingChanged = (newRating: any) => {
        console.log(newRating);
      };
    return (
        <div className="w-full p-5 flex flex-col h-auto border-b-2 border-gray-200 mb-4">
            <p className="text-sm font-light text-gray-600">{new Date(comment.created_at).toDateString()}</p>
            
            <div className="mt-6 flex flex-col">
                {/* <p className="font-semibold text-sm text-gray-500">Overall Rating</p> */}
                <div className="flex h-12 items-center">
                    <p className="text-xxl font-light text-themeGreen mr-4">{comment.rating}</p>
                    <ReactStars
                        count={5}
                        onChange={ratingChanged}
                        size={20}
                        activeColor="#ffd700"
                        value={comment.rating}
                        isHalf={true}
                    />
                    {/* <p className="text-sm font-semibold text-gray-600 ml-4">10 Reviews</p> */}
                </div>
            </div>

            <p className="mt-6 text-sm font-semibold text-gray-600">{comment.comment}</p>
        </div>
    )
}

export default function RateBox({comments, name}: {comments: Array<IComment>, name: string}) {
  return (
    <div className="w-full h-auto pb-10 border-2 border-gray-200">
        <div className="w-full h-auto py-6 pb-10 flex flex-col bg-white p-5">
            <p className="text-2xl font-light text-gray-600 ml-0">Customer Reviews for {name}</p>

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
