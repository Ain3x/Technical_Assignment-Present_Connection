import { Routes, Route, Navigate } from "react-router-dom";
import DeskView from "./pages/DeskView";
import Profile from "./pages/Profile";

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/desk-view" />} />
        <Route path="/desk-view" element={<DeskView />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  )
}

export default App
