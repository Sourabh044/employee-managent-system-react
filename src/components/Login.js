import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/user/userContext';

const Login = () => {
  
  const {auth,setAccount,setToken,setLogin,account} = useContext(UserContext);
  const navigate = useNavigate()
  useEffect(()=>{
    // console.log('in useeffect')
    setAccount(localStorage.getItem('account') || '')
    setLogin(localStorage.getItem('login') === "true")
    setToken(localStorage.getItem('token') || '')
    // console.log(account)
    if(account===1){
      navigate('/hr')
    }
    else if(account===2){
      navigate('/employee')
    }
  },[])

  const [credentials, setCredentials] = useState({email:'', password:''});
  const onChange = (e) => {
    // console.log(e.target.name + ":" + e.target.value)
    setCredentials({...credentials, [e.target.name]: e.target.value})
  };
  
  const handleLogin = async (event) => {
    event.preventDefault();
    // TODO 
    // props.setLoading(true)
    await auth(credentials);
    // props.setLoading(false)
    // console.log('logged in')
  };
  
  
  return (
    <div className='my-3 rounded container mx-auto border border-round' style={{'width':'450px'}}>
      <h1 className="text-primary text-center m-3">EMS</h1>
      {/* <Link to="/">Go Back</Link> */}
      <hr style={{'fontWeight':'bold'}} />
      <div className="container">
      <form>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" name='email' id="email" aria-describedby="emailHelp" onChange={onChange}/>
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" name='password' id="password" onChange={onChange} />
        </div>
        <button type="submit" className="btn btn-primary mb-4" onClick={handleLogin}>Submit</button>
        </form>
    </div>
    </div>
  )
}

export default Login
