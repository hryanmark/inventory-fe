import React from 'react';
import PermanentDrawer from './component/PermanentDrawer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ItemPage from './pages/ItemPage/ItemPage';
import ItemUnitOfMeasurePage from './pages/ItemUnitOfMeasurePage/ItemUnitOfMeasurePage';
import BrandPage from './pages/BrandPage/BrandPage';
import NoPage from './pages/NoPage';
import CategoryPage from './pages/CategoryPage/CategoryPage';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route index element={<PermanentDrawer />} />
          <Route path="/itempage" element={<ItemPage />}/>
          <Route path="/itemunitofmeasure" element={<ItemUnitOfMeasurePage />}/>
          <Route path="/brandpage" element={<BrandPage />}/>
          <Route path="/categorypage" element={<CategoryPage />}/>
          <Route path="*" element={<NoPage />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;