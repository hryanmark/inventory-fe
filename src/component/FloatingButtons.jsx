import { Box, Fab } from "@mui/material";


export default function FloatingButtons(){
    return (
        <Box
          sx={{
            position: "fixed",
            bottom: "2rem",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "1rem",
          }}
        >
          <Fab color="primary" aria-label="add">
            View
          </Fab>
          <Fab color="secondary" aria-label="edit">
            Edit
          </Fab>
          <Fab variant="extended">Delete</Fab>
        </Box>
    )
}