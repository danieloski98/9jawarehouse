import { Input, Select, useToast, Spinner } from '@chakra-ui/react'
import React from 'react';
import { queryClient } from '../../App';
import { IReturnObject } from '../../types/ServerReturnType';
import { url } from '../../utils/url';

interface IProps {
    header: string;
    button: string;
    close: Function;
    new: boolean;
    delete: boolean;
    value?: string;
    body: string;
    id: string;
}

export default function ReuseableCategoryModal(props: IProps) {
    const [loading, setLoading] = React.useState(false);
    const [cat, setCat] = React.useState(props.new ? '': props.value);
    const toast = useToast();
    
    const create = async () => {
        const request = await fetch(`${url}/services`, {
            method: 'post',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ name: cat }),
        });
        const json = await request.json() as IReturnObject;
        setLoading(false);
        if (json.statusCode !== 200) {
            toast({
                title: 'Error',
                description: json.errorMessage,
                status: 'error',
                duration: 3000,
                position: 'top',
            });
            return;
        } else {
            toast({
                title: 'Success',
                description: json.successMessage,
                status: 'success',
                duration: 3000,
                position: 'top',
            });
            props.close(false);
            queryClient.invalidateQueries();
            return;
        }
    }

    const edit = async () => {
        const request = await fetch(`${url}/services/${props.id}`, {
            method: 'put',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ name: cat }),
        });
        const json = await request.json() as IReturnObject;
        setLoading(false);
        if (json.statusCode !== 200) {
            toast({
                title: 'Error',
                description: json.errorMessage,
                status: 'error',
                duration: 3000,
                position: 'top',
            });
            return;
        } else {
            toast({
                title: 'Success',
                description: json.successMessage,
                status: 'success',
                duration: 3000,
                position: 'top',
            });
            props.close(false);
            queryClient.invalidateQueries();
            return;
        }
    }

    const deletee = async () => {
        const request = await fetch(`${url}/services/${props.id}`, {
            method: 'delete',
        });
        const json = await request.json() as IReturnObject;
        setLoading(false);
        if (json.statusCode !== 200) {
            toast({
                title: 'Error',
                description: json.errorMessage,
                status: 'error',
                duration: 3000,
                position: 'top',
            });
            return;
        } else {
            toast({
                title: 'Success',
                description: json.successMessage,
                status: 'success',
                duration: 3000,
                position: 'top',
            });
            props.close(false);
            queryClient.invalidateQueries();
            return;
        }
    }

    const caller = () => {
        setLoading(true);
        if (!props.delete && props.new) {
            create();
            return;
        }
        if (!props.delete && !props.new) {
            edit()
            return
        }
        if (props.delete) {
            deletee();
        }
    }
    return (
        <div style={{width: '416px'}} className='bg-white rounded-lg px-10 py-4 pb-14'  > 
            <div className='w-full flex items-center' >
                <p className='font-Graphik-SemiBold mt-6' style={{color:'#0C0C0C'}} >{props.header}</p> 
                <svg onClick={()=> props.close(false)} className='ml-auto cursor-pointer' xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                    <g id="Iconly_Light_Close_Square" data-name="Iconly/Light/Close Square" transform="translate(0.75 0.75)">
                        <g id="Close_Square" data-name="Close Square">
                        <path id="Stroke_1" data-name="Stroke 1" d="M4.792,0,0,4.792" transform="translate(6.853 6.845)" fill="none" stroke="#1a1a1a" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
                        <path id="Stroke_2" data-name="Stroke 2" d="M4.8,4.8,0,0" transform="translate(6.85 6.843)" fill="none" stroke="#1a1a1a" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
                        <path id="Stroke_3" data-name="Stroke 3" d="M13.584,0H4.915C1.894,0,0,2.139,0,5.166v8.168C0,16.361,1.885,18.5,4.915,18.5h8.668c3.031,0,4.917-2.139,4.917-5.166V5.166C18.5,2.139,16.614,0,13.584,0Z" fill="none" stroke="#1a1a1a" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>
                        </g>
                    </g>
                </svg>
            </div>
            <p className='text-sm font-Graphik-Regular my-4' >{props.body}</p>
            <p className='text-sm font-Graphik-Medium mb-2 mt-8' >Category</p>
            {/* {props.delete ? 
                <Select backgroundColor='white' fontSize='sm' placeholder='Select Category' border='1px solid #0C346839' />  
            : */}
                <Input disabled={props.delete} backgroundColor='white' value={cat} onChange={(e) => setCat(e.target.value)} fontSize='sm' placeholder='Enter Category Name' border='1px solid #0C346839' /> 
            {/* } */}
            {/* <p className='text-sm font-Graphik-Medium mb-2 mt-4' >Enter your password</p>
            <Input backgroundColor='white' fontSize='sm' placeholder='Enter Password' border='1px solid #0C346839' /> */}
            <button onClick={caller} style={{backgroundColor: '#1A8F85'}} className='w-full py-3 font-Graphik-Bold text-sm text-white rounded-md mt-8' >
                {!loading && props.button}
                {loading && <Spinner size="sm" color="white" />}
             </button>
        </div>
    )
}
