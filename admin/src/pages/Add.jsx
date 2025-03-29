import React, { useEffect, useState } from "react";
import "./Add.css";
import { assets } from "../assets/admin_assets/assets";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Add = () => {
  const url = useSelector((state) => state.url.url);

  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Rice",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);

    let toastId = toast.loading("Fetching data...");
    const response = await axios.post(`${url}/api/food/add`, formData);

    if (response.data.success) {
      setData({
        name: "",
        description: "",
        price: "",
        category: "Salad",
      });
      setImage(false);
      toast.update(toastId, {
        render: "Data fetched successfully!",
        type: "success",
        isLoading: false,
        autoClose: 1000,
      });
    } else {
      toast.update(toastId, {
        render: "Error!",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            name="image"
            id="image"
            hidden
            required
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type here"
          />
        </div>
        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows="6"
            placeholder="Writer content here"
          ></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product categroy</p>
            <select onChange={onChangeHandler} name="category">
              <option value="Rice">Rice</option>
              <option value="Dals & Puless">Dals & Puless</option>
              <option value="Oils and Ghee">Oils and Ghee</option>
              <option value="Dry Fruits">Dry Fruits</option>
              <option value="Tea leaf">Tea leaf</option>
              <option value="Sugar">Sugar</option>
              <option value="Biscuits">Biscuits</option>
              <option value="Cold Drink">Cold Drink</option>
              <option value="Other Item">Other Item</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product price(&#x20b9;)</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="Number"
              name="price"
              placeholder="20"
            />
          </div>
        </div>
        <button type="submit" className="add-btn">
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;
