require("dotenv").config();
const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");

connectToMongo();

const app = express();
const port = 8000;
app.use(cors());
app.use(express.json());
// app.use(express.static('./uploads'))

//Available Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/profiles", require("./routes/profiles"));
app.use("/api/complaints", require("./routes/complaints"));
app.use("/api/warden", require("./routes/warden"));
app.use("/api/notifications", require("./routes/notifications"));
app.use("/api/help", require("./routes/help"));
app.use("/api/challans", require("./routes/challans"));
app.use("/api/statistics", require("./routes/statistics"));
app.use("/api/motors", require("./routes/motors"));
app.use("/api/language", require("./routes/language"));
app.use("/api/theme", require("./routes/theme"));

app.listen(port, "192.168.43.147", () => {
  console.log(`FYP backend listening on port ${port}`);
});
