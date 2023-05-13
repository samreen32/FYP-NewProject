const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://Samreen:samreen321@fypcluster.sr5ylub.mongodb.net/test";

  // const mongoURI = "mongodb://localhost:27017";
const connectToMongo = () => {
  return mongoose.connect(mongoURI)
    .then(() => {
      console.log("Connected To Mongoose Successfully");
    })
    .catch((error) => {
      console.log("Error connecting to Mongoose:", error);
    });
};

module.exports = connectToMongo;
