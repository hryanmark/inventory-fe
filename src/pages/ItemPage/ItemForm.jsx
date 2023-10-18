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
import { v4 as uuidv4 } from "uuid";
import {
  BRAND_ENDPOINT,
  CATEGORY_ENDPOINT,
  ITEM_ENDPOINT,
  ROUTE_ITEM_PAGE,
  NEW_MODE,
  EDIT_MODE,
  VIEW_MODE,
} from "../../config";
import FormDialog from "../../component/FormDialog";
import BrandFormDialog from "./DialogForm/BrandFormDialog";
import CategoryFormDialog from "./DialogForm/CategoryFormDialog";

export default function ItemForm(props) {
  const history = useNavigate();
  const [mode, setMode] = useState("");
  const formName = "Item Form";
  const [openBrandDialog, setOpenBrandDialog] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const [brand, setBrand] = useState(null);
  const [category, setCategory] = useState(null);
  const [status, setStatus] = useState("");
  const [updated_at, setUpdatedAt] = useState(null);
  const [created_by, setCreatedBy] = useState(null);
  const [updated_by, setUpdatedBy] = useState(null);
  const [created_at, setCreatedAt] = useState(null);

  const [brand_data, setBrandData] = useState([]);
  const [category_data, setCategoryData] = useState([]);
  const [locationData, setLocationData] = useState([]); //Used of updated_at and created_at
  const [userData, setUserData] = useState([]); //Used for updated_by and created_by

  const [formData, setFormData] = useState({
    id: uuidv4, //auto generated
    brand_id: "",
    category_id: "",
    title: "", //item name
    description: "",
    sku: "IT-5",
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

  const loadData = () => {
    const itemData = JSON.parse(localStorage.getItem("itemData"));

    for (const item of itemData) {
      fetchBrandById(item.brand_id);
      fetchCategoryById(item.category_id);
      fetchLocationUpatedAtId(item.updated_at);
      fetchUserCreatedByById(item.created_by);
      fetchUserUpdatedByById(item.updated_by);
      fetchLocationCreatedAtById(item.created_at);

      const existingData = {
        id: item.id, //auto generated
        brand_id: item.brand_id,
        category_id: item.category_id,
        title: item.title, //item name
        description: item.description,
        sku: item.sku,
        base_uom: item.base_uom,
        sales_uom: item.sales_uom,
        purchase_uom: item.purchase_uom,
        unit_cost: item.unit_cost,
        minimum_stock_level: item.minimum_stock_level,
        maximum_stock_level: item.maximum_stock_level,
        status: item.status,
        created_by: item.created_by,
        updated_by: item.updated_by,
        created_at: item.created_at,
        updated_at: item.updated_at,
      };
      localStorage.removeItem("itemData");

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
      // alert(JSON.stringify(brand))
      const updatebrand = brand;
      setBrand(updatebrand);
      setFormData({ ...formData, BRAND_ID_COL: 2 });
    }
  };

  const onCancel = () => {
    history(ROUTE_ITEM_PAGE);
  };

  const onBrandChange = (event) => {
    const selectedValue = event.target.value;

    if (selectedValue === "#new") {
      setOpenBrandDialog(true);
    } else {
      const selectedBrandObject = brand_data.find(
        (brand) => brand.code === selectedValue
      );
      const brandId = selectedBrandObject.id;

      setBrand(selectedBrandObject);

      setFormData({ ...formData, brand_id: brandId });
    }
  };

  const onBrandDialogClose = () => {
    setOpenBrandDialog(false);
  };

  const onCategoryDialogClose = () => {
    setOpenDialog(false);
  };

  const handleBrandDialogData = (data) => {
    setBrandData((prevData) => [...prevData, data]);
    setBrand(data);
  };

  const handleCategoryDialogData = (data) => {
    setCategoryData((prevData) => [...prevData, data]);
    setCategory(data);
  };

  const onCategoryChange = (event) => {
    const selectedValue = event.target.value;

    if (selectedValue === "#new") {
      setOpenDialog(true);
    } else {
      const selectedCategoryObject = category_data.find(
        (category) => category.code === selectedValue
      );
      const categoryId = selectedCategoryObject.id;

      setCategory(selectedCategoryObject);
      setFormData({ ...formData, category_id: categoryId });
    }
  };

  const onStatusChange = (event) => {
    const selectedValue = event.target.value;

    setStatus(selectedValue);
    setFormData({ ...formData, status: selectedValue });
  };

  const onUpdatedAtChange = (event) => {
    const selectedValue = event.target.value;

    if (selectedValue === "#new") {
      setUpdatedAt("");
      alert("Open Dialog Popup");
    } else {
      const selectedLocationObject = locationData.find(
        (location) => location.code === selectedValue
      );
      const locationId = selectedLocationObject.id;

      setUpdatedAt(selectedLocationObject);
      setFormData({ ...formData, updated_at: locationId });
    }
  };

  const onCreatedByChange = (event) => {
    const selectedValue = event.target.value;

    if (selectedValue === "#new") {
      setCreatedBy("");
      alert("Open Dialog Popup");
    } else {
      const seletedUserObject = userData.find(
        (user) => user.name === selectedValue
      );
      const userId = seletedUserObject.id;

      setCreatedBy(seletedUserObject);
      setFormData({ ...formData, created_by: userId });
    }
  };

  const onUpdatedByChange = (event) => {
    const selectedValue = event.target.value;

    if (selectedValue === "#new") {
      setUpdatedBy("");
      alert("Open Dialog Popup");
    } else {
      const seletedUserObject = userData.find(
        (user) => user.name === selectedValue
      );
      const userId = seletedUserObject.id;

      setUpdatedBy(seletedUserObject);
      setFormData({ ...formData, updated_by: userId });
    }
  };

  const onCreatedAtChange = (event) => {
    const selectedValue = event.target.value;

    if (selectedValue === "#new") {
      setCreatedAt("");
      alert("Open Dialog Popup");
    } else {
      const selectedLocationObject = locationData.find(
        (location) => location.code === selectedValue
      );
      const locationId = selectedLocationObject.id;

      setCreatedAt(selectedLocationObject);
      setFormData({ ...formData, created_at: locationId });
    }
  };

  const fetchBrand = async () => {
    try {
      const result = await getData(BRAND_ENDPOINT);

      setBrandData(result);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchBrandById = async (id) => {
    try {
      const result = await getDataById(`${BRAND_ENDPOINT}/${id}`);

      setBrand(result.data);
      console.log(JSON.stringify(result.data));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCategory = async () => {
    try {
      const result = await getData(CATEGORY_ENDPOINT);

      setCategoryData(result);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCategoryById = async (id) => {
    try {
      const result = await getDataById(`${CATEGORY_ENDPOINT}/${id}`);

      setCategory(result.data);
      console.log(JSON.stringify(result.data));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchLocation = async () => {
    try {
      const result = await getData("/location");

      setLocationData(result);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchLocationUpatedAtId = async (id) => {
    try {
      const result = await getData(`/location/${id}`);

      setUpdatedAt(result);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUserCreatedByById = async (id) => {
    try {
      const result = await getData(`/user/${id}`);

      setCreatedBy(result);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUserUpdatedByById = async (id) => {
    try {
      const result = await getData(`/user/${id}`);

      setUpdatedBy(result);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchLocationCreatedAtById = async (id) => {
    try {
      const result = await getData(`/location/${id}`);

      setCreatedAt(result);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUsers = async () => {
    try {
      const result = await getData("/user");

      setUserData(result);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUserById = async (id) => {
    try {
      const result = await getData(`/user/${id}`);

      setUserData(result);
    } catch (error) {
      console.error(error);
    }
  };

  const postItem = async () => {
    try {
      const result = await postData(ITEM_ENDPOINT, formData);

      alert("post created : " + result);
      history(ROUTE_ITEM_PAGE);
    } catch (error) {
      // Handle error, e.g., display an error message to the user
      console.error(error);
    } finally {
    }
  };

  const putItem = async () => {
    try {
      const result = await postData(ITEM_ENDPOINT, formData);

      alert("put created : " + result);
      history(ROUTE_ITEM_PAGE);
    } catch (error) {
      // Handle error, e.g., display an error message to the user
      console.error(error);
    } finally {
    }
  };

  useEffect(() => {
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

    fetchBrand();

    fetchCategory();

    fetchLocation(); // transfer this and the rest to edit and new mode
    // to save memory.
    fetchUsers();
  }, [mode]);

  useEffect(() => {
    //update brand_data after adding new 'brand'
    if (brand) {
      const brandObject = brand_data.find((brnd) => brnd.code === brand.code);
      if (brandObject) {
        setFormData({ ...formData, brand_id: brandObject.id });
      }
    }
  }, [brand_data, brand]);

  useEffect(() => {
    //update category_data after adding new 'category'
    if (category) {
      const categoryObject = category_data.find((ctgry) => ctgry.code === category.code);
      if (categoryObject) {
        setFormData({ ...formData, category_id: categoryObject.id });
      }
    }
  }, [category_data, category]);

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
            bgcolor: "#eceff1",
            minHeight: "100vh",
            display: "flex",
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

            <div>
              <TextField
                label="SKU"
                id="outlined-basic"
                sx={{ mt: 3, mr: 1, mb: 1, ml: 3, width: "10%" }}
                variant="outlined"
                size="small"
                disabled="true"
                name="sku"
                value={formData.sku}
                onChange={handleFormChange}
              />
              <TextField
                label="Item Name"
                id="outlined-basic"
                sx={{ mt: 3, mr: 1, mb: 1, ml: 1, width: "15%" }}
                variant="outlined"
                size="small"
                disabled={mode === "view" ? true : false}
                name="title"
                value={formData.title}
                onChange={handleFormChange}
              />
              <TextField
                label="Description"
                id="outlined-basic"
                sx={{ mt: 3, mr: 1, mb: 1, ml: 1, width: "30%" }}
                variant="outlined"
                size="small"
                disabled={mode === "view" ? true : false}
                name="description"
                value={formData.description}
                onChange={handleFormChange}
              />
            </div>

            <div style={{ display: "flex" }}>
              <Box sx={{ mt: 2, mr: 1, mb: 1, ml: 3, width: "15%" }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label" size="small">
                    Brand
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={brand ? brand.code : ""} //object
                    label="Brand"
                    onChange={onBrandChange}
                    size="small"
                    disabled={mode === "view" ? true : false}
                  >
                    <MenuItem value="#new">Create New</MenuItem>
                    {brand_data.map((brand) => (
                      <MenuItem key={brand.id} value={brand.code}>
                        {brand.code}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <FormDialog
                open={openBrandDialog}
                name="Brand Form"
                handleClose={onBrandDialogClose}
              >
                <BrandFormDialog
                  handleData={handleBrandDialogData}
                  handleClose={onBrandDialogClose}
                />
              </FormDialog>

              <Box sx={{ mt: 2, mr: 1, mb: 1, ml: 1, width: "15%" }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label" size="small">
                    Category
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={category ? category.code : ""}
                    label="Category"
                    onChange={onCategoryChange}
                    size="small"
                    disabled={mode === "view" ? true : false}
                  >
                    <MenuItem value="#new">Create New</MenuItem>
                    {category_data.map((category, index) => (
                      <MenuItem key={index} value={category.code}>
                        {category.code}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <FormDialog
                open={openDialog}
                name="Category Form"
                handleClose={onCategoryDialogClose}
              >
                <CategoryFormDialog
                  handleData={handleCategoryDialogData}
                  handleClose={onCategoryDialogClose}
                />
              </FormDialog>

              <TextField
                label="Base Unit Of Measure"
                id="outlined-basic"
                sx={{ mt: 2, mr: 1, mb: 1, ml: 1, width: "25%" }}
                variant="outlined"
                size="small"
                disabled={mode === "view" ? true : false}
                name="base_uom"
                value={formData.base_uom}
                onChange={handleFormChange}
              />
            </div>
            <div>
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
                    value={updated_at ? updated_at.code : ""}
                    label="Updated At"
                    onChange={onUpdatedAtChange}
                    size="small"
                    disabled={mode === "view" ? true : false}
                  >
                    <MenuItem value="#new">Create New</MenuItem>
                    {locationData.map((location) => (
                      <MenuItem key={location.id} value={location.code}>
                        {location.code}
                      </MenuItem>
                    ))}
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
                    value={created_by ? created_by.name : ""}
                    label="Created By"
                    onChange={onCreatedByChange}
                    size="small"
                    disabled={mode === "view" ? true : false}
                  >
                    <MenuItem value="#new">Create New</MenuItem>
                    {userData.map((user) => (
                      <MenuItem key={user.id} value={user.name}>
                        {user.name}
                      </MenuItem>
                    ))}
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
                    value={updated_by ? updated_by.name : ""}
                    label="Updated By"
                    onChange={onUpdatedByChange}
                    size="small"
                    disabled={mode === "view" ? true : false}
                  >
                    <MenuItem value="#new">Create New</MenuItem>
                    {userData.map((user) => (
                      <MenuItem key={user.id} value={user.name}>
                        {user.name}
                      </MenuItem>
                    ))}
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
                    value={created_at ? created_at.code : ""}
                    label="Created At"
                    onChange={onCreatedAtChange}
                    size="small"
                    disabled={mode === "view" ? true : false}
                  >
                    <MenuItem value="#new">Create New</MenuItem>
                    {locationData.map((location) => (
                      <MenuItem key={location.id} value={location.code}>
                        {location.code}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
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
