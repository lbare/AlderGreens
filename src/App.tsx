import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./routes/Home";
import Scorecard from "./routes/Scorecard";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scorecard" element={<Scorecard />} />
      </Routes>
    </>
  );
}

export default App;
