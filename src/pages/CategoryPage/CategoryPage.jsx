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

  const fetchData = async () => {
    try {
      const result = await getData("/category");

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

  const onAdd = () => {
    history(CATEGORY_FORM_NEW);
  };

  const onEdit = () => {
    localStorage.setItem("categoryData", JSON.stringify(selectedRows));
    history(CATEGORY_FORM_EDIT);
  };

  const onView = () => {
    localStorage.setItem("categoryData", JSON.stringify(selectedRows));
    history(CATEGORY_FORM_VIEw);
  };

  const onDelete = async () => {
    try {
      if (selectedRows.length > 0) {
        const result = await deleteData(`/category/${selectedRows[0].id}`);

        console.log("Deleted result: " + JSON.stringify(result));

        const updatedData = data.filter(
          (brand) => brand.id !== selectedRows[0].id
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
