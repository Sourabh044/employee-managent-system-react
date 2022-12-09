import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";

const LeavesList = () => {
  const InitialState = {
    count: 0,
    next: null,
    previous: null,
    results: [],
  };
  const [leaves, setLeaves] = useState(InitialState);

  const fetchleaves = async (url) => {
    if (url === undefined) {
      url = `${process.env.REACT_APP_API_URL}api/HR/Leaves/`;
    }
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    });
    const json = await response.json();
    // json.pagecount = Math.ceil(leaves.count/10)
    console.log(json);
    setLeaves(json);
  };
  const singleleave = (id) => {
    swal(id, "info");
  };

  const handledelete = async (id) => {
    swal({
      title: "Are you sure?",
      text: "You want to delete",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        await fetch(`${process.env.REACT_APP_API_URL}api/HR/Leaves/${id}/`, {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }).then(() => {
          swal({
            title: "Leave Deleted Successfully",
            text: ``,
            icon: "success",
            button: "Okay",
          });
          fetchleaves();
        });
      }
    });
  };
  useEffect(() => {}, [leaves]);

  useEffect(() => {
    fetchleaves(); // eslint-disable-next-line
  }, []);
  return leaves.results.length > 0 ? (
    <div className="animate__animated animate__fadeInDown">
      <h1 className="m-2 text-center">Leaves Here</h1>
      <span>
        <Link
          to="/employee/apply-leave/"
          className="btn btn-primary m-2 float-end"
        >
          <i className="fa fa-solid fa-plus"></i>Apply leave
        </Link>
      </span>
      <hr />
      <div>
        <table
          className="table"
          style={{ overflow: "scroll", height: "500px" }}
        >
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Approved Status</th>
              <th scope="col">Name</th>
              <th scope="col">Type</th>
              <th scope="col">Reason</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaves.results.map((leave) => {
              return (
                <tr key={leave.id}>
                  <th scope="row">
                    <Link to={{ pathname: `/hr/leave/${leave.id}` }}>
                      {leave.date}
                    </Link>
                  </th>
                  <td scope="row">
                    {leave.approved ? "Approved" : "Not Approved"}
                  </td>
                  <td>{leave.name}</td>
                  <td>{leave.type == 1 ? "Paid" : "UnPaid"}</td>
                  <td>{leave.reason ? leave.reason : "No Reason Specified"}</td>
                  <td>
                    <i
                      onClick={(e) => handledelete(leave.id)}
                      style={{ cursor: "pointer" }}
                      className="fa fa-solid fa-envelope text-danger"
                    >
                      {" "}
                      Delete
                    </i>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <a
              onClick={() => {
                fetchleaves(leaves.previous);
              }}
              className={`page-link ${
                leaves.previous == null ? "disabled" : ""
              }`}
            >
              Previous
            </a>
          </li>
          {/* <li className="page-item">
              <a className="page-link" onClick={() => {fetchemployee(leaves.next)}}>
                1
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" onClick={fetchemployee}>
                2
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" onClick={fetchemployee}>
                3
              </a>
            </li> */}

          <li className="page-item">
            <a
              className={`page-link ${leaves.next == null ? "disabled" : ""}`}
              onClick={() => {
                fetchleaves(leaves.next);
              }}
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  ) : (
    <div className="container">
      <h1 className="m-2 text-center">No Leaves here</h1>
      <Link
        to="/employee/apply-leave/"
        className="btn btn-primary m-2 container"
      >
        <i className="fa fa-solid fa-plus"></i>Apply leave
      </Link>
    </div>
  );
};

export default LeavesList;
