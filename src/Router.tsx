import { Routes, Route, BrowserRouter } from 'react-router-dom';

import ROUTE_PATH from '@Constant/routePath';

import Hd from '@Pages/Hd';
import Landing from '@Pages/Landing';
import MilkCheck from '@Pages/MilkCheck';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTE_PATH.landing} element={<Landing />} />
        <Route path={ROUTE_PATH.hd} element={<Hd />} />
        <Route path={ROUTE_PATH.milkcheck} element={<MilkCheck/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
