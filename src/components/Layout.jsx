import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div className="app-container">
      <Navbar toggleDrawer={toggleDrawer} />
      <Sidebar drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />
      <div style={{ marginTop: "80px", padding: "20px" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
