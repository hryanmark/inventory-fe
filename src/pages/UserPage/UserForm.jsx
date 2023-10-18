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
import { v4 as uuidv4 } from "uuid";
import { NEW_MODE, EDIT_MODE, VIEW_MODE } from "../../config";

export default function UserForm(props) {
  const history = useNavigate();
  const [mode, setMode] = useState("");
  const formName = "User Form";

  const [formData, setFormData] = useState({
    // id: uuidv4, //auto generated
    username: "",
    password: "",
    name: "",
    contact_no: "",
    email: "",
    status: "",
    role: "",
  });

  const loadData = () => {
    const userData = JSON.parse(localStorage.getItem("userData"));

    for (const user of userData) {
      const existingData = {
        id: user.id,
        username: user.username,
        password: user.password,
        name: user.name,
        contact_no: user.contact_no,
        email: user.email,
        status: user.status,
        role: user.role,
      };

      localStorage.removeItem("userData");
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
    history("/user");
  };

  const postItem = async () => {
    try {
      const result = await postData("/user", formData);

      alert("post created : " + result);
      history("/user");
    } catch (error) {
      // Handle error, e.g., display an error message to the user
      console.error(error);
    } finally {
    }
  };

  const putItem = async () => {
    try {
      const result = await postData("/user", formData);

      alert("put created : " + result);
      history("/user");
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

            <div style={{ display: "flex" }}>
              <TextField
                label="Name"
                id="outlined-basic"
                sx={{ mt: 3, mr: 1, mb: 1, ml: 3, width: "17%" }}
                variant="outlined"
                size="small"
                disabled={mode === "view" ? true : false}
                name="name"
                value={formData.name}
                onChange={handleFormChange}
              />
              <TextField
                label="E-mail"
                id="outlined-basic"
                sx={{ mt: 3, mr: 1, mb: 1, ml: 3, width: "23%" }}
                variant="outlined"
                size="small"
                disabled={mode === "view" ? true : false}
                name="email"
                value={formData.email}
                onChange={handleFormChange}
              />
              <TextField
                label="Contact No."
                id="outlined-basic"
                sx={{ mt: 3, mr: 1, mb: 1, ml: 1, width: "15%" }}
                variant="outlined"
                size="small"
                disabled={mode === "view" ? true : false}
                name="contact_no"
                value={formData.contact_no}
                onChange={handleFormChange}
              />
            </div>
            <div style={{ display: "flex" }}>
              <TextField
                label="User Name"
                id="outlined-basic"
                sx={{ mt: 3, mr: 1, mb: 1, ml: 3, width: "13%" }}
                variant="outlined"
                size="small"
                disabled={mode === "view" ? true : false}
                name="username"
                value={formData.username}
                onChange={handleFormChange}
              />
              <TextField
                label="Password"
                id="outlined-basic"
                type={"password"}
                sx={{ mt: 3, mr: 1, mb: 1, ml: 3, width: "13%" }}
                variant="outlined"
                size="small"
                disabled={mode === "view" ? true : false}
                name="password"
                value={formData.password}
                onChange={handleFormChange}
              />
              <TextField
                label="Status"
                id="outlined-basic"
                type={"number"}
                sx={{ mt: 3, mr: 1, mb: 1, ml: 1, width: "13%" }}
                variant="outlined"
                size="small"
                disabled={mode === "view" ? true : false}
                name="status"
                value={formData.status}
                onChange={handleFormChange}
              />
              <TextField
                label="Role"
                id="outlined-basic"
                sx={{ mt: 3, mr: 1, mb: 1, ml: 1, width: "15%" }}
                variant="outlined"
                size="small"
                disabled={mode === "view" ? true : false}
                name="role"
                value={formData.role}
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
