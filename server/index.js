import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import User from "./models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const secret = process.env.REACT_APP_JWT_SECRET;

const port = process.env.PORT || 5000;
const app = express();

//Connects to mongoose
mongoose
  .connect(process.env.REACT_APP_MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log("Successfully connected to DB!"))
  .catch((err) => console.error(err));

//Middleware
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.use(cookieParser());
app.use(bodyParser.json({ extended: true }));

//Auth routes

//Log In
app.get("/api/user", (req, res) => {
  const tokenData = jwt.verify(req.cookies.auth_token, secret);
  User.findById(tokenData.id).then((userData) => {
    res.json(userData);
  });
});

//Sign Up
app.post("/api/signup", (req, res) => {
  const { username, email, password } = req.body;
  //hashes password before saving to collection
  const hashedPassword = bcrypt.hashSync(req.body.password, 10);
  const user = new User({ username, email, password: hashedPassword });
  //saves to collection
  user.save().then((userData) => {
    //create login token
    jwt.sign(
      { id: userData._id, username: userData.username, email: userData.email },
      secret,
      (err, token) => {
        if (err) {
          console.error(err);
          res.status(500);
        } else {
          res.cookie("auth_token", token).json({
            id: userData._id,
            username: userData.username,
            email: userData.email,
          });
        }
      }
    );
  });
});

app.listen(port, () => {
  console.log(`Running at http://localhost:${port} 🚀`);
});
