const express = require("express");
const router = express.Router();
const Student = require("../model/student");
const mongoose = require("mongoose");
const checkAuth = require("../middleware/check-auth");

router.get("/", checkAuth, (req, res, next) => {
  Student.find()
    .then((result) => {
      res.status(200).json({
        studentData: result,
      });
    })
    .catch((err) => {
      console.log(err); // line not required
      res.status(500).json({
        error: err,
      });
    });
  // res.status(200).json({
  //   message: "this is student get request",
  // });
});

// Finding data by id
router.get("/:id", checkAuth, (req, res, next) => {
  Student.findById(req.params.id)
    .then((result) => {
      res.status(200).json({
        dataById: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

router.post("/", checkAuth, (req, res, next) => {
  const student = new Student({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    email: req.body.email,
    phone_number: req.body.phone_number,
    gender: req.body.gender,
  });

  student
    .save()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        newStudent: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
  // console.log(req.body);
  // console.log(req.body.email);

  // res.status(200).json({
  //   message: "post student route runned",
  // });
});

// delete data with DELETE request
router.delete("/:id", checkAuth, (req, res, next) => {
  Student.deleteOne({ _id: req.params.id })
    .then((result) => {
      res.status(200).json({
        message: "data with id " + req.params.id + " deleted",
        data: result, // shows delete count
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

// Update date with PUT request
router.put("/:id", checkAuth, (req, res, next) => {
  Student.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        name: req.body.name,
        email: req.body.email,
        phone_number: req.body.phone_number,
        gender: req.body.gender,
      },
    }
  )
    .then((result) => {
      res.status(200).json({
        updatedStudent: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
