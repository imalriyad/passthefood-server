const express = require("express");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const app = express();
const port = process.env.PORT || 5000;
const connectDB = require("./config/db");
const donationRoute = require("./routes/donationRoute");
const userRoute = require("./routes/userRoute");

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

connectDB();

app.use("/api/v1/", donationRoute, userRoute);

app.get("/", (req, res) => {
  res.send({ message: "passthefood server running..." });
});

app.listen(port, () => {
  console.log("passthefood server running on port", port);
});

module.exports = app;
