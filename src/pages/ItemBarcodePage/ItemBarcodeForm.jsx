import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import {
  Button,
  Card,
  CssBaseline,
  Divider,
  Toolbar,
} from "@mui/material";
import Header from "../../component/Header";
import SideNavigationBar from "../../component/SideNavigationBar";
import BreadCrumbs from "../../component/BreadCrumbs";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { postData } from "../../services/apiService";
import { NEW_MODE, EDIT_MODE, VIEW_MODE } from "../../config";

export default function ItemBarcodeForm(props) {
  const history = useNavigate();
  const [mode, setMode] = useState("");
  const formName = "Item Barcode Form";

  const [formData, setFormData] = useState({
    // id: uuidv4, //auto generated
    code: "",
    item_id: "",
    item_uom: "",
    type: "",
  });

  const loadData = () => {
    const barcodeData = JSON.parse(localStorage.getItem("barcodeData"));

    for (const barcode of barcodeData) {
      const existingData = {
        id: barcode.id,
        code: barcode.code,
        item_id: barcode.item_id,
        item_uom: barcode.item_uom,
        type: barcode.type,
      };

      localStorage.removeItem("barcodeData");
      return existingData;
    }
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async () => {
    if (mode === NEW_MODE) {
      postItem();
    } else if (mode === EDIT_MODE) {
      putItem();
    } else if (mode === VIEW_MODE) {
    }
  };

  const onCancel = () => {
    history("/itembarcode");
  };

  const postItem = async () => {
    try {
      const result = await postData("/item_barcode", formData);

      alert("post created : " + result);
      history("/itembarcode");
    } catch (error) {
      // Handle error, e.g., display an error message to the user
      console.error(error);
    } finally {
    }
  };

  const putItem = async () => {
    try {
      const result = await postData("/item_barcode", formData);

      alert("put created : " + result);
      history("/itembarcode");
    } catch (error) {
      // Handle error, e.g., display an error message to the user
      console.error(error);
    } finally {
    }
  };

  const formMode = () => {
    setMode(props.mode);

    if (mode === NEW_MODE) {
      console.log("form is new mode");
    } else if (mode === VIEW_MODE) {
      console.log("form is view mode");
      setFormData(loadData());
    } else if (mode === EDIT_MODE) {
      console.log("form is edit mode");
      setFormData(loadData());
    }
  };

  useEffect(() => {
    formMode();
    // eslint-disable-next-line
  }, [mode]);

  return (
    <div>
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
            marginLeft: '5%',
            maxWidth: '65%',
            flexDirection: "column",
          }}
        >
          <Toolbar />

          <BreadCrumbs />

          <Divider />
          <Card
            sx={{
              marginTop: "15px",
              minHeight: "85%",
              position: "relative",
            }}
          >
            <div>
              <InputLabel sx={{ m: 2, width: "35ch" }}>{formName}</InputLabel>
            </div>

            <Divider></Divider>

            <div style={{ display: "flex" }}>
              <TextField
                label="Code"
                id="outlined-basic"
                sx={{ mt: 3, mr: 1, mb: 1, ml: 3, width: "13%" }}
                variant="outlined"
                size="small"
                disabled={mode === "view" ? true : false}
                name="code"
                value={formData.code}
                onChange={handleFormChange}
              />
              <TextField
                label="Item_ID"
                id="outlined-basic"
                type={"number"}
                sx={{ mt: 3, mr: 1, mb: 1, ml: 3, width: "13%" }}
                variant="outlined"
                size="small"
                disabled={mode === "view" ? true : false}
                name="item_id"
                value={formData.item_id}
                onChange={handleFormChange}
              />
              <TextField
                label="Item Unit Of Measure"
                id="outlined-basic"
                sx={{ mt: 3, mr: 1, mb: 1, ml: 1, width: "13%" }}
                variant="outlined"
                size="small"
                disabled={mode === "view" ? true : false}
                name="item_uom"
                value={formData.item_uom}
                onChange={handleFormChange}
              />
              <TextField
                label="Type"
                id="outlined-basic"
                type="number"
                sx={{ mt: 3, mr: 1, mb: 1, ml: 1, width: "15%" }}
                variant="outlined"
                size="small"
                disabled={mode === "view" ? true : false}
                name="type"
                value={formData.type}
                onChange={handleFormChange}
              />
            </div>
            <div>
              <Button sx={{ m: 3 }} onClick={onSubmit}>
                Submit
              </Button>
              <Button sx={{ m: 3 }} onClick={onCancel}>
                Cancel
              </Button>
            </div>
          </Card>
        </Box>
      </Box>
    </div>
  );
}
