import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Add from "./pages/Add";
import { Routes, Route } from "react-router-dom";
import List from "./List/List";
import Orders from "./Orders/Orders";
import { ToastContainer } from "react-toastify";

const App = () => {
  const url = "https://food-delivery-backend-4u6z.onrender.com";
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/add" element={<Add />} />
          <Route path="/list" element={<List />} />
          <Route path="/order" element={<Orders url={url}/>} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
