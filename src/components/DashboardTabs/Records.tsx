import React from 'react'
import { Table, Tbody, Thead, Td, Tr, Th, TableContainer, TableCaption} from '@chakra-ui/react'
import { useQuery } from 'react-query';
import getRecords from '../../services/Records'
import { IRecord } from '../../types/Records';
import { FiEdit3 } from 'react-icons/fi'
import RecordModal from '../modals/Records/RecordModal';

export default function Records() {
    const [loading, setLoading] = React.useState(true);
    const [data, setData] = React.useState([] as Array<IRecord>);
    const [error, setError] = React.useState(false);
    const [showModal, setShowModal] = React.useState(false);
    const [rec, setRec] = React.useState({} as IRecord);

    const getRecordsQuery = useQuery('getRecords', getRecords, {
        onSuccess: (dt) => {
            setData(dt.data);
            setLoading(false);
            console.log(data);
        },
        onError: () => {
            setLoading(false);
            setError(true);
        }
    })

    const openModal = (item: IRecord) => {
        setRec(item);
        setShowModal(true);
    }
  return (
    <div className='w-full h-full flex flex-col p-10'>
        <RecordModal item={rec} open={showModal} close={setShowModal} />

        <h1 className='text-2xl font-Graphik-Bold text-gray-600'>Customer Images Replacement Records</h1>
        <p className='text-md mt-2 font-Graphik-Regular'>View all replacement images uploaded by vendors</p>

       <div className="w-full h-96 mt-10 overflow-auto ">
       <TableContainer className='mt-0 bg-white'>
            <Table>
                <TableCaption>List of all pending records to be approved</TableCaption>
                <Thead>
                    <Tr>
                        <Th>ID</Th>
                        <Th>Date Created</Th>
                        <Th>Number of Images</Th>
                        <Th>Status</Th>
                        <Th>Action</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {data.map((item, index) => (
                        <Tr key={index}>
                            <Td>{item._id}</Td>
                            <Td>{new Date(item.created_at).toDateString()}</Td>
                            <Td className='text-center'>{item.images.length}</Td>
                            <Td>{ item.approved ? 
                                <p className='text-md font-Graphik-SemiBold text-green-300'>Approved</p>
                            : 
                                <p className='text-md font-Graphik-SemiBold text-yellow-300'>Pending</p>
                            }</Td>
                            <Td>
                                { !item.approved && <FiEdit3 size={20} onClick={() => openModal(item)} color="black" className='cursor-pointer' /> }
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
       </div>
    </div>
  )
}
