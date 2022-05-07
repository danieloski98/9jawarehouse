import React from 'react';
import { ISubscription } from '../../../utils/types/Subscriptions';
import { Tbody, Tr, Td } from '@chakra-ui/react'

export default function SubscriptionShip({details}: {details: ISubscription}) {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'NGN',
    })
    const amount = (amount: number) => {
        switch(amount) {
            case 5000: {
                return '1 Month';
                break;
            }
            case 10000: {
                return '3 months';
                break;
            }
            case 20000: {
                return '6 Months';
                break;
            }
        }
    }

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
    <Tr className="">
        <Td className="flex-1">{new Date(details.created_at).toDateString()}</Td>
        <Td className="flex-1">{amount(details.amount)}</Td>
        <Td className="flex-1"><b></b>{formatter.format(details.amount)}</Td>
        <Td>{status(details.status)}</Td>
    </Tr>
  );
}
