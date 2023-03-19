import UseGet from '../Hook/useGet';
import UseDelete from '../Hook/useDelete';
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from 'react';
import { link } from '../Axios/link';

const Menu = () => {
    const [isi] = UseGet('/menu')
    const { hapus, pesan, setPesan } = UseDelete('/menu/');
    const [kategori, setKategori] = useState([]);
    const [gambar, setGambar] = useState([]);
    const [idkategori, setIdkategori] = useState([]);
    const [pilihan, setPilihan] = useState(true);
    const [idmenu, setIdmenu] = useState('');


    const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm();

    useEffect(() => {

        let ambil = true;
        async function fetchData() {
            const res = await link.get('/kategori');
            if (ambil) {
                setKategori(res.data);
            }
        }
        fetchData();

        return () => {
            ambil = false;
        };
    }, [kategori]);

    function simpan(data) {
        console.log(data);

        const formData = new FormData();
        formData.append('idkategori', data.idkategori);
        formData.append('menu', data.menu);
        formData.append('harga', data.harga);
        formData.append('gambar', data.gambar[0]);

        if (pilihan) {
            link.post('/menu', formData).then(res => setPesan(res.data.pesan));
            setPilihan()
        } else {
            link.post('/menu/' + idmenu, formData).then(res => setPesan(res.data.pesan));
            setPilihan(true);
        }


    }

    async function showData(id) {
        const res = await link.get('/menu/' + id);
        // console.log(res.data);
        setValue('menu', res.data[0].menu);
        setValue('harga', res.data[0].harga);
        setGambar(<img src={res.data[0].gambar} height="200" width="300" />);
        setIdkategori(res.data[0].idkategori);
        setIdmenu(res.data[0].idmenu);
        setPilihan(false);
    }

    let no = 1;

    return (
        <div>
            <div className="row">
                <h2>Data Menu</h2>
            </div>
            <div className="row">
                <div>
                    <p>{pesan}</p>
                </div>
            </div>
            <div className="row">
                <div className='col-4'>
                    <form onSubmit={handleSubmit(simpan)}>
                        <div className="mb-3">
                            <label htmlFor="kategori" className="form-label">Category</label>
                            <select name="idkategori" className='form-control' {...register('idkategori', { required: true })}>
                                {
                                    kategori.map((val, index) => val.idkategori == idkategori ?
                                        <option key={index} selected value={val.idkategori}>{val.kategori}</option> :
                                        <option key={index} value={val.idkategori}>{val.kategori}</option>)
                                }
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="menu" className="form-label">Menu</label>
                            <input type="text" className="form-control" name='menu' placeholder="Menu" {...register('menu', { required: true })} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="harga" className="form-label">Harga</label>
                            <input type="text" className="form-control" name='harga' placeholder="Harga" {...register('harga', { required: true })} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="gambar" className="form-label">Gambar</label>
                            <input type="file" className="form-control" name='gambar' {...register('gambar')} />
                        </div>
                        <div className="mb-3">
                            <input type="submit" className="btn btn-primary" name='submit' />
                        </div>
                    </form>
                </div>
                <div className="col-4">
                    {gambar}
                </div>
            </div>
            <div className="row">
                <table className='table mt-4'>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Kategori</th>
                            <th>Menu</th>
                            <th>Gambar</th>
                            <th>Harga</th>
                            <th>Delete</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isi.map((val, index) => (
                            <tr key={index}>
                                <td>{no++}</td>
                                <td>{val.kategori}</td>
                                <td>{val.menu}</td>
                                <td><img src={val.gambar} height="100" width="150" /></td>
                                <td>{val.harga}</td>
                                <td>
                                    <button className='btn btn-outline-danger'
                                        onClick={
                                            () => hapus(val.idmenu)
                                        }
                                    >Delete</button>
                                </td>
                                <td>
                                    <button className='btn btn-outline-warning'
                                        onClick={
                                            () => showData(val.idmenu)
                                        }
                                    >Update</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Menu;
