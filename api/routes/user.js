const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// User sign up route
router.post("/signup", (req, res, next) => {
  // convert password to hash-code
  // bcrypt.hash(password, lengthOfHashCode, (err, hash) => {}
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return response.status(500).json({
        error: err,
      });
    }

    //bcrypt will run asynchronously, and if their is no error we will initialize the user data sent in an object
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      username: req.body.username,
      password: hash,
      phone: req.body.phone,
      email: req.body.email,
      userType: req.body.userType,
    });

    user
      .save()
      .then((result) => {
        res.status(200).json({
          new_user: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  });
});

router.post("/login", (req, res, next) => {
  User.find({ username: req.body.username })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "User not found",
        });
      }

      // comparing password
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (!result) {
          return res.status(401).json({
            message: "Password not matched",
          });
        }
        const token = jwt.sign(
          {
            username: user[0].username,
            userType: user[0].userType,
            phone: user[0].phone,
            email: user[0].email,
          },
          "this is secret key",
          {
            expiresIn: "24h",
          }
        );
        res.status(200).json({
          username: user[0].username,
          userType: user[0].userType,
          email: user[0].email,
          phone: user[0].phone,
          email: user[0].email,
          token: token,
        });
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
