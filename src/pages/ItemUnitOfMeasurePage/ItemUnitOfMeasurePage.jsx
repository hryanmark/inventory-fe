import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { deleteData, getData } from "../../services/apiService";
import { IUOM_FORM_NEW, IUOM_FORM_EDIT, IUOM_FORM_VIEW } from "../../config";
import PageBody from "../../component/PageBody";

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
  const [alertState, setAlertState] = useState({
    showAlert: false,
    messageAlert: '',
  });
  const { showAlert, messageAlert } = alertState;

  const handleSelectionModelChange = (ids) => {
    const selectedRowsData = ids.map((id) => data.find((row) => row.id === id));

    setSelectedRows(selectedRowsData);
  };

  const separatePascalCase = ( inputString) => {
    // Use a regular expression to find capital letters and insert a space before them
    const separated =  inputString.replace(/([A-Z])/g, ' $1').trim();
    
    const words = separated.split(' ');

    const capitalized = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));

    const result = capitalized.join(' ');

    return result;
  }

  const fetchData = async () => {
    try {
      const result = await getData("/item_unit_of_measure");

      setData(result);

      if (result.length > 0) {
        const keys = Object.keys(result[0]);
        const generatedColumns = keys.map((key) => ({
          field: key,
          headerName: separatePascalCase(key),
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
    history(IUOM_FORM_NEW);
  };

  const onEdit = () => {
    if (selectedRows.length > 1){ 
      setAlertState({showAlert: true, messageAlert: 'Cannot edit multiple data simultaneously.'});
    } else if (selectedRows.length > 0) {
      localStorage.setItem("iuomData", JSON.stringify(selectedRows));
      history(IUOM_FORM_EDIT);
    } else {
      setAlertState({showAlert: true, messageAlert: 'Select a row to edit.'});
    }
  };

  const onView = () => {
    if (selectedRows.length > 1) {
      setAlertState({showAlert: true, messageAlert: 'Cannot view multiple data simultaneously.'});
    } else if (selectedRows.length > 0) {
      localStorage.setItem("iuomData", JSON.stringify(selectedRows));
      history(IUOM_FORM_VIEW);
    } else {
      setAlertState({showAlert: true, messageAlert: 'Select a row to view.'});
    }
  };

  const onDelete = async () => {
    try {
      if (selectedRows.length > 1) {
        setAlertState({showAlert: true, messageAlert: 'Cannot delete multiple data simultaneously.'});
      } else if (selectedRows.length > 0) {
        const result = await deleteData(
          `/item_unit_of_measure/${selectedRows[0].id}`
        );

        console.log("Deleted result: " + JSON.stringify(result));

        const updatedData = data.filter(
          (iuom) => iuom.id !== selectedRows[0].id
        );

        setData(updatedData);
      }
      else {
        setAlertState({showAlert: true, messageAlert: 'Select a row to delete.'});
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlertState({...alertState, showAlert: false});
  };

  return (
    <PageBody
      pageName={pageName}
      onAdd={onAdd}
      onView={onView}
      onEdit={onEdit}
      onDelete={onDelete}
      handleSelectionModelChange={handleSelectionModelChange}
      data={data}
      columns={columns}
      openAlert={showAlert}
      message={messageAlert}
      handleAlertClose={handleAlert}
    />
  );
}
