import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Screen/Dashboard';
import Login from './Screen/Login';
import { ChakraProvider } from '@chakra-ui/react'
import ResetPassword from './Screen/ResetPassword'; 
import Overview from './components/DashboardTabs/Overview';
import Activity from './components/DashboardTabs/Activity';
import Vendors from './components/DashboardTabs/Vendors';

export default function App() {
    return (
      <ChakraProvider>
        <Router>
          <Routes> 
            <Route path='/' element={<Login />} />
            <Route path='/resetpassword' element={<ResetPassword />} />
            <Route path='/dashboard' element={<Dashboard />}> 
              <Route path='/dashboard/' element={<Overview />} />
              <Route path='/dashboard/activity' element={<Activity />} />
              <Route path='/dashboard/vendors' element={<Vendors />} />
            </Route>
          </Routes>
        </Router>
      </ChakraProvider>
    );
}
