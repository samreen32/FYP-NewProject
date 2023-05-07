const express = require("express"); //importing express
const router = express.Router();
const get_auth = require("../middleware/get_auth");
const AddChallan = require("../models/AddChallan");
const { body, validationResult } = require("express-validator");
const multer = require("multer");
const cloudinary = require("../helper/ImageUpload");
const AddMotors = require("../models/AddMotors");
const qr = require("qrcode");

// router.get('/qrcode', async (req, res) => {
//   try {
//     const qrData = 'https://example.com'; // The data you want to encode in the QR code
//     const qrCode = await qr.toDataURL(qrData); // Generate the QR code as a data URL
//     res.send(qrCode);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Internal Server Error');
//   }
// });

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
});

/********************** 1st Route ************************/
//Add a new challan using: POST "api/challans/addChallan". Login required.......at WARDEN side
router.post(
  "/addChallan",
  get_auth,
  uploads.single("add_img"),
  async (req, res) => {
    try {
      let success = false;
      let imageUrl = null;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path);
        imageUrl = result.secure_url;
      }

      // Find the highest challanNum value in the database
      const highestChallan = await AddChallan.findOne({})
        .sort("-challanNum")
        .exec();

      // Calculate the next challanNum value
      const nextChallanNum = highestChallan ? highestChallan.challanNum + 1 : 1;

      const challanDetails = new AddChallan({
        add_img: imageUrl,
        challanNum: nextChallanNum, // Set the challanNum value to the next value
        warden: req.warden.id,
      });

      const saveChallanDetails = await challanDetails.save();
      success = true;
      res.json({ success, saveChallanDetails });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

/********************** 2nd Route ************************/
//Update a challan using: PUT "api/challans/updateChallan/:id". Login required.......at WARDEN side
router.put(
  "/updateChallan/:id",
  get_auth,
  uploads.single("add_img"),
  [
    body("vehicleNo", "Enter a valid vehicleNo"),
    body("regNumber", "Enter valid registration number"),
    body("carType", "Enter a valid  carType"),
    body("amount", "Enter a valid amount"),
    body("location", "Enter a valid location"),
    body("anyComment", "Enter a valid  anyComment"),
    body("due_date", "Enter a valid  due date"),
  ],
  async (req, res) => {
    try {
      let success = false;
      const {
        vehicleNo,
        carType,
        regNumber,
        amount,
        location,
        anyComment,
        due_date,
      } = req.body;
      let imageUrl = null;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path);
        imageUrl = result.secure_url;
      }

      const updatedFields = {
        vehicleNo: vehicleNo,
        regNumber: regNumber,
        carType: carType,
        amount: amount,
        location: location,
        anyComment: anyComment,
        due_date: due_date,
        warden: req.warden.id,
      };

      if (imageUrl) {
        updatedFields.add_img = imageUrl;
      }

      const updatedChallanDetails = await AddChallan.findByIdAndUpdate(
        req.params.id,
        updatedFields,
        { new: true }
      );
      // Generate QR code with the updated challan details
      const qrData = JSON.stringify(updatedChallanDetails);
      const qrCode = await qr.toDataURL(qrData);

      success = true;
      res.json({ success, updatedChallanDetails, qrCode });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

/********************** 3rd Route ************************/
//Show challans to citizen using: POST "api/challans/showChallans"....Login required.....at CITIZEN side
router.post("/showChallans", get_auth, async (req, res) => {
  try {
    const { vehicleNo } = req.body;

    // getting challan details corresponding to the vehicle numbers
    const challans = await AddChallan.find({ vehicleNo: { $in: vehicleNo } })
      .populate("warden", "name email -_id")
      .sort("-date")
      .exec();

    res.json({ success: true, challans });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

/********************** 4th Route ************************/
//Fetch single challan to pay using: GET "api/challans/fetch_single_challan/:id". Login required......at CITIZEN side
router.get("/fetch_single_challan/:id", get_auth, async (req, res) => {
  try {
    const payChallan = await AddChallan.findById(req.params.id);
    res.json(payChallan);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
