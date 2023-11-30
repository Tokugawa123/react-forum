import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Nav from "./components/Nav";
import Register from "./components/Register";
import Replies from "./components/Replies";

import { Route, Routes, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/replies" element={<Replies />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
