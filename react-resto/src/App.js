import 'bootstrap/dist/css/bootstrap.min.css';
import Front from './Front/Front';
import Back from './Back/Back';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Back/Login';

function App() {
  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path="/" element={<Front />} exact />
          <Route path="/admin/*" element={<Back />} exact />
          <Route path="/login/*" element={<Login />} exact />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
