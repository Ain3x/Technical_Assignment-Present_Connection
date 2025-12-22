import { AppBar, Toolbar, Button, Box, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Desk Booking
        </Typography>

        <Box>
          <Button
            color="inherit"
            component={RouterLink}
            to="/desk-view"
          >
            Desks
          </Button>

          <Button
            color="inherit"
            component={RouterLink}
            to="/profile"
          >
            Profile
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
