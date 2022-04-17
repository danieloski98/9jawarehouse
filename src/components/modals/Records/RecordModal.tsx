import React from 'react'
import { Modal, ModalOverlay, ModalContent, ModalBody, useToast, Spinner } from '@chakra-ui/react'
import { IRecord } from '../../../types/Records'
import Viewer from 'react-viewer';
import {approveRecord, deleteRecord} from '../../../services/Records'

export default function RecordModal({item, open, close}: {item: IRecord, open: boolean, close: Function}) {
    const [visible, setVisible] = React.useState(false);
    const [img, setImage] = React.useState('');
    const [a, setA] = React.useState(false);
    const [r, setR] = React.useState(false);
    const toast = useToast();

    const approve = async () => {
        const res = await approveRecord(item._id, setA);
        if (res.error) {
            toast({
                title: 'Error',
                description: res.errorMessage,
                status: 'error',
                position: 'top',
                duration: 4000,
                isClosable: true,
            });
            close(false);
            return;
        }
        toast({
            title: 'Success',
            description: res.successMessage,
            status: 'success',
            position: 'top',
            duration: 4000,
            isClosable: true,
        });
        close(false);
    }

    const reject = async () => {
        const res = await deleteRecord(item._id, setR);
        if (res.error) {
            toast({
                title: 'Error',
                description: res.errorMessage,
                status: 'error',
                position: 'top',
                duration: 4000,
                isClosable: true,
            });
            close(false);
            return;
        }
        toast({
            title: 'Success',
            description: res.successMessage,
            status: 'success',
            position: 'top',
            duration: 4000,
            isClosable: true,
        });
        close(false);
    }

  return (
    <Modal isOpen={open} onClose={() => close(false)} size="2xl">
         <Viewer
                visible={visible}
                onClose={() => { setVisible(false); } }
                images={[{src: img, alt: ''}]}
        />
        <ModalOverlay />
        <ModalContent>
            <ModalBody>
                <div className="w-full flex flex-col p-4">
                    <div className="w-full flex justify-between">
                        <div className="flex flex-col">
                            <h3 className='font-Graphik-Bold text-md text-gray-600'>Image Record : {item._id}</h3>
                            <p className="font-Graphik-Regular mt-3 text-sm">Number of Images - { item.images ? item.images.length : 0}</p>
                        </div>
                        <div className="flex flex-col">
                            {!item.approved && <button className='text-md text-white bg-yellow-200 p-2 rounded-full font-Graphik-Bold'>Pending</button> }
                        </div>
                    </div>

                    <div className="w-full flex mt-10 flex-wrap">
                        { item.images ? item.images.map((item, index) => (
                            <div className='w-40 h-40 overflow-hidden mr-5 cursor-pointer'>
                                <img src={item} alt="img" className='w-auto h-auto' />
                            </div>
                        )) : null}
                    </div>

                    <div className="w-full flex justify-end">
                        <button onClick={reject} className=' h-12 text-white font-Graphik-Bold text-sm bg-red-500 w-40 mr-4'>
                            {!r && 'Reject'}
                            {r &&  <Spinner color="white" />}
                        </button>
                        <button onClick={approve} className=' h-12 text-white font-Graphik-Bold text-sm bg-green-500 w-40'>
                            {!a && 'Approve'}
                            {a && <Spinner color="white" />}
                        </button>
                    </div>
                </div>
            </ModalBody>
        </ModalContent>
    </Modal>
  )
}
