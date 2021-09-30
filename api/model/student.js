const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  email: String,
  phone_number: Number,
  gender: String
});

module.exports = mongoose.model('Student', studentSchema);