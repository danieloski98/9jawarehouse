import React from 'react';
import dynamic from 'next/dynamic'

export interface states {
  name: string;
  capital: string;
}

// components
import Navbar from '../../components/general/Navbar';
import BigScreen from './bigScreen';
import url from '../../utils/url';
import { IServerReturnObject } from '../../utils/types/serverreturntype';
import { IServices } from '../../utils/types/services';

// export async function getStaticProps(context: any) {
//   const request1 = await fetch(`${url}services`);
//   const request2 = await fetch('http://locationsng-api.herokuapp.com/api/v1/states');
//   const json1 = await request1.json() as IServerReturnObject;
//   const json2 = await request2.json() as Array<states>;
//   const services = json1.data;
//   const states = json2;
//   return {
//     props: {
//       services,
//       states
//     }
//   }
// }

export default function CompleteRegistration() {
  const [services, setServices] = React.useState([] as Array<IServices>);
  const [states, setStates] = React.useState([] as Array<states>);

  React.useMemo(() => {
    (async function() {
      const request1 = await fetch(`${url}services`);
      const request2 = await fetch('http://locationsng-api.herokuapp.com/api/v1/states');
      const json1 = await request1.json() as IServerReturnObject;
      const json2 = await request2.json() as Array<states>;
      const ser = json1.data;
      const stat = json2;

      setServices(ser);
      setStates(stat);
    })()
  }, []);
  console.log(states);
  return (
    <div className="w-full h-screen flex flex-col">
        <Navbar page={1} setPage={() => {}} />
        <div className="w-full h-20 bg-white text-center shadow-lg z-20 xl:px-0 lg:px-0 md:px-5 sm:px-5">
            <p className="font-semibold text-sm text-gray-600 mt-6">Complete your 9jaWarehosue Account Set up</p>
        </div>

        <div className="flex-1 bg-gray-100 overflow-y-auto overflow-x-hidden z-10">
            <div className="bg-screen xl:px-10 lg:px-10 md:px-5 sm:px-5 py-10  w-full h-auto flex justify-center">
                <BigScreen services={services} states={states} />
            </div>
        </div>
    
    </div>
  );
}
