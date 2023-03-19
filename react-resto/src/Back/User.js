import React, { useState } from 'react';
import UseGet from '../Hook/useGet';
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { link } from '../Axios/link';

const User = () => {

    const [mopen, setMopen] = useState(false)

    const { register, handleSubmit, formState: { errors } } = useForm();

    function tambah() {
        setMopen(true);
    }

    async function status(id) {
        const data = isi.filter((val) => val.id === id);

        let stat = 0;
        if (data[0].status === 1) {
            stat = 0;
        } else {
            stat = 1;
        }

        let kirim = {
            status: stat
        }

        const res = await link.put('/user/' + id, kirim)

    }

    async function simpan(data) {
        let user = {
            email: data.email,
            password: data.password,
            level: data.level,
            relasi: 'back'
        }
        const res = await link.post('/register', user);
        setMopen(false);
    }

    let no = 1;


    const [isi] = UseGet('/user/');

    return (
        <div>
            <Modal
                isOpen={mopen}
                onRequestClose={() => setMopen(false)}
                // onAfterOpen={isiForm}
                style={
                    {
                        overlay: {
                            background: 'transparent !important'
                        },
                        content: {
                            top: '50%',
                            left: '50%',
                            right: 'auto',
                            bottom: 'auto',
                            marginRight: '-50%',
                            transform: 'translate(-50%, -50%)',
                            width: '40%',
                        }
                    }
                }>

                <div className="row">
                    <div className='ml-2'>
                        <h2>Input Data User</h2>
                    </div>
                </div>

                <div className="row">
                    <div className='ml-2 col'>
                        <form onSubmit={handleSubmit(simpan)}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" className="form-control" name='email' placeholder="email" {...register('email', { required: true })} aria-invalid={errors.kategori ? "true" : "false"} />
                                {errors.email?.type === 'required' && <p role="alert">Email is required</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" className="form-control" placeholder="password" {...register('password', { required: true })} />
                            </div>

                            <label htmlFor="posisi" className="form-label">Posisi</label>

                            <select name='level' {...register('level')} className='form-control'>
                                <option value="admin">admin</option>
                                <option value="kasir">kasir</option>
                                <option value="koki">koki</option>
                            </select>
                            <div className="mb-3">
                                <input type="submit" className="btn btn-primary" name='keterangan' />
                            </div>
                        </form>
                    </div>
                </div>

            </Modal>
            <div className="row">
                <div>
                    <h2>Users</h2>
                </div>
            </div>
            <div className="row">
                <div>
                    <input onClick={() => (tambah())} className='btn btn-outline-primary' type="submit" value="tambah" />
                </div>
            </div>
            <div className="row">
                <table className='table mt-4'>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>User</th>
                            <th>Level</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isi.map((val, index) => (
                            <tr key={index}>
                                <td>{no++}</td>
                                <td>{val.email}</td>
                                <td>{val.level}</td>
                                <td>{

                                    val.status === 1 ? <input className='btn btn-outline-success' type="submit" value="Active"
                                        onClick={() => status(val.id)} />
                                        : <input className='btn btn-outline-danger' type="submit" value="Banned"
                                            onClick={() => status(val.id)} />

                                }</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default User;
