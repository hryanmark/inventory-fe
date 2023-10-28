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
import { deleteData, getData } from "../../services/apiService";
import { IUOM_FORM_NEW, IUOM_FORM_EDIT, IUOM_FORM_VIEW } from "../../config";
import TableHeader from "../../component/TableHeader";
import TableData from "../../component/TableData";

export default function ItemUnitOfMeasurePage() {
  const pageName = "Item Unit Of Measure List";
  const [data, setData] = useState({
    id: "",
    item_id: "",
    unit_of_measure_id: "",
    quantity: "",
  });

  const [columns, setColumns] = useState([]);
  const history = useNavigate();
  const [selectedRows, setSelectedRows] = useState([]);

  const handleSelectionModelChange = (ids) => {
    const selectedRowsData = ids.map((id) => data.find((row) => row.id === id));

    setSelectedRows(selectedRowsData);
  };

  function toTitleCase(str) {
    return str
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  const fetchData = async () => {
    try {
      const result = await getData("/item_unit_of_measure");

      setData(result);

      if (result.length > 0) {
        const keys = Object.keys(result[0]);
        const generatedColumns = keys.map((key) => ({
          field: key,
          headerName: toTitleCase(key),
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

  const onAdd = () => {
    history(IUOM_FORM_NEW);
  };

  const onEdit = () => {
    localStorage.setItem("iuomData", JSON.stringify(selectedRows));
    history(IUOM_FORM_EDIT);
  };

  const onView = () => {
    localStorage.setItem("iuomData", JSON.stringify(selectedRows));
    history(IUOM_FORM_VIEW);
  };

  const onDelete = async () => {
    try {
      if (selectedRows.length > 0) {
        const result = await deleteData(
          `/item_unit_of_measure/${selectedRows[0].id}`
        );

        console.log("Deleted result: " + JSON.stringify(result));

        const updatedData = data.filter(
          (iuom) => iuom.id !== selectedRows[0].id
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
        sx={{
          flexGrow: 1,
          p: 3,
          minHeight: "100vh",
          marginLeft: "5%",
          maxWidth: "65%",
        }}
      >
        <Toolbar />

        <BreadCrumbs />
        <TableHeader pageName={pageName} onAdd={onAdd} />

        <TableData
          handleSelectionModelChange={handleSelectionModelChange}
          data={data}
          columns={columns}
        />
        <FloatingButtons view={onView} edit={onEdit} delete={onDelete} />
      </Box>
    </Box>
  );
}
