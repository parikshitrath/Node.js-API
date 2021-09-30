const express = require("express");
const router = express.Router();
const Faculty = require("../model/faculty");
const mongoose = require("mongoose");
const checkAuth = require("../middleware/check-auth");

router.get("/", checkAuth, (req, res, next) => {
  Faculty.find()
    .then((result) => {
      res.status(200).json({
        facultyData: result,
      });
    })
    .catch((err) => {
      console.log(err); // line not required
      res.status(500).json({
        error: err,
      });
    });
  // res.status(200).json({
  //   message: "get faculty route runned",
  // });
});

// Finding data by id
router.get("/:id", checkAuth, (req, res, next) => {
  Faculty.findById(req.params.id)
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
  const faculty = new Faculty({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    email: req.body.email,
    phone_number: req.body.phone_number,
    gender: req.body.gender,
    course_work: req.body.course_work,
  });

  faculty
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
  // res.status(200).json({
  //   message: "post faculty route runned",
  // });
});

// delete data with given id
router.delete("/:id", checkAuth, (req, res, next) => {
  Faculty.deleteOne({ _id: req.params.id })
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
  Faculty.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        name: req.body.name,
        email: req.body.email,
        phone_number: req.body.phone_number,
        gender: req.body.gender,
        course_work: req.body.course_work,
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
