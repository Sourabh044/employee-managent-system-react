import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert'

const LeaveApply = () => {
  const Navigate = useNavigate();
  const InitialState = {
    "date":null,
    "reason": null
}
  const [leave,setLeave] = useState(InitialState)
  const onChange = (e) => {
    setLeave({...leave, [e.target.name]: e.target.value})
  }

  const handleClick = async (e) => {
    e.preventDefault();
    console.log(leave);
    if (leave.date === null || leave.reason === null) {
      return swal({
        title: "Please Fill All the Details",
        icon: "error",
        button: "Okay",
      });
    }
    await fetch(`http://127.0.0.1:8000/api/EMP/Leave/`,{
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(leave),
    }).then(async (res)=>{
      const json = await res.json();
      console.log(json)
    }).then(()=>{
      swal({
        title: "Leave Applied Successfull",
        text: ``,
        icon: "success",
        button: "Okay",
      }).then(()=>{
        Navigate('/employee/leaves/')
      })
    })
  }

  return (
    <div>
      <h1>Apply Leave</h1>
<hr/>
<form>
    <div className="mb-3">
        <label htmlFor="date" className="form-label">Date</label>
        <input type="date" onChange={onChange} value={leave.date===null?'':leave.date} className="form-control" required name="date"/>
    </div>
    <div className="mb-3">
        <label htmlFor="reason" className="form-label">Reason:</label>
        <input type="text" onChange={onChange}  value={leave.reason===null?'':leave.reason} className="form-control" required name="reason"/>
    </div>
    <button className="my-1 btn btn-primary text-center" onClick={handleClick}>Add</button>
</form>
    </div>
  )
}

export default LeaveApply
