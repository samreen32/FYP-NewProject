const express = require("express"); //importing express
const router = express.Router();
const get_auth = require("../middleware/get_auth");
const { body, validationResult } = require("express-validator");
const AddMotors = require("../models/AddMotors");
const AddChallan = require("../models/AddChallan");

/********************** 1st Route ************************/
//Add a new motor using: POST "api/motors/addMotors". Login required.......at CITIZEN side
router.post(
  "/addMotors",
  get_auth,
  [
    body("motorName", "Enter a valid motor name").isLength({ min: 3 }),
    body("motorType", "Enter a valid  motor type").isLength({ min: 3 }),
    body("vehicleNo", "Enter a valid  vehicle number").isLength({ min: 3 }),
    body("regNo", "Enter a valid  registration number").isLength({ min: 3 }),
  ],
  async (req, res) => {
    try {
      let success = false;
      const { motorName, motorType, vehicleNo, regNo } = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const motor = new AddMotors({
        motorName: motorName,
        motorType: motorType,
        vehicleNo: vehicleNo,
        regNo: regNo,
        citizen: req.citizen.id,
      });
      const saveMotor = await motor.save();
      success = true;
      res.json({ success, saveMotor });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

/********************** 2nd Route ************************/
//View motors using: GET "api/motors/fetch_motors". Login required......at CITIZEN side
router.get("/fetch_motors", get_auth, async (req, res) => {
  try {
    const motors = await AddMotors.find({ citizen: req.citizen.id });
    res.json(motors);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

/********************** 3rd Route ************************/
//Fetch single motors using: GET "api/motors/fetch_single_motor". Login required......at CITIZEN side
router.get("/fetch_single_motor/:id", get_auth, async (req, res) => {
  try {
    const motor = await AddMotors.findById(req.params.id);
    res.json(motor);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

/********************** 4th Route ************************/
//Count challan corres to motors using: GET "api/motors/count_motor_challan/:vehicleNo". Login required......at CITIZEN side
router.get("/count_motor_challan/:vehicleNo", get_auth, async (req, res) => {
  try {
    const { vehicleNo } = req.params;
    const motorDoc = await AddMotors.findOne({ vehicleNo });
    const unpaidChallanCount = await AddChallan.countDocuments({ vehicleNo, status: "Unpaid" });
    if (motorDoc && unpaidChallanCount > 0) {
      res.json({
        success: true,
        message: `${unpaidChallanCount} unpaid challan(s) available.`,
        motor: motorDoc,
        unpaidChallanCount,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No unpaid challan corresponding to this motor.",
        unpaidChallanCount: 0,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

/********************** 5th Route ************************/
//Get challan for vehicle using: GET "api/motors/getChallan/:vehicleNo". Login required......at CITIZEN side
router.get("/getChallan/:vehicleNo", get_auth, async (req, res) => {
  try {
    let success = false;
    const { vehicleNo } = req.params;
    const motorDoc = await AddMotors.findOne({ vehicleNo });
    const challanDoc = await AddChallan.find({ vehicleNo, status: "Unpaid" });
    if (motorDoc && challanDoc && challanDoc.length > 0) {
      res.json({
        success: true,
        challan: challanDoc,
      });
    } else {
      res.status(404).send({ message: "No unpaid challan corresponding to this motor." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
