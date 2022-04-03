import React from 'react'
import Icons from './MenuIcons'
import logo from '../assets/images/logo.png'
import { useNavigate, NavLink, useLocation } from 'react-router-dom'
import { theme } from '../utils/theme'


export default function Menu(props: any) {

    const Array = ['overview', 'activity', 'vendors', 'categories', 'subscriptions', 'rolemanagement', 'accountsettings']

    const navigate = useNavigate();
    const location = useLocation();

    const [active, setActive] = React.useState(localStorage.getItem('tab') + '')

    const ClickHandler = (index: any) => {


        localStorage.setItem('tab', index)
        const rout = index.toLowerCase().replace(/\s/g, '')

        //console.log(rout)
        if (index === 'overview') {
            navigate('/dashboard');
            setActive('/dashboard');
        } else {
            navigate('/dashboard/' + rout);
            console.log()
        }
    }

    React.useEffect(() => {
        setActive(location.pathname);
        console.log(active);
    }, [location.pathname]);



    return (
        <div className='w-full h-screen pt-4 flex flex-col items-start overflow-y-auto' >
            <img style={{ width: '70px', height: '70px' }} className='ml-6' alt='logo' src={logo} />
            <p className=' font-Graphik-Medium text-sm my-4 ml-6' >Internal Dashboard</p>
            <div className='w-full z-0' style={{ backgroundColor: '#FCFCFC' }} >

                <div  className='w-full cursor-pointer px-4 my-3' >
                    <div onClick={() => ClickHandler(Array[0])} style={active === '/dashboard' ? { backgroundColor: '#004143' } : {}} className='w-full h-full py-3 rounded-lg flex flex-row items-center ' >
                        <div className='w-12 ml-2 flex justify-center items-center' >
                            <Icons icons="overview" index={active} />
                        </div>
                        <p style={active === '/dashboard' ? { color: '#fff' } : { color: '#777777' }} className=' font-Graphik-Regular text-base' >OverView</p>
                    </div>
                </div>

                <div  className='w-full cursor-pointer px-4 my-3' >
                    <div onClick={() => ClickHandler(Array[1])} style={active === '/dashboard/activity' ? { backgroundColor: '#004143' } : {}} className='w-full h-full py-3 rounded-lg flex flex-row items-center ' >
                        <div className='w-12 ml-2 flex justify-center items-center' >
                            <Icons icons="activity" index={active} />
                        </div>
                        <p style={active === '/dashboard/activity' ? { color: '#fff' } : { color: '#777777' }} className=' font-Graphik-Regular text-base' >Activity</p>
                    </div>
                </div>

                <div  className='w-full cursor-pointer px-4 my-3' >
                    <div onClick={() => ClickHandler(Array[2])} style={active === '/dashboard/vendors' ? { backgroundColor: '#004143' } : {}} className='w-full h-full py-3 rounded-lg flex flex-row items-center ' >
                        <div className='w-12 ml-2 flex justify-center items-center' >
                            <Icons icons="vendors" index={active} />
                        </div>
                        <p style={active === '/dashboard/vendors' ? { color: '#fff' } : { color: '#777777' }} className=' font-Graphik-Regular text-base' >Vendors</p>
                    </div>
                </div>

                <div  className='w-full cursor-pointer px-4 my-3' >
                    <div onClick={() => ClickHandler(Array[3])} style={active === '/dashboard/categories' ? { backgroundColor: '#004143' } : {}} className='w-full h-full py-3 rounded-lg flex flex-row items-center ' >
                        <div className='w-12 ml-2 flex justify-center items-center' >
                            <Icons icons="categories" index={active} />
                        </div>
                        <p style={active === '/dashboard/categories' ? { color: '#fff' } : { color: '#777777' }} className=' font-Graphik-Regular text-base' >Categories</p>
                    </div>
                </div>

                <div  className='w-full cursor-pointer px-4 my-3' >
                    <div onClick={() => ClickHandler(Array[4])} style={active === '/dashboard/subscriptions' ? { backgroundColor: '#004143' } : {}} className='w-full h-full py-3 rounded-lg flex flex-row items-center ' >
                        <div className='w-12 ml-2 flex justify-center items-center' >
                            <Icons icons="subscriptions" index={active} />
                        </div>
                        <p style={active === '/dashboard/subscriptions' ? { color: '#fff' } : { color: '#777777' }} className=' font-Graphik-Regular text-base' >Subscriptions</p>
                    </div>
                </div>

                <div  className='w-full cursor-pointer px-4 my-3' >
                    <div onClick={() => ClickHandler(Array[5])} style={active === '/dashboard/rolemanagement' ? { backgroundColor: '#004143' } : {}} className='w-full h-full py-3 rounded-lg flex flex-row items-center ' >
                        <div className='w-12 ml-2 flex justify-center items-center' >
                            <Icons icons="rolemanagement" index={active} />
                        </div>
                        <p style={active === '/dashboard/rolemanagement' ? { color: '#fff' } : { color: '#777777' }} className=' font-Graphik-Regular text-base' >Role Management</p>
                    </div>
                </div>

                <div  className='w-full cursor-pointer px-4 my-3' >
                    <div onClick={() => ClickHandler(Array[6])} style={ active === '/dashboard/accountsettings' ? { backgroundColor: '#004143' } : {}} className='w-full h-full py-3 rounded-lg flex flex-row items-center ' >
                        <div className='w-12 ml-2 flex justify-center items-center' >
                            <Icons icons="accountsettings" index={active} />
                        </div>
                        <p style={active === '/dashboard/accountsettings' ? { color: '#fff' } : { color: '#777777' }} className=' font-Graphik-Regular text-base' >Account Settings</p>
                    </div>
                </div>


            </div>
        </div>
    )
}
