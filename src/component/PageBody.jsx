import { Alert, Box, CssBaseline, Snackbar, Toolbar } from "@mui/material";
import Header from "./Header";
import SideNavigationBar from "./SideNavigationBar";
import TableHeader from "./TableHeader";
import TableData from "./TableData";
import FloatingButtons from "./FloatingButtons";
import BreadCrumbs from "./BreadCrumbs";

export default function PageBody({
  pageName,
  onAdd,
  onView,
  onEdit,
  onDelete,
  handleSelectionModelChange,
  data,
  columns,
  message,
  openAlert,
  handleAlertClose,
}) {
  return (
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
        }}
      >
        <Toolbar />

        <BreadCrumbs />
        <TableHeader pageName={pageName} onAdd={onAdd} />

        <Snackbar
          open={openAlert}
          autoHideDuration={6000}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          onClose={handleAlertClose}
        >
          <Alert
            onClose={handleAlertClose}
            severity="info"
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>

        <TableData
          handleSelectionModelChange={handleSelectionModelChange}
          data={data}
          columns={columns}
        />
        <FloatingButtons view={onView} edit={onEdit} delete={onDelete} />
      </Box>
    </Box>
  );
}
