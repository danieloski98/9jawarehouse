import React from 'react';
import { ISubscription } from '../../../utils/types/Subscriptions';

export default function SubscriptionShip({details}: {details: ISubscription}) {

  const status = (stat: number) => {
      switch(stat) {
          case 1: {
              return (
                  <div className="p-2 w-24 text-center rounded-full bg-yellow-200 text-black text-xs font-Cerebri-sans-book">PROCESSING</div>
              )
          }
          case 2: {
            return (
                <div className="p-2 w-24 text-center rounded-full bg-green-200 text-black text-xs font-Cerebri-sans-book">APPROVED</div>
            )
        }
        case 3: {
            return (
                <div className="p-2 w-24 text-center rounded-full bg-red-200 text-black text-xs font-Cerebri-sans-book">FAILED</div>
            )
        }
      }
  }

  return (
    <div className="w-full h-16 rounded-md flex justify-between items-center xl:px-4 lg:px-4 md:px-0 sm:px-0 mt-4 mb-4 text-sm font-Cerebri-sans-book">
        <p className="flex-1">{new Date(details.created_at).toDateString()}</p>
        <p className="flex-1">Monthly</p>
        <p className="flex-1">{details.amount}</p>
        {status(details.status)}
    </div>
  );
}
