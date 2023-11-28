import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import {
  Button,
  Card,
  CssBaseline,
  Divider,
  FormControl,
  MenuItem,
  Select,
  Toolbar,
} from "@mui/material";
import Header from "../../component/Header";
import SideNavigationBar from "../../component/SideNavigationBar";
import BreadCrumbs from "../../component/BreadCrumbs";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getData, getDataById, postData } from "../../services/apiService";
import { NEW_MODE, EDIT_MODE, VIEW_MODE } from "../../config";

export default function ItemUnitOfMeasureForm(props) {
  const history = useNavigate();
  const [mode, setMode] = useState("");
  const formName = "Item Unit Of Measure Form";

  const [itemTitle, setItemTitle] = useState(null);
  const [itemData, setItemData] = useState([]);
  const [uomCode, setUomCode] = useState(null);
  const [uomData, setUomData] = useState([]);

  const [formData, setFormData] = useState({
    // id: uuidv4, //auto generated
    itemId: "",
    unitOfMeasureId: "",
    quantity: "",
  });

  const loadData = () => {
    const iuomData = JSON.parse(localStorage.getItem("iuomData"));

    for (const iuom of iuomData) {
      fetchItemById(iuom.itemId);
      fetchUomById(iuom.unitOfMeasureId);

      const existingData = {
        id: iuom.id,
        itemId: iuom.itemId,
        unitOfMeasureId: iuom.unitOfMeasureId,
        quantity: iuom.quantity,
      };

      localStorage.removeItem("iuomData");
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
    history("/itemunitofmeasure");
  };

  const onItemChange = (event) => {
    const selectedValue = event.target.value;

    if (selectedValue === "#new") {
      setItemTitle("");
      alert("Open dialog popup");
    } else {
      const selectedItemObject = itemData.find(
        (item) => item.title === selectedValue
      );
      const itemId = selectedItemObject.id;

      setItemTitle(selectedItemObject);
      setFormData({ ...formData, itemId: itemId });
    }
  };

  const onUnitOfMeasureChange = (event) => {
    const selectedValue = event.target.value;

    if (selectedValue === "#new") {
      setUomCode("");
      alert("Open dialog popup");
    } else {
      const selectedUomObject = uomData.find(
        (uom) => uom.code === selectedValue
      );
      const uomId = selectedUomObject.id;

      setUomCode(selectedUomObject);
      setFormData({ ...formData, unitOfMeasureId: uomId });
    }
  };

  const fetchItem = async () => {
    try {
      const result = await getData("/item");

      setItemData(result);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchItemById = async (id) => {
    try {
      const result = await getDataById(`/item/${id}`);

      setItemTitle(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUom = async () => {
    try {
      const result = await getData("/unit_of_measure");

      setUomData(result);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUomById = async (id) => {
    try {
      const result = await getDataById(`/unit_of_measure/${id}`);

      setUomCode(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  const postItem = async () => {
    try {
      const result = await postData("/item_unit_of_measure", formData);

      alert("post created : " + result);
      history("/itemunitofmeasure");
    } catch (error) {
      // Handle error, e.g., display an error message to the user
      console.error(error);
    } finally {
    }
  };

  const putItem = async () => {
    try {
      const result = await postData("/item_unit_of_measure", formData);

      alert("put created : " + result);
      alert(JSON.stringify(result));
      history("/itemunitofmeasure");
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
    fetchItem();
    fetchUom();
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
              <Box sx={{ mt: 3, mr: 1, mb: "30%", ml: 3, width: "15%" }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label" size="small">
                    Item ID
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={itemTitle ? itemTitle.title : ""}
                    label="Item ID"
                    onChange={onItemChange}
                    size="small"
                    disabled={mode === "view" ? true : false}
                  >
                    <MenuItem value="#new">Create New</MenuItem>
                    {itemData.map((item) => (
                      <MenuItem key={item.id} value={item.title}>
                        {item.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ mt: 3, mr: 1, mb: 1, ml: 1, width: "15%" }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label" size="small">
                    Unit Of Measure ID
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={uomCode ? uomCode.code : ""}
                    label="Unit Of Measure Id"
                    onChange={onUnitOfMeasureChange}
                    size="small"
                    disabled={mode === "view" ? true : false}
                  >
                    <MenuItem value="#new">Create New</MenuItem>
                    {uomData.map((uom) => (
                      <MenuItem key={uom.id} value={uom.code}>
                        {uom.code}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <TextField
                label="Quantity"
                id="outlined-basic"
                type="number"
                sx={{ mt: 3, mr: 1, mb: 1, ml: 1, width: "25%" }}
                variant="outlined"
                size="small"
                disabled={mode === "view" ? true : false}
                name="quantity"
                value={formData.quantity}
                onChange={handleFormChange}
              />
            </div>
            {/* <div>
              <TextField
                label="Sales Unit Of Measure"
                id="outlined-basic"
                sx={{ mt: 2, mr: 1, mb: 1, ml: 3, width: "15%" }}
                variant="outlined"
                size="small"
                disabled={mode === "view" ? true : false}
                name="sales_uom"
                value={formData.sales_uom}
                onChange={handleFormChange}
              />
              <TextField
                label="Purchase Unit Of Measure"
                id="outlined-basic"
                sx={{ mt: 2, mr: 1, mb: 1, ml: 1, width: "15%" }}
                variant="outlined"
                size="small"
                disabled={mode === "view" ? true : false}
                name="purchase_uom"
                value={formData.purchase_uom}
                onChange={handleFormChange}
              />
              <TextField
                label="Unit Cost"
                id="outlined-basic"
                type="number"
                sx={{ mt: 2, mr: 1, mb: 1, ml: 1, width: "25%" }}
                variant="outlined"
                size="small"
                disabled={mode === "view" ? true : false}
                name="unit_cost"
                value={formData.unit_cost}
                onChange={handleFormChange}
              />
            </div>
            <div style={{ display: "flex" }}>
              <TextField
                label="Minimum Stock Level"
                id="outlined-basic"
                type="number"
                sx={{ mt: 2, mr: 1, mb: 1, ml: 3, width: "13%" }}
                variant="outlined"
                size="small"
                disabled={mode === "view" ? true : false}
                name="minimum_stock_level"
                value={formData.minimum_stock_level}
                onChange={handleFormChange}
              />
              <TextField
                label="Maximum Stock Level"
                id="outlined-basic"
                type="number"
                sx={{ mt: 2, mr: 1, mb: 1, ml: 1, width: "13%" }}
                variant="outlined"
                size="small"
                disabled={mode === "view" ? true : false}
                name="maximum_stock_level"
                value={formData.maximum_stock_level}
                onChange={handleFormChange}
              />
              <Box sx={{ mt: 2, mr: 1, mb: 1, ml: 1, width: "13%" }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label" size="small">
                    Status
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={status}
                    label="Status"
                    onChange={onStatusChange}
                    size="small"
                    disabled={mode === "view" ? true : false}
                  >
                    <MenuItem value={1}>Pending</MenuItem>
                    <MenuItem value={2}>Delivered</MenuItem>
                    <MenuItem value={3}>Something</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ mt: 2, mr: 1, mb: 1, ml: 1, width: "15%" }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label" size="small">
                    Updated At
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={updated_at}
                    label="Updated At"
                    onChange={onUpdatedAtChange}
                    size="small"
                    disabled={mode === "view" ? true : false}
                  >
                    <MenuItem value="Japan">Japan</MenuItem>
                    <MenuItem value="Philippines">Philippines</MenuItem>
                    <MenuItem value="Vietnam">Vietnam</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </div>
            <div style={{ display: "flex" }}>
              <Box sx={{ mt: 2, mr: 1, mb: 1, ml: 3, width: "18%" }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label" size="small">
                    Created By
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={created_by}
                    label="Created By"
                    onChange={onCreatedByChange}
                    size="small"
                    disabled={mode === "view" ? true : false}
                  >
                    <MenuItem value="Ryan">Ryan</MenuItem>
                    <MenuItem value="Vincent">Vincent</MenuItem>
                    <MenuItem value="Joseph">Joseph</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ mt: 2, mr: 1, mb: 1, ml: 1, width: "18%" }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label" size="small">
                    Updated By
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={updated_by}
                    label="Updated By"
                    onChange={onUpdatedByChange}
                    size="small"
                    disabled={mode === "view" ? true : false}
                  >
                    <MenuItem value="Ryan">Ryan</MenuItem>
                    <MenuItem value="Vincent">Vincent</MenuItem>
                    <MenuItem value="Joseph">Joseph</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ mt: 2, mr: 1, mb: 1, ml: 1, width: "19%" }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label" size="small">
                    Created At
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={created_at}
                    label="Created At"
                    onChange={onCreatedAtChange}
                    size="small"
                    disabled={mode === "view" ? true : false}
                  >
                    <MenuItem value="Japan">Japan</MenuItem>
                    <MenuItem value="Philippines">Philippines</MenuItem>
                    <MenuItem value="Vietnam">Vietnam</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </div> */}

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
