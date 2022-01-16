import React from 'react' 
import Icons from './MenuIcons'
import logo from '../assets/images/logo.png' 
import { useNavigate } from 'react-router-dom' 

export default function Menu(props: any) { 

    const Array = [ 'Overview', 'Activity', 'Vendors', 'Push Notifications', 'Categories', 'Support Tickets', 'Subscriptions', 'Role Management', 'Account Settings' ] 

    const navigate = useNavigate();

    const [active, setActive] = React.useState('Overview')  

    const ClickHandler =(index: any)=> {
        setActive(index);

        const rout = index.toLowerCase().replace(/\s/g,'')

        if(index === 'Overview'){ 
            navigate('/dashboard') 
        } else {
            navigate('/dashboard/'+rout) 
        }
    }   

    return (
        <div className='w-full h-screen pt-4 flex flex-col items-start overflow-y-auto' > 
        <img style={{width: '70px', height:'70px'}} className='ml-6' alt='logo' src={logo} />
            <p className=' font-Graphik-Medium text-sm my-4 ml-6' >Internal Dashboard</p>
            <div className='w-full' style={{backgroundColor: '#FCFCFC'}} >
                {Array.map((item: any, index: any) => {
                    return(  
                        <div key={index} className='w-full cursor-pointer px-4 my-3' > 
                            <div onClick={()=> ClickHandler(item)} style={item === active ? {backgroundColor: '#004143'} : {}} className='w-full h-full py-3 rounded-lg flex flex-row items-center ' > 
                                <div className='w-12 ml-2 flex justify-center items-center' >
                                    <Icons icons={item} index={active} />
                                </div>
                                <p style={item === active ? {color: '#fff'} : {color: '#777777'}} className=' font-Graphik-Regular text-base' >{item}</p>
                            </div>
                        </div> 
                    )
                })}
            </div> 
        </div>
    )
}
