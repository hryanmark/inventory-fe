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
import ItemUnitOfMeasureForm from './pages/ItemUnitOfMeasurePage/ItemUnitOfMeasureForm';
import BrandForm from './pages/BrandPage/BrandForm';
import CategoryForm from './pages/CategoryPage/CategoryForm';
import UnitOfMeasureForm from './pages/UnitOfMeasurePage/UnitOfMeasureForm';
import LocationForm from './pages/LocationPage/LocationForm';
import UserForm from './pages/UserPage/UserForm';
import ItemBarcodeForm from './pages/ItemBarcodePage/ItemBarcodeForm';

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
          <Route path="/itemunitofmeasure/form/new" element={<ItemUnitOfMeasureForm mode={"new"} />}/>
          <Route path="/itemunitofmeasure/form/edit" element={<ItemUnitOfMeasureForm mode={"edit"} />}/>
          <Route path="/itemunitofmeasure/form/view" element={<ItemUnitOfMeasureForm mode={"view"} />}/>
          <Route path="/brand" element={<BrandPage />}/>
          <Route path="/brand/form/new" element={<BrandForm mode={"new"} />}/>
          <Route path="/brand/form/edit" element={<BrandForm mode={"edit"} />}/>
          <Route path="/brand/form/view" element={<BrandForm mode={"view"} />}/>
          <Route path="/category" element={<CategoryPage />}/>
          <Route path="/category/form/new" element={<CategoryForm mode={"new"} />}/>
          <Route path="/category/form/edit" element={<CategoryForm mode={"edit"} />}/>
          <Route path="/category/form/view" element={<CategoryForm mode={"view"} />}/>
          <Route path="/unitofmeasure" element={<UnitOfMeasurePage />}/>
          <Route path="/unitofmeasure/form/new" element={<UnitOfMeasureForm mode={"new"} />}/>
          <Route path="/unitofmeasure/form/edit" element={<UnitOfMeasureForm mode={"edit"} />}/>
          <Route path="/unitofmeasure/form/view" element={<UnitOfMeasureForm mode={"view"} />}/>
          <Route path="/location" element={<LocationPage />}/>
          <Route path="/location/form/new" element={<LocationForm mode={"new"} />}/>
          <Route path="/location/form/edit" element={<LocationForm mode={"edit"} />}/>
          <Route path="/location/form/view" element={<LocationForm mode={"view"} />}/>
          <Route path="/itembarcode" element={<ItemBarcodePage />}/>
          <Route path="/itembarcode/form/new" element={<ItemBarcodeForm mode={"new"} />}/>
          <Route path="/itembarcode/form/edit" element={<ItemBarcodeForm mode={"edit"} />}/>
          <Route path="/itembarcode/form/view" element={<ItemBarcodeForm mode={"view"} />}/>
          <Route path="/user" element={<UserPage />}/>
          <Route path="/user/form/new" element={<UserForm mode={"new"} />}/>
          <Route path="/user/form/edit" element={<UserForm mode={"edit"} />}/>
          <Route path="/user/form/view" element={<UserForm mode={"view"} />}/>

          <Route path="*" element={<NoPage />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;