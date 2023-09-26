import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import { Button, Card, CssBaseline, Divider, FormControl, MenuItem, Select, Toolbar } from '@mui/material';
import Header from '../../component/Header';
import SideNavigationBar from '../../component/SideNavigationBar';
import BreadCrumbs from '../../component/BreadCrumbs';
import { useNavigate } from 'react-router-dom';

export default function ItemForm() {
  
  const history = useNavigate();

  const onSubmit = () => {
    history('/itempage');
  }

  const onCancel = () => { 
    history('/itempage');
  }

  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  
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
                    value={age}
                    label="Brand"
                    onChange={handleChange}
                    size="small"
                  >
                    <MenuItem value="">Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ mt: 2, mr: 1, mb: 1, ml: 1, width: '15%' }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label" size="small">Category</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Category"
                    onChange={handleChange}
                    size="small"
                  >
                    <MenuItem value="">Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
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
                    value={age}
                    label="Status"
                    onChange={handleChange}
                    size="small"
                  >
                    <MenuItem value="">Pending</MenuItem>
                    <MenuItem value={20}>Delivered</MenuItem>
                    <MenuItem value={30}>Something</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ mt: 2, mr: 1, mb: 1, ml: 1, width: '15%' }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label" size="small">Updated At</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    label="Updated At"
                    onChange={handleChange}
                    size="small"
                  >
                    <MenuItem value="">Pending</MenuItem>
                    <MenuItem value={20}>Delivered</MenuItem>
                    <MenuItem value={30}>Something</MenuItem>
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
                    value={age}
                    label="Created By"
                    onChange={handleChange}
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
                    value={age}
                    label="Updated By"
                    onChange={handleChange}
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
                    value={age}
                    label="Created At"
                    onChange={handleChange}
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
