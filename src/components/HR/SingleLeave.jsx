import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const SingleLeave = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [leave, setLeave] = useState({
    id: "",
    name: "",
    date: "",
    cause: "",
    leave_type: "",
    status: false,
  });
  const fetchleave = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}api/HR/Leaves/${params.id}/`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      }
    );
    const json = await response.json();
    console.log(json);
    setLeave(json);
  };
  const updateleave = async () => {
    console.log(leave);
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}api/HR/Leaves/${params.id}/`,
      {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(leave),
      }
    )
      .then(async (res) => {
        const json = await res.json();
        console.log(json);
      })
      .then(async () => {
        await swal({
          title:
            leave.status == "Approved"
              ? "Leave Approved"
              : leave.status == "Unapproved"
              ? "Leave Unapproved"
              : "Leave Updated",
          text: ``,
          icon: leave.approved ? "success" : "info",
          button: "Okay",
        });
      })
      .then(() => {
        navigate(-1);
      });
  };

  useEffect(() => {}, [leave]);

  useEffect(() => {
    fetchleave(); // eslint-disable-next-line
  }, []);

  const handleclick = (e) => {
    e.preventDefault();
    updateleave();
  };

  return (
    <div className="animate__animated animate__fadeInDown">
      <h1>
        Leave details of Employee {leave.name}, <br />
        Date:{leave.date}
      </h1>
      <hr />
      <form onSubmit={handleclick}>
        <div className="mb-3">
          <label htmlFor="approved" className="form-label">
            Approved:{" "}
          </label>
          <select
            className="form-select form-select-lg mb-3"
            value={leave.status}
            aria-label=".form-select-lg example"
            onChange={(status) => {
              setLeave({ ...leave, status: status.target.value });
            }}
          >
            {/* <option>Open this select menu</option> */}
            <option value="Approved">Approved</option>
            <option value="Pending">Pending</option>
            <option value="Unapproved">Unapproved</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Date
          </label>
          <input
            type="date"
            className="form-control"
            name="date"
            value={leave.date}
            id="date"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cause" className="form-label">
            Cause:
          </label>
          <input
            type="text"
            className="form-control"
            name="cause"
            value={leave.cause}
            id="cause"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="approved" className="form-label">
            Type
          </label>
          <select
            className="form-select form-select-lg mb-3"
            value={leave.leave_type}
            aria-label=".form-select-lg example"
            onChange={(leave_type) => {
              setLeave({ ...leave, leave_type: leave_type.target.value });
            }}
          >
            {/* <option>Open this select menu</option> */}
            <option value="Short">Short</option>
            <option value="Half Day">Half Day</option>
            <option value="Long leave">Long leave</option>
          </select>
        </div>
        <button className="my-1 btn btn-primary text-center" type="submit">
          Update
        </button>
      </form>
    </div>
  );
};

export default SingleLeave;
