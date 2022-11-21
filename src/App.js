import React, { Component, useState } from 'react';
import './App.css';
import Home from './components/Home';
import { Routes, Route } from "react-router-dom"
import './components/styles.css'
import Login from './components/Login';
import Employeedashboard from './components/Employee/Employeedashboard';
import UserState from './context/user/userState';
import HRDashboard from './components/HR/HRDashboard';
import Employees from './components/HR/Employees';
import EmployeeEdit from './components/HR/EmployeeEdit';
import AddEmployee from './components/HR/AddEmployee';

function App() {
    return (
      <div className="App">
          <UserState>
          <Routes>
            <Route path='/' element={<Login/>}></Route>
            {/* <Route path='/employee' element={<Employeedashboard><Home/></Employeedashboard>} /> */}
            {/* <Route path='/hr' element={<HRDashboard><Home/></HRDashboard>} /> */}
            <Route path='/hr' element={<HRDashboard><Home/></HRDashboard>} />
            <Route path='/hr/employees' element={<HRDashboard ><Employees /></HRDashboard>} />            
            <Route path='/hr/edit/:id' element={<HRDashboard><EmployeeEdit/></HRDashboard>} />            
            <Route path='/hr/add/' element={<HRDashboard><AddEmployee/></HRDashboard>} />            
          </Routes>
          </UserState>
      </div>
    );
  // }
}

export default App;
