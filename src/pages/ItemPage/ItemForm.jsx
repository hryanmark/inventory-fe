import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import { Button, Card, CssBaseline, Divider, Toolbar } from '@mui/material';
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
              <InputLabel sx={{m: 2.5, width: '35ch'}}>Item Form</InputLabel>
            </div>
            <Divider></Divider>
            <div>
              <TextField
                label="SKU"
                id="outlined-basic"
                sx={{ m: 2.5, width: '25%' }}
                variant="outlined"
              />
              <TextField
                label="Item Name"
                id="outlined-basic"
                sx={{ m: 2.5, width: '25%' }}
                variant="outlined"
              />
              <TextField
                label="Description"
                id="outlined-basic"
                sx={{ m: 2.5, width: '25%' }}
                variant="outlined"
              />

            </div>
            <div>
              <TextField
                  label="Brand"
                  id="outlined-basic"
                  sx={{ m: 2.5, width: '25%' }}
                  variant="outlined"
                />
              <TextField
                  label="Category"
                  id="outlined-basic"
                  sx={{ m: 2.5, width: '25%' }}
                  variant="outlined"
                />
              <TextField
                  label="Base Unit Of Measure"
                  id="outlined-basic"
                  sx={{ m: 2.5, width: '25%' }}
                  variant="outlined"
                />
            </div>
            <div>
              <TextField
                  label="Sales Unit Of Measure"
                  id="outlined-basic"
                  sx={{ m: 2.5, width: '25%' }}
                  variant="outlined"
                />
              <TextField
                  label="Purchase Unit Of Measure"
                  id="outlined-basic"
                  sx={{ m: 2.5, width: '25%' }}
                  variant="outlined"
                />
              <TextField
                  label="Unit Cost"
                  id="outlined-basic"
                  sx={{ m: 2.5, width: '25%' }}
                  variant="outlined"
                />
            </div>
            <div>
              <TextField
                  label="Minimum Stock Level"
                  id="outlined-basic"
                  sx={{ m: 2.5, width: '25%' }}
                  variant="outlined"
                />
              <TextField
                  label="Maximum Stock Level"
                  id="outlined-basic"
                  sx={{ m: 2.5, width: '25%' }}
                  variant="outlined"
                />
              <TextField
                  label="Status"
                  id="outlined-basic"
                  sx={{ m: 2.5, width: '25%' }}
                  variant="outlined"
                />
            </div>
            <div>
              <TextField
                  label="Created By"
                  id="outlined-basic"
                  sx={{ m: 2.5, width: '25%' }}
                  variant="outlined"
                />
              <TextField
                  label="Updated By"
                  id="outlined-basic"
                  sx={{ m: 2.5, width: '25%' }}
                  variant="outlined"
                />
              <TextField
                  label="Created At"
                  id="outlined-basic"
                  sx={{ m: 2.5, width: '25%' }}
                  variant="outlined"
                />
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
