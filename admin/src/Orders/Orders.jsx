import React, { useEffect, useState } from "react";
import "./Orders.css";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/admin_assets/assets";
const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const AllorderList = async () => {
    const response = await axios.get(url + "/api/order/listorders");
    if (response.data.success) {
      setOrders(response.data.data);
      console.log("Orderlist: ", response.data.data);
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
    AllorderList();
  }, []);

  return (
    <div className="order add">
      <h3>Order Page</h3>

      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="" />
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
                Name : {order.address.firstName + " " + order.address.lastName}
              </p>
              <div className="order-item-address">
                <p>
                  <h4>Address :</h4> {order.address.street + " , "}
                </p>
                <p>
                  {order.address.city +
                    " , " +
                    order.address.state +
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
