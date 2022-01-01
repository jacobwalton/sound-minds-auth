import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import User from "./models/user.js";
import Favorite from "./models/favorite.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const secret = process.env.REACT_APP_JWT_SECRET;

//TODO: BEFORE DEPLOYING, remove line below and replace with "const port = process.env.PORT || 5000;"
const PORT = 5000;
const app = express();

//Connects to db
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

//Auth routes----
//Log In
app.get("/api/user", (req, res) => {
  const tokenData = jwt.verify(
    req.cookies.auth_token ? req.cookies.auth_token : "",
    secret
  );
  User.findById(tokenData.id).then((userData) => {
    res.json({
      id: userData._id,
      email: userData.email,
      username: userData.username,
    });
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

//Log in
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username }).then((userData) => {
    //comparing password and hashed password
    if (!userData) {
      return res.json({ message: "Login unsuccessful" }).send();
    }
    const passwordMatch = bcrypt.compareSync(password, userData.password);
    if (passwordMatch) {
      jwt.sign({ id: userData._id, username }, secret, (err, token) => {
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
      });
      //if password doesn't match
    } else {
      res.sendStatus(401);
    }
  });
});

app.post("/api/logout", (req, res) => {
  //clears cookie/token
  res.cookie("auth_token", "").send();
  window.location = "/";
});

//Favorite Routes -------------
app.post("/api/favoriteCount", (req, res) => {
  //Find info from Favorite Collection by trackId
  Favorite.find({ "trackId": req.body.trackId }).exec((err, favorite) => {
    if (err) {
      return res.status(400).send(err);
    }
    res.status(200).json({ success: true, favoriteCount: favorite.length });
  });
});

app.post("/api/favorited", (req, res) => {
  //Find info from Favorite Collection by trackId & user (favoritedBy)
  Favorite.find({ "trackId": req.body.trackId, "favoritedBy": req.body.favoritedBy }).exec((err, favorite) => {
    if (err) {
       return res.status(400).send(err);
    } 
    let alreadyFavorited = false;
    if(favorite.length !== 0 ){
      alreadyFavorited = true;
    }
    res.status(200).json({success:true, favorited:alreadyFavorited})
  });
});



app.listen(PORT, () => {
  console.log(`Running at http://localhost:${PORT} 🚀`);
});
