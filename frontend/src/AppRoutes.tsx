import { Route, Routes } from "react-router-dom";

import Mint from './pages/Mint';
import Home from './pages/Home';
import Dev from './pages/Dev';

const AppRoutes = () => {
  return <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/mint" element={<Mint />} />
    <Route path="/dev" element={<Dev />} />
  </Routes>
}

export default AppRoutes;