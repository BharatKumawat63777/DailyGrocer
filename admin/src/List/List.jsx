import React, { useState, useEffect } from "react";
import "./List.css";
import axios from "axios";

import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const List = () => {
  const url = useSelector((state) => state.url.url);

  const [list, setList] = useState([]);

  const fetchList = async () => {
    let toastId = toast.loading("Upload data...");
    const response = await axios.get(`${url}/api/food/list`);
    if (response.data.success) {
      setList(response.data.data);
      toast.update(toastId, {
        render: "Successfully!",
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });
    } else {
      toast.update(toastId, {
        render: "Error Upload time",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`, {
      _id: foodId,
    });
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("Error");
    }
  };
  useEffect(() => {
    fetchList();
  }, []);
  return (
    <div className="list add flex-col">
      <p>All Foods List</p>
      <div className="list-table list-table-format">
        <b>Image</b>
        <b>Name</b>
        <b>Category</b>
        <b>Price</b>
        <b>Action</b>
      </div>
      {list.map((item, index) => {
        return (
          <div key={index} className="list-table-format">
            <img src={item.image} alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{item.price}</p>
            <p onClick={() => removeFood(item._id)} className="cursor">
              X
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default List;
