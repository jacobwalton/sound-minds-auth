const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const port = process.env.PORT || 5000;
const app = express();

//Middleware
app.use(cookieParser());
app.use(bodyParser.json({ extended: true }));

//Auth routes
app.post("/api/register", (req, res) => {
  const { username, email, password } = req.body;
});

//Connects to mongoose
mongoose
  .connect(process.env.REACT_APP_MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log("Successfully connected to DB!"))
  .catch((err) => console.error(err));

app.listen(port, () => {
  console.log(`Running at http://localhost:${port} 🚀`);
});
