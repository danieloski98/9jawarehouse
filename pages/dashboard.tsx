import React from 'react';
import EditProfile from '../components/dashboard/EditProfile';
import Profile from '../components/dashboard/Profile';
import Reviews from '../components/dashboard/Reviews';
import Settings from '../components/dashboard/Settings';
import Sidebar from '../components/dashboard/Sidebar';
import Subscription from '../components/dashboard/Subscription';
import Navbar from '../components/general/Navbar';
import Footer from '../components/Home/Footer';

export default function Dashboard() {

  const [page, setPage] = React.useState(1 as number);

  const changePage = (page: 1|2|3|4|5) =>{
    setPage(page);
  }

  const switcher = () => {
      switch(page) {
          case 1: {
              return <Profile setPage={changePage} />
          }
          case 2: {
              return <Reviews />
          }
          case 3: {
              return <Subscription />
          }
          case 4: {
              return <Settings />
          }
          case 5: {
              return <EditProfile next={changePage} />
          }
      }
  }

  return (
    <div className="w-full h-screen flex flex-col ">
        <div className="w-full h-24 shadow-lg z-20">
            <Navbar page={page} setPage={changePage} />
        </div>
        <div className="z-10 flex-1 h-full overflow-auto bg-gray-100 xl:p-10 lg:p-10 md:p-5 sm:p-5 flex justify-between">

            <div className="w-1/3 h-full xl:block lg:block md:hidden sm:hidden pb-10">
                <Sidebar page={page} setPage={changePage} />
            </div>

            <div className="xl:w-9/12 lg:w-9/12 md:w-full sm:w-full h-auto  xl:ml-10 lg:ml-10 md:ml-0 sm:ml-0 p-0">
                {/* <EditProfile next={() => {}} /> */}
                {/* <Settings /> */}
                {/* <Profile /> */}
                {/* <Reviews /> */}
                {switcher()}
            </div>

        </div>
        {/* <Footer /> */}
    </div>
  );
}
