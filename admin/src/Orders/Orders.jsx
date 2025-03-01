import React, { useEffect, useState } from "react";
import "./Orders.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { assets } from "../assets/admin_assets/assets";

import { setOrders } from "../redux/action";

const Orders = () => {
  const url = useSelector((state) => state.url.url);

  const orders = useSelector((state) => state.orders.orders);
  const dispatch = useDispatch();

  const AllorderList = async () => {
    const response = await axios.get(url + "/api/order/listorders");

    if (response.data.success) {
      dispatch(setOrders(response.data.data));
    } else {
      toast.error("Error");
    }
  };

  const statusHandler = async (event, orderId) => {
    const response = await axios.post(url + "/api/order/updatestatus", {
      orderId,
      status: event.target.value,
    });

    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("Error");
    }
  };

  useEffect(() => {
    toast.success("Wait few time...");
    AllorderList();
    toast.success("Successfully complete...");
    const interval = setInterval(() => {
      AllorderList(); // Auto-fetch every 10 seconds
    }, 3000); // 3,000ms = 3 sec

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="order add">
      <h3>Order Page</h3>

      <div className="order-list">
        {orders?.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_beg} alt="" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, idx) => {
                  if (idx === order.items.length - 1) {
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity + ", ";
                  }
                })}
              </p>
              <p className="order-item-name">
                <h4> Name :</h4>{" "}
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div className="order-item-address">
                <h4>Address :</h4> {order.address.street + " , "}
                <p>
                  {order.address.city +
                    " , " +
                    order.address.country +
                    " , " +
                    order.address.zipcode}
                </p>
              </div>
              <p className="order-item-phone">
                {"Phone No : " + order.address.phone}
              </p>
            </div>
            <p>Items :{order.items.length}</p>
            <p>
              Amount :&#8377;
              {order.amount}
            </p>
            <select
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}
            >
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
