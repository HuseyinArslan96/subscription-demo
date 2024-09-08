import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Subscription from './Subscription';
import SubscriberList from './SubscriberList';
import UserList from './UserList';
import CompanyList from './CompanyList';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/register" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/subscription" element={<Subscription />} />
      <Route path="/companylist" element={<CompanyList />} />
      <Route path="/subscriberlist" element={<SubscriberList />} />
      <Route path="/userlist" element={<UserList/>}/>
    </Routes>
  );
}

export default App;
