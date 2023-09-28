import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import { Button, Card, CssBaseline, Divider, FormControl, MenuItem, Select, Toolbar } from '@mui/material';
import Header from '../../component/Header';
import SideNavigationBar from '../../component/SideNavigationBar';
import BreadCrumbs from '../../component/BreadCrumbs';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getData, postData } from '../../services/apiService';
import { v4 as uuidv4 } from 'uuid';

export default function ItemForm() {
  
  const history = useNavigate();

  const [brand, setBrand] = useState('');
  const [brand_data, setBrandData] = useState([]);
  const [category, setCategory] = useState('');
  const [category_data, setCategoryData] = useState([]);
  const [status, setStatus] = useState(0);
  const [updated_at, setUpdatedAt] = useState('');
  const [created_by, setCreatedBy] = useState('');
  const [updated_by, setUpdatedBy] = useState('');
  const [created_at, setCreatedAt] = useState('');

  const [formData, setFormData] = useState({
    id: uuidv4, //auto generated
    brand_id: "",
    category_id: "",
    title: "", //item name
    description: "",
    sku: "IT-5",
    base_uom: "",
    sales_uom: "",
    purchase_uom: "",
    unit_cost: "",
    minimum_stock_level: "",
    maximum_stock_level: "",
    status: "",
    created_by: "",
    updated_by: "",
    created_at: "",
    updated_at: "",
  });

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const onSubmit = async () => {
    postItem();
  }

  const onCancel = () => { 
    history('/itempage');
  }

  const onBrandChange = (event) => {
    const selectedValue = event.target.value;
    const brandId = selectedValue.id;

    setBrand(event.target.value);
    setFormData({ ...formData, "brand_id": brandId });

    if(selectedValue === "#new"){
      setBrand("");
      alert("Open dialog popup");
    }
  }

  const onCategoryChange = (event) => {
    const selectedValue = event.target.value;
    const categoryId = selectedValue.id; 

    setCategory(selectedValue);
    setFormData({ ...formData, "category_id": categoryId });

    if(selectedValue === "#new"){
      setCategory("");
      alert("Open Dialog Popup")
    }
  };

  const onStatusChange = (event) => {
    const selectedValue = event.target.value;

    setStatus(selectedValue);
    setFormData({ ...formData, "status": selectedValue });
  }

  const onUpdatedAtChange = (event) => {
    const selectedValue = event.target.value;
    
    setUpdatedAt(event.target.value);
    setFormData({ ...formData, "updated_at": selectedValue });
  }

  const onCreatedByChange = (event) => {
    const selectedValue = event.target.value;

    setCreatedBy(event.target.value);
    setFormData({ ...formData, "created_by": selectedValue });
  }

  const onUpdatedByChange = (event) => {
    const selectedValue = event.target.value;

    setUpdatedBy(event.target.value);
    setFormData({ ...formData, "updated_by": selectedValue });
  }

  const onCreatedAtChange = (event) => {
    const selectedValue = event.target.value;

    setCreatedAt(event.target.value);
    setFormData({ ...formData, "created_at": selectedValue });
  }

  const fetchBrand = async () => {
    try {
      const result = await getData('/brand');

      setBrandData(result);

    } catch (error) {
      console.error(error);
    }
  }

  const fetchCategory = async () => {
    try {
      const result = await getData('/category');
      
      setCategoryData(result);

    } catch (error) {
      console.error(error);
    }
  }

  const postItem = async () => {
    try {
      const result = await postData('/item', formData);

      alert("post created : " + result);
      history('/itempage');

    } catch (error) {
      // Handle error, e.g., display an error message to the user
      console.error(error);
    } finally {
    }
  }

  useEffect(() => {

    fetchBrand();
    
    fetchCategory();
      
  }, []);
  
  return (
    <div>
      <Box sx={{ display: "flex"}}>
        <CssBaseline />

        <Header />

        <SideNavigationBar />
        
        <Box
          component="main"
          sx={{ 
            flexGrow: 1, 
            p: 3, 
            bgcolor: "#eceff1", 
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column" 
          }}
        >
          <Toolbar />

          <BreadCrumbs />

          <Divider />
          <Card 
          sx={{ 
            marginTop: "15px", 
            minHeight: "85%",
            position: "relative"
            }}
          >
            <div>
              <InputLabel sx={{m: 2, width: '35ch'}}>Item Form</InputLabel>
            </div>

            <Divider></Divider>

            <div>
              <TextField
                label="SKU"
                id="outlined-basic"
                sx={{ mt: 3, mr: 1, mb: 1, ml: 3, width: '10%' }}
                variant="outlined"
                size="small"
                disabled="true"
                name="sku"
                value={formData.sku}
                onChange={handleFormChange}
              />
              <TextField
                label="Item Name"
                id="outlined-basic"
                sx={{ mt: 3, mr: 1, mb: 1, ml: 1, width: '15%' }}
                variant="outlined"
                size="small"
                name="title"
                value={formData.title}
                onChange={handleFormChange}
              />
              <TextField
                label="Description"
                id="outlined-basic"
                sx={{ mt: 3, mr: 1, mb: 1, ml: 1, width: '30%' }}
                variant="outlined"
                size="small"
                name="description"
                value={formData.description}
                onChange={handleFormChange}
              />
            </div>

            <div style={{ display: "flex" }}>
              <Box sx={{ mt: 2, mr: 1, mb: 1, ml: 3, width: '15%' }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label" size="small">Brand</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={brand} //object
                    label="Brand"
                    onChange={onBrandChange}
                    size="small"
                  >
                    <MenuItem value="#new">Create New</MenuItem>
                    {brand_data.map((brand, index) => (
                      <MenuItem 
                      key={index} 
                      value={brand}>{brand.code}</MenuItem>
                    ))}

                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ mt: 2, mr: 1, mb: 1, ml: 1, width: '15%' }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label" size="small">Category</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={category}
                    label="Category"
                    onChange={onCategoryChange}
                    size="small"
                  >
                    <MenuItem value="#new">Create New</MenuItem>
                    {category_data.map((category, index) => (
                      <MenuItem key={index} value={category}>{category.description}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <TextField
                  label="Base Unit Of Measure"
                  id="outlined-basic"
                  sx={{ mt: 2, mr: 1, mb: 1, ml: 1, width: '25%' }}
                  variant="outlined"
                  size="small"
                  name="base_uom"
                  value={formData.base_uom}
                  onChange={handleFormChange}
                />
            </div>
            <div>
              <TextField
                  label="Sales Unit Of Measure"
                  id="outlined-basic"
                  sx={{ mt: 2, mr: 1, mb: 1, ml: 3, width: '15%' }}
                  variant="outlined"
                  size="small"
                  name="sales_uom"
                  value={formData.sales_uom}
                  onChange={handleFormChange}
                />
              <TextField
                  label="Purchase Unit Of Measure"
                  id="outlined-basic"
                  sx={{ mt: 2, mr: 1, mb: 1, ml: 1, width: '15%' }}
                  variant="outlined"
                  size="small"
                  name="purchase_uom"
                  value={formData.purchase_uom}
                  onChange={handleFormChange}
                />
              <TextField
                  label="Unit Cost"
                  id="outlined-basic"
                  type="number"
                  sx={{ mt: 2, mr: 1, mb: 1, ml: 1, width: '25%' }}
                  variant="outlined"
                  size="small"
                  name="unit_cost"
                  value={formData.unit_cost}
                  onChange={handleFormChange}
                />
            </div>
            <div style={{ display: "flex" }}>
              <TextField
                  label="Minimum Stock Level"
                  id="outlined-basic"
                  type="number"
                  sx={{ mt: 2, mr: 1, mb: 1, ml: 3, width: '13%' }}
                  variant="outlined"
                  size="small"
                  name="minimum_stock_level"
                  value={formData.minimum_stock_level}
                  onChange={handleFormChange}
                />
              <TextField
                  label="Maximum Stock Level"
                  id="outlined-basic"
                  type="number"
                  sx={{ mt: 2, mr: 1, mb: 1, ml: 1, width: '13%' }}
                  variant="outlined"
                  size="small"
                  name="maximum_stock_level"
                  value={formData.maximum_stock_level}
                  onChange={handleFormChange}
                />
              <Box sx={{ mt: 2, mr: 1, mb: 1, ml: 1, width: '13%' }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label" size="small">Status</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={status}
                    label="Status"
                    onChange={onStatusChange}
                    size="small"
                  >
                    <MenuItem value={1}>Pending</MenuItem>
                    <MenuItem value={2}>Delivered</MenuItem>
                    <MenuItem value={3}>Something</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ mt: 2, mr: 1, mb: 1, ml: 1, width: '15%' }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label" size="small">Updated At</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={updated_at}
                    label="Updated At"
                    onChange={onUpdatedAtChange}
                    size="small"
                  >
                    <MenuItem value="Japan">Japan</MenuItem>
                    <MenuItem value="Philippines">Philippines</MenuItem>
                    <MenuItem value="Vietnam">Vietnam</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </div>
            <div style={{ display: "flex" }}>
              <Box sx={{ mt: 2, mr: 1, mb: 1, ml: 3, width: '18%' }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label" size="small">Created By</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={created_by}
                    label="Created By"
                    onChange={onCreatedByChange}
                    size="small"
                  >
                    <MenuItem value="Ryan">Ryan</MenuItem>
                    <MenuItem value="Vincent">Vincent</MenuItem>
                    <MenuItem value="Joseph">Joseph</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ mt: 2, mr: 1, mb: 1, ml: 1, width: '18%' }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label" size="small">Updated By</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={updated_by}
                    label="Updated By"
                    onChange={onUpdatedByChange}
                    size="small"
                  >
                    <MenuItem value="Ryan">Ryan</MenuItem>
                    <MenuItem value="Vincent">Vincent</MenuItem>
                    <MenuItem value="Joseph">Joseph</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ mt: 2, mr: 1, mb: 1, ml: 1, width: '19%' }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label" size="small">Created At</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={created_at}
                    label="Created At"
                    onChange={onCreatedAtChange}
                    size="small"
                  >
                    <MenuItem value="Japan">Japan</MenuItem>
                    <MenuItem value="Philippines">Philippines</MenuItem>
                    <MenuItem value="Vietnam">Vietnam</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </div>
            
            <div>
              
              <Button sx={{ m: 3 }} onClick={onSubmit}>Submit</Button>
              <Button sx={{ m: 3 }} onClick={onCancel}>Cancel</Button>
            </div>
          </Card>
        </Box>
      </Box>

    </div>
  );
}
