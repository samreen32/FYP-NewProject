const express = require("express"); //importing express
const router = express.Router();
const get_auth = require("../middleware/get_auth");
const FileComplaint = require("../models/FileComplaint");
const { body, validationResult } = require("express-validator");
const multer = require("multer");
const cloudinary = require("../helper/ImageUpload");

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback("Invalid Image File!", false);
  }
};

var uploads = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB
  },
});


/********************** 1st Route ************************/
//Add a new Complaint using: POST "api/complaints/filecomplaint". Login required.......at CITIZEN side
router.post(
  "/filecomplaint",
  get_auth,
  uploads.array("any_image"),
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid  email").isEmail(),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      let success = false;
      const { name, email, officer_Name, description } = req.body;
      const urls = [];
      const files = req.files;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      for (const file of files) {
        const result = await cloudinary.uploader.upload(file.path);
        urls.push(result.secure_url);
      }

      const complaint = new FileComplaint({
        name: name,
        email: email,
        officer_Name: officer_Name,
        any_image: urls,
        description: description,
        citizen: req.citizen.id,
      });
      const saveComplaint = await complaint.save();
      success = true;
      res.json({ success, saveComplaint });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);


/****************************** 2nd Route ****************************/
//Handle Complaints using: GET "api/complaints/handleComplaints"......at ADMIN side
router.get("/handleComplaints", async (req, res) => {
  try {
    const complaints = await FileComplaint.find({});
    res.json(complaints);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

/****************************** 3rd Route ****************************/
//Get specific complaints by selecting with id using: GET "api/complaints/handleSingleComplaint"
router.get("/handleSingleComplaint/:id", async (req, res) => {
  try {
    const complaint = await FileComplaint.findById(req.params.id);
    res.json(complaint);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
