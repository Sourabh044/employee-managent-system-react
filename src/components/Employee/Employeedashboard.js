import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../../context/user/userContext'
import { Navigate } from 'react-router-dom';
import LoadingContext from '../../context/loadingContext';
// import script from './scripts'

const Employeedashboard = ({ children }) => {
    const { login, logout, account } = useContext(UserContext)
    const { loading } = useContext(LoadingContext)
    const handle_sidebar = (e) => {
        e.preventDefault();
        document.body.classList.toggle('sb-sidenav-toggled');
        localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
    }
    return (!login ? <Navigate to='/' /> : account === 2 ?
        <div className="d-flex" id="wrapper">
            {/* <!-- Sidebar--> */}
            <div className="border-end bg-white" id="sidebar-wrapper">
                <div className="sidebar-heading border-bottom bg-light">Employee</div>
                <div className="list-group list-group-flush">
                    <Link to='/employee' className={`${location.pathname === '/employee' ? 'active' : ''} list-group-item list-group-item-action list-group-item-light p-3 `} >Home</Link>
                    <Link to='/employee/leaves/' className={`${location.pathname === '/employee/leaves/' ? 'active' : ''} list-group-item list-group-item-action list-group-item-light p-3 `} >Leaves</Link>
                    <Link to='/employee/profile/' className={`${location.pathname === '/employee/profile/' ? 'active' : ''} list-group-item list-group-item-action list-group-item-light p-3 `}>Profile</Link>
                </div>
            </div>
            {/* <!-- Page content wrapper--> */}
            <div id="page-content-wrapper">
                {/* <!-- Top navigation--> */}
                <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
                    <div className="container-fluid">
                        <button className="btn btn-primary" id="sidebarToggle" onClick={handle_sidebar}>Menu</button>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
                                <li className="nav-item">
                                    {login ? <Link to='/' onClick={logout} className="nav-link active">Logout</Link> :
                                        <Link to='/login' className="nav-link active">Login</Link>
                                    }
                                </li>
                                {/* <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</a>
                                    <div className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                        <a className="dropdown-item" href="#!">Action</a>
                                        <a className="dropdown-item" href="#!">Another action</a>
                                        <div className="dropdown-divider"></div>
                                        <a className="dropdown-item" href="#!">Something else here</a>
                                    </div>
                                </li> */}
                            </ul>
                        </div>
                    </div>
                </nav>
                {/* <!-- Page content--> */}
                <div className="container-fluid">
                    {!loading ? children : <div class="text-center">
                        <div class="spinner-border" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>}
                </div>
            </div>
        </div> : <h1>No Authorized</h1>
    )
}


export default Employeedashboard
