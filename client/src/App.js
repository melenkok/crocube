import { Route, Routes } from "react-router-dom"
import Home from './components/Home'
import Uploaded from './components/Uploaded'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/success" element={<Uploaded />} />
    </Routes>
  );
}

export default App;
