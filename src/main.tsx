import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { HashRouter as Router } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Router>
    <App />
  </Router>
);
