import React from 'react';
import { useNavigate } from "react-router-dom"
import { Link } from 'react-router-dom';

const Nav = () => {

    const navigate = useNavigate();

    function hapus() {
        sessionStorage.clear();
        navigate('/login');
    }

    return (
        <div className='mt-2 mb-2'>
            <nav className="navbar bg-light">
                <div className="container-fluid">

                    <Link to="/admin"><h3 className="navbar-brand">Admin Dashboard</h3></Link>

                    <li className='nav-item list-unstyled'>Email: {sessionStorage.getItem('email')}</li>
                    <li className='nav-item list-unstyled'>Level: {sessionStorage.getItem('level')}</li>

                    <button onClick={hapus} className="btn btn-outline-success" type="submit">Logout</button>
                </div>
            </nav>
        </div>
    );
}


export default Nav;
