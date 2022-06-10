import { Input, Select, useToast, Spinner } from '@chakra-ui/react'
import React from 'react'
import {
    Table,
    Thead,
    Tbody, 
    Tr,
    Th,
    Td, 
  } from '@chakra-ui/react'
import CustomerModal from '../modals/ActivityModal.tsx/CustomerModal'
import RejectReview from '../modals/ActivityModal.tsx/RejectReview'
import { url } from '../../utils/url'
import { IReturnObject } from '../../types/ServerReturnType'
import { IComment } from '../../types/comments';
import {useQuery} from 'react-query'
import { theme } from '../../utils/theme'

  const getComment = async () => {
      const request = await fetch(`${url}/comments/admin`);
      const json = await request.json() as IReturnObject;

      if (!request.ok) {
          throw new Error('An error occured');
      }

      return json.data as Array<IComment>;
  }

  const getActivity = async () => {
    const request = await fetch(`${url}/analytics/comments`);
    const json = await request.json() as IReturnObject;

    if (!request.ok) {
        throw new Error('An error occured');
    }

    return json;
  }

export default function Activity() {

    const [showModal, setShowModal] = React.useState(false) 
    const [showRejectModal, setShowRejectModal] = React.useState(false);
    const [comment, setComment]= React.useState([] as Array<IComment>);
    const [activeComment, setActiveComment] = React.useState({} as IComment);
    const [data, setData] = React.useState({ approved: 0, comments: 0, average: '0' });
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false);
    const [sort, setSort] = React.useState(1);
    const [search, setSearch] = React.useState('');
    const [filteredUsers, setFilteredUsers] = React.useState([] as Array<IComment>);

    React.useEffect(() => {
        if (search === '') {
            setFilteredUsers([...comment]);
            return;
        }
        // eslint-disable-next-line array-callback-return
        const newArr = comment.filter((item, index) => {
            if (item.fullname?.toLowerCase().includes(search.toLowerCase()) || item.email?.toLowerCase().includes(search.toLowerCase())) {
                return item;
            }
        });
        setFilteredUsers([...newArr]);
    }, [search, comment])

    const toast = useToast();

    const query = useQuery('overview', getActivity, {
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

    const commentQuery = useQuery('getComments', getComment, {
        onSuccess: (data) => {
            setComment(data);
        },
        onError: (error) => {
            toast({
                title: 'Error',
                description: 'An error occured while getting comments',
                isClosable: true,
                position: 'top',
                status: 'error',
                duration: 5000
            });
        }
    })

    const compare = React.useCallback(( a: IComment, b: IComment ) => {
        if (sort === 1) {
            if ((a.email as string) < (b.email as string)) {
                return -1;
            }
        }

        if (sort === 2) {
            if ((a.fullname as string) < (b.fullname as string)) {
                return -1;
            }
        }

        if (sort === 3) {
            if ((a.reviewed) < (b.reviewed)) {
                return -1;
            }
        }

        if (sort === 4) {
            if ((a.reviewed) > (b.reviewed)) {
                return -1;
            }
        }
        return 0;
      }, [sort]);

    return (
        <div className='w-full py-10 px-10' >
            <div className='w-full flex items-center' > 
                <div className=''>
                    <p style={{fontSize: '20px'}} className='font-Graphik-Medium'>Customer Reviews</p>
                    <p style={{color: '#8A8A8A'}} className='text-sm font-Graphik-Regular' >Manage all customer reviews for vendors</p>
                </div>
                <div className='ml-auto'>
                    {/* <Select className='font-Graphik-Regular ' fontSize='12px' backgroundColor='white' placeholder='Past 30 days'>
                        <option value='option1'>Option 1</option>
                        <option value='option2'>Option 2</option>
                        <option value='option3'>Option 3</option>
                    </Select> */}
                </div>
            </div>
            <div className='w-full flex my-6 px-8 items-center justify-between ' >
                <div className='bg-white w-full mx-2 p-4 rounded-lg' >
                    {!loading && <p style={{fontSize: '24px'}} className='font-Graphik-SemiBold'>{data.comments}</p>}
                    {loading && <Spinner size="sm" color={theme.primaryColor} />}
                    <p className='text-sm font-Graphik-Medium mt-1' >Total Comments</p>
                    {/* <p style={{color: '#8A8A8A'}} className='text-xs font-Graphik-Regular mt-2' ><span style={{color: '#E00253'}} >-2%</span> than last month</p> */}
                </div> 
                <div className='bg-white w-full mx-2 p-4 rounded-lg' >
                    {!loading && <p style={{fontSize: '24px'}} className='font-Graphik-SemiBold'>{data.approved}</p>}
                    {loading && <Spinner size="sm" color={theme.primaryColor} />}
                    <p className='text-sm font-Graphik-Medium mt-1' >Total Approved</p>
                    {/* <p style={{color: '#8A8A8A'}} className='text-xs font-Graphik-Regular mt-2' ><span style={{color: '#E00253'}} >-2%</span> than last month</p> */}
                </div> 
                <div className='bg-white w-full mx-2 p-4 rounded-lg' >
                    {!loading && <p style={{fontSize: '24px'}} className='font-Graphik-SemiBold'>{data.average}</p>}
                    {loading && <Spinner size="sm" color={theme.primaryColor} />}
                    <p className='text-sm font-Graphik-Medium mt-1' >Average Rating</p>
                    {/* <p style={{color: '#8A8A8A'}} className='text-xs font-Graphik-Regular mt-2' ><span style={{color: '#0CD27C'}} >-2%</span> than last month</p> */}
                </div> 
            </div>
            <div className='flex items-center my-12' >
                <p style={{fontSize: '16px'}} className='font-Graphik-SemiBold'>Reviews</p>
            
                <div className='ml-auto flex items-center'>
                    <Input  className='font-Graphik-Regular mx-2' fontSize='14px' backgroundColor='#FBFBFB' placeholder='Search by name or email' onChange={(e: any) => setSearch(e.target.value)} value={search} />
                    
                <p style={{fontSize: '14px'}} className='font-Graphik-Medium mx-2'>Filter</p>
                    <Select className='font-Graphik-Regular mx-2' fontSize='14px' backgroundColor='#FBFBFB' onChange={(e: any) => setSort(parseInt(e.target.value))}>
                        <option value={1}>Email</option>
                        <option value={2}>Full name</option>
                        <option value={3}>Pending</option>
                        <option value={4}>Approved</option>
                    </Select>
                <button style={{backgroundColor: '#1A8F85'}} className='px-8 py-3 font-Graphik-Regular text-sm text-white rounded-md ml-8' >Apply</button>
                </div>
            </div>
            <div className='bg-white w-full py-6' >

                <Table variant='unstyled' >
                    {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
                    <Thead>
                        <Tr className='font-Graphik-Medium text-sm' >
                            <Th>S/N</Th>
                            <Th>CREATED BY</Th> 
                            <Th>FULL NAME</Th> 
                            <Th>EMAIL</Th> 
                            <Th>STATUS</Th> 
                            <Th>ACTION</Th> 
                        </Tr>
                    </Thead>
                    <Tbody>
                        {filteredUsers
                        .sort(compare)
                        .map((item, index)=> {
                            return(
                                <Tr className='font-Graphik-Regular text-sm' key={index} >
                                    <Td>{index+1}</Td>
                                    <Td className='flex flex-col'><p>{item.fullname}</p><p className='text-xs' >{new Date(item.created_at).toDateString()}</p></Td>
                                    <Td>{item.fullname}</Td>
                                    <Td>{item.email}</Td>
                                    <Td style={item.reviewed ? {color: '#0CD27C'} : {color: '#F60D0D'}}>{item.reviewed ? 'Approve':'Pending'}</Td>
                                    <Td >
                                        <svg onClick={()=> {setActiveComment(item); setShowModal(true)}} className='mx-auto cursor-pointer' id="Iconly_Bold_Show" data-name="Iconly/Bold/Show" xmlns="http://www.w3.org/2000/svg" width="15" height="12" viewBox="0 0 15 12">
                                            <g id="Show">
                                                <path id="Show-2" data-name="Show" d="M7.493,12C4.4,12,1.611,9.836.044,6.211a.543.543,0,0,1,0-.429C1.609,2.161,4.394,0,7.493,0H7.5a6.98,6.98,0,0,1,4.3,1.534,10.676,10.676,0,0,1,3.154,4.248.543.543,0,0,1,0,.429C13.389,9.836,10.6,12,7.5,12ZM4.573,6A2.923,2.923,0,1,0,7.5,3.091,2.918,2.918,0,0,0,4.573,6Zm1.1,0a1.865,1.865,0,0,1,.037-.356h.036a1.5,1.5,0,0,0,1.5-1.44A1.492,1.492,0,0,1,7.5,4.18,1.814,1.814,0,1,1,5.672,6Z" fill="#200e32"/>
                                            </g>
                                        </svg>
                                    </Td>
                                </Tr> 
                            )
                        })}
                    </Tbody> 
                </Table>
            </div>

            <div className='flex items-center my-12' >
                <p style={{fontSize: '14px'}} className='font-Graphik-Regular'>Showing <span className='font-Graphik-SemiBold' >1-{filteredUsers.length}</span> from <span className='font-Graphik-SemiBold' >{filteredUsers.length} data</span></p>
                {/* <div className='flex items-center ml-auto' >
                    <div style={{borderColor: '#C2C2C2'}} className='w-10 h-10 rounded-lg cursor-pointer flex justify-center items-center border' >

                    </div>
                    <div style={{borderColor: '#C2C2C2'}} className='w-auto h-10 font-Graphik-Bold rounded-lg flex border mx-2'> 
                        <div style={{backgroundColor: '#3E3F41'}} className='w-10 cursor-pointer h-10 rounded-lg flex text-white justify-center items-center' >
                            1
                        </div>
                        <div style={{color: '#202020'}} className='w-10 cursor-pointer h-10 rounded-lg flex text-white justify-center items-center' >
                            2
                        </div>
                        <div style={{color: '#202020'}} className='w-10 cursor-pointer h-10 rounded-lg flex text-white justify-center items-center' >
                            3
                        </div>
                        <div style={{color: '#202020'}} className='w-10 cursor-pointer h-10 rounded-lg flex text-white justify-center items-center' >
                            4
                        </div>
                    </div>
                    <div style={{borderColor: '#C2C2C2'}} className='w-10 h-10 rounded-lg cursor-pointer flex justify-center items-center border' >

                    </div>
                </div> */}
            </div>

        {showModal ? 
            (
                <>
                    <div className="h-auto flex justify-center items-center overflow-x-hidden overflow-y-hidden fixed pb-4 px-4 inset-0 z-50 outline-none focus:outline-none"> 
                        <CustomerModal close={setShowModal} next={setShowRejectModal} comment={activeComment} />
                    </div> 
                    <div className="opacity-25 fixed flex flex-1 inset-0 z-20 bg-black"/>
                </>
            ) : null} 

        {showRejectModal ? 
            (
                <>
                    <div className="h-auto flex justify-center items-center overflow-x-hidden overflow-y-hidden fixed pb-4 px-4 inset-0 z-50 outline-none focus:outline-none"> 
                        <RejectReview close={setShowRejectModal} />
                    </div> 
                    <div className="opacity-25 fixed flex flex-1 inset-0 z-50 bg-black"/>
                </>
            ) : null} 
        </div>
    )
}
