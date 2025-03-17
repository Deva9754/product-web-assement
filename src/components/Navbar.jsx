import { AppBar, Toolbar, Typography, IconButton, Avatar, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = ({ toggleDrawer }) => {
  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#1E293B", padding: "0 16px" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Avatar src="https://via.placeholder.com/40" alt="Logo" sx={{ width: 40, height: 40 }} />
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Product Management
          </Typography>
        </Box>

        <Avatar
          src="https://randomuser.me/api/portraits/men/45.jpg"
          alt="User Profile"
          sx={{ width: 40, height: 40, cursor: "pointer", border: "2px solid #F8FAFC" }}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
