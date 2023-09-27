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
import { API_URL } from '../../config';
import axios from 'axios';

export default function ItemForm() {
  
  const history = useNavigate();

  const onSubmit = () => {
    history('/itempage');
  }

  const onCancel = () => { 
    // history('/itempage');
    alert(JSON.stringify(brand_data));
  }
  
  const [brand, setBrand] = useState('');
  const [brand_data, setBrandData] = useState([]);
  const [category, setCategory] = useState('');
  const [category_data, setCategoryData] = useState([]);
  const [status, setStatus] = useState('');
  const [updated_at, setUpdatedAt] = useState('');
  const [created_by, setCreatedBy] = useState('');
  const [updated_by, setUpdatedBy] = useState('');
  const [created_at, setCreatedAt] = useState('');


  const onBrandChange = (event) => {
    const selectedValue = event.target.value;

    setBrand(event.target.value);

    if(selectedValue === "#new"){
      setBrand("");
      alert("Open dialog popup");
    }
  }

  const onCategoryChange = (event) => {
    const selectedValue = event.target.value;

    setCategory(event.target.value);

    if(selectedValue === "#new"){
      setCategory("");
      alert("Open Dialog Popup")
    }
  };

  const onStatusChange = (event) => {
    setStatus(event.target.value);
  }

  const onUpdatedAtChange = (event) => {
    setUpdatedAt(event.target.value);
  }

  const onCreatedByChange = (event) => {
    setCreatedBy(event.target.value);
  }

  const onUpdatedByChange = (event) => {
    setUpdatedBy(event.target.value);
  }

  const onCreatedAtChange = (event) => {
    setCreatedAt(event.target.value);
  }

  useEffect(() => {
    const apiUrl = API_URL + '/brand';

    axios.get(apiUrl)
      .then(response => {
        setBrandData(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
    });
    
    axios.get(API_URL + '/category')
      .then(response => {
        setCategoryData(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
    });
      
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
              />
              <TextField
                label="Item Name"
                id="outlined-basic"
                sx={{ mt: 3, mr: 1, mb: 1, ml: 1, width: '15%' }}
                variant="outlined"
                size="small"
              />
              <TextField
                label="Description"
                id="outlined-basic"
                sx={{ mt: 3, mr: 1, mb: 1, ml: 1, width: '30%' }}
                variant="outlined"
                size="small"
              />
            </div>

            <div style={{ display: "flex" }}>
              <Box sx={{ mt: 2, mr: 1, mb: 1, ml: 3, width: '15%' }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label" size="small">Brand</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={brand}
                    label="Brand"
                    onChange={onBrandChange}
                    size="small"
                  >
                    <MenuItem value="#new">Create New</MenuItem>
                    {brand_data.map((brand, index) => (
                      <MenuItem key={index} value={brand.id}>{brand.description}</MenuItem>
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
                      <MenuItem key={index} value={category.id}>{category.description}</MenuItem>
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
                />
            </div>
            <div>
              <TextField
                  label="Sales Unit Of Measure"
                  id="outlined-basic"
                  sx={{ mt: 2, mr: 1, mb: 1, ml: 3, width: '15%' }}
                  variant="outlined"
                  size="small"
                />
              <TextField
                  label="Purchase Unit Of Measure"
                  id="outlined-basic"
                  sx={{ mt: 2, mr: 1, mb: 1, ml: 1, width: '15%' }}
                  variant="outlined"
                  size="small"
                />
              <TextField
                  label="Unit Cost"
                  id="outlined-basic"
                  type="number"
                  sx={{ mt: 2, mr: 1, mb: 1, ml: 1, width: '25%' }}
                  variant="outlined"
                  size="small"
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
                />
              <TextField
                  label="Maximum Stock Level"
                  id="outlined-basic"
                  type="number"
                  sx={{ mt: 2, mr: 1, mb: 1, ml: 1, width: '13%' }}
                  variant="outlined"
                  size="small"
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
                    <MenuItem value="">Japan</MenuItem>
                    <MenuItem value={20}>Philippines</MenuItem>
                    <MenuItem value={30}>Vietnam</MenuItem>
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
                    <MenuItem value="">Ryan</MenuItem>
                    <MenuItem value={20}>Vincent</MenuItem>
                    <MenuItem value={30}>Joseph</MenuItem>
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
                    <MenuItem value="">Ryan</MenuItem>
                    <MenuItem value={20}>Vincent</MenuItem>
                    <MenuItem value={30}>Joseph</MenuItem>
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
                    <MenuItem value="">Japan</MenuItem>
                    <MenuItem value={20}>Philippines</MenuItem>
                    <MenuItem value={30}>Vietnam</MenuItem>
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
