const express = require("express");
const router = express.Router();
const Citizen = require("../models/Citizen");
const get_auth = require("../middleware/get_auth");
const Warden = require("../models/Warden");
const Admin = require("../models/Admin");

/********************** 1st Route ************************/
//Set Citizen language using: PUT "api/language/citizen_language". Login required.
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

/********************** 2nd Route ************************/
//Get Citizen lang using: GET "api/language/citizen_languageId". Login required.
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

/********************** 1st Route ************************/
//Set Warden language using: PUT "api/language/warden_language". Login required.
router.put("/warden_language", get_auth, async (req, res) => {
  try {
    const wardenId = req.warden.id;
    const warden = await Warden.findByIdAndUpdate(
      wardenId,
      { language: req.body.language },
      { new: true }
    );
    res.json(warden);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/********************** 2nd Route ************************/
//Get Warden lang using: GET "api/language/warden_languageId". Login required.
router.get("/warden_languageId", get_auth, async (req, res) => {
  try {
    const wardenId = req.warden.id;
    const foundWarden = await Warden.findById(wardenId);

    if (!foundWarden) {
      return res.status(404).json({ message: "Warden not found" });
    }

    const language = foundWarden.language;
    res.json({ language });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/********************** 1st Route ************************/
//Set Admin language using: PUT "api/language/admin_language". Login required.
router.put("/admin_language", get_auth, async (req, res) => {
  try {
    const adminId = req.admin.id;
    const admin = await Admin.findByIdAndUpdate(
      adminId,
      { language: req.body.language },
      { new: true }
    );
    res.json(admin);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/********************** 2nd Route ************************/
//Get Admin lang using: GET "api/language/admin_languageId". Login required.
router.get("/admin_languageId", get_auth, async (req, res) => {
  try {
    const adminId = req.admin.id;
    const foundAdmin = await Admin.findById(adminId);

    if (!foundAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const language = foundAdmin.language;
    res.json({ language });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
