const express = require("express");
const router = express.Router();
const get_auth = require("../middleware/get_auth");
const AddChallan = require("../models/AddChallan");

/********************** 1st Route ************************/
// Get the total number of challans using: GET "api/statistics/countChallans". Login required.......at WARDEN side
router.get("/countChallans", get_auth, async (req, res) => {
  try {
    const count = await AddChallan.countDocuments({
      warden: req.warden.id,
    });
    res.json({ count });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
