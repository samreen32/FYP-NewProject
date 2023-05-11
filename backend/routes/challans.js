const express = require("express"); //importing express
const router = express.Router();
const get_auth = require("../middleware/get_auth");
const AddChallan = require("../models/AddChallan");
const Citizen = require("../models/Citizen");
const { body, validationResult } = require("express-validator");
const multer = require("multer");
const cloudinary = require("../helper/ImageUpload");
const AddMotors = require("../models/AddMotors");
const qr = require("qrcode");

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
        challanNum,
        vehicleNo,
        carType,
        regNumber,
        amount,
        location,
        anyComment,
        status,
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

      const addChallan = await AddChallan.findById(req.params.id);
      if (!addChallan) {
        return res.status(404).json({ msg: "Challan not found" });
      }

      // Retrieve all citizens from the database
      const citizens = await Citizen.find();
      // Filter the citizens whose vehicleNo matches the received value
      const matchingCitizens = citizens.filter(
        (citizen) => citizen.vehicleNo === vehicleNo
      );
      let phoneNumber;
      if (matchingCitizens.length === 0) {
        phoneNumber = "";
      } else {
        phoneNumber = matchingCitizens[0].phoneNo; // get the phone number from the first matching citizen
      }

      const updatedFields = {
        challanNum: challanNum,
        vehicleNo: vehicleNo,
        regNumber: regNumber,
        carType: carType,
        amount: amount,
        location: location,
        anyComment: anyComment,
        due_date: due_date,
        status: status,
        warden: req.warden.id,
      };

      if (imageUrl) {
        updatedFields.add_img = imageUrl;
      }

      // Generate QR code
      const qrCodeData = {
        challanNum: updatedFields.challanNum,
        add_img: updatedFields.add_img,
        vehicleNo: updatedFields.vehicleNo,
        regNumber: updatedFields.regNumber,
        carType: updatedFields.carType,
        amount: updatedFields.amount,
        location: updatedFields.location,
        anyComment: updatedFields.anyComment,
        due_date: updatedFields.due_date,
        status: updatedFields.status,
        date: addChallan.date,
      };
      const qrCodeImage = await qr.toDataURL(JSON.stringify(qrCodeData));
      updatedFields.qrCode = qrCodeImage;

      const updatedChallanDetails = await AddChallan.findByIdAndUpdate(
        req.params.id,
        updatedFields,
        { new: true }
      );

      success = true;
      res.json({ success, updatedChallanDetails, phoneNumber });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

/********************** 3rd Route ************************/
//Show challans to citizen using: POST "api/challans/showChallans"....Login required.....at CITIZEN side
router.post("/show_UnpaidChallans", get_auth, async (req, res) => {
  try {
    const { vehicleNo } = req.body;
    const challans = await AddChallan.find({
      vehicleNo: { $in: vehicleNo },
      status: "Unpaid",
    }).populate("warden", "name email");
    res.send({ success: true, challans });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
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

/********************** 5th Route ************************/
//Update status of single challan using: PUT "api/challans/challanStatus/:id". Login required......at CITIZEN side
router.put("/challanStatus/:id", async (req, res) => {
  try {
    let success = false;
    const challan = await AddChallan.findById(req.params.id);
    if (!challan) {
      return res.status(404).json({ message: "Challan not found" });
    }
    challan.status = "paid";
    await challan.save();
    success = true;
    res.json({ success, challan });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
