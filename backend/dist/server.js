"use strict";

var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _db = require("./config/db.js");
var _foodRoutes = _interopRequireDefault(require("./routes/foodRoutes.js"));
var _userRoutes = _interopRequireDefault(require("./routes/userRoutes.js"));
var _cartRoutes = _interopRequireDefault(require("./routes/cartRoutes.js"));
require("dotenv/config");
var _orderRoutes = _interopRequireDefault(require("./routes/orderRoutes.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
//.env file excess in server side

// app config
var app = (0, _express["default"])();
var port = process.env.PORT || 4000;

// middleware
app.use(_express["default"].json());
app.use((0, _cors["default"])());

// db connections
(0, _db.connectDB)();

// api endpoints
app.use("/api/food", _foodRoutes["default"]);
app.use("/images", _express["default"]["static"]("uploads"));
app.use("/api/user", _userRoutes["default"]);
app.use("/api/cart", _cartRoutes["default"]);
app.use("/api/order", _orderRoutes["default"]);
app.get("/", function (req, res) {
  res.send("API Working");
});
app.listen(port, function () {
  console.log("Server started on http://localhost:".concat(port));
});