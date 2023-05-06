const mongoose = require("mongoose");
const { Schema } = mongoose;

const helpSchema = new Schema({
  citizen: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "citizen",
  },
  warden: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "warden",
  },
  Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  Any_Comment: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const helps = mongoose.model("helps", helpSchema);
module.exports = helps;
