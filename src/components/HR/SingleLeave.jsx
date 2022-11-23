import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SingleLeave = () => {
  const params = useParams()
  const [leave, setLeave] = useState({
    "name": "",
    "date": "",
    "reason": "",
    "type": 2,
    "approved": false
  })
  const fetchleave = async () => {
    const response = await fetch(`http://127.0.0.1:8000/api/HR/Leaves/${params.id}/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    });
    const json = await response.json();
    console.log(json);
    setLeave(json);
  };
  const updateleave = async () =>{
    const response = await fetch(`http://127.0.0.1:8000/api/HR/Leaves/${params.id}/`, {
      method: "PATCH",
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
        title: leave.approved?"Leave Approved":'Leave Denied',
        text: ``,
        icon: leave.approved?"success":'info',
        button: "Okay",
      })
    })
  }

  useEffect(() => {

  }, [leave]);

  useEffect(() => {
    fetchleave(); // eslint-disable-next-line
  }, []);

  const handleclick = (e) => {
    e.preventDefault();
    updateleave();
  }

  return (
    <div>
      <h1>Leave details of Employee {leave.name}, <br />Date:{leave.date}</h1>
      <hr />
      <form>
        <div className="mb-3">
          <label htmlFor="approved" className="form-label">Approved: </label>
          <input type="checkbox" className="form-check-input" onChange={() => setLeave({ ...leave, approved: !leave.approved })} value={leave.approved} name="approved" id="approved" checked={leave.approved} />
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">Date</label>
          <input type="date" className="form-control" name="date" value={leave.date} id="date" />
        </div>
        <div className="mb-3">
          <label htmlFor="reason" className="form-label">Reason:</label>
          <input type="text" className="form-control" name='reason' value={leave.reason} id='reason' />
        </div>
        <div className="mb-3">
          <label htmlFor="approved" className="form-label">Type</label>
          <input type="number" value={leave.type} className="form-control" max={2} min={1} name="type" id="type" />
        </div>
        <button className="my-1 btn btn-primary text-center" onClick={handleclick}>Update</button>
      </form>

    </div>
  )
}

export default SingleLeave
