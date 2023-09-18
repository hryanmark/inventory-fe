import React from 'react';
import PermanentDrawer from './component/PermanentDrawer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ItemPage from './page/ItemPage';
import ItemUnitOfMeasurePage from './page//ItemUnitOfMeasurePage';
import BrandPage from './page/BrandPage';
import NoPage from './page//NoPage';
import CategoryPage from './page/CategoryPage';

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