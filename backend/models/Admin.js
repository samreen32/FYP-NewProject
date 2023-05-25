const mongoose = require("mongoose");
const { Schema } = mongoose;

const adminSchema = new Schema({
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
  phoneNo: {
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
  authTokens: [{ type: Object }], //will count how many times user has been loggedin and at what time.
  date: {
    type: Date,
    default: Date.now,
  },
});

const admin = mongoose.model("admin", adminSchema);
module.exports = admin;
