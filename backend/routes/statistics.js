const express = require("express");
const router = express.Router();
const get_auth = require("../middleware/get_auth");
const FileComplaint = require("../models/FileComplaint");
const AddChallan = require("../models/AddChallan");
const Citizen = require("../models/Citizen");
const Warden = require("../models/Warden");
const Admin = require("../models/Admin");

/********************** 1st Route ************************/
//Count total/paid/unpaid challans using: GET "api/statistics/countChallans". Login required.......at WARDEN side
router.get("/countChallans", get_auth, async (req, res) => {
  try {
    const totalChallans = await AddChallan.countDocuments({
      warden: req.warden.id,
    });
    const paidChallans = await AddChallan.countDocuments({
      warden: req.warden.id,
      status: "paid",
    });
    const unpaidChallans = totalChallans - paidChallans;
    res.json({ totalChallans, paidChallans, unpaidChallans });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

/********************** 2nd Route ************************/
//Count admins/citizens/wardens/challans/complaints using: GET "api/statistics/count_appStatistics". Login required.......at WARDEN side
router.get("/count_appStatistics", async (req, res) => {
  try {
    const citizenCount = await Citizen.countDocuments();
    const wardenCount = await Warden.countDocuments();
    const adminCount = await Admin.countDocuments();
    const totalChallanCount = await AddChallan.countDocuments();
    const totalPaidChallans = await AddChallan.countDocuments({
      status: "paid",
    });
    const totalUnpaidChallans = totalChallanCount - totalPaidChallans;
    const totalComplaints = await FileComplaint.countDocuments();
    res.status(200).json({
      citizenCount,
      wardenCount,
      adminCount,
      totalChallanCount,
      totalUnpaidChallans,
      totalPaidChallans,
      totalComplaints,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
