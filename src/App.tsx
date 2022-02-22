import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Screen/Dashboard';
import Login from './Screen/Login';
import { ChakraProvider } from '@chakra-ui/react'
import ResetPassword from './Screen/ResetPassword'; 
import Overview from './components/DashboardTabs/Overview';
import Activity from './components/DashboardTabs/Activity';
import Vendors from './components/VendorComponent.tsx';
import ArchivedVendors from './components/VendorComponent.tsx/ArchivedVendors';
import Vendor from './components/DashboardTabs/Vendor';
import VendorProfile from './components/VendorComponent.tsx/VendorProfile';
import PushNotifications from './components/DashboardTabs/PushNotifications';
import Categories from './components/DashboardTabs/Categories';
import Subscriptions from './components/DashboardTabs/Subscriptions';
import RoleManagement from './components/DashboardTabs/RoleManagement';
import AccountSettings from './components/DashboardTabs/AccountSettings';

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
              <Route path='/dashboard/vendors' element={<Vendor />} > 
                <Route path='/dashboard/vendors/' element={<Vendors />} />
                <Route path='/dashboard/vendors/archived' element={<ArchivedVendors />} />
                <Route path='/dashboard/vendors/profile' element={<VendorProfile />} />
              </Route>
              <Route path='/dashboard/pushnotifications' element={<PushNotifications />} />
              <Route path='/dashboard/categories' element={<Categories />} />
              <Route path='/dashboard/subscriptions' element={<Subscriptions />} />
              <Route path='/dashboard/rolemanagement' element={<RoleManagement />} />
              <Route path='/dashboard/accountsettings' element={<AccountSettings />} />
            </Route>
          </Routes>
        </Router>
      </ChakraProvider>
    );
}
