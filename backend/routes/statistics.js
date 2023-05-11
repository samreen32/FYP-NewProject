const express = require("express");
const router = express.Router();
const get_auth = require("../middleware/get_auth");
const AddChallan = require("../models/AddChallan");

/********************** 1st Route ************************/
// Count total/paid/unpaid challans using: GET "api/statistics/countChallans". Login required.......at WARDEN side
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


module.exports = router;
