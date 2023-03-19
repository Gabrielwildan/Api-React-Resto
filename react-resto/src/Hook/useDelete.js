import React, { useState } from 'react';
import { link } from '../Axios/link';

const UseDelete = (url) => {

    const [pesan, setPesan] = useState();

    async function hapus(id) {
        if (window.confirm('Are You Sure Want To Delete This')) {
            const res = await link.delete(url + id);
            setPesan(res.data.pesan);
        }
    }

    return { hapus, pesan, setPesan };
}

export default UseDelete;
