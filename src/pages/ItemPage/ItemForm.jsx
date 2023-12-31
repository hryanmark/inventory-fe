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
  const [formError, setFormError] = useState({});
  const [openBrandDialog, setOpenBrandDialog] = useState(false);
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);

  const [brand, setBrand] = useState(null);
  const [category, setCategory] = useState(null);
  const [status, setStatus] = useState("");
  const [createdBy, setCreatedBy] = useState(null);
  const [updated_by, setUpdatedBy] = useState(null);
  const [unitOfMeasure, setUnitOfMeasure] = useState([]); //array of object

  const [brand_data, setBrandData] = useState([]);
  const [category_data, setCategoryData] = useState([]);
  const [unit_of_measure_data, setUnitOfMeasureData] = useState([]);
  const [userData, setUserData] = useState([]); //Used for updated_by and created_by

  const [formData, setFormData] = useState({
    // id: 0, //updated via tmp_item_id
    brandId: "",
    categoryId: "",
    title: " ", //item name
    description: " ",
    sku: "IT-5",
    baseUom: " ",
    salesUom: " ",
    purchaseUom: " ",
    unitCost: "0",
    minimumStockLevel: "0",
    maximumStockLevel: "0",
    status: "",
    createdBy: "",
    updated_by: "",
    created_at: format(new Date(), dateTimeFormat),
    updated_at: format(new Date(), dateTimeFormat),
  });

  const [itemUomFormData, setItemUomFormData] = useState([
    {
      // id: "", //auto generated
      item_id: "1", //use tmp item id
      unit_of_measure_id: "",
      quantity: "0",
    },
  ]);

  const loadData = (mode) => {
    const itemData = JSON.parse(localStorage.getItem("itemData"));

    for (const item of itemData) {
      fetchBrandById(item.brandId);
      fetchCategoryById(item.categoryId);
      fetchUserCreatedByById(item.createdBy);
      fetchUserUpdatedByById(item.updated_by);

      const existingData = {
        id: item.id, //auto generated
        brandId: item.brandId,
        categoryId: item.categoryId,
        title: item.title, //item name
        description: item.description,
        sku: item.sku,
        baseUom: item.baseUom,
        salesUom: item.salesUom,
        purchaseUom: item.purchaseUom,
        unitCost: item.unitCost,
        minimumStockLevel: item.minimumStockLevel,
        maximumStockLevel: item.maximumStockLevel,
        status: item.status,
        createdBy: item.createdBy,
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
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleItemUomFormChange = (e, i) => {
    const { name, value } = e.target;
    const onchangevalue = [...itemUomFormData];
    onchangevalue[i][name] = value;
    setItemUomFormData(onchangevalue); // same purpose different approach (check handleFormChange)
  };

  const onAddItemUomFields = () => {
    //used for item_id field
    const tmpItemId = localStorage.getItem("tmpItemId");

    //Can't add new field if field UOM or quantiy is empty or zero
    const hasZeroQuantity = itemUomFormData.some(
      (item) => item.unit_of_measure_id === "" || item.quantity === "0"
    );

    if (!hasZeroQuantity) {
      setItemUomFormData([
        ...itemUomFormData,
        { item_id: tmpItemId, unit_of_measure_id: "", quantity: "0" },
      ]);
    } else {
      alert("Unit of Measure and Quantity must not be empty or equal to 0."); //use component for this.
    }
  };

  const onRemoveItemUomField = (index) => {
    const deleteRow = [...itemUomFormData];
    deleteRow.splice(index, 1);
    setItemUomFormData(deleteRow);
  };

  const onSubmit = async () => {
    //Reset state
    setFormError({});

    if (mode === NEW_MODE) {
      const newErrors = {};

      if (formData.title === " " || formData.title === "") {
        newErrors.title = true;
      }
      if (brand === null) {
        newErrors.brand = true;
      }
      if (category === null) {
        newErrors.category = true;
      }
      if (
        formData.unitCost === "0" ||
        formData.unitCost === " " ||
        formData.unitCost === ""
      ) {
        newErrors.unitCost = true;
      }
      if (
        formData.minimumStockLevel === "0" ||
        formData.minimumStockLevel === " " ||
        formData.minimumStockLevel === ""
      ) {
        newErrors.minimumStockLevel = true;
      }
      if (
        formData.maximumStockLevel === "0" ||
        formData.maximumStockLevel === " " ||
        formData.maximumStockLevel === ""
      ) {
        newErrors.maximumStockLevel = true;
      }
      if (
        formData.status === "0" ||
        formData.status === " " ||
        formData.status === ""
      ) {
        newErrors.status = true;
      }
      if (
        formData.createdBy === "0" ||
        formData.createdBy === " " ||
        formData.createdBy === ""
      ) {
        newErrors.createdBy = true;
      }
      if (
        formData.updated_by === "0" ||
        formData.updated_by === " " ||
        formData.updated_by === ""
      ) {
        newErrors.updated_by = true;
      }
      if (Object.keys(newErrors).length > 0) {
        setFormError(newErrors);
        alert("Required field must not be empty.");
        return;
      }

      postItem();
      postItemUom();
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

      setFormData({ ...formData, brandId: brandId });
    }
  };

  const handleBrandDialogData = (data) => {
    setBrandData((prevData) => [...prevData, data]);
    setBrand(data);
  };

  const onBrandDialogClose = () => {
    setOpenBrandDialog(false);
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
      setFormData({ ...formData, categoryId: categoryId });
    }
  };

  const handleCategoryDialogData = (data) => {
    setCategoryData((prevData) => [...prevData, data]);
    setCategory(data);
  };

  const onCategoryDialogClose = () => {
    setOpenCategoryDialog(false);
  };

  const onUnitOfMeasureChange = (e, index) => {
    const selectedValue = e.target.value;

    if (selectedValue === "#new") {
      // setOpenBrandDialog(true);
    } else {
      const selectedUomObject = unit_of_measure_data.find(
        (uom) => uom.code === selectedValue //check if uom code is equivalent to selectedValue code
      );
      const uomId = selectedUomObject.id;

      const onchangeUomValue = [...unitOfMeasure];
      onchangeUomValue[index] = selectedUomObject;

      setUnitOfMeasure(onchangeUomValue); // pause sa ko. BASTA I think need ni array para per
      //index ang mapping

      const updatedItemUomFormData = [...itemUomFormData];
      updatedItemUomFormData[index][e.target.name] = uomId;

      setItemUomFormData(updatedItemUomFormData);
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
      setFormData({ ...formData, createdBy: userId });
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
  //List of brands used for Select component
  const fetchBrand = async () => {
    try {
      const result = await getData(BRAND_ENDPOINT);

      setBrandData(result);
    } catch (error) {
      console.error(error);
    }
  };
  //specific brand used for retrieving brand such as edit and view mode
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

  const fetchUnitOfMeasures = async () => {
    try {
      const result = await getData("/unit_of_measure");

      setUnitOfMeasureData(result);
    } catch (error) {
      console.error(error);
    }
  };

  const postItem = async () => {
    try {
      const result = await postData(ITEM_ENDPOINT, formData);

      alert("post created for item : " + result);
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

  const postItemUom = async () => {
    try {
      for (let i = 0; itemUomFormData.length > i; i++) {
        const result = await postData(
          "item_unit_of_measure",
          itemUomFormData[i]
        );

        console.log("post created for Item Uom : " + result);
      }
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
      const updatedUom = [...itemUomFormData];
      updatedUom[0]["item_id"] = tmpItemId; //updated initialized item_id value since this is an array of objects

      setFormData({ ...formData, id: tmpItemId });
      setItemUomFormData(updatedUom);
    } else if (mode === VIEW_MODE) {
      console.log("form is view mode");
      setFormData(loadData(props.mode));
    } else if (mode === EDIT_MODE) {
      console.log("form is edit mode");
      setFormData(loadData(props.mode));
    }

    //Put all these in new and edit mode
    fetchBrand();

    fetchCategory();

    fetchUsers();

    fetchUnitOfMeasures();
    // eslint-disable-next-line
  }, [mode]);

  useEffect(() => {
    //update brand_data after adding new 'brand'
    if (brand) {
      const brandObject = brand_data.find((brnd) => brnd.code === brand.code);
      if (brandObject) {
        setFormData({ ...formData, brandId: brandObject.id });
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
        setFormData({ ...formData, categoryId: categoryObject.id });
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
                error={formError.title}
                required
                label="Item Name"
                id="outlined-basic"
                sx={{ mt: 3, mr: 1, ml: 5, width: "40%" }}
                variant="outlined"
                size="small"
                name="title"
                value={formData.title}
                onChange={handleFormChange}
                disabled={mode === "view" ? true : false}
              />
              <Box sx={{ mt: 3, width: "30%" }}>
                <FormControl error={formError.brand} required fullWidth>
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
                <FormControl error={formError.category} required fullWidth>
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
                error={formError.description}
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
                disabled={mode === "view" ? true : false}
              />
            </div>
            <div style={{ display: "flex", marginRight: "10%" }}>
              <TextField
                error={formError.unitCost}
                required
                label="Unit Cost"
                id="outlined-basic"
                type="number"
                sx={{ mt: 2.5, mr: 1, ml: 5, width: "25%" }}
                variant="outlined"
                size="small"
                disabled={mode === "view" ? true : false}
                name="unitCost"
                value={formData.unitCost}
                onChange={handleFormChange}
              />
              <TextField
                error={formError.minimumStockLevel}
                required
                label="Minimum Stock"
                id="outlined-basic"
                type="number"
                sx={{ mt: 2.5, mr: 1, ml: 1, width: "25%" }}
                variant="outlined"
                size="small"
                disabled={mode === "view" ? true : false}
                name="minimumStockLevel"
                value={formData.minimumStockLevel}
                onChange={handleFormChange}
              />
              <TextField
                error={formError.maximumStockLevel}
                required
                label="Maximum Stock"
                id="outlined-basic"
                type="number"
                sx={{ mt: 2.5, mr: 1, ml: 1, width: "25%" }}
                variant="outlined"
                size="small"
                disabled={mode === "view" ? true : false}
                name="maximumStockLevel"
                value={formData.maximumStockLevel}
                onChange={handleFormChange}
              />
              <Box sx={{ mt: 2.5, mr: 1, ml: 1, width: "25%" }}>
                <FormControl error={formError.status} required fullWidth>
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
                      <Box sx={{ mt: 2, mr: 1, ml: 1, width: "50%" }}>
                        <FormControl error={formError.tmp} required fullWidth>
                          <InputLabel
                            id="demo-simple-select-label"
                            size="small"
                          >
                            Unit Of Measure
                          </InputLabel>
                          <Select
                            key={index}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            size="small"
                            name="unit_of_measure_id"
                            value={
                              unitOfMeasure[index]
                                ? unitOfMeasure[index].code
                                : " "
                            } //object
                            label="Unit Of Measure"
                            onChange={(e) => onUnitOfMeasureChange(e, index)}
                            disabled={mode === "view" ? true : false}
                          >
                            <MenuItem value="#new">Create New</MenuItem>
                            {unit_of_measure_data.map((uom) => (
                              <MenuItem key={uom.id} value={uom.code}>
                                {uom.code}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Box>
                      <TextField
                        key={index}
                        error={formError.tmp}
                        required
                        label="Quantity"
                        id="outlined-basic"
                        sx={{ mt: 2, mr: 1, ml: 1, width: "50%" }}
                        variant="outlined"
                        size="small"
                        name="quantity"
                        type="number"
                        value={itemUom.quantity}
                        onChange={(e) => handleItemUomFormChange(e, index)}
                        disabled={mode === "view" ? true : false}
                      />
                      {/* made it like this since there is no disabled prop in DeleteOutlineOutlined*/}
                      {mode === "view" ? (
                        <></>
                      ) : (
                        <DeleteOutlineOutlined
                          key={index}
                          sx={{ mt: 4, size: "small" }}
                          onClick={() => onRemoveItemUomField(index)}
                        />
                      )}
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
                error={formError.tmp}
                label="Base Unit Of Measure"
                id="outlined-basic"
                sx={{ mt: 2.5, ml: 5, mr: 1, width: "100%" }}
                variant="outlined"
                size="small"
                disabled={mode === "view" ? true : false}
                name="baseUom"
                value={formData.baseUom}
                onChange={handleFormChange}
              />
            </div>
            <div style={{ display: "flex", marginRight: "10%" }}>
              <TextField
                error={formError.tmp}
                label="Sales Unit Of Measure"
                id="outlined-basic"
                sx={{ mt: 2.5, ml: 5, mr: 1, width: "100%" }}
                variant="outlined"
                size="small"
                disabled={mode === "view" ? true : false}
                name="salesUom"
                value={formData.salesUom}
                onChange={handleFormChange}
              />
            </div>
            <div style={{ display: "flex", marginRight: "10%" }}>
              <TextField
                error={formError.tmp}
                label="Purchase Unit Of Measure"
                id="outlined-basic"
                sx={{ mt: 2.5, ml: 5, mr: 1, width: "100%" }}
                variant="outlined"
                size="small"
                disabled={mode === "view" ? true : false}
                name="purchaseUom"
                value={formData.purchaseUom}
                onChange={handleFormChange}
              />
            </div>
            <div style={{ display: "flex", marginRight: "10%" }}>
              <Box sx={{ mt: 2.5, mr: 1, ml: 5, width: "50%" }}>
                <FormControl error={formError.createdBy} required fullWidth>
                  <InputLabel id="demo-simple-select-label" size="small">
                    Created By
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={createdBy ? createdBy.name : " "}
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
                        error={formError.tmp}
                        required
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
                <FormControl error={formError.updated_by} required fullWidth>
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
                        error={formError.tmp}
                        required
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
