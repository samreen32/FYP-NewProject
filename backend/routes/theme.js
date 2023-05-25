const express = require("express");
const router = express.Router();
const Citizen = require("../models/Citizen");
const get_auth = require("../middleware/get_auth");
const Warden = require("../models/Warden");
const Admin = require("../models/Admin");

/********************** 1st Route ************************/
//Set Citizen theme using: PUT "api/theme/citizen_theme". Login required.
router.put("/citizen_theme", get_auth, async (req, res) => {
  try {
    const citizenId = req.citizen.id;
    const citizen = await Citizen.findByIdAndUpdate(
      citizenId,
      { theme: req.body.theme },
      { new: true }
    );
    res.json(citizen);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/********************** 2nd Route ************************/
//Get Citizen theme using: GET "api/theme/citizen_themeId". Login required.
router.get("/citizen_themeId", get_auth, async (req, res) => {
  try {
    const citizenId = req.citizen.id;
    const foundCitizen = await Citizen.findById(citizenId);

    if (!foundCitizen) {
      return res.status(404).json({ message: "Citizen not found" });
    }

    const theme = foundCitizen.theme;
    res.json({ theme });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/********************** 1st Route ************************/
//Set Warden theme using: PUT "api/theme/warden_theme". Login required.
router.put("/warden_theme", get_auth, async (req, res) => {
  try {
    const wardenId = req.warden.id;
    const warden = await Warden.findByIdAndUpdate(
      wardenId,
      { theme: req.body.theme },
      { new: true }
    );
    res.json(warden);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/********************** 2nd Route ************************/
//Get Warden theme using: GET "api/theme/warden_themeId". Login required.
router.get("/warden_themeId", get_auth, async (req, res) => {
  try {
    const wardenId = req.warden.id;
    const foundWarden = await Warden.findById(wardenId);

    if (!foundWarden) {
      return res.status(404).json({ message: "Warden not found" });
    }

    const theme = foundWarden.theme;
    res.json({ theme });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/********************** 1st Route ************************/
//Set Admin theme using: PUT "api/theme/admin_theme". Login required.
router.put("/admin_theme", get_auth, async (req, res) => {
  try {
    const adminId = req.admin.id;
    const admin = await Admin.findByIdAndUpdate(
      adminId,
      { theme: req.body.theme },
      { new: true }
    );
    res.json(admin);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/********************** 2nd Route ************************/
//Get Admin theme using: GET "api/theme/admin_themeId". Login required.
router.get("/admin_themeId", get_auth, async (req, res) => {
  try {
    const adminId = req.admin.id;
    const foundAdmin = await Admin.findById(adminId);

    if (!foundAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const theme = foundAdmin.theme;
    res.json({ theme });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
