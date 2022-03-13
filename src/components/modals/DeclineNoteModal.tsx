import React from 'react'
import {Modal, ModalOverlay, ModalBody, ModalContent, Textarea, ModalCloseButton} from '@chakra-ui/react';
import { url } from '../../utils/url';
import { IReturnObject } from '../../types/ServerReturnType';
import {useToast, Spinner} from '@chakra-ui/react'
import { queryClient } from '../../App';

interface IProps {
    open: boolean;
    close: Function;
    id: string;
}

export default function DeclineNoteModal({open, close, id}: IProps) {
    const [msg, setMsg] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const toast = useToast();

    const Disapprove = async () => {
        setLoading(true);
        const request = await fetch(`${url}/user/admin/rejectverification/${id}`, {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({message: msg}),
        });
        const json = await request.json() as IReturnObject;
        setLoading(false);
        if (json.statusCode !== 200) {
            toast({
                status: 'error',
                title: 'Error',
                description: json.errorMessage,
                isClosable: true,
                position: 'top',
                duration: 5000,
            });
        } else {
            toast({
                status: 'success',
                title: 'Success',
                description: json.successMessage,
                isClosable: true,
                position: 'top',
                duration: 5000,
            });
            close(false);
        }
    }
  return (
    <Modal isOpen={open} onClose={() => close(false)} isCentered>
        <ModalOverlay />
        <ModalContent className='h-64'>
            <ModalCloseButton onClick={() => close(false)} />
            <ModalBody className=''>
                <p className='font- font-Graphik-Regular text-gray-600 text-md mt-10'>Live a note why the account wasn't approved</p>
                <Textarea className='mt-5' value={msg} onChange={(e) => setMsg(e.target.value)}></Textarea>
                <button onClick={Disapprove} className='w-full py-3 text-white font-Graphik-Regular text-sm rounded-md h-12 mt-4' style={{backgroundColor: '#1A8F85'}} >
                    {!loading && 'Send'}
                    {loading && <Spinner size="sm" color="white" />}
                </button>
            </ModalBody>
        </ModalContent>
    </Modal>
  )
}
