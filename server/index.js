import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import User from "./models/user.js";
import path from "path";
const __dirname = path.resolve();

import Comment from "./models/comment.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const secret = process.env.REACT_APP_JWT_SECRET;

const PORT = process.env.PORT || 5000;
const app = express();

//Connects to db
mongoose
  .connect(process.env.REACT_APP_MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log("Successfully connected to DB!"))
  .catch((err) => console.error(err));

//Middleware
let origin;
app.use(function (req, res, next) {
  origin = req.header("origin");
});
app.use(
  cors({
    credentials: true,
    "Access-Control-Allow-Origin": origin,
  })
);

app.use(cookieParser());
app.use(bodyParser.json({ extended: true }));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

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
      favorites: userData.favorites,
    });
  });
});

//Sign Up
app.post("/api/signup", (req, res) => {
  const { username, email, password } = req.body;
  //hashes password before saving to collection
  const hashedPassword = bcrypt.hashSync(req.body.password, 10);
  const user = new User({
    username,
    email,
    password: hashedPassword,
  });
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
          //Save user info and token to cookies for session
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
          res.cookie("_id", userData._id);
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
//Add favorite
app.post("/api/addFavorite", (req, res) => {
  User.findOne({ username: req.body.favoritedBy }).exec((err, doc) => {
    //Prevent duplicates
    for (let i = 0; i < doc.favorites.length; i++) {
      if (doc.favorites[i].trackId == req.body.trackId) {
        console.log("Song already added to favorites");
        return res
          .status(200)
          .json({ message: "Song already added to favorites" });
      }
    }

    //Pushes data to collection
    doc.favorites.push({
      trackId: Number(req.body.trackId),
      trackTitle: String(req.body.trackTitle),
      trackArtist: String(req.body.trackArtist),
      trackCover: String(req.body.trackCover),
    });
    doc.save((err) => {
      if (err) {
        console.error("Failed to add song to favorites", err);
      } else {
        console.log(`Succefully added song to favorites`);
      }
    });
  });
});

//Remove favorite
app.post("/api/removeFavorite", (req, res) => {
  User.findOne({ username: req.body.favoritedBy }).exec((err, doc) => {
    let arr = doc.favorites;

    for (let i = 0; i < arr.length; i++) {
      if (arr[i].trackId == req.body.trackId) {
        console.log(doc.favorites);
        doc.favorites.splice(i, 1);
        doc.save();
        return res.status(200).json({ message: "Song removed favorites" });
      }
    }
  });
});

// COMMENT ROUTES
//Get all comments for a track
app.get("/api/getComments", (req, res) => {});

// Add comment
app.post("/api/addComment", (req, res) => {
  console.log("ROUTE HIT!");
  console.log(req.body);
  const comment = new Comment(req.body);

  comment.save((err, comment) => {
    if (err) {
      return res.json({ success: false, err });
    } else {
      return res.json({ success: true });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Running at http://localhost:${PORT} 🚀`);
});
