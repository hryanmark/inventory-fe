import { Box, Breadcrumbs, CssBaseline, Toolbar } from "@mui/material";
import Header from "./Header";
import SideNavigationBar from "./SideNavigationBar";
import TableHeader from "./TableHeader";
import TableData from "./TableData";
import FloatingButtons from "./FloatingButtons";

export default function PageBody() {
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

        <Breadcrumbs />
        <TableHeader pageName={pageName} onAdd={onAdd} />

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
