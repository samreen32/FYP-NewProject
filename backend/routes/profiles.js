const express = require("express");
const { body, validationResult } = require("express-validator");
const Citizen = require("../models/Citizen");
const Warden = require("../models/Warden");
const Admin = require("../models/Admin");
const router = express.Router();
const jwt = require("jsonwebtoken");
const get_auth = require("../middleware/get_auth");
const JWT_SECRETE = "Samreenisagoodgir@l";
const multer = require("multer");
const storage = multer.diskStorage({});
const cloudinary = require("../helper/ImageUpload");

//function for image file......
const fileFilter = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback("Invalid Image File!", false);
  }
};

const uploads = multer({ storage, fileFilter });

/********************** 1st Route **************************/
//Upload citizen profile: POST "api/profiles/citizenprofile". Login required.
router.post(
  "/citizenprofile",
  get_auth,
  uploads.single("profile"),
  async (req, res) => {
    let success = false;
    try {
      const { citizen } = req;
      if (!citizen) {
        success = false;
        return res.status(400).json({ error: "Unauthorized access" });
      }

      const result = await cloudinary.uploader.upload(req.file.path, {
        public_id: `${citizen.id}_profile`,
        width: 500,
        height: 500,
        crop: "fill",
      });
      console.log(result);
      await Citizen.findByIdAndUpdate(citizen.id, { avatar: result.url });

      const citizenProfile = await Citizen.findById(citizen.id);
      res
        .status(201)
        .json({ success: true, message: "Profile uploaded", citizenProfile });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

/********************** 2nd Route **************************/
//Update citizen profile details: POST "api/profiles/update_citizen_profile". Login required.
router.put(
  "/update_citizen_profile",
  get_auth,
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("phoneNo", "Enter 11 digit number").isLength({ min: 11 }),
  ],
  async (req, res) => {
    const citizenId = req.citizen.id;
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    try {
      let citizen = await Citizen.findById(citizenId);
      if (!citizen) {
        return res.status(404).json({ success, error: "Citizen not found" });
      }

      /* Updating Citizen Details */
      citizen.name = req.body.name;
      citizen.email = req.body.email;
      citizen.phoneNo = req.body.phoneNo;
      await citizen.save();

      success = true;
      res.json({ success, message: "Your Profile Details Updated Successfully." });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

/********************** 1st Route **************************/
//Upload warden profile: POST "api/profiles/wardenprofile". Login required.
router.post(
  "/wardenprofile",
  get_auth,
  uploads.single("profile"),
  async (req, res) => {
    let success = false;
    try {
      const { warden } = req;
      if (!warden) {
        success = false;
        return res.status(400).json({ error: "Unauthorized access" });
      }

      const result = await cloudinary.uploader.upload(req.file.path, {
        public_id: `${warden.id}_profile`,
        width: 500,
        height: 500,
        crop: "fill",
      });
      await Warden.findByIdAndUpdate(warden.id, { avatar: result.url });

      const data = {
        warden: {
          id: warden.id,
        },
      };
      const wardenProfile = await Warden.findById(warden.id);
      res
        .status(201)
        .json({ success: true, message: "Profile uploaded", wardenProfile });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

/********************** 2nd Route **************************/
//Update warden profile details: POST "api/profiles/update_warden_profile". Login required.
router.put(
  "/update_warden_profile",
  get_auth,
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("phone", "Enter 11 digit number").isLength({ min: 11 }),
    body("liscenceID", "Enter a valid Liscence ID").isLength({ min: 3 }),
  ],
  async (req, res) => {
    const wardenId = req.warden.id;
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    try {
      let warden = await Warden.findById(wardenId);
      if (!warden) {
        return res.status(404).json({ success, error: "Warden not found" });
      }

      /* Updating Warden Details */
      warden.name = req.body.name;
      warden.email = req.body.email;
      warden.phone = req.body.phone;
      warden.liscenceID = req.body.liscenceID;
      await warden.save();

      success = true;
      res.json({ success, message: "Your Profile Details Updated Successfully." });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

/********************** 1st Route **************************/
//Upload admin profile: POST "api/profiles/adminprofile". Login required.
router.post(
  "/adminprofile",
  get_auth,
  uploads.single("profile"),
  async (req, res) => {
    let success = false;
    try {
      const { admin } = req;
      if (!admin) {
        success = false;
        return res.status(400).json({ error: "Unauthorized access" });
      }

      const result = await cloudinary.uploader.upload(req.file.path, {
        public_id: `${admin.id}_profile`,
        width: 500,
        height: 500,
        crop: "fill",
      });
      await Admin.findByIdAndUpdate(admin.id, { avatar: result.url });

      const data = {
        admin: {
          id: admin.id,
        },
      };
      const adminProfile = await Admin.findById(admin.id);
      res
        .status(201)
        .json({ success: true, message: "Profile uploaded", adminProfile });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

/********************** 2nd Route **************************/
//Update admin profile details: POST "api/profiles/update_admin_profile". Login required.
router.put(
  "/update_admin_profile",
  get_auth,
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("phoneNo", "Enter 11 digit number").isLength({ min: 11 }),
  ],
  async (req, res) => {
    const adminId = req.admin.id;
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    try {
      let admin = await Admin.findById(adminId);
      if (!admin) {
        return res.status(404).json({ success, error: "Admin not found" });
      }

      /* Updating Admin Details */
      admin.name = req.body.name;
      admin.email = req.body.email;
      admin.phoneNo = req.body.phoneNo;
      await admin.save();

      success = true;
      res.json({ success, message: "Your Profile Details Updated Successfully." });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

module.exports = router;
