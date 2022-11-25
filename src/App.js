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
import { Toast } from 'bootstrap';
import LoadingState from './context/loadingState';

function App() {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(false);

  const showToast = (message) => {
    setToast({
      msg: message,
    })
    setTimeout(() => {
      setToast(null)

    }, 1500);


  }
  return (
    <div className="App">

      <LoadingState>
        <UserState>
          {/* <Toast toast={toast} /> */}
          <Routes>
            <Route path='/' element={<Login showToast={showToast} />}></Route>
            {/* HR Urls Here */}
            <Route path='/hr' element={<HRDashboard><Home setLoading={setLoading} showToast={showToast} /></HRDashboard>} />
            <Route path='/hr/employees' element={<HRDashboard ><Employees setLoading={setLoading} showToast={showToast} /></HRDashboard>} />
            <Route path='/hr/edit/:id' element={<HRDashboard><EmployeeEdit setLoading={setLoading} showToast={showToast} /></HRDashboard>} />
            <Route path='/hr/add/' element={<HRDashboard><AddEmployee setLoading={setLoading} showToast={showToast} /></HRDashboard>} />
            <Route path='/hr/leaves/' element={<HRDashboard><LeavesList setLoading={setLoading} showToast={showToast} /></HRDashboard>} />
            <Route path='/hr/leave/:id' element={<HRDashboard><SingleLeave setLoading={setLoading} showToast={showToast} /></HRDashboard>} />
            <Route path='/hr/profile/' element={<HRDashboard><Profile type='HR/Employees' setLoading={setLoading} showToast={showToast} /></HRDashboard>} />

            {/* Employee Urls Here  */}

            <Route path='/employee' element={<Employeedashboard><Home setLoading={setLoading} showToast={showToast} /></Employeedashboard>} />
            <Route path='/employee/leaves/' element={<Employeedashboard><Leaves setLoading={setLoading} showToast={showToast} /></Employeedashboard>} />
            <Route path='/employee/apply-leave/' element={<Employeedashboard><LeaveApply setLoading={setLoading} showToast={showToast} /></Employeedashboard>} />
            <Route path='/employee/profile/' element={<Employeedashboard><Profile type='EMP' setLoading={setLoading} showToast={showToast} /></Employeedashboard>} />
          </Routes>
        </UserState>
      </LoadingState>
    </div>
  );
}

export default App;
