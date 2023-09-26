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
import SideNavigationBar from '../../component/SideNavigationBar';
import Header from '../../component/Header';
import BreadCrumbs from '../../component/BreadCrumbs';
import { useState, useEffect } from 'react';
import { API_URL } from '../../config';
import axios from 'axios';
import FloatingButtons from '../../component/FloatingButtons';

export default function ItemUnitOfMeasurePage() {

  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const apiUrl = API_URL + '/item_unit_of_measure';

    axios.get(apiUrl)
      .then(response => {
        setData(response.data);

        if (response.data.length > 0){
          const keys = Object.keys(response.data[0]);
          const generatedColumns = keys.map((key) => ({
            field: key,
            headerName: key.toUpperCase(),
            width: 150,
          }));

          setColumns(generatedColumns);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

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
                <Typography>Item Unit Of Measure</Typography>
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
              rows={data}
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
        <FloatingButtons />
      </Box>
    </Box>
  );
}
