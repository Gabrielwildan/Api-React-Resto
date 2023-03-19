import React from 'react';
import { BrowserRouter as Router, Routes, Route, useMatch, Switch } from 'react-router-dom';
import Content from './Content';

const Main = () => {
    return (
        <div>
            <Routes>
                <Route path=':isi' element={<Content />} />
            </Routes>
        </div>
    );
}

export default Main;
