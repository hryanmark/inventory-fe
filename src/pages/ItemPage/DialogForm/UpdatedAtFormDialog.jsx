import { Button, Card, FormControl, FormLabel, TextField } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { postData } from "../../../services/apiService";
import Textarea from "@mui/joy/Textarea";

export default function UpdatedAtFormDialog({ handleData, handleClose }) {
  const [formData, setFormData] = useState({
    // id: uuidv4, //auto generated
    code: "",
    description: "",
    address: "",
  });

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    if (formData.code.length !== 0) {
      postItem();
      return;
    }

    alert("Code can not be empty.");
  };

  const onCancel = () => {
    handleClose();
  };

  const postItem = async () => {
    try {
      const result = await postData("/location", formData);

      handleData(result);
      handleClose();
    } catch (error) {
      // Handle error, e.g., display an error message to the user
      console.error(error);
    } finally {
    }
  };

  return (
    <div>
      <Card
        sx={{
          marginTop: "5px",
          minHeight: "85%",
          position: "relative",
        }}
      >
        <div style={{ display: "flex" }}>
          <TextField
            label="Code"
            id="outlined-basic"
            sx={{ mt: 3, mr: 1, mb: 1, ml: 3, width: "25%" }}
            variant="outlined"
            size="small"
            name="code"
            value={formData.code}
            onChange={handleFormChange}
          />
          <TextField
            label="Description"
            id="outlined-basic"
            sx={{ mt: 3, mr: 1, mb: 1, ml: 1, width: "55%" }}
            variant="outlined"
            size="small"
            name="description"
            value={formData.description}
            onChange={handleFormChange}
          />
        </div>
        <div style={{ display: "flex" }}>
          <FormControl sx={{ width: "100%" }}>
            <FormLabel sx={{ mt: 1, mr: 1, mb: 1, ml: 3 }}>Address</FormLabel>
            <Textarea
              minRows={2}
              id="outlined-basic"
              sx={{ mr: 1, mb: 1, ml: 3, width: "83%", height: "50px" }}
              variant="outlined"
              size="small"
              name="address"
              value={formData.address}
              onChange={handleFormChange}
            />
          </FormControl>
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
    </div>
  );
}
