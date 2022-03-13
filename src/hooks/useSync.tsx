import React, {useState} from 'react'
import { useRecoilState } from 'recoil'
import { AdminState } from '../states/AdminState'
import {useQuery} from 'react-query';
import { url } from '../utils/url';
import { IReturnObject } from '../types/ServerReturnType';
import { IAdmin } from '../types/Admin.Type';
import {useToast} from '@chakra-ui/react'
import {useNavigate} from 'react-router-dom'

const getAdminByID = async (id: string) => {
    const request = await fetch(`${url}/admin/${id}`);
    const json = await request.json() as IReturnObject;

    if(!request.ok) {
        throw new Error('An error occured while validating Admin');
    }
    return json.data as IAdmin;
}

const getAdmins = async () => {
    const request = await fetch(`${url}/admin`);
    const json = await request.json() as IReturnObject;

    if(!request.ok) {
        throw new Error('An error occured while validating Admin');
    }
    return json.data as IAdmin[];
}

export default function useSync() {
    const [admin, setAdmin] = useRecoilState(AdminState);
    const [admins, setAdmins] = useState([] as IAdmin[]);

    const toast = useToast();
    const navigate = useNavigate();
    
    // queries
    const adminQuery = useQuery(['getAdmin', admin._id], () => getAdminByID(admin._id), {
        onSuccess: (data) => {
            setAdmin(data);
        },
        onError: () => {
            toast({
                title: 'Error',
                description: 'An error occured while getting admin',
                status: 'error',
                position: 'top',
                duration: 5000,
                isClosable: true
            });
            navigate('/')
        }
    })

    const adminsQuery = useQuery('getAdmins', () => getAdmins(), {
        onSuccess: (data) => {
            setAdmins(data);
        },
        onError: () => {
            toast({
                title: 'Error',
                description: 'An error occured while getting all admins',
                status: 'error',
                position: 'top',
                duration: 5000,
                isClosable: true
            })
        }
    })

  return {
      admins,
  }
}
