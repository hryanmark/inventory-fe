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
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { DateTimeField } from "@mui/x-date-pickers/DateTimeField";
import dayjs from "dayjs";
import { format } from "date-fns";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/joy";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DeleteOutlineOutlined } from "@mui/icons-material";

export default function ItemForm(props) {
  const formName = "Item Form";
  const history = useNavigate();
  const dateTimeFormat = `yyyy-MM-dd'T'HH:mm:ss`;
  const [mode, setMode] = useState("");
  const [openBrandDialog, setOpenBrandDialog] = useState(false);
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);

  const [brand, setBrand] = useState(null);
  const [category, setCategory] = useState(null);
  const [status, setStatus] = useState("");
  const [created_by, setCreatedBy] = useState(null);
  const [updated_by, setUpdatedBy] = useState(null);

  const [brand_data, setBrandData] = useState([]);
  const [category_data, setCategoryData] = useState([]);
  const [userData, setUserData] = useState([]); //Used for updated_by and created_by

  const [formData, setFormData] = useState({
    // id: 11, //updated via tmp_item_id
    brand_id: "",
    category_id: "",
    title: " ", //item name
    description: " ",
    sku: "IT-5",
    base_uom: " ",
    sales_uom: " ",
    purchase_uom: " ",
    unit_cost: "0",
    minimum_stock_level: "0",
    maximum_stock_level: "0",
    status: "",
    created_by: "",
    updated_by: "",
    created_at: format(new Date(), dateTimeFormat),
    updated_at: format(new Date(), dateTimeFormat),
  });

  const [itemUomFormData, setItemUomFormData] = useState([
    {
      // id: "", //auto generated
      item_id: "", //use tmp item id
      unit_of_measure_id: "",
      quantity: 0,
    },
  ]);

  const loadData = (mode) => {
    const itemData = JSON.parse(localStorage.getItem("itemData"));

    for (const item of itemData) {
      fetchBrandById(item.brand_id);
      fetchCategoryById(item.category_id);
      fetchUserCreatedByById(item.created_by);
      fetchUserUpdatedByById(item.updated_by);

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
        updated_at:
          mode === "view"
            ? item.updated_at
            : format(new Date(), dateTimeFormat),
      };
      localStorage.removeItem("itemData");

      return existingData;
    }
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleItemUomFormChange = (e, i) => {
    const { name, value } = e.target;
    const onchangevalue = [...itemUomFormData];
    onchangevalue[i][name] = value;
    setItemUomFormData(onchangevalue);// same purpose different approach (check handleFormChange)
  };

  const onSaveItemUomData = (e) => {
    if (e.key === "Enter") {
      console.log(itemUomFormData);
    }
  };

  const onAddItemUomFields = () => {
    setItemUomFormData([
      ...itemUomFormData,
      { item_id: "", unit_of_measure_id: "", quantity: 0 },
    ]);
  };

  const onRemoveItemUomField = (index) => {
    const deleteRow = [...itemUomFormData];
    deleteRow.splice(index, 1);
    setItemUomFormData(deleteRow);
  };

  const onSubmit = async () => {
    if (mode === NEW_MODE) {
      alert("ID is: " + formData.id);
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
    setOpenCategoryDialog(false);
  };

  // const onUpdatedAtDialogClose = () => {
  //   setOpenUpdatedAtDialog(false);
  // };

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
      setOpenCategoryDialog(true);
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

  const fetchUsers = async () => {
    try {
      const result = await getData("/user");

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
      const tmpItemId = localStorage.getItem("tmpItemId");
      alert(tmpItemId);

      setFormData({...formData, id: tmpItemId})
    } else if (mode === VIEW_MODE) {
      console.log("form is view mode");
      setFormData(loadData(props.mode));
    } else if (mode === EDIT_MODE) {
      console.log("form is edit mode");
      setFormData(loadData(props.mode));
    }

    fetchBrand();

    fetchCategory();

    fetchUsers();
    // eslint-disable-next-line
  }, [mode]);

  useEffect(() => {
    //update brand_data after adding new 'brand'
    if (brand) {
      const brandObject = brand_data.find((brnd) => brnd.code === brand.code);
      if (brandObject) {
        setFormData({ ...formData, brand_id: brandObject.id });
      }
    }
    // eslint-disable-next-line
  }, [brand_data, brand]);

  useEffect(() => {
    //update category_data after adding new 'category'
    if (category) {
      const categoryObject = category_data.find(
        (ctgry) => ctgry.code === category.code
      );
      if (categoryObject) {
        setFormData({ ...formData, category_id: categoryObject.id });
      }
    }
    // eslint-disable-next-line
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
            minHeight: "100vh",
            marginLeft: "5%",
            maxWidth: "65%",
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

            <div style={{ display: "flex", marginRight: "10%" }}>
              <TextField
                label="Item Name"
                id="outlined-basic"
                sx={{ mt: 3, mr: 1, ml: 5, width: "40%" }}
                variant="outlined"
                size="small"
                name="title"
                value={formData.title}
                onChange={handleFormChange}
              />
              <Box sx={{ mt: 3, width: "30%" }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label" size="small">
                    Brand
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={brand ? brand.code : " "} //object
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

              <Box sx={{ mt: 3, mr: 1, ml: 1, width: "30%" }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label" size="small">
                    Category
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={category ? category.code : " "}
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
                open={openCategoryDialog}
                name="Category Form"
                handleClose={onCategoryDialogClose}
              >
                <CategoryFormDialog
                  handleData={handleCategoryDialogData}
                  handleClose={onCategoryDialogClose}
                />
              </FormDialog>
            </div>

            <div style={{ display: "flex", marginRight: "10%" }}>
              <TextField
                label="Description"
                id="outlined-multiline-static"
                sx={{ mt: 2.5, mr: 1, ml: 5, width: "100%" }}
                variant="outlined"
                size="large"
                name="description"
                multiline
                maxRows={3}
                placeholder="Description"
                value={formData.description}
                onChange={handleFormChange}
              />
            </div>
            <div style={{ display: "flex", marginRight: "10%" }}>
              <TextField
                label="Unit Cost"
                id="outlined-basic"
                type="number"
                sx={{ mt: 2.5, mr: 1, ml: 5, width: "25%" }}
                variant="outlined"
                size="small"
                disabled={mode === "view" ? true : false}
                name="unit_cost"
                value={formData.unit_cost}
                onChange={handleFormChange}
              />
              <TextField
                label="Minimum Stock"
                id="outlined-basic"
                type="number"
                sx={{ mt: 2.5, mr: 1, ml: 1, width: "25%" }}
                variant="outlined"
                size="small"
                disabled={mode === "view" ? true : false}
                name="minimum_stock_level"
                value={formData.minimum_stock_level}
                onChange={handleFormChange}
              />
              <TextField
                label="Maximum Stock"
                id="outlined-basic"
                type="number"
                sx={{ mt: 2.5, mr: 1, ml: 1, width: "25%" }}
                variant="outlined"
                size="small"
                disabled={mode === "view" ? true : false}
                name="maximum_stock_level"
                value={formData.maximum_stock_level}
                onChange={handleFormChange}
              />
              <Box sx={{ mt: 2.5, mr: 1, ml: 1, width: "25%" }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label" size="small">
                    Status
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={status ? status : " "}
                    label="Status"
                    onChange={onStatusChange}
                    size="small"
                    disabled={mode === "view" ? true : false}
                  >
                    <MenuItem value={1}>Active</MenuItem>
                    <MenuItem value={2}>Draft</MenuItem>
                    <MenuItem value={3}>Blocked</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </div>
            <Card sx={{ display: "flex", mt: 2, ml: 5, mr: "11%" }}>
              <Accordion
                expanded={true}
                sx={{ width: "97%", mt: 1, ml: 2, mr: 2 }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Item Unit Of Measure</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {itemUomFormData.map((itemUom, index) => (
                    <div
                      key={index}
                      style={{ display: "flex", marginRight: "10%" }}
                    >
                      <TextField
                        key={index}
                        label="Unit Of Measure"
                        id="outlined-basic"
                        sx={{ mt: 3, mr: 1, mb: 1, ml: 1, width: "50%" }}
                        variant="outlined"
                        size="small"
                        name="unit_of_measure_id"
                        value={itemUom.unit_of_measure_id}
                        onChange={(e) => handleItemUomFormChange(e, index)}
                        onKeyDown={(e) => onSaveItemUomData(e)}
                      />
                      <TextField
                        label="Quantity"
                        id="outlined-basic"
                        sx={{ mt: 3, mr: 1, mb: 1, ml: 1, width: "50%" }}
                        variant="outlined"
                        size="small"
                        name="quantity"
                        type="number"
                        value={itemUom.quantity}
                        onChange={(e) => handleItemUomFormChange(e, index)}
                        onKeyDown={(e) => onSaveItemUomData(e)}
                      />
                      <DeleteOutlineOutlined
                        key={index}
                        sx={{ mt: 4, size: "small" }}
                        onClick={() => onRemoveItemUomField(index)}
                      />
                    </div>
                  ))}
                  <div style={{ display: "flex" }}>
                    <Button
                      sx={{ mt: 3, ml: 3, mb: 2 }}
                      onClick={onAddItemUomFields}
                    >
                      Add
                    </Button>
                  </div>
                </AccordionDetails>
              </Accordion>
            </Card>
            <div style={{ display: "flex", marginRight: "10%" }}>
              <TextField
                label="Base Unit Of Measure"
                id="outlined-basic"
                sx={{ mt: 2.5, ml: 5, mr: 1, width: "100%" }}
                variant="outlined"
                size="small"
                disabled={mode === "view" ? true : false}
                name="base_uom"
                value={formData.base_uom}
                onChange={handleFormChange}
              />
            </div>
            <div style={{ display: "flex", marginRight: "10%" }}>
              <TextField
                label="Sales Unit Of Measure"
                id="outlined-basic"
                sx={{ mt: 2.5, ml: 5, mr: 1, width: "100%" }}
                variant="outlined"
                size="small"
                disabled={mode === "view" ? true : false}
                name="sales_uom"
                value={formData.sales_uom}
                onChange={handleFormChange}
              />
            </div>
            <div style={{ display: "flex", marginRight: "10%" }}>
              <TextField
                label="Purchase Unit Of Measure"
                id="outlined-basic"
                sx={{ mt: 2.5, ml: 5, mr: 1, width: "100%" }}
                variant="outlined"
                size="small"
                disabled={mode === "view" ? true : false}
                name="purchase_uom"
                value={formData.purchase_uom}
                onChange={handleFormChange}
              />
            </div>
            <div style={{ display: "flex", marginRight: "10%" }}>
              <Box sx={{ mt: 2.5, mr: 1, ml: 5, width: "50%" }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label" size="small">
                    Created By
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={created_by ? created_by.name : " "}
                    label="Created By"
                    onChange={onCreatedByChange}
                    size="small"
                    disabled={mode === "view" ? true : false}
                  >
                    {userData.map((user) => (
                      <MenuItem key={user.id} value={user.name}>
                        {user.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ mt: 1.5, ml: 1, mr: 1, width: "50%" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DateTimeField"]}>
                    <DemoItem>
                      <DateTimeField
                        label="Created At"
                        size="small"
                        disabled="false"
                        name="created_at"
                        value={dayjs(formData.created_at)}
                      />
                    </DemoItem>
                  </DemoContainer>
                </LocalizationProvider>
              </Box>
            </div>
            <div style={{ display: "flex", marginRight: "10%" }}>
              <Box sx={{ mt: 2.5, ml: 5, mr: 1, width: "50%" }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label" size="small">
                    Updated By
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={updated_by ? updated_by.name : " "}
                    label="Updated By"
                    onChange={onUpdatedByChange}
                    size="small"
                    disabled={mode === "view" ? true : false}
                  >
                    {userData.map((user) => (
                      <MenuItem key={user.id} value={user.name}>
                        {user.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ mt: 1.5, ml: 1, mr: 1, width: "50%" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DateTimeField"]}>
                    <DemoItem>
                      <DateTimeField
                        label="Updated At"
                        size="small"
                        disabled="false"
                        name="updated_at"
                        value={dayjs(formData.updated_at)}
                      />
                    </DemoItem>
                  </DemoContainer>
                </LocalizationProvider>
              </Box>
            </div>

            <div>
              <Button sx={{ mt: 3, ml: 5, mb: 2 }} onClick={onSubmit}>
                Submit
              </Button>
              <Button sx={{ mt: 3, ml: 3, mb: 2 }} onClick={onCancel}>
                Cancel
              </Button>
            </div>
          </Card>
        </Box>
      </Box>
    </div>
  );
}
