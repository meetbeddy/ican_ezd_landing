import "./App.css";
import { Routes, Route } from "react-router-dom";
import Landing from "./landing/Index";
import Register from "./auth/Register";
import RegSuccess from "./auth/RegSuccess";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/reg-success" element={<RegSuccess />}></Route>
      </Routes>
    </div>
  );
}

export default App;
