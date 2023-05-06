const mongoose = require("mongoose");

const addMotorsSchema = new mongoose.Schema({
  citizen: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "citizen",
  },
  motorName:{
    type: String,
    required: true,
  },
  motorType: {
    type: String,
    required: true,
  },
  vehicleNo: {
    type: String,
    required: true,
  },
  regNo: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const addMotors = mongoose.model("addMotors", addMotorsSchema);

module.exports = addMotors;
