import React from 'react';
import { Select, Drawer, DrawerOverlay, DrawerBody, DrawerContent, DrawerCloseButton, Box } from '@chakra-ui/react'
import BusinessCard from '../../components/services/businesscard';
import ServiceNavbar from '../../components/services/ServiceNav';
import { FiFilter } from 'react-icons/fi'
import url from '../../utils/url';
import { states } from '../../components/completereg';
import { IServerReturnObject } from '../../utils/types/serverreturntype';
import { IServices } from '../../utils/types/services';

interface IProps {
    states: Array<states>;
    services: Array<IServices>;
}

export async function getStaticProps() {
    const states = await fetch('https://locationsng-api.herokuapp.com/api/v1/states');
    const services = await fetch(`${url}services`);

    const statesJ = await states.json() as Array<states>;
    const servicesJ = await services.json() as IServerReturnObject;

    return {
        props: {
            states: statesJ,
            services: servicesJ.data,
        }
    }
}

export default function Services({states, services}: IProps) {
    const [drawer, setDrawer] = React.useState(false);
    const [state, setState] = React.useState("");
    const [lgas, setLgas] = React.useState([] as Array<string>);

    React.useMemo(() => {
        (async function() {
            const request = await fetch(`https://locationsng-api.herokuapp.com/api/v1/states/${state}/lgas`);
            const json = await request.json() as Array<string>;
            setLgas(json);
        })()
    }, [state]);
    
  return (
    <div className="w-full h-screen flex flex-col ">

        {/* small screen filter  */}
    
    <Drawer isOpen={drawer} onClose={() => setDrawer(false)} placement="bottom" >
        <DrawerOverlay />
        <DrawerContent>
            <DrawerCloseButton />
            <DrawerBody>

            <div className="w-full flex flex-col py-6">
               <p className="text-md font-light text-gray-500 mb-6">Filter</p>
               <div className="w-full h-10 mb-5">
                   <Select border="none" bgColor="whitesmoke">
                       <option value="" selected>Service</option>
                       {services.map((item, index) => (
                           <option key={index.toString()} value={item.name}>{item.name}</option>
                       ))}
                   </Select>
               </div>
               <div className="w-full h-10 mb-5">
                   <Select border="none" bgColor="whitesmoke" borderRadius="0">
                       <option value="" selected>State</option>
                       {states.map((item, index) => (
                           <option key={index.toString()} value={item.name}>{item.name}</option>
                       ))}
                   </Select>
               </div>
               <div className="w-full h-10 mb-5">
                   <Select border="none" bgColor="whitesmoke" onChange={(e) => setState(e.target.value)}>
                       <option value="" selected>LGA</option>
                       {lgas.length > 0 && lgas.map((item, index) => (
                           <option key={index.toString()} value={item}>{item}</option>
                       ))}
                   </Select>
               </div>
               <button className="w-full h-10 bg-themeGreen text-white font-light">Apply</button>
           </div>

            </DrawerBody>
        </DrawerContent>
    </Drawer>

    <div className="w-full h-24 z-20">
        <ServiceNavbar />
    </div>

    <div className="w-full xl:px-10 lg:px-10 sm:px-5 md:px-5 flex h-auto py-8 items-center justify-between">
        <p className="font-light text-md">56 results for  fashion designers</p>
        <FiFilter size={25} color="grey" className="xl:hidden lg:hidden md:block sm:block" onClick={() => setDrawer(true)} />
    </div>

    <div className="w-full h-auto overflow-x-auto px-5 xl:hidden lg:hidden md:flex sm:flex">
            {services.map((item, index) => (
                <div className='mr-5 h-full min-w-max p-2 text-sm font-light rounded-full bg-gray-200' key={index.toString()} >{item.name}</div>
            ))}
    </div>

    <div className="z-10 flex-1 h-full overflow-auto xl:p-0 lg:p-0 md:p-5 sm:p-5 flex justify-between">

        <div className="w-1/6 h-full xl:block lg:block md:hidden sm:hidden pb-5 mx-5">
            {/* <Sidebar page={page} setPage={changePage} /> */}
            <div className="w-full h-full bg-white border-2 border-gray-200 p-5 overflow-scroll">
                    {services.map((item, index) => (
                           <option key={index.toString()} value={item.name}>{item.name}</option>
                       ))}

            </div>

            <div className="w-full flex justify-end">
                <p></p>
            </div>
        </div>

        <div className="xl:w-9/12 lg:w-9/12 md:w-full sm:w-full h-full  xl:ml-10 lg:ml-10 md:ml-0 sm:ml-0 p-0 flex flex-col">

            {/* Filter */}

           <div className="w-full h-12 xl:flex lg:flex md:hidden sm:hidden items-center">
               <p className="text-md font-light text-gray-500">Filter :</p>
               <div className="w-32 h-10 ml-6">
                   <Select border="none" bgColor="whitesmoke">
                       <option value="" selected>Service</option>
                       {services.map((item, index) => (
                           <option key={index.toString()} value={item.name}>{item.name}</option>
                       ))}
                   </Select>
               </div>
               <div className="w-32 h-10 ml-6">
                   <Select border="none" bgColor="whitesmoke" borderRadius="0">
                       <option value="" selected>State</option>
                       <option value="">One</option>
                       <option value="">One</option>
                   </Select>
               </div>
               <div className="w-32 h-10 ml-6">
                   <Select border="none" bgColor="whitesmoke">
                       <option value="" selected>Area</option>
                       <option value="">One</option>
                       <option value="">One</option>
                   </Select>
               </div>
               <button className="w-32 h-10 bg-themeGreen text-white font-light ml-6">Apply</button>
           </div>

           <div className="flex-1 h-full overflow-y-auto flex xl:flex-row lg:flex-row md:flex-col sm:flex-col xl:justify-between lg:justify-between md:justify-center sm:justify-center xl:pr-16 lg:pr-16 md:pr-0 sm:pr-0 pt-0 mt-6 xl:flex-wrap lg:flex-wrap sm:flex-nowrap md:flex-nowrap xl:pt-0 lg:pt-0 md:pt-64 sm:pt-96">
               
               <BusinessCard />
               <BusinessCard />
               <BusinessCard />
               <BusinessCard />
               <BusinessCard />
               <BusinessCard />
               <BusinessCard />
               <BusinessCard />
               <BusinessCard />
               
           </div>

        </div>

    </div>
    {/* <Footer /> */}
</div>
  );
}
