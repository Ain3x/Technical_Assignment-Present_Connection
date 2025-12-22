import { Routes, Route, Navigate } from "react-router-dom";
import DeskView from "./pages/DeskView";
import Profile from "./pages/Profile";
import { Box } from "@mui/material";
import Navbar from "./components/NavBar";

function App() {
  return (
    <>
      <Navbar />
      <Box p={2}>
        <Routes>
          <Route path="/" element={<Navigate to="/desk-view" />} />
          <Route path="/desk-view" element={<DeskView />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Box>
    </>
  );
}

export default App;
