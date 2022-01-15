import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Screen/Dashboard';
import Login from './Screen/Login';
import { ChakraProvider } from '@chakra-ui/react'
import ResetPassword from './Screen/ResetPassword';

export default function App() {
    return (
      <ChakraProvider>
        <Router>
          <Routes> 
          <Route path='/' element={<Login />} />
          <Route path='/resetpassword' element={<ResetPassword />} />
          <Route path='/dashboard' element={<Dashboard />}/>
          </Routes>
        </Router>
      </ChakraProvider>
    );
}
