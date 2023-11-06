import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { deleteData, getData } from "../../services/apiService";
import {
  CATEGORY_FORM_NEW,
  CATEGORY_FORM_EDIT,
  CATEGORY_FORM_VIEw,
} from "../../config";
import PageBody from "../../component/PageBody";

export default function CategoryPage() {
  const pageName = "Category List";
  const [data, setData] = useState({
    id: "",
    code: "",
    description: "",
  });

  const [columns, setColumns] = useState([]);
  const history = useNavigate();
  const [selectedRows, setSelectedRows] = useState([]);

  const handleSelectionModelChange = (ids) => {
    const selectedRowsData = ids.map((id) => data.find((row) => row.id === id));

    setSelectedRows(selectedRowsData);
  };

  const toTitleCase = (str) => {
    return str
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  const fetchData = async () => {
    try {
      const result = await getData("/category");

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
    // eslint-disable-next-line
  }, []);

  const onAdd = () => {
    history(CATEGORY_FORM_NEW);
  };

  const onEdit = () => {
    if (selectedRows.length > 1) {
      alert("Cannot edit multiple data simultaneously.");
    } else if (selectedRows.length > 0){
      localStorage.setItem("categoryData", JSON.stringify(selectedRows));
      history(CATEGORY_FORM_EDIT);
    } else {
      alert("Select a row to edit.");
    }
  };

  const onView = () => {
    if (selectedRows.length > 1) {
      alert("Cannot view multiple data simultaneously.");
    } else if (selectedRows.length > 0) {
      localStorage.setItem("categoryData", JSON.stringify(selectedRows));
      history(CATEGORY_FORM_VIEw); 
    } else {
      alert('Select a row to view.');
    }
  };

  const onDelete = async () => {
    try {
      if (selectedRows.length > 1) {
        alert("Cannot delete multiple data simultaneously.");
      } else if (selectedRows.length > 0) {
        const result = await deleteData(`/category/${selectedRows[0].id}`);

        console.log("Deleted result: " + JSON.stringify(result));

        const updatedData = data.filter(
          (brand) => brand.id !== selectedRows[0].id
        );

        setData(updatedData);
      }
      else {
        alert("Select a row to delete.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PageBody
      pageName={pageName}
      onAdd={onAdd}
      onEdit={onEdit}
      onView={onView}
      onDelete={onDelete}
      handleSelectionModelChange={handleSelectionModelChange}
      data={data}
      columns={columns}
    />
  );
}
