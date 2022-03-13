import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Screen/Dashboard';
import Login from './Screen/Login';
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
import RoleManage from './components/RoleManagement/index';
import AccountSettings from './components/DashboardTabs/AccountSettings';
import AddNewRole from './components/RoleManagement/AddNewRole';
import EditRole from './components/RoleManagement/EditRole';

import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider} from 'react-query';
import { RecoilRoot } from 'recoil';

export const queryClient = new QueryClient();

export default function App() {
    return (
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
        <ChakraProvider>
          <Router>
            <Routes> 
              <Route path='/' element={<Login />} />
              <Route path='/resetpassword' element={<ResetPassword />} />
              <Route path='/dashboard' element={<Dashboard />}> 
                <Route path='/dashboard' element={<Overview />} />
                <Route path='/dashboard/overview' element={<Overview />} />
                <Route path='/dashboard/activity' element={<Activity />} />
                <Route path='/dashboard/pushnotifications' element={<PushNotifications />} />
                <Route path='/dashboard/categories' element={<Categories />} />
                <Route path='/dashboard/subscriptions' element={<Subscriptions />} />
                <Route path='/dashboard/rolemanagement' element={<RoleManagement />} >
                  <Route path='/dashboard/rolemanagement' element={<RoleManage />} />
                  <Route path='/dashboard/rolemanagement/adduser' element={<AddNewRole />} />
                  <Route path='/dashboard/rolemanagement/edituser' element={<EditRole />} />
                </Route>
                <Route path='/dashboard/accountsettings' element={<AccountSettings />} />
                <Route path='/dashboard/vendors' element={<Vendor />} > 
                  <Route path='/dashboard/vendors/' element={<Vendors />} />
                  <Route path='/dashboard/vendors/archived' element={<ArchivedVendors />} />
                  <Route path='/dashboard/vendors/profile/:id' element={<VendorProfile />} />
                </Route>
              </Route>
            </Routes>
          </Router>
        </ChakraProvider>
        </RecoilRoot>
      </QueryClientProvider>
    );
}
