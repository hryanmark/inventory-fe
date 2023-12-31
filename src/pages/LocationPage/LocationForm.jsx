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

export default function LocationForm(props) {
  const history = useNavigate();
  const [mode, setMode] = useState("");
  const formName = "Location Form";

  const [formData, setFormData] = useState({
    // id: uuidv4, //auto generated
    code: "",
    description: "",
    address: "",
  });

  const loadData = () => {
    const locationData = JSON.parse(localStorage.getItem("locationData"));

    for (const location of locationData) {
      const existingData = {
        id: location.id,
        code: location.code,
        description: location.description,
        address: location.address,
      };

      localStorage.removeItem("locationData");
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
    history("/location");
  };

  const postItem = async () => {
    try {
      const result = await postData("/location", formData);

      alert("post created : " + result);
      history("/location");
    } catch (error) {
      // Handle error, e.g., display an error message to the user
      console.error(error);
    } finally {
    }
  };

  const putItem = async () => {
    try {
      const result = await postData("/location", formData);

      alert("put created : " + result);
      history("/location");
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
                sx={{ mt: 3, mr: 1, mb: 1, ml: 3, width: "10%" }}
                variant="outlined"
                size="small"
                disabled={mode === "view" ? true : false}
                name="code"
                value={formData.code}
                onChange={handleFormChange}
              />
              <TextField
                label="Description"
                id="outlined-basic"
                sx={{ mt: 3, mr: 1, mb: 1, ml: 3, width: "25%" }}
                variant="outlined"
                size="small"
                disabled={mode === "view" ? true : false}
                name="description"
                value={formData.description}
                onChange={handleFormChange}
              />
              <TextField
                label="Address"
                id="outlined-basic"
                sx={{ mt: 3, mr: 1, mb: 1, ml: 1, width: "30%" }}
                variant="outlined"
                size="small"
                disabled={mode === "view" ? true : false}
                name="address"
                value={formData.address}
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
