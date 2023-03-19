import React, { useState } from 'react';
import { link } from '../Axios/link';
import UseGet from '../Hook/useGet';
import { useForm } from "react-hook-form";


const Detail = () => {

    let no = 1;

    let today = new Date().toISOString().slice(0, 10);

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    const [awal, setAwal] = useState('2023-03-03');
    const [akhir, setAkhir] = useState(today);

    function cari(data) {
        setAwal(data.tawal);
        setAkhir(data.takhir);
    }

    const [isi] = UseGet(`/detail/${awal}/${akhir}`);

    return (
        <div>
            <div className="row">
                <div>
                    <h2>Details</h2>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <form onSubmit={handleSubmit(cari)}>
                        <div className="mb-3">
                            <label htmlFor="tawal" className="form-label">Tanggal Awal</label>
                            <input type="date" className="form-control" name='tawal' {...register('tawal')} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="takhir" className="form-label">Tanggal Akhir</label>
                            <input type="date" className="form-control" name='takhir' {...register('takhir')} />
                        </div>
                        <div className="mb-3">
                            <input type="submit" className="btn btn-primary" name='submit' />
                        </div>
                    </form>
                </div>
            </div>
            <div className="row">
                <div>
                    <table className='table mt-4'>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Faktur</th>
                                <th>Tgl Order</th>
                                <th>Menu</th>
                                <th>Harga</th>
                                <th>Jumlah</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                isi.map((val, index) => (
                                    <tr key={index}>
                                        <td>{no++}</td>
                                        <td>{val.idorder}</td>
                                        <td>{val.tglorder}</td>
                                        <td>{val.menu}</td>
                                        <td>{val.hargajual}</td>
                                        <td>{val.jumlah}</td>
                                        <td>{val.jumlah * val.hargajual}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Detail;
