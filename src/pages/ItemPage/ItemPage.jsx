import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  deleteData,
  getData,
  postData,
} from "../../services/apiService";
import {
  ITEM_FORM_NEW,
  ITEM_FORM_EDIT,
  ITEM_FORM_VIEW,
  TMP_ITEM_ENDPOINT,
} from "../../config";
import PageBody from "../../component/PageBody";

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

  const [tmpData] = useState({
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
