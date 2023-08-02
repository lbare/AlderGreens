import "./App.css";
import Home from "./routes/Home";
import Scorecard from "./routes/Scorecard";
import Players from "./routes/Players";
import { Routes, Route } from "react-router-dom";
import Tracking from "./routes/Tracking";

function App() {
  return (
    <div
      className="flex h-screen w-screen max-w-2xl flex-col bg-green-500"
      style={{
        backgroundAttachment: "fixed",
        overflow: "hidden",
      }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/players" element={<Players />} />
        <Route path="/tracking" element={<Tracking />} />
        <Route path="/scorecard" element={<Scorecard />} />
      </Routes>
    </div>
  );
}

export default App;
