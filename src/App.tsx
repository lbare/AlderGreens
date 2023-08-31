import "./App.css";
import Home from "./routes/Home";
import Scorecard from "./routes/Scorecard";
import Players from "./routes/Players";
import MultipleTracking from "./routes/MultipleTracking";
import { Routes, Route } from "react-router-dom";
import Tracking from "./routes/Tracking";
import { useRef, useState, useEffect } from "react";

function App() {
  const containerRef = useRef(null);
  const [height, setHeight] = useState("100vh"); // default to full viewport height

  useEffect(() => {
    // Compute and set the actual visible height
    const resize = () => {
      if (containerRef.current) {
        setHeight(`${window.innerHeight}px`);
      }
    };

    // Set initial height
    resize();

    // Listen to resize events (e.g., when address bar hides or shows in mobile browsers)
    window.addEventListener("resize", resize);

    return () => {
      // Cleanup event listener
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex w-screen flex-col bg-green-500"
      style={{
        backgroundAttachment: "fixed",
        overflow: "hidden",
        height,
      }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/players" element={<Players />} />
        <Route path="/tracking" element={<Tracking />} />
        <Route path="/scorecard" element={<Scorecard />} />
        <Route path="/multipleTracking" element={<MultipleTracking />} />
      </Routes>
    </div>
  );
}

export default App;
