import "./App.css";
import { Routes, Route } from "react-router-dom";
import Landing from "./landing/Index";
import Register from "./auth/Register";
import RegSuccess from "./auth/RegSuccess";
import AboutPage from "./landing/pages/AboutPage";
import PageNotFound from "./landing/pages/404Page";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/" element={<Landing />}></Route>
        <Route path="/about" element={<AboutPage />} />
        <Route path="/register" element={<Register />}></Route>
        <Route path="/reg-success" element={<RegSuccess />}></Route>
      </Routes>
    </div>
  );
}

export default App;
