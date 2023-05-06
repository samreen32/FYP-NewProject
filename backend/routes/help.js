const express = require("express");
const router = express.Router();
const Help = require("../models/Help");
const get_auth = require("../middleware/get_auth");
const { body, validationResult } = require("express-validator");
 
/************************** 1st Route **************************************/
//Help using: POST "api/help/citizenHelp"......at CITIZEN side
router.post(
  "/citizenHelp",
  get_auth,
  [
    body("Name", "Enter a valid name").isLength({ min: 3 }),
    body("Email", "Enter a valid  email").isEmail(),
    body("description", "Enter a valid  description").isLength({ min: 5 }),
    body("Any_Comment", "Enter a valid  Comment"),
  ],
  async (req, res) => {
    try {
      let success = false;
      const { Name, Email, description, Any_Comment } = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const help = new Help({
        Name: Name,
        Email: Email,
        description: description,
        Any_Comment: Any_Comment,
        citizen: req.citizen.id,
      });
      const saveHelp = await help.save();
      res.json({ success: true, saveHelp });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

/************************** 2nd Route **************************************/
//Help using: POST "api/help/wardenHelp"......at WARDEN side
router.post(
  "/wardenHelp",
  get_auth,
  [
    body("Name", "Enter a valid name").isLength({ min: 3 }),
    body("Email", "Enter a valid  email").isEmail(),
    body("description", "Enter a valid  description").isLength({ min: 5 }),
    body("Any_Comment", "Enter a valid  Comment"),
  ],
  async (req, res) => {
    try {
      let success = false;
      const { Name, Email, description, Any_Comment } = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const help = new Help({
        Name: Name,
        Email: Email,
        description: description,
        Any_Comment: Any_Comment,
        warden: req.warden.id,
      });
      const saveHelp = await help.save();
      success = true;
      res.json({ success, saveHelp });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

module.exports = router;
