import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";

const Employees = (props) => {
  const InitialState = {
    count: null,
    next: "http://127.0.0.1:8000/api/HR/Employees/",
    previous: null,
    results:[],
    page:1,
    pagecount:1,
  }
  const [employees, setEmployees] = useState(InitialState);
  const fetchemployee = async (url) => {
    if (url === undefined) {
      url = `http://127.0.0.1:8000/api/HR/Employees/`
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
    json.pagecount = Math.ceil(employees.count/10)
    console.log(json);
    setEmployees(json);
  };
  useEffect(() => {
  //  console.log(employees)
  }, [employees]);

  useEffect(() => {
    fetchemployee(); // eslint-disable-next-line
  }, []);

  const deleteemployee = async (id) => {
    await fetch(`http://127.0.0.1:8000/api/HR/Employees/${id}/`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    });
    fetchemployee();
  };
  const handledelete = (id, name) => {
    swal({
      title: "Are you sure?",
      text: "You want to delete " + name,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        // console.log(id);
        await deleteemployee(id);
        swal("Employee Deleted", { icon: "success" });
      } else {
      }
    });
    fetchemployee();
  };
  return employees.results.length > 0 ? (
    <div>
      <h1>Employees Here</h1>
      <span>
        <Link to="/hr/add/" className="btn btn-primary m-2 float-end">
          {" "}
          <i className="fa fa-solid fa-user-plus"></i>Add
        </Link>
      </span>
      <hr />
      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">First</th>
              <th scope="col">Middle</th>
              <th scope="col">Last</th>
              <th scope="col">Email</th>
              <th scope="col">Username</th>
              <th scope="col">Phone No.</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.results.map((employees) => {
              return (
                <tr key={employees.id}>
                  <th scope="row">{employees.id}</th>
                  <td scope="row">{employees.first_name}</td>
                  <td>{employees.middle_name}</td>
                  <td>{employees.last_name}</td>
                  <td>{employees.email}</td>
                  <td>{employees.username}</td>
                  <td>{employees.phone_number}</td>
                  <td>
                    <Link to={{ pathname: `/hr/edit/${employees.id}` }}>
                      <i className="fa fa-user-pen "></i>
                    </Link>{" "}
                    |{" "}
                    <i
                      onClick={(e) =>
                        handledelete(employees.id, employees.first_name)
                      }
                      className="fa fa-solid fa-user-slash text-danger"
                    ></i>
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
            <a onClick={() => {fetchemployee(employees.previous)}}
              className={`page-link ${
                employees.previous == null ? "disabled" : ""
              }`}
            >
              Previous
            </a>
          </li>
          <li className="page-item">
            {/* <a className="page-link" onClick={() => {fetchemployee(employees.next)}}>
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
            </a> */}
          </li>
          <li className="page-item">
            <a className={`page-link ${
                employees.next == null ? "disabled" : ""
              }`} onClick={() => {fetchemployee(employees.next)}}>Next</a>
          </li>
        </ul>
        
      </nav>
    </div>
  ) : (
    <h1>No Employee here</h1>
  );
};
export default Employees;
