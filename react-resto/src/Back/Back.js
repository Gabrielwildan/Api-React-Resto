import React from 'react';
import Footer from './Footer';
import Main from './Main';
import Nav from './Nav';
import Side from './Side';
import { Navigate } from 'react-router-dom';

const Back = () => {

    if ((sessionStorage.getItem('token') === 'undefined') || (sessionStorage.getItem('token') === null)) {
        return < Navigate to="/login" />
    }

    return (
        <>
            <div className="row">
                <div><Nav /></div>
            </div>
            <div className="row">
                <div className='col-4'><Side /></div>
                <div className='col-8'><Main /></div>
            </div>
            <div className="row">
                <div><Footer /></div>
            </div>
        </>
    );
}

export default Back;
