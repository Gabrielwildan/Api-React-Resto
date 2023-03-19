import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Side = () => {
    return (
        <div>
            <div className="card" style={{ width: '18rem' }}>
                <div className="card-header">
                    Menu Aplikasi
                </div>
                <ul className="list-group list-group-flush">
                    <Link to="kategori">
                        {
                            sessionStorage.getItem('level') === 'admin' ? (<li className="list-group-item">Kategori</li>) : ("")
                        }
                    </Link>
                    <Link to="menu">
                        {
                            sessionStorage.getItem('level') === 'admin' ? (<li className="list-group-item">Menu</li>) : ("")
                        }
                    </Link>
                    <Link to="pelanggan">
                        {
                            sessionStorage.getItem('level') === 'admin' ? (<li className="list-group-item">Pelanggan</li>) : ("")
                        }
                    </Link>
                    <Link to="order">
                        {
                            (sessionStorage.getItem('level') === 'admin') || (sessionStorage.getItem('level') === 'kasir') ? (<li className="list-group-item">Order</li>) : ("")
                        }
                    </Link>
                    <Link to="detail">
                        {
                            (sessionStorage.getItem('level') === 'admin') || (sessionStorage.getItem('level') === 'kasir') || (sessionStorage.getItem('level') === 'koki') ? (<li className="list-group-item">Order Detail</li>) : ("")
                        }
                    </Link>
                    <Link to="user">
                        {
                            (sessionStorage.getItem('level') === 'admin') ? (<li className="list-group-item">User Admin</li>) : ("")
                        }

                    </Link>
                </ul>
            </div>

        </div>
    );
}

export default Side;
