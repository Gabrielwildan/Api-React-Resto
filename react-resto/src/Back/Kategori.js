import React, { useState } from 'react';
import { link } from '../Axios/link';
import { useForm } from "react-hook-form";
import UseGet from '../Hook/useGet';

const Kategori = () => {
    const [pesan, setPesan] = useState();
    const [idkategori, setIdkategori] = useState('');
    const [pilihan, setPilihan] = useState(true);

    const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm();

    const [isi] = UseGet('/kategori')

    function simpan(data) {

        if (pilihan) {
            link.post('/kategori', data).then(res => setPesan(res.data.pesan));
        } else {
            link.put('/kategori/' + idkategori, data).then(res => setPesan(res.data.pesan));
            setPilihan(true);
        }

        reset();
        // fetchData();
    }

    async function hapus(id) {
        if (window.confirm('Are You Sure Want To Delete This')) {
            const res = await link.delete('/kategori/' + id);
            setPesan(res.data.pesan);
        }
    }

    async function showData(id) {
        const res = await link.get('/kategori/' + id);
        setValue('kategori', res.data[0].kategori);
        setValue('keterangan', res.data[0].keterangan);
        setIdkategori(res.data[0].idkategori);
        setPilihan(false);
    }

    // fetchData();

    let no = 1;

    return (
        <div>
            <div className="row">
                <h2>Data Kategori</h2>
            </div>
            <div className="row">
                <p>{pesan}</p>
            </div>
            <div className="row">
                <div className='col-4'>
                    <form onSubmit={handleSubmit(simpan)}>
                        <div className="mb-3">
                            <label htmlFor="kategori" className="form-label">Kategori</label>
                            <input type="text" className="form-control" name='kategori' placeholder="kategori" {...register('kategori', { required: true })} aria-invalid={errors.kategori ? "true" : "false"} />
                            {errors.kategori?.type === 'required' && <p role="alert">kategori is required</p>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="keterangan" className="form-label">Keterangan</label>
                            <input type="text" className="form-control" placeholder="keterangan" {...register('keterangan', { required: true })} />
                        </div>
                        <div className="mb-3">
                            <input type="submit" className="btn btn-primary" name='keterangan' />
                        </div>
                    </form>
                </div>
            </div>
            <div className="row">
                <table className='table'>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Kategori</th>
                            <th>Keterangan</th>
                            <th>Delete</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    {
                        isi.map((val, index) => (
                            <tbody key={index}>
                                <tr>
                                    <td>{no++}</td>
                                    <td>{val.kategori}</td>
                                    <td>{val.keterangan}</td>
                                    <td>
                                        <button onClick={() => hapus(val.idkategori)} className='btn btn-outline-danger'>Delete</button>
                                    </td>
                                    <td>
                                        <button onClick={() => showData(val.idkategori)} className='btn btn-outline-warning'>Update</button>
                                    </td>
                                </tr>
                            </tbody>
                        ))
                    }

                </table>
            </div>
        </div>
    );
}

export default Kategori;
