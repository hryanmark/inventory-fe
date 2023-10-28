import { Box, Button, Typography } from "@mui/material";


export default function TableHeader({pageName, onAdd}) {
    return(
        <Box
          sx={{
            maxWidth: 300,
            minHeight: 50,
            bgcolor: "#ffffff",
            marginLeft: "-5px",
          }}
          className=""
        >
          <Typography sx={{ 
            fontSize: "15px", 
            marginLeft: "5px", 
            marginBottom: "15px",
            marginTop: "15px",
            }}>{pageName}</Typography>
          <Typography
            sx={{
              display: "flex",
              gap: "3%",
              marginTop: "2%",
              marginLeft: "2%",
              fontSize: "12px"
            }}
          >
            <div sx={{ padding: "20" }}>
              <Button
                variant="contained"
                size="small"
                maxWidth="100"
                color="success"
                style={{ textTransform: "none" }}
                onClick={onAdd}
              >
                Add
              </Button>
            </div>
            <div sx={{ padding: "20" }}>
              <Button
                variant="outlined"
                size="small"
                maxWidth="200"
                style={{ textTransform: "none" }}
              >
                Export
              </Button>
            </div>
            <div sx={{ padding: "20" }}>
              <Button
                variant="outlined"
                size="small"
                maxWidth="200"
                style={{ textTransform: "none" }}
              >
                Import
              </Button>
            </div>
          </Typography>
        </Box>
    );
}