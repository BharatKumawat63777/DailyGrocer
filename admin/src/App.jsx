import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Add from "./pages/Add";
import { Routes, Route } from "react-router-dom";
import List from "./List/List";
import Orders from "./Orders/Orders";

const App = () => {
  return (
    <div>
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/add" element={<Add />} />
          <Route path="/list" element={<List />} />
          <Route path="/order" element={<Orders />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
