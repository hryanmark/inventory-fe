import React from 'react';
import PermanentDrawer from './component/PermanentDrawer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ItemPage from './pages/ItemPage/ItemPage';
import ItemUnitOfMeasurePage from './pages/ItemUnitOfMeasurePage/ItemUnitOfMeasurePage';
import BrandPage from './pages/BrandPage/BrandPage';
import NoPage from './pages/NoPage';
import CategoryPage from './pages/CategoryPage/CategoryPage';
import ItemForm from './pages/ItemPage/ItemForm';
import UnitOfMeasurePage from './pages/UnitOfMeasurePage/UnitOfMeasurePage';
import LocationPage from './pages/LocationPage/LocationPage';
import ItemBarcodePage from './pages/ItemBarcodePage/ItemBarcodePage';
import UserPage from './pages/UserPage/UserPage';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route index element={<PermanentDrawer />} />
          <Route path="/item" element={<ItemPage />}/>
          <Route path="/item/form/new" element={<ItemForm mode={"new"}/>}/>
          <Route path="/item/form/view" element={<ItemForm mode={"view"}/>}/>
          <Route path="/item/form/edit" element={<ItemForm mode={"edit"}/>}/>
          <Route path="/itemunitofmeasure" element={<ItemUnitOfMeasurePage />}/>
          <Route path="/brand" element={<BrandPage />}/>
          <Route path="/category" element={<CategoryPage />}/>
          <Route path="/unitofmeasure" element={<UnitOfMeasurePage />}/>
          <Route path="/location" element={<LocationPage />}/>
          <Route path="/itembarcode" element={<ItemBarcodePage />}/>
          <Route path="/user" element={<UserPage />}/>

          <Route path="*" element={<NoPage />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;