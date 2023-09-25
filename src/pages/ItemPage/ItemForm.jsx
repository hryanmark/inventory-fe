import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function ItemForm() {
  return (
    <div>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField id="outlined-basic" label="Code" variant="outlined" />
        <TextField id="outlined-basic" label="Description" variant="outlined" />
        <TextField id="outlined-basic" label="Code" variant="outlined" />
        <TextField id="outlined-basic" label="Description" variant="outlined" />
        <TextField id="outlined-basic" label="Code" variant="outlined" />
        <TextField id="outlined-basic" label="Description" variant="outlined" />
        <TextField id="outlined-basic" label="Code" variant="outlined" />
        <TextField id="outlined-basic" label="Description" variant="outlined" />
        <TextField id="outlined-basic" label="Code" variant="outlined" />
        <TextField id="outlined-basic" label="Description" variant="outlined" />
        <TextField id="outlined-basic" label="Code" variant="outlined" />
        <TextField id="outlined-basic" label="Description" variant="outlined" />
        <TextField id="outlined-basic" label="Code" variant="outlined" />
        <TextField id="outlined-basic" label="Description" variant="outlined" />
      </Box>
    </div>
  );
}
