import { Select, Spinner, useToast } from '@chakra-ui/react'
import React from 'react'
import {useQuery} from 'react-query'
import { IReturnObject } from '../../types/ServerReturnType'
import { theme } from '../../utils/theme'
import { url } from '../../utils/url'

const getStats = async () => {
    const request = await fetch(`${url}/analytics/overview`);
    const json = await request.json() as IReturnObject;
    if (!request.ok) {
        throw new Error('An error occured');
    }
    return json;
}

export default function Overview() {
    const [data, setData] = React.useState({ users: 0, comments: 0, totalSubs: '0' });
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false);

    //
    const toast = useToast();

    const query = useQuery('overview', getStats, {
        onSuccess: (data) => {
            if (data.statusCode !== 200) {
                setLoading(false);
                toast({
                    title: 'Error',
                    description: data.errorMessage,
                    isClosable: true,
                    duration: 4000,
                    position: 'top',
                });
                setError(true);
            } else {
                setData(data.data);
                setLoading(false);
            }
        },
        onError: (error) => {
            setLoading(false);
            setError(true);
            toast({
                title: 'Error',
                description: 'An error occured',
                isClosable: true,
                duration: 4000,
                position: 'top',
            });
        }
    })

    return (
        <div className='w-full py-10 px-10' >
            <div className='w-full flex items-center' > 
                <div className=''>
                    <p style={{fontSize: '20px'}} className='font-Graphik-Medium'>Overview</p>
                    <p style={{color: '#8A8A8A'}} className='text-sm font-Graphik-Regular' >Keep track of 9jawarehosue performance</p>
                </div>
                {/* <div className='ml-auto'>
                    <Select className='font-Graphik-Regular ' fontSize='12px' backgroundColor='white' placeholder='Past 30 days'>
                        <option value='option1'>Option 1</option>
                        <option value='option2'>Option 2</option>
                        <option value='option3'>Option 3</option>
                    </Select>
                </div> */}
                {/* <button style={{backgroundColor: '#1A8F85'}} className='px-4 py-3 font-Graphik-Regular text-sm text-white rounded-md ml-4' >Download Report</button> */}
            </div>
            <div className='w-full flex my-6 px-8 items-center justify-between ' >
                <div className='bg-white w-full mx-2 p-4 rounded-lg' >
                    {!loading && <p style={{fontSize: '24px'}} className='font-Graphik-SemiBold'>{data.users}</p>}
                    {loading && <Spinner size="sm" color={theme.primaryColor} />}
                    <p className='text-sm font-Graphik-Medium mt-1' >Total Registered Users</p>
                    {/* <p style={{color: '#8A8A8A'}} className='text-xs font-Graphik-Regular mt-2' ><span style={{color: '#E00253'}} >-2%</span> than last month</p> */}
                </div> 
                <div className='bg-white w-full mx-2 p-4 rounded-lg' >
                    {!loading && <p style={{fontSize: '24px'}} className='font-Graphik-SemiBold'>{data.comments}</p>}
                    {loading && <Spinner size="sm" color={theme.primaryColor} />}
                    <p className='text-sm font-Graphik-Medium mt-1' >Total Vendor Reviews</p>
                    {/* <p style={{color: '#8A8A8A'}} className='text-xs font-Graphik-Regular mt-2' ><span style={{color: '#E00253'}} >-2%</span> than last month</p> */}
                </div> 
                <div className='bg-white w-full mx-2 p-4 rounded-lg' >
                    {!loading && <p style={{fontSize: '24px'}} className='font-Graphik-SemiBold'>{data.totalSubs}</p>}
                    {loading && <Spinner size="sm" color={theme.primaryColor} />}
                    <p className='text-sm font-Graphik-Medium mt-1' >Total Subscription</p>
                    {/* <p style={{color: '#8A8A8A'}} className='text-xs font-Graphik-Regular mt-2' ><span style={{color: '#0CD27C'}} >-2%</span> than last month</p> */}
                </div> 
            </div>
        </div>
    )
}
