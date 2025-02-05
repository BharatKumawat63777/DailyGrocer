import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Add from "./pages/Add";
import { Routes, Route } from "react-router-dom";
import List from "./List/List";
import Orders from "./Orders/Orders";
import { ToastContainer } from "react-toastify";

const App = () => {
 
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Add />} />
          <Route path="/list" element={<List />} />
          <Route path="/order" element={<Orders />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
