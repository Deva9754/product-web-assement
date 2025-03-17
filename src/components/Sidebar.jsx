// import { Outlet, Link, useLocation } from "react-router-dom";
// import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import InventoryIcon from "@mui/icons-material/Inventory";
// import CompareIcon from "@mui/icons-material/Compare";
// import { useState } from "react";

// function Layout() {
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const location = useLocation();

//   const menuItems = [
//     { text: "Product Details", icon: <InventoryIcon />, path: "/products" },
//     { text: "Compare Products", icon: <CompareIcon />, path: "/compare" }
//   ];

//   return (
//     <div className="app-container">
//       {/* Navbar */}
//       <AppBar position="fixed" sx={{ backgroundColor: "#1E293B" }}>
//         <Toolbar>
//           <IconButton edge="start" color="inherit" onClick={() => setDrawerOpen(true)}>
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" sx={{ flexGrow: 1 }}>
//             Product Management
//           </Typography>
//         </Toolbar>
//       </AppBar>

//       {/* Sidebar */}
//       <Drawer
//         anchor="left"
//         open={drawerOpen}
//         onClose={() => setDrawerOpen(false)}
//         sx={{
//           "& .MuiDrawer-paper": {
//             backgroundColor: "#0F172A",
//             color: "#F8FAFC",
//             width: "250px"
//           }
//         }}
//       >
//         <List>
//           {menuItems.map((item) => (
//             <ListItem
//               button
//               component={Link}
//               to={item.path}
//               key={item.text}
//               onClick={() => setDrawerOpen(false)}
//               sx={{
//                 backgroundColor: location.pathname === item.path ? "#1E293B" : "inherit",
//                 "&:hover": { backgroundColor: "#334155" }
//               }}
//             >
//               <ListItemIcon sx={{ color: "#F8FAFC" }}>{item.icon}</ListItemIcon>
//               <ListItemText primary={item.text} />
//             </ListItem>
//           ))}
//         </List>
//       </Drawer>

//       {/* Main Content */}
//       <div style={{ marginTop: "70px", padding: "20px" }}>
//         <Outlet />
//       </div>
//     </div>
//   );
// }

// export default Layout;
