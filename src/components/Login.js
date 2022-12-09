import React, { useContext, useEffect, useState } from 'react';
import LoadingContext from '../context/loadingContext';
// import { useNavigate } from 'react-router-dom';
import UserContext from '../context/user/userContext';

const Login = (props) => {

  const { auth } = useContext(UserContext);
  const { loading, setLoading } = useContext(LoadingContext);
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true)
    await auth(credentials);
    setLoading(false)
  };


  return (!loading ? <div className='my-3 rounded container mx-auto border border-round animate__animated animate__zoomIn' style={{ 'width': '450px' }}>
    <h1 className="text-primary text-center m-3">EMS</h1>
    <div className="d-flex justify-content-center">
      <a className='text-dark' href='https://github.com/Sourabh044/' rel="noreferrer" target='_blank' ><h1><i className="fa-brands fa-github m-2"></i></h1></a>
      <h1 className="text-muted">|</h1>
      <a className='text-dark' href='https://www.linkedin.com/in/sourabh044/' rel="noreferrer" target='_blank' ><h1><i className="fa-brands fa-linkedin m-2"></i></h1></a>
    </div>
    <hr style={{ 'fontWeight': 'bold' }} />
    <div className="container">
      <form>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" name='email' id="email" aria-describedby="emailHelp" onChange={onChange} />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" name='password' id="password" onChange={onChange} />
        </div>
        <button type="submit" className="btn btn-primary mb-4" onClick={handleLogin}>Submit</button>
      </form>
    </div>
  </div> :
    <div class="text-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>)


}
export default Login
