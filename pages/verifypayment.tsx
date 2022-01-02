import React from 'react';
import { useRouter } from 'next/router'
import Verify from '../public/images/verifypayment.svg';
import Image from 'next/image';
import { Spinner } from '@chakra-ui/react';
import url from '../utils/url';
import { IServerReturnObject } from '../utils/types/serverreturntype';

export default function VerifyPayment() {
    const [loading, setLoading] = React.useState(false);
    const [ref, setRef] = React.useState("");
    const router = useRouter();

    React.useEffect(() => {
        const rf = router.query['reference'];
        setRef(rf as string);
    }, [router]);

    const verify = async () => {
        setLoading(true);
        const request = await fetch(`${url}payment/verify/${ref}`, {
            method: 'post',
        });
        const json = await request.json() as IServerReturnObject;
        setLoading(false);
        if (json.statusCode !== 200) {
            alert(json.errorMessage);
            return;
        }

        alert(json.successMessage);
        router.push('/dashboard');
    }

  return (
    <div className='w-full h-screen flex items-center justify-center bg-white flex-col'>
        <div className="w-56 h-56">
            <Image src={Verify} alt="payment" className='w-full h-full' />
        </div>
        <p className='font-light text-xl mt-2 text-gray-600'>Verify Payment</p>
        <button onClick={verify} className="w-40 h-12 bg-green-400 text-white mt-3 font-semibold text-md">
            {!loading && <span>Verify</span>}
            {loading && <Spinner color="white" size="md" />}
        </button>
    </div>
  );
}
