const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  email: String,
  phone_number: Number,
  gender: String,
  course_work: String
});

module.exports = mongoose.model('Faculty', facultySchema);