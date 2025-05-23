import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const PlaceOrder = () => {
  const { getTotalCartAmount, token, foodlist, cartItem, url } =
    useContext(StoreContext);
  const navigate = useNavigate();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    zipcode: "",
    country: "",
    phone: "",
    payment_type: "COD",
  });

  const onchangehandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    foodlist.map((item) => {
      if (cartItem[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItem[item._id];
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 20,
    };
    let response = await axios.post(url + "/api/order/place", orderData, {
      headers: { token },
    });
    
    if (response.data.success) {
      if (data.payment_type == "online") {
        const { session_url } = response.data;
        window.location.replace(session_url);
      }

      navigate("/myorders");
    } else {
      alert("Error");
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/cart");
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, [token]);
  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            name="firstName"
            onChange={onchangehandler}
            value={data.firstName}
            type="text"
            placeholder="First name"
            required
          />
          <input
            name="lastName"
            onChange={onchangehandler}
            value={data.lastName}
            type="text"
            placeholder="Last name"
          />
        </div>
        <input
          name="email"
          onChange={onchangehandler}
          value={data.email}
          type="email"
          placeholder="Email Address"
          required
        />

        <input
          name="street"
          onChange={onchangehandler}
          value={data.street}
          type="text"
          placeholder="Street"
          required
        />
        <div className="multi-fields">
          <input
            name="phone"
            onChange={onchangehandler}
            value={data.phone}
            type="tel"
            pattern="[0-9]{10}"
            placeholder="Phone No."
            required
          />
          <input
            name="city"
            onChange={onchangehandler}
            value={data.city}
            type="text"
            placeholder="City"
            required
          />
        </div>
        <div className="multi-fields">
          <input
            name="zipcode"
            onChange={onchangehandler}
            value={data.zipcode}
            type="text"
            placeholder="Zip code"
            required
          />
          <input
            name="country"
            onChange={onchangehandler}
            value={data.country}
            type="text"
            placeholder="Country"
            required
          />
        </div>
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>SubTotal</p>
              <p>{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee(&#8377;)</p>
              <p>{getTotalCartAmount() === 0 ? 0 : 20}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total(&#8377;)</b>
              <b>
                {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 20}
              </b>
            </div>
            <hr />
            <div className="payment">
              <button
                type="submit"
                onClick={() =>
                  onchangehandler({
                    target: { name: "payment_type", value: "online" },
                  })
                }
              >
                PROCEED TO PAYMENT
              </button>
              <button
                type="submit"
                className="cod-button"
                onClick={() =>
                  onchangehandler({
                    target: { name: "payment_type", value: "COD" },
                  })
                }
              >
                COD(Cashe on Delivery)
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
