import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import Fab from '@mui/material/Fab';
import SideNavigationBar from './SideNavigationBar';
import Header from './Header';

export default function PermanentDrawer() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <Header />
      
      <SideNavigationBar />

      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, bgcolor:"#eceff1", minHeight:"100vh" }}
      >
        
        <Toolbar />

        {'Temporary home'}

        <Divider />
        
        <Box sx={{
            position: 'fixed',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '1rem',
          }}>
          <Fab color="primary" aria-label="add">
            View
          </Fab>
          <Fab color="secondary" aria-label="edit">
            Edit
          </Fab>
          <Fab variant="extended">
              Delete
          </Fab>
        </Box>
      </Box>
    </Box>
  );
}
