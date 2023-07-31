import "./App.css";
import Home from "./routes/Home";
import Scorecard from "./routes/Scorecard";
import Players from "./routes/Players";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="flex h-screen w-screen flex-col bg-neutral-950">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/players" element={<Players />} />
        <Route path="/scorecard" element={<Scorecard />} />
      </Routes>
    </div>
  );
}

export default App;
