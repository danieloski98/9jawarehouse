import React from 'react';

// redux
import { RootState } from '../../store/index'
import { useSelector, useDispatch } from 'react-redux'
import { setServices as SetServ } from '../../reducers/services.reducer'
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
import Footer from '../Home/Footer';
import { IState } from '../../utils/types/Lga&State';


export default function CompleteRegistration() {
  const [services, setServices] = React.useState([] as Array<IServices>);
  const [states, setStates] = React.useState([] as Array<IState>);

  const dispatch = useDispatch();
 

  React.useMemo(() => {
    (async function() {
      const request1 = await fetch(`${url}services`);
      const request2 = await fetch(`${url}states`);
      const json1 = await request1.json() as IServerReturnObject;
      const json2 = await request2.json() as IServerReturnObject;
      const ser = json1.data;
      const stat = json2.data as IState[];

      setServices(ser);
      dispatch(SetServ(ser))
      setStates(stat);
    })()
  }, [dispatch]);

  return (
    <div className="w-full h-auto flex flex-col">
        <Navbar page={1} setPage={() => {}} services={services} />
        <div className="w-full h-20 bg-white text-center shadow-lg z-10 xl:px-0 lg:px-0 md:px-5 sm:px-5">
            <p className="Cerebri-sans-book text-md text-gray-600 mt-6">Complete your 9jaWarehouse Account Set up</p>
        </div>

        <div className="flex-1 bg-gray-100 overflow-y-auto overflow-x-hidden z-10">
            <div className="bg-screen xl:px-10 lg:px-10 md:px-5 sm:px-5 py-10  w-full h-auto flex justify-center">
                <BigScreen services={services} states={states} />
            </div>
            <Footer />
        </div>

    </div>
  );
}
