const mongoose = require("mongoose");
const { Schema } = mongoose;

const wardenSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  liscenceID: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  avatar: String,
  language: {
    type: Number,
    default: "0",
  },
  theme: {
    type: Number,
    default: "0",
  },
  notificationsData: [
    {
      title: String,
      body: String,
      badgeValue: {
        type: Number,
        default: 0, // set default badge value to 0
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  authTokens: [{ type: Object }], //will count how many times warden has been loggedin and at what time.
  date: {
    type: Date,
    default: Date.now,
  },
});

const warden = mongoose.model("warden", wardenSchema);
module.exports = warden;
