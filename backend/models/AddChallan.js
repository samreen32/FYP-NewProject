const mongoose = require("mongoose");

const addChallanSchema = new mongoose.Schema({
  warden: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "warden",
  },
  challanNum:{ 
    type: Number,
    default: 1,
  },
  vehicleNo: {
    type: String,
    required: false,
  },
  regNumber: {
    type: String,
    required: false,
  },
  carType: {
    type: String,
    required: false,
  },
  amount: {
    type: Number,
    required: false,
  },
  location: {
    type: String,
    required: false,
  },
  add_img: {
    type: String,
  },
  anyComment: {
    type: String,
    required: false,
  },
  due_date: {
    type: String,
    require: false,
  },  
  date: {
    type: Date,
    default: Date.now,
  },
});

const addChallan = mongoose.model("addChallan", addChallanSchema);

module.exports = addChallan;
