import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import { DRAWER_WIDTH } from "../config.js";
import { useNavigate } from "react-router-dom";

export default function SideNavigationBar() {
  const history = useNavigate();
  const pageList = [
    "Item",
    "Item Unit Of Measure",
    "Brand",
    "Category",
    "Unit Of Measure",
    "Location",
    "Barcode",
    "User",
  ];

  const reDirect = (event, index) => {
    event.preventDefault();

    switch (index) {
      case 0:
        history("/item");
        break;
      case 1:
        history("/itemunitofmeasure");
        break;
      case 2:
        history("/brand");
        break;
      case 3:
        history("/category");
        break;
      case 4:
        history("/unitofmeasure");
        break;
      case 5:
        history("/location");
        break;
      case 6:
        history("/itembarcode");
        break;
      case 7:
        history("/user");
        break;
      default:
        history("NoPage");
        break;
    }
  };

  return (
    <Drawer
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: DRAWER_WIDTH,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />
      <Divider />
      <List textAlign="left">
        {pageList.map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={(event) => reDirect(event, index)}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Drawer>
  );
}
