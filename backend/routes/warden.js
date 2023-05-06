const express = require("express");
const Warden = require("../models/Warden");
const router = express.Router();


/************************** 1st Route **************************************/
//Fetch Wardens using: GET "api/warden/fetchallWardens"......at ADMIN side
router.get("/fetchallWardens", async (req, res) => {
  try {
    const wardens = await Warden.find({});
    res.json(wardens);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
 

/****************************** 2nd Route ****************************/
//Get specific warden by selecting with id using: GET "api/warden/fetchSingleWarden"
router.get("/fetchSingleWarden/:id", async (req, res) => {
  try {
    const warden = await Warden.findById(req.params.id);
    res.json(warden);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});


/********************* 3rd Route ********************/
//Delete an existing Warden using: DELETE "api/warden/deleteWarden". Login required.
router.delete("/deleteWarden/:id", async (req, res) => {
  try {
    let warden = await Warden.findById(req.params.id);
    if (!warden) {
      return res.status(404).send("Not Found");
    }

    warden = await Warden.findByIdAndDelete(req.params.id);
    res.json({ Success: "Warden has been deleted", warden: warden});
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
