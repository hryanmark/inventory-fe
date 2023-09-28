import { Box, Fab } from "@mui/material";


export default function FloatingButtons(props){
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
          <Fab color="primary" aria-label="add" onClick={props.view}>
            View
          </Fab>
          <Fab color="secondary" aria-label="edit" onClick={props.edit}>
            Edit
          </Fab>
          <Fab variant="extended" onClick={props.delete}>Delete</Fab>
        </Box>
    )
}