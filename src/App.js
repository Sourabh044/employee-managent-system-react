import React, { useState } from 'react';
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
import LeaveApply from './components/Employee/LeaveApply';
import Leaves from './components/Employee/Leaves';
import LeavesList from './components/HR/LeavesList';
import SingleLeave from './components/HR/SingleLeave';
import Profile from './components/Profile';

function App() {
  const [loading, setLoading] = useState(false);
  return (
    <div className="App">
      {!loading ?
        <UserState>
          <Routes>
            <Route path='/' element={<Login />}></Route>
            {/* HR Urls Here */}
            <Route path='/hr' element={<HRDashboard><Home /></HRDashboard>} />
            <Route path='/hr/employees' element={<HRDashboard ><Employees /></HRDashboard>} />
            <Route path='/hr/edit/:id' element={<HRDashboard><EmployeeEdit /></HRDashboard>} />
            <Route path='/hr/add/' element={<HRDashboard><AddEmployee /></HRDashboard>} />
            <Route path='/hr/leaves/' element={<HRDashboard><LeavesList /></HRDashboard>} />
            <Route path='/hr/leave/:id' element={<HRDashboard><SingleLeave /></HRDashboard>} />
            <Route path='/hr/profile/' element={<HRDashboard><Profile type='HR/Employees' /></HRDashboard>} />

            {/* Employee Urls Here  */}

            <Route path='/employee' element={<Employeedashboard><Home /></Employeedashboard>} />
            <Route path='/employee/leaves/' element={<Employeedashboard><Leaves /></Employeedashboard>} />
            <Route path='/employee/apply-leave/' element={<Employeedashboard><LeaveApply /></Employeedashboard>} />
            <Route path='/employee/profile/' element={<Employeedashboard><Profile type='EMP' /></Employeedashboard>} />
          </Routes>
        </UserState> :
        <div class="container my-3 rounded h-75 mx-auto border border-round d-flex align-items-center" style={{ width: '480px' }}>
          <strong>Loading...</strong>
          <div class="spinner-border ms-auto" role="status" aria-hidden="true"></div>
        </div>}

    </div>
  );
  // }
}

export default App;
