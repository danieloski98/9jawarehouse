import React from 'react';
import { Select, Drawer, DrawerOverlay, DrawerBody, DrawerContent, DrawerCloseButton, Box, Spinner, Divider } from '@chakra-ui/react'
import BusinessCard from '../../components/services/businesscard';
import ServiceNavbar from '../../components/services/ServiceNav';
import { FiFilter } from 'react-icons/fi'
import url from '../../utils/url';
import { states } from '../../components/completereg';
import { IServerReturnObject } from '../../utils/types/serverreturntype';
import { IServices } from '../../utils/types/services';
import { GetStaticPaths } from 'next';
import { IUser } from '../../utils/types/user';
import { useRouter } from 'next/router'
import { ILga, IState } from '../../utils/types/Lga&State';

// redux
import { RootState } from '../../store/index'
import { updateUser } from '../../reducers/User.reducer';
import { updatetoken } from '../../reducers/Token.reducer';
import { updatePin } from '../../reducers/pin.reducer'
import { login, logout } from '../../reducers/logged'
import { useDispatch, useSelector } from 'react-redux'
import Footer from '../../components/Home/Footer';
import { setService, setLga } from '../../reducers/Search.reducer';



interface IProps {
    states: Array<IState>;
    services: Array<IServices>;
}


export async function getStaticProps() {
    const states = await fetch(`${url}states`);
    const services = await fetch(`${url}services`);

    const statesJ = await states.json() as IServerReturnObject;
    const servicesJ = await services.json() as IServerReturnObject;

    const st = statesJ.data;

    return {
        props: {
            states: st,
            services: servicesJ.data,
        }
    }
}

export default function Services({states, services}: IProps) {
    const [drawer, setDrawer] = React.useState(false);
    const [state, setState] = React.useState("");
    const [lgas, setLgas] = React.useState([] as Array<ILga>);
    const [businesses, setBusinesses] = React.useState([2] as Array<IUser | any>);
    const [loading, setLoading] = React.useState(true);
    const serviceState = useSelector(( state: RootState ) => state.SearchReduer);

    const dispatch = useDispatch();

    // router
    const router = useRouter();

    // filters
    const [st, setSt] = React.useState("");
    const [sr, setSr] = React.useState(router.query['service']);
    const [la, setLa] = React.useState("");

    React.useMemo(() => {
        if (state !== "") {
            (async function() {
                try {
                    const request = await fetch(`${url}states/lgas/${state}`);
                    const json = await request.json() as IServerReturnObject;
                    const lga = json.data as Array<ILga>;
                    setLgas(lga);
                } catch (error) {
                    alert("An error occured");
                    return
                }
            })()
        }
    }, [state]);
    

    React.useEffect(() => {
        localStorage.setItem('activeService', sr as string);
        (async function() {
            setLoading(true);
            const request = await fetch(`${url}user?service=${sr}&state=${st}`);
            const json = await request.json() as IServerReturnObject;
            const data = json.data as IUser[];
            setBusinesses(data);
            setLoading(false);
        })()
    }, [sr]);

    React.useEffect(() => {
        setSr(router.query['service']);
        setSt(router.query['state'] as string)
        setState(router.query['state'] as string);

        if (router.query['lga'] !== '') {
            setLa(router.query['lga'] as string);
        }
        
        setLoading(true);
        (async function() {
            (async function() {
                const request = await fetch(`${url}user?service=${router.query['service']}&state=${router.query['state']}`);
                const json = await request.json() as IServerReturnObject;
                const data = json.data as IUser[];
                setBusinesses(data);
                setLoading(false);
            })()
        })()
    }, [router.query]);

    const setValues = () => {
        
    }


    const fetchUser = React.useCallback( async() => {
        setLoading(true);
        const _id = JSON.parse(localStorage.getItem('9jauser') as string)._id;
        const request = await fetch(`${url}user/${_id}`);
        const json = await request.json() as IServerReturnObject;
    
        if (json.statusCode !== 200) {
            router.push('/');
            alert(json.errorMessage);
            setLoading(false);
            return
        } else {
            dispatch(updateUser(json.data));
            dispatch(login());
            setLoading(false);
        }
      }, [dispatch, router])
    
    
      React.useEffect(() => {
          const data = localStorage.getItem('9jauser');
    
          if (data === null || data === undefined) {
              dispatch(logout());
            //   router.push('/');
          } else {
              fetchUser();
          }
      }, []);

    const SelectState = (newstate: string) => {
        setState(newstate);
        setSt(newstate)
    }

    async function getUsers() {

        if (state === "") {
            alert("Please select a state");
            return;
        }

        setLoading(true);
        if (la === "") {
            const request = await fetch(`${url}user?service=${sr}&state=${st}`)
            const json = await request.json() as IServerReturnObject;
            const data = json.data as IUser[];
            setBusinesses(data);
            setLoading(false);
            setDrawer(false);
            return
        } else if (la !== "" || la !== undefined) {
            const request = await fetch(`${url}user?service=${sr}&state=${st}&lga=${la}`);
            const json = await request.json() as IServerReturnObject;
            const data = json.data as IUser[];
            setBusinesses(data);
            setLoading(false);
            setDrawer(false);
            return
        }
       
    }
    
  return (
    <div className="w-full h-full flex flex-col ">

        {/* small screen filter  */}
    
    <Drawer isOpen={drawer} onClose={() => setDrawer(false)} placement="bottom" >
        <DrawerOverlay />
        <DrawerContent>
            <DrawerCloseButton />
            <DrawerBody>

            <div className="w-full flex flex-col py-6">
               <p className="text-md font-light text-gray-500 mb-6">Filter</p>
               <div className="w-full h-10 mb-5">
                   <Select defaultValue={sr} value={sr}  border="none" bgColor="whitesmoke" onChange={(e) => setSr(e.target.value)}>
                       <option value={sr} selected>{sr}</option>
                       {services.map((item, index) => (
                           <option key={index.toString()} value={item.name}>{item.name}</option>
                       ))}
                   </Select>
               </div>
               <div className="w-full h-10 mb-5">
                   <Select border="none" bgColor="whitesmoke" value={st} borderRadius="0" onChange={(e) => SelectState(e.target.value)}>
                       <option value="" selected>State</option>
                       {states.map((item, index) => (
                           <option key={index.toString()} value={item.officialName}>{item.officialName}</option>
                       ))}
                   </Select>
               </div>
               <div className="w-full h-10 mb-5">
                   <Select border="none" bgColor="whitesmoke"  onChange={(e) => setLa(e.target.value)}>
                       <option value="" selected>LGA (optional)</option>
                       {lgas !== undefined && lgas.length > 0 && lgas.map((item, index) => (
                           <option key={index.toString()} value={item.LGA}>{item.LGA}</option>
                       ))}
                   </Select>
               </div>
               <button onClick={getUsers} className="w-full h-10 bg-themeGreen text-white font-light">
                   {loading && <Spinner color="green" size="md" /> }
                   {!loading && <span>Apply</span> }
               </button>
           </div>

            </DrawerBody>
        </DrawerContent>
    </Drawer>

    <div className="w-full h-20 z-50">
        <ServiceNavbar />
    </div>

    {/* {businesses.length} */}

    <div className="w-full xl:px-6 lg:px-5 sm:px-6 md:px-5 flex h-auto py-4 items-center justify-between  z-20 mt-10">
        <p className=" font-Circular-std-medium text-md text-themeGreen">{businesses.length} <span className=" font-Cerebri-sans-book"> results for  {sr}</span> </p>
        <FiFilter size={25} color="grey" className="xl:hidden lg:hidden md:block sm:block" onClick={() => setDrawer(true)} />
    </div>

    <div className="w-full h-16 py-4 overflow-x-auto px-5 xl:hidden lg:hidden md:flex sm:flex  z-20">
            {services.map((item, index) => (
                <div className='mr-5 h-8 min-w-max p-2 text-sm font-Cerebri-sans-book rounded-full bg-gray-400 text-white flex items-center ' onClick={() => setSr(item.name)} key={index.toString()} >{item.name}</div>
            ))}
    </div>

    <div className="z-20 flex-1 h-auto xl:p-0 lg:p-0 md:p-5 sm:p-5 flex justify-between">

        <div className="w-1/5 h-full xl:block lg:block md:hidden sm:hidden pb-5 mx-5 mt-4">
            {/* <Sidebar page={page} setPage={changePage} /> */}
            <div className="w-full h-full bg-white border-2 border-gray-200 p-0 overflow-auto">
            <p className=' mb-0 cursor-pointer w-full h-auto p-3 gray-300 font-Circular-std-medium text-md'>Related Service</p>
            <Divider />
                {services.map((item, index) => (
                    <p key={index.toString()} onClick={() => setSr(item.name)} className=' cursor-pointer w-full h-auto p-3 hover:bg-gray-200 border-gray-300 font-Cerebri-sans-book text-sm'>{item.name}</p>
                ))}
            </div>

            <div className="w-full flex justify-end">
                <p></p>
            </div>
        </div>

        <div className="xl:w-9/12 lg:w-9/12 md:w-full sm:w-full h-full  xl:ml-10 lg:ml-10 md:ml-0 sm:ml-0 p-0 flex flex-col">

            {/* Filter */}

           <div className="w-full h-12 xl:flex lg:flex md:hidden sm:hidden items-center">
               <p className="text-md font-Circular-std-medium text-gray-500">Filter :</p>
               <div className="w-32 h-10 ml-6">
                   <Select border="none" defaultValue={sr} bgColor="whitesmoke" fontSize="sm" className="font-Cerebri-sans-book" onChange={(e) => setSr(e.target.value)}>
                       <option value={sr} selected>{sr}</option>
                       {services.map((item, index) => (
                           <option key={index.toString()} value={item.name}>{item.name}</option>
                       ))}
                   </Select>
               </div>
               <div className="w-32 h-10 ml-6">
                    <Select border="none" bgColor="whitesmoke" value={st} borderRadius="0" fontSize="sm" className="font-Cerebri-sans-book" onChange={(e) => SelectState(e.target.value)}>
                       <option value="" selected>State</option>
                       {states.map((item, index) => (
                           <option key={index.toString()} value={item.officialName}>{item.officialName}</option>
                       ))}
                   </Select>
               </div>
               <div className="w-32 h-10 ml-6">
                    <Select border="none" bgColor="whitesmoke" fontSize="sm" className="font-Cerebri-sans-book text-xs" onChange={(e) => setLa(e.target.value)}>
                       <option value="" selected className='text-xs font-gray-500'>LGA (optional)</option>
                       {lgas !== undefined && lgas.length > 0 && lgas.map((item, index) => (
                           <option key={index.toString()} value={item.LGA}>{item.LGA}</option>
                       ))}
                   </Select>    
               </div>
               <button onClick={getUsers} className="w-32 h-10 bg-themeGreen text-white font-Cerebri-sans-book text-sm ml-6">Apply</button>
           </div>

           <div className="flex-1 h-full overflow-y-auto flex xl:flex-row lg:flex-row md:flex-col sm:flex-col xl:justify-between lg:justify-between md:justify-start sm:justify-start xl:pr-16 lg:pr-16 md:pr-0 sm:pr-0 pt-0 mt-6 xl:flex-wrap lg:flex-wrap sm:flex-nowrap md:flex-nowrap xl:pt-0 lg:pt-0 md:pt-5 sm:pt-5">
               
                    {loading && (
                        <div className="w-full h-40 flex justify-center">
                            <Spinner size="lg" color='green' />
                        </div>
                    )}

                    {!loading && businesses !== undefined && businesses.length > 0 && businesses.map((item, index) => (
                        <BusinessCard user={item} key={index.toString()} />
                    ))}

                    {!loading && businesses !== undefined && businesses.length < 1 && (
                        <div className="w-full h-20 flex font-Cerebri-sans-book text-md mt-0 justify-center">
                          <p>No business found for search &quot;{sr}&quot; in &quot;{state}&quot;</p>
                        </div>
                    )}
               
           </div>

        </div>

    </div>
    <Footer />
</div>
  );
}
