import { Route, Routes } from "react-router-dom";

import Mint from './components/Mint';
import Home from './pages/Home';

const AppRoutes = () => {
  return <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/mint" element={<Mint />} />
  </Routes>
}

export default AppRoutes;