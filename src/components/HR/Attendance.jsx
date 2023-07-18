import React, { useEffect, useState } from "react";
import { DateRangePicker, Input, Button } from "rsuite";

const Attendance = () => {
  const [attendance, setAttendance] = useState();
  const [days, setDays] = useState([]);
  useEffect(() => {
    // Function to be called when the component renders
    getAttendance();
  }, []);
  const getAttendance = async (dateRange) => {
    if (!dateRange) {
      await fetch(
        process.env.REACT_APP_API_URL +
          "api/hr/attendanceviewset/?daterange=27%2F6%2F2023%20-%2004%2F7%2F2023",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      )
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          setDays(responseJson.days);
          console.log(days);
          setAttendance(responseJson.results);
        });
    }
  };
  return (
    <div className="animate__animated animate__fadeIn">
      <div className="d-flex">
        <div className="p-2 flex-grow-1">
          <h1 className="text-center">Attendance</h1>
        </div>
        <div className="p-2">
          <DateRangePicker
            placeholder="Search by Date"
            size="md"
            onChange={(value) => {
              console.log(value);
            }}
          />
        </div>
        <div className="p-2">
          <Input size="md" placeholder="Search by Name or Team" />
        </div>
        <div className="p-2">
          <Button size="md" appearance="primary">
            Search
          </Button>
        </div>
      </div>
      <div className="table-responsive">
        <table
          id="AttendanceTable"
          className="table table-light table-bordered attendance-table-custom "
        >
          <thead>
            <tr>
              <th scope="col">Employee Name</th>
            </tr>
            {days
              ? days.map((day) => {
                  <th
                    scope="col"
                    class="text-center"
                    style="min-width:200px;max-width:300px;"
                    id={day}
                    name={day}
                  >
                    {day} Bro
                  </th>;
                })
              : days}
          </thead>
        </table>
      </div>
    </div>
  );
};

export default Attendance;
