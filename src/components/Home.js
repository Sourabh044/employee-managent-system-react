import React from 'react'
// import { Link } from 'react-router-dom'
// import { useLocation } from 'react-router-dom'
const Home = (props) => {

  return (
    <div className='my-2'>
      {/* <hr /> */}
      <h1 className="text-center text-primary my-2">Hello! {localStorage.getItem('username')}</h1>
      <hr />
      <h1 className='text-center'>Manage your account here</h1>
      {/* <Link to="login">Click To login.</Link> */}
      <br />
    </div>
  )
}

export default Home
