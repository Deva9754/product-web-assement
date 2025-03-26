// import { CircularProgress, Box } from "@mui/material";

// const Loader = () => (
//   <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
//     <CircularProgress color="primary" size={60} />
//   </Box>
// );


import { CircularProgress, Box, Fade } from "@mui/material";

const Loader = ({ loading = true }) => (
  <Fade in={loading} timeout={300}>
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      position="fixed"
      top={0}
      left={0}
      width="100%"
      height="100vh"
      bgcolor="rgba(0, 0, 0, 0.5)"
      zIndex={9999}
      sx={{ backdropFilter: "blur(5px)" }}
    >
      <CircularProgress color="primary" size={60} />
    </Box>
  </Fade>
);

export default Loader;
