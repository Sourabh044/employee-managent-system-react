import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';


const AddEmployee = () => {
    const Navigate = useNavigate()
    const intialState = {
        user: {
            first_name: "",
            middle_name: "",
            last_name: "",
            username: "",
            email: "",
            phone_number: "",
            account: '',
            password: '',
        },
        userprofile: {
            permanent_address: '',
            permanent_country: '',
            permanent_state: '',
            permanent_city: '',
            permanent_pincode: '',
            present_address: '',
            present_country: '',
            present_state: '',
            present_city: '',
            present_pincode: '',
            gender: '',
            emergency_contact: '',
            date_of_joining: '',
            date_of_termination: '',
            pan_card_no: '',
            aadhaar_card: '',
            blood_group: '',
            date_of_birth: ''
        }
    }
    const [employeeuser, setEmployeeUser] = useState(intialState.user);
    // const [employeeprofile, setEmployeeProfile] = useState(intialState.userprofile);

    const onChangeUser = (e) => {
        setEmployeeUser({ ...employeeuser, [e.target.name]: e.target.value })
    }

    //   const onChangeUserProfile = (e)=>{
    //     setEmployeeProfile({...employeeprofile, [e.target.name]: e.target.value})
    //   }
    function getdate(date) {
        var ds = date
        if (date != null) {
            ds = ds.split('T')
            // console.log(ds[0])
            return ds[0]
        }
    }
    const addemployee = async (e) => {
        e.preventDefault();
        // const emp = Object.assign({},employeeuser,employeeprofile)
        // console.log(emp)
        const response = await fetch(`${process.env.REACT_APP_API_URL}api/HR/Employees/`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Token ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(employeeuser),
        });
        const json = await response.json();
        console.log(json);
        setEmployeeUser(json);
        swal("Employee Created!", "Enter the Additional Details.", "success");
        Navigate(`/hr/edit/${json.id}`)
    }
    return (
        <>
            <h1>Add New Employee</h1>
            <hr />
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 " >
                {/* <a href="{% url 'delete-employee' employee.id %}" onclick="return confirm('Are you sure you want to delete this employee?')" className="btn btn-danger m-2 float-end" name="delbutton" data-url="{% url 'delete-employee' employee.id %}"> <i className="fa fa-solid fa-user-slash"></i></a> */}
                <form>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" value={employeeuser.email === null ? '' : employeeuser.email} className="form-control" name="email" onChange={onChangeUser} required></input>
                        <div name="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Password" className="form-label">Password</label>
                        <input type="password" value={employeeuser.password === null ? '' : employeeuser.password} className="form-control" name="password" required onChange={onChangeUser} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="first_name" className="form-label">First name</label>
                        <input type="text" value={employeeuser.first_name === null ? '' : employeeuser.first_name} className="form-control" name="first_name" required onChange={onChangeUser} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="middle Name" className="form-label">Middle Name</label>
                        <input type="text" value={employeeuser.middle_name === null ? '' : employeeuser.middle_name} className="form-control" name="middle_name" required onChange={onChangeUser} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Last name" className="form-label">Last Name</label>
                        <input type="text" value={employeeuser.last_name === null ? '' : employeeuser.last_name} className="form-control" name="last_name" required onChange={onChangeUser} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Username" className="form-label">Username</label>
                        <input type="text" value={employeeuser.username === null ? '' : employeeuser.username} className="form-control" name="username" required onChange={onChangeUser} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Phone Number" className="form-label">Phone Number</label>
                        <input type="phone" value={employeeuser.phone_number === null ? '' : employeeuser.phone_number} className="form-control" name="phone_number" required onChange={onChangeUser} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Account" className="form-label">Account</label>
                        <input type="text" value={employeeuser.account === null ? '' : employeeuser.account} className="form-control" name="account" required onChange={onChangeUser} />
                    </div>


                    {/* <div className="mb-3">
                <label htmlFor="Date of birth" className="form-label">Date Of Birth</label>
                <input type="date"  value={employeeprofile.date_of_birth===''|null?'':getdate(employeeprofile.date_of_birth)}  className="form-control" name="date_of_birth" onChange={onChangeUserProfile}/>
            </div>
            <div className="mb-3">
                <label htmlFor="Permanent Address" className="form-label">Permanent Address</label>
                <input type="text"  value={employeeprofile.permanent_address===null?'':employeeprofile.permanent_address} className="form-control" name="permanent_address" onChange={onChangeUserProfile}/>
            </div>
            <div className="mb-3">
                <label htmlFor="Permanent Pincode" className="form-label">Permanent Pincode</label>
                <input type="text"  value={employeeprofile.permanent_pincode===null?'':employeeprofile.permanent_pincode} className="form-control" name="permanent_pincode" onChange={onChangeUserProfile}/>
            </div>
            <div className="mb-3">
                <label htmlFor="Present Address" className="form-label">Present Address</label>
                <input type="text"  value={employeeprofile.present_address===null?'':employeeprofile.present_address} className="form-control" name="present_address" onChange={onChangeUserProfile}/>
            </div>
            <div className="mb-3">
                <label htmlFor="Present pincode" className="form-label">Present Pincode</label>
                <input type="text"  value={employeeprofile.present_pincode===null?'':employeeprofile.present_pincode} className="form-control" name="present_pincode" onChange={onChangeUserProfile}/>
            </div>
            <div className="mb-3">
                <label htmlFor="Emergency Contact" className="form-label">Emergency Contact</label>
                <input type="text"  value={employeeprofile.emergency_contact===null?'':employeeprofile.emergency_contact} className="form-control" name="emergency_contact" onChange={onChangeUserProfile}/>
            </div>
            <div className="mb-3">
                <label htmlFor="DOJ"   className="form-label">Date Of Joining</label>
                <input type="date" value={employeeprofile.date_of_joining===null?'':getdate(employeeprofile.date_of_joining)} className="form-control" name="date_of_joining" onChange={onChangeUserProfile}/>
            </div>
            <div className="mb-3">
                <label htmlFor="DOT"  className="form-label">Date Of Termination</label>
                <input type="date" value={employeeprofile.date_of_termination===null?'':getdate(employeeprofile.date_of_termination)} className="form-control" name="date_of_termination" onChange={onChangeUserProfile}/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">PAN Card</label>
                <input type="text"  value={employeeprofile.pan_card_no===null?'':employeeprofile.pan_card_no} className="form-control" name="pan_card_no" onChange={onChangeUserProfile}/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1"  className="form-label">Adhaar Card</label>
                <input type="text"  value={employeeprofile.aadhaar_card===null?'':employeeprofile.aadhaar_card} className="form-control" name="aadhaar_card" onChange={onChangeUserProfile}/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Blood Group</label>
                <input type="text"  value={employeeprofile.blood_group===null?'':employeeprofile.blood_group} className="form-control" name="blood_group" onChange={onChangeUserProfile}/>
            </div> */}
                    <button type="submit" className="btn btn-primary mb-4" onClick={addemployee}>Add</button>
                </form>
            </div>
        </>
    )
}

export default AddEmployee
