import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Home from './components/Home';
import Uploaded from './components/Uploaded';
import Stars from './components/Stars';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/success" element={<Uploaded />} /> */}
      <Route path="/stars" element={<Stars />} />
    </Routes>
  );
}

export default App;
