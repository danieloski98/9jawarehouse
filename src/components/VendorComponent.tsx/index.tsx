import { Select, Input, Table, Thead, Tr, Th, Tbody, Td, useToast, Spinner } from '@chakra-ui/react'
import React from 'react' 
import { useNavigate } from 'react-router-dom'
import EditUserProfileModal from './modal/EditUserProfileModal';
import ReuseableUserModal from './modal/ReuseableUserModal';
import {useQuery} from 'react-query';
import { url } from '../../utils/url';
import { IReturnObject } from '../../types/ServerReturnType';
import { IUser } from '../../types/user';
import { theme } from '../../utils/theme';
import {FiArchive} from 'react-icons/fi'
import { queryClient } from '../../App';
const xlsx = require('json-as-xlsx')

const settings = {
    fileName: '9jawarehouse user list', // Name of the spreadsheet
    extraLength: 3, // A bigger number means that columns will be wider
    writeOptions: {} // Style options from https://github.com/SheetJS/sheetjs#writing-options
}



const getActivity = async () => {
    const request = await fetch(`${url}/analytics/vendors`);
    const json = await request.json() as IReturnObject;

    if (!request.ok) {
        throw new Error('An error occured');
    }

    return json;
  }

const getAllBusiness = async () => {
    const request = await fetch(`${url}/user/admin`);
    const json = await request.json() as IReturnObject;

    if (!request.ok) {
        throw new Error('An Error occured');
    }
    return json.data as Array<IUser>;
}

export default function Vendors() {

    const navigate = useNavigate(); 
    const [showModal, setShowModal] = React.useState(false) 
    const [deleteModal, setDeleteModal] = React.useState(false)
    const [users, setUsers] = React.useState([] as Array<IUser>);
    const [data, setData] = React.useState({ users: 0, blocked: 0, approved: '0' });
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false);
    const [active, setActive] = React.useState({} as IUser);
    const [arc, setArc] = React.useState(false);
    const [sort, setSort] = React.useState(1);
    const [search, setSearch] = React.useState('');

    const [filteredUsers, setFilteredUsers] = React.useState([] as Array<IUser>);

    React.useEffect(() => {
        if (search === '') {
            setFilteredUsers([...users]);
            return;
        }
        // eslint-disable-next-line array-callback-return
        const newArr = users.filter((item, index) => {
            if (item.email?.toLowerCase().includes(search.toLowerCase()) || item.business_name?.toLowerCase().includes(search.toLowerCase())) {
                return item;
            }
        });
        setFilteredUsers([...newArr]);
    }, [search, users])

    const toast = useToast();

    React.useEffect(() => {
        console.log(active);
    }, [active]);

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

    const userQuery = useQuery('getVendors', getAllBusiness, {
        onSuccess: (data) => {
            setUsers(data);
        },
        onError: () => {
            toast({
                status: 'error',
                title: 'error',
                description: 'Anerror occured while getting vendors',
                isClosable: true,
                position: 'top',
                duration: 5000,
            })
        }
    })

    const archive = async () => {
        setArc(true);
        const request = await fetch(`${url}/user/admin/archive/${active._id}`, {
            method: 'put',
        });
        const json = await request.json() as IReturnObject;
        if (json.error) {
            toast({
                status: 'error',
                title: 'Error',
                description: json.errorMessage,
                isClosable: true,
                position: 'top',
                duration: 4000,
            })
            return;
        } else {
            toast({
                status: 'success',
                title: 'Success',
                description: json.successMessage,
                isClosable: true,
                position: 'top',
                duration: 4000,
            })
        }
        queryClient.invalidateQueries();
        setDeleteModal(false);
        setArc(false);
    }

    const compare = React.useCallback(( a: IUser, b: IUser ) => {
        if (sort === 1) {
            if ((a.business_name as string) < (b.business_name as string)) {
                return -1;
            }
        }

        if (sort === 2) {
            if ((a.createAt as string) < (b.createAt as string)) {
                return -1;
            }
        }
        return 0;
      }, [sort]);


      // excel sheet data

      let xdata = [
        {
          sheet: 'Users List',
          columns: [
            { label: 'firstname', value: (row: IUser) => row.first_name },
            { label: 'lastname', value: (row: IUser) => row.last_name },
            { label: 'phone', value: (row: IUser) => row.phone },
            { label: 'verified', value: (row: IUser) => row.verified },
            { label: 'phone', value: (row: IUser) => row.phone },
            { label: 'blocked', value: (row: IUser) => row.blocked },
            { label: 'disabled', value: (row: IUser) => row.disabled },
            { label: 'username', value: (row: IUser) => row.username },
            { label: 'business_address', value: (row: IUser) => row.business_address },
            { label: 'profile_pic', value: (row: IUser) => row.profile_pic },
            { label: 'business_name', value: (row: IUser) => row.business_name },
            { label: 'business_description', value: (row: IUser) => row.business_description },
            { label: 'LGA', value: (row: IUser) => row.lga },
            { label: 'state', value: (row: IUser) => row.state },
            { label: 'facebook', value: (row: IUser) => row.facebook },
            { label: 'linkedin', value: (row: IUser) => row.linkedin },
            { label: 'twitter', value: (row: IUser) => row.twitter },
            { label: 'whatsapp', value: (row: IUser) => row.whatsapp },
            { label: 'website', value: (row: IUser) => row.website },
            { label: 'rating', value: (row: IUser) => row.rating },
            { label: 'verification_document', value: (row: IUser) => row.verification_document },
            { label: 'CAC', value: (row: IUser) => row.CAC },
            { label: 'services', value: (row: IUser) => row.services },
            { label: 'certificates', value: (row: IUser) => row.certificates },
          ],
          content: users,
        }, 
      ];

    return (
        <div className='w-full h-full' >
            <div className='w-full flex items-center' > 
                <div className=''>
                    <p style={{fontSize: '20px'}} className='font-Graphik-Medium'>Vendors</p>
                    <p style={{color: '#8A8A8A'}} className='text-sm font-Graphik-Regular' >Manage all Vendors on 9jawarehouse</p>
                </div>
                <div className='ml-auto'>  
                    <button onClick={()=> navigate('/dashboard/vendors/archived')} style={{backgroundColor: '#FBFBFB', border: '1px solid #585858'}} className='px-3 py-3 font-Graphik-Regular text-xs rounded-md' >Archived Profiles</button>
                </div>
            </div>
            <div className='w-full flex my-6 px-8 items-center justify-between ' >
                <div className='bg-white w-full mx-2 p-4 rounded-lg' >
                    {!loading && <p style={{fontSize: '24px'}} className='font-Graphik-SemiBold'>{data.users}</p>}
                    {loading && <Spinner size="sm" color={theme.primaryColor} />}
                    <p className='text-sm font-Graphik-Medium mt-1' >Total Register Vendors</p>
                    {/* <p style={{color: '#8A8A8A'}} className='text-xs font-Graphik-Regular mt-2' ><span style={{color: '#E00253'}} >-2%</span> than last month</p> */}
                </div> 
                <div className='bg-white w-full mx-2 p-4 rounded-lg' >
                    {!loading && <p style={{fontSize: '24px'}} className='font-Graphik-SemiBold'>{data.approved}</p>}
                    {loading && <Spinner size="sm" color={theme.primaryColor} />}
                    <p className='text-sm font-Graphik-Medium mt-1' >Total verfied</p>
                    {/* <p style={{color: '#8A8A8A'}} className='text-xs font-Graphik-Regular mt-2' ><span style={{color: '#E00253'}} >-2%</span> than last month</p> */}
                </div> 
                <div className='bg-white w-full mx-2 p-4 rounded-lg' >
                    {!loading && <p style={{fontSize: '24px'}} className='font-Graphik-SemiBold'>{data.blocked}</p>}
                    {loading && <Spinner size="sm" color={theme.primaryColor} />}
                    <p className='text-sm font-Graphik-Medium mt-1' >Total Unverified</p>
                    {/* <p style={{color: '#8A8A8A'}} className='text-xs font-Graphik-Regular mt-2' ><span style={{color: '#0CD27C'}} >-2%</span> than last month</p> */}
                </div> 
            </div>
            <div className='flex items-center my-12' >
                <p style={{fontSize: '16px'}} className='font-Graphik-SemiBold'>All Vendors</p>
            
                <div className='ml-auto flex items-center'>
                    <Input  className='font-Graphik-Regular mx-2' fontSize='14px' backgroundColor='#FBFBFB' placeholder='Search name or email' onChange={(e: any) => setSearch(e.target.value)} value={search} />
                    
                <p style={{fontSize: '14px'}} className='font-Graphik-Medium mx-2'>Filter</p>
                    <Select className='font-Graphik-Regular mx-2' fontSize='14px' backgroundColor='#FBFBFB' onChange={(e: any) => setSort(parseInt(e.target.value))}>
                        <option value={1}>Busines name</option>
                        <option value={2}>Date Created</option>
                        
                    </Select>
                <button onClick={() => xlsx(xdata, settings)} style={{backgroundColor: '#1A8F85'}} className='px-2 py-2 w-56 font-Graphik-Regular text-xs text-white rounded-md ml-8' >Download Report</button>
                </div>
            </div>
            <div className='bg-white w-full py-6' >

                <Table variant='unstyled' >
                    {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
                    <Thead>
                        <Tr className='font-Graphik-Medium text-sm' >
                            <Th>S/N</Th>
                            <Th>VENDOR NAME</Th> 
                            <Th>VENDOR EMAIL</Th> 
                            <Th>SIGN UP DATE</Th> 
                            <Th>Status</Th> 
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
                                    <Td>{item.business_name}</Td>
                                    <Td>{item.email}</Td>
                                    <Td>{new Date(item.createAt).toDateString()}</Td>
                                    <Td>{item.blocked ? 'INACTIVE':'ACTIVE'}</Td>
                                    <Td className='flex items-center justify-between' >
                                        <FiArchive color="black" size={20} onClick={()=> {setActive(item); setDeleteModal(true);} } />
                                        <svg onClick={()=> {setActive(item);  setShowModal(true)}} className='mx-2 cursor-pointer' id="Iconly_Bold_Edit" data-name="Iconly/Bold/Edit" xmlns="http://www.w3.org/2000/svg" width="12.218" height="13.913" viewBox="0 0 12.218 13.913">
                                            <g id="Edit" transform="translate(0)">
                                                <path id="Edit-2" data-name="Edit" d="M11.793,4.406,4.959,13.244a1.637,1.637,0,0,1-1.271.635l-2.724.033a.311.311,0,0,1-.305-.242L.04,10.986a1.659,1.659,0,0,1,.314-1.4L5.2,3.32a.243.243,0,0,1,.33-.042L7.568,4.9a.658.658,0,0,0,.5.142.735.735,0,0,0,.636-.811.816.816,0,0,0-.256-.493L6.47,2.149a.294.294,0,0,1-.05-.409l.768-1a2.01,2.01,0,0,1,2.946-.2l1.147.911a2.384,2.384,0,0,1,.891,1.363,1.868,1.868,0,0,1-.38,1.589" fill="#200e32"/>
                                            </g>
                                        </svg>
                                        <svg onClick={()=> navigate(`/dashboard/vendors/profile/${item._id}`)} className='mx-2 cursor-pointer' id="Iconly_Bold_Show" data-name="Iconly/Bold/Show" xmlns="http://www.w3.org/2000/svg" width="15" height="12" viewBox="0 0 15 12">
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
                <p style={{fontSize: '14px'}} className='font-Graphik-Regular'>Showing <span className='font-Graphik-SemiBold' >1-10</span> from <span className='font-Graphik-SemiBold' >46 data</span></p>
                <div className='flex items-center ml-auto' >
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
                </div>
            </div>
            {showModal ? 
                (
                    <>
                        <div className="h-full flex justify-center py-4 overflow-x-hidden overflow-y-auto fixed pb-4 px-4 inset-0 z-50 outline-none focus:outline-none"> 
                            <EditUserProfileModal close={setShowModal} user={active} />
                        </div> 
                        <div className="opacity-25 fixed flex flex-1 inset-0 z-40 bg-black"/>
                    </>
                ) : null} 
                
            {deleteModal ? 
                (
                    <>
                        <div className="h-auto flex justify-center items-center overflow-x-hidden overflow-y-hidden fixed pb-4 px-4 inset-0 z-50 outline-none focus:outline-none"> 
                            <ReuseableUserModal header='Archive Vendor' body='You are about to archive a user’s account' button='Archive User' close={setDeleteModal} action={archive} loading={arc} />
                        </div> 
                        <div className="opacity-25 fixed flex flex-1 inset-0 z-40 bg-black"/>
                    </>
                ) : null} 
        </div>
    )
}
