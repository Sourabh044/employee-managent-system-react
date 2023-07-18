import React from 'react'
import { DateRangePicker, Button } from "rsuite";
import 'rsuite/dist/rsuite.min.css';
const Home = (props) => {

  return (
    <div className='my-2 animate__animated animate__bounce'>
      <h1 className="text-center text-primary my-2">Hello! {localStorage.getItem('username')}</h1>
      <hr />
      <h1 className='text-center'>Manage your account here</h1>
      <hr />
    </div>
  )
}

export default Home
