
import { FormControl } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function BrandForm() {
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
        <FormControl>
          <TextField type='text' id="outlined-basic" label="Code" variant="outlined" />
          <TextField type='text' id="outlined-basic" label="Description" variant="outlined" />
          <TextField type='text' id="outlined-basic" label="" variant="outlined" />
        </FormControl>
      </Box>
    </div>
  );
}
