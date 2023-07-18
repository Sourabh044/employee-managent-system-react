import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import LoadingContext from '../../context/loadingContext';


const Employees = (props) => {
  const { setLoading, loading } = useContext(LoadingContext)
  const InitialState = {
    count: null,
    next: "${process.env.REACT_APP_API_URL}api/HR/Employees/",
    previous: null,
    results: [],
    page: 1,
    pagecount: 1,
  }
  const [employees, setEmployees] = useState(InitialState);
  const fetchemployee = async (url) => {
    if (url === undefined) {
      url = `${process.env.REACT_APP_API_URL}api/HR/Employees/`
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
    json.pagecount = Math.ceil(employees.count / 10)
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
    await fetch(`${process.env.REACT_APP_API_URL}api/HR/Employees/${id}/`, {
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
        // setLoading(true)
        // console.log(id);
        await deleteemployee(id);
        swal("Employee Deleted", { icon: "success" });
      } else {
      }
    });
    // fetchemployee();
  };
  return employees.results.length > 0 ? (
    <div className="animate__animated animate__fadeIn">
      <h1 className='m-2 text-center'>Employees Here</h1>
      <span>Total Users: {employees.count}</span>
      <span>
        <Link to="/hr/add/" className="btn btn-primary m-2 float-end">
          {" "}
          <i className="fa fa-solid fa-user-plus"></i>Add
        </Link>
      </span>
      <hr />
      <div>
        <table className="table table-hover table-light table-striped  table-bordered" style={{ overflow: "scroll", height: '500px' }}>
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">First name</th>
              {/* <th scope="col">Middle</th> */}
              <th scope="col">Last name</th>
              <th scope="col">Email</th>
              <th scope="col">Username</th>
              {/* <th scope="col">Phone No.</th> */}
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.results.map((employees) => {
              return (
                <tr key={employees.id}>
                  <th scope="row">{employees.id}</th>
                  <td scope="row">{employees.first_name}</td>
                  {/* <td>{employees.middle_name}</td> */}
                  <td>{employees.last_name}</td>
                  <td>{employees.email ? employees.email : 'No Email'}</td>
                  <td>{employees.username}</td>
                  {/* <td>{employees.phone_number}</td> */}
                  <td>
                    <Link to={{ pathname: `/hr/edit/${employees.id}` }}>
                      <i style={{ cursor: 'pointer' }} className="fa fa-user-pen "></i>
                    </Link>{" "}
                    {/* |{" "} */}
                    {/* <i
                      onClick={(e) =>
                        handledelete(employees.id, employees.first_name)
                      }
                      style={{ cursor: 'pointer' }} className="fa fa-solid fa-user-slash text-danger"
                    ></i> */}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <nav aria-label="Page navigation example">
        <ul className="pagination">

          <li className="page-item"><a style={{ cursor: 'pointer' }} onClick={() => { fetchemployee(employees.previous) }} className={`page-link ${employees.previous == null ? "disabled" : ""}`} >Previous</a></li>
          <li className="page-item">
          </li>
          <li className="page-item">
            <a className={`page-link ${employees.next == null ? "disabled" : ""
              }`} style={{ cursor: 'pointer' }} onClick={() => { fetchemployee(employees.next) }} href={() => false}>Next</a>
          </li>
        </ul>

      </nav>
    </div>
  ) : (
    <h1 className="m-2 text-center">No Employee here</h1>
  );
};
export default Employees;
