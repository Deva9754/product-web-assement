import { Drawer, List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import InventoryIcon from "@mui/icons-material/Inventory";
import CompareIcon from "@mui/icons-material/Compare";

const Sidebar = ({ drawerOpen, toggleDrawer }) => {
  const location = useLocation();

  const menuItems = [
    { text: "Product Details", icon: <InventoryIcon />, path: "/products" },
    { text: "Compare Products", icon: <CompareIcon />, path: "/compare" }
  ];

  return (
    <Drawer
      anchor="left"
      open={drawerOpen}
      onClose={toggleDrawer}
      sx={{
        "& .MuiDrawer-paper": {
          backgroundColor: "#0F172A",
          color: "#F8FAFC",
          width: "250px"
        }
      }}
    >
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            component={Link}
            to={item.path}
            key={item.text}
            onClick={toggleDrawer}
            sx={{
              backgroundColor: location.pathname === item.path ? "#1E293B" : "inherit",
              "&:hover": { backgroundColor: "#334155" }
            }}
          >
            <ListItemIcon sx={{ color: "#F8FAFC" }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
