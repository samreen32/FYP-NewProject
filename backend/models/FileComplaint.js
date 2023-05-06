const mongoose = require("mongoose");
const { Schema } = mongoose;

const complaintSchema = new Schema({
  citizen: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "citizen", //reference model
  },
  name: {
    type: String,
    required: true, 
  },
  email: {
    type: String,
    required: true,
  },
  officer_Name: {
    type: String,
  },
  any_image: {
    type: Array,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const complaints = mongoose.model("complaints", complaintSchema);
module.exports = complaints;
