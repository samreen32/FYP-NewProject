const mongoose = require("mongoose");
const { Schema } = mongoose;

const citizenSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNo: {
    type: String,
    required: true,
  },
  vehicleNo: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: String,
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
  language: {
    type: Number,
    default: 0,
  },
  theme: {
    type: Number,
    default: 0,
  },
  authTokens: [{ type: Object }], //will count how many times user has been loggedin and at what time.
  date: {
    type: Date,
    default: Date.now,
  },
});

const citizen = mongoose.model("citizen", citizenSchema);
module.exports = citizen;
