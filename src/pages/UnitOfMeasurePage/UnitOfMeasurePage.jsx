import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { deleteData, getData } from "../../services/apiService";
import { UOM_FORM_NEW, UOM_FORM_EDIT, UOM_FORM_VIEW } from "../../config";
import PageBody from "../../component/PageBody";

export default function UnitOfMeasurePage() {
  const pageName = "Unit Of Measure List";
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
      const result = await getData("/unit_of_measure");

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
    history(UOM_FORM_NEW);
  };

  const onEdit = () => {
    localStorage.setItem("uomData", JSON.stringify(selectedRows));
    history(UOM_FORM_EDIT);
  };

  const onView = () => {
    localStorage.setItem("uomData", JSON.stringify(selectedRows));
    history(UOM_FORM_VIEW);
  };

  const onDelete = async () => {
    try {
      if (selectedRows.length > 0) {
        const result = await deleteData(
          `/unit_of_measure/${selectedRows[0].id}`
        );

        console.log("Deleted result: " + JSON.stringify(result));

        const updatedData = data.filter((uom) => uom.id !== selectedRows[0].id);

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
