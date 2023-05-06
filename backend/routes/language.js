const express = require("express");
const router = express.Router();
const Citizen = require("../models/Citizen");
const get_auth = require("../middleware/get_auth");

router.put("/citizen_language", get_auth, async (req, res) => {
  try {
    const citizenId = req.citizen.id;
    const citizen = await Citizen.findByIdAndUpdate(
      citizenId,
      { language: req.body.language },
      { new: true }
    );
    res.json(citizen);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/citizen_languageId", get_auth, async (req, res) => {
  try {
    const citizenId = req.citizen.id;
    const foundCitizen = await Citizen.findById(citizenId);

    if (!foundCitizen) {
      return res.status(404).json({ message: "Citizen not found" });
    }

    const language = foundCitizen.language;
    res.json({ language });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
