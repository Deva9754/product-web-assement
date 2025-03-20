
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Avatar, Box, InputBase, Badge, Menu, MenuItem, Divider, Tooltip } from "@mui/material";
import { styled, alpha } from '@mui/material/styles';
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MailIcon from "@mui/icons-material/Mail";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': { backgroundColor: alpha(theme.palette.common.white, 0.25) },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: { marginLeft: theme.spacing(3), width: 'auto' },
  transition: 'width 0.3s'
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: { width: '20ch', '&:focus': { width: '30ch' } }
  }
}));

const Navbar = ({ toggleDrawer }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const user = {
    name: "User", avatar: "", role: "Product Manager",
    notifications: 4, messages: 2
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#1E293B", padding: "0 16px" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <IconButton edge="start" color="inherit" onClick={toggleDrawer}><MenuIcon /></IconButton>
          <Avatar src="https://cdn-icons-png.freepik.com/256/10462/10462788.png?semt=ais_hybrid" alt="Logo" sx={{ width: 40, height: 40 }} />
          <Typography variant="h6" sx={{ fontWeight: "bold", display: { xs: 'none', sm: 'block' } }}>Product Management</Typography>
        </Box>

        <Search>
          <SearchIconWrapper><SearchIcon /></SearchIconWrapper>
          <StyledInputBase placeholder="Search products, tasks..." inputProps={{ 'aria-label': 'search' }} />
        </Search>

        <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Tooltip title="Notifications">
            <IconButton color="inherit">
              <Badge badgeContent={user.notifications} color="error"><NotificationsIcon /></Badge>
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Messages">
            <IconButton color="inherit">
              <Badge badgeContent={user.messages} color="primary"><MailIcon /></Badge>
            </IconButton>
          </Tooltip>

          <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer" }} onClick={(e) => setAnchorEl(e.currentTarget)}>
            <Avatar
              src={user.avatar}
              alt={user.name}
              sx={{ width: 40, height: 40, cursor: "pointer", border: "2px solid #F8FAFC", transition: "transform 0.2s", "&:hover": { transform: "scale(1.05)" } }}
            />
            <Typography variant="body2" sx={{ ml: 1, fontWeight: "medium", display: { xs: 'none', md: 'block' } }}>{user.name}</Typography>
          </Box>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={() => setAnchorEl(null)}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': { width: 32, height: 32, ml: -0.5, mr: 1 },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0
                }
              }
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <Box sx={{ px: 2, py: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Avatar src={user.avatar} alt={user.name} sx={{ width: 60, height: 60, mb: 1 }} />
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>{user.name}</Typography>
              <Typography variant="body2" color="text.secondary">{user.role}</Typography>
            </Box>
            
            <Divider />
            
            <MenuItem onClick={() => setAnchorEl(null)}><AccountCircleIcon sx={{ mr: 1 }} />My Profile</MenuItem>
            <MenuItem onClick={() => setAnchorEl(null)}><SettingsIcon sx={{ mr: 1 }} />Settings</MenuItem>
            
            <Divider />
            
            <MenuItem onClick={() => setAnchorEl(null)}><LogoutIcon sx={{ mr: 1 }} />Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;