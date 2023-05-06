const express = require("express");
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
//Edit citizen profile details: POST "api/profiles/citizen_editProfile". Login required.




/********************** 2nd Route **************************/
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

/********************** 3rd Route **************************/
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

module.exports = router;
