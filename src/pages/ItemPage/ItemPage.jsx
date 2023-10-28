import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import { DataGrid } from "@mui/x-data-grid";
import SideNavigationBar from "../../component/SideNavigationBar";
import Header from "../../component/Header";
import BreadCrumbs from "../../component/BreadCrumbs";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FloatingButtons from "../../component/FloatingButtons";
import {
  deleteData,
  getData,
  getDataById,
  postData,
} from "../../services/apiService";
import {
  ITEM_FORM_NEW,
  ITEM_FORM_EDIT,
  ITEM_FORM_VIEW,
  TMP_ITEM_ENDPOINT,
} from "../../config";
import TableHeader from "../../component/TableHeader";

export default function ItemPage() {
  const pageName = "Item List";
  const [selectedRows, setSelectedRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const history = useNavigate();
  const [data, setData] = useState({
    id: "",
    brand_id: "",
    category_id: "",
    title: "",
    description: "",
    SKU: "",
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
  
  const [tmpData, setTpmData] = useState({
    //id: auto icremented/generated
    user_id: 1, //lookup to user table later
  });
  

  const handleSelectionModelChange = (ids) => {
    const selectedRowsData = ids.map((id) => data.find((row) => row.id === id));

    setSelectedRows(selectedRowsData);
  };

  const fetchData = async () => {
    try {
      const result = await getData("/item");

      setData(result);

      if (result.length > 0) {
        const keys = Object.keys(result[0]);
        const generatedColumns = keys.map((key) => ({
          field: key,
          headerName: key.toUpperCase(),
          width: 150,
        }));

        setColumns(generatedColumns);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const postTmpItemData = async () => {
    try {
      const result = await postData(TMP_ITEM_ENDPOINT, tmpData);

      alert("post created for tmp_item: " + JSON.stringify(result));
      localStorage.setItem("tmpItemId", result.id);
      history(ITEM_FORM_NEW);
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  const onAdd = () => {
    //Object.keys(result).length === 0
    postTmpItemData();
  };

  const onEdit = () => {
    localStorage.setItem("itemData", JSON.stringify(selectedRows));
    history(ITEM_FORM_EDIT);
  };

  const onView = () => {
    localStorage.setItem("itemData", JSON.stringify(selectedRows));
    history(ITEM_FORM_VIEW);
  };

  const onDelete = async () => {
    try {
      if (selectedRows.length > 0) {
        const result = await deleteData(`/item/${selectedRows[0].id}`);

        console.log("Deleted result: " + JSON.stringify(result));

        const updatedData = data.filter(
          (item) => item.id !== selectedRows[0].id
        );

        setData(updatedData);
      } else {
        alert("Select a row to delete.");
      }
    } catch (error) {
      console.error(error);
    }
  };

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

        <TableHeader pageName={pageName} onAdd={onAdd}/>

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
              onRowSelectionModelChange={(ids) => {
                handleSelectionModelChange(ids);
              }}
            />
          </div>
        </Card>
        <FloatingButtons view={onView} edit={onEdit} delete={onDelete} />
      </Box>
    </Box>
  );
}
