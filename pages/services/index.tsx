import React from 'react';
import Navbar from '../../components/general/Navbar';

export default function Services() {
  return (
    <div className="w-full h-screen flex flex-col ">
    <div className="w-full h-24 shadow-lg z-20">
        <Navbar page={1} setPage={() => {}} />
    </div>
    <div className="z-10 flex-1 h-full overflow-auto xl:p-10 lg:p-10 md:p-5 sm:p-5 flex justify-between">

        <div className="w-1/3 h-full xl:block lg:block md:hidden sm:hidden pb-10">
            {/* <Sidebar page={page} setPage={changePage} /> */}
            <div className="w-full h-64 bg-white"></div>
        </div>

        <div className="xl:w-9/12 lg:w-9/12 md:w-full sm:w-full h-auto  xl:ml-10 lg:ml-10 md:ml-0 sm:ml-0 p-0">
            {/* <EditProfile next={() => {}} /> */}
            {/* <Settings /> */}
            {/* <Profile /> */}
            {/* <Reviews /> */}
            {/* {switcher()} */}
        </div>

    </div>
    {/* <Footer /> */}
</div>
  );
}
