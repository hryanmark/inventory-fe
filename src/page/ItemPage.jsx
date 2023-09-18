import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { DataGrid } from '@mui/x-data-grid';
import Fab from '@mui/material/Fab';
import SideNavigationBar from '../component/SideNavigationBar';
import Header from '../component/Header';
import BreadCrumbs from '../component/BreadCrumbs';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 90,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
  ];
  
  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];

export default function ItemPage() {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <Header />

      <SideNavigationBar />

      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, bgcolor: "#eceff1", minHeight: "100vh" }}
      >
        <Toolbar />

        <BreadCrumbs />

        <Card sx={{ marginTop: "2%" }}>
          <div>
            <Accordion defaultExpanded="false">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                defaultExpanded="false"
              >
                <Typography>Item</Typography>
              </AccordionSummary>

              <Divider />

              <AccordionDetails>
                <Card
                  sx={{
                    maxWidth: 300,
                    minHeight: 50,
                    bgcolor: "#ffffff",
                    display: "flex",
                  }}
                >
                  <Typography
                    sx={{
                      display: "flex",
                      gap: "5%",
                      marginTop: "2%",
                      marginLeft: "2%",
                    }}
                  >
                    <div sx={{ padding: "20" }}>
                      <Button
                        variant="contained"
                        size="medium"
                        maxWidth="200"
                        color="success"
                      >
                        Add
                      </Button>
                    </div>
                    <div sx={{ padding: "20" }}>
                      <Button variant="outlined" size="medium" maxWidth="200">
                        Export
                      </Button>
                    </div>
                    <div sx={{ padding: "20" }}>
                      <Button variant="outlined" size="medium" maxWidth="200">
                        Import
                      </Button>
                    </div>
                  </Typography>
                </Card>
              </AccordionDetails>
            </Accordion>
          </div>
        </Card>

        <Divider />

        <Card sx={{ marginTop: "15px" }}>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
            />
          </div>
        </Card>
        <Box
          sx={{
            position: "fixed",
            bottom: "2rem",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "1rem",
          }}
        >
          <Fab color="primary" aria-label="add">
            View
          </Fab>
          <Fab color="secondary" aria-label="edit">
            Edit
          </Fab>
          <Fab variant="extended">Delete</Fab>
        </Box>
      </Box>
    </Box>
  );
}
