const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const Citizen = require("../models/Citizen");
const Warden = require("../models/Warden");
const Admin = require("../models/Admin");
const get_auth = require("../middleware/get_auth");
const JWT_SECRETE = "Samreenisagoodgir@l";
const nodemailer = require("nodemailer");

/************************** 1st Route **************************************/
//Citizen register using "POST": "api/auth/create_citizen".
router.post(
  "/create_citizen",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid  email").isEmail(),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Enter atleast 5 charater long password"),
    body("phoneNo", "Enter 11 digit number").isLength({ min: 11 }),
    body("vehicleNo", "Enter a valid  vehicle number"),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    try {
      let citizen = await Citizen.findOne({ email: req.body.email });
      if (citizen) {
        return res
          .status(400)
          .json({ success, error: "Citizen with this Email already exists" });
      }

      /*..........CREATING NEW CITIZEN..........*/
      const salt = await bcrypt.genSalt(10);
      const securePasssword = await bcrypt.hash(req.body.password, salt);
      citizen = await Citizen.create({
        name: req.body.name,
        email: req.body.email,
        phoneNo: req.body.phoneNo,
        vehicleNo: req.body.vehicleNo,
        password: securePasssword,
      });

      /*For returning token to citizen for the same citizen who wants to login second time.*/
      const data = {
        citizen: {
          id: citizen.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRETE);
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

/************************* 2nd Route *************************/
//Authenticat a Citizen using: POST "api/auth/citizenlogin". No login required.
router.post(
  "/citizenlogin",
  [
    body("email", "Enter a valid  email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, phoneNo, vehicleNo } = req.body;
    try {
      let citizen = await Citizen.findOne({ email });
      if (!citizen) {
        success = false;
        return res
          .status(404)
          .json({ error: "Citizen with this Email does not exist!" });
      }
      const passwordCompare = await bcrypt.compare(password, citizen.password);
      if (!passwordCompare) {
        return res.status(400).json({ success, error: "Password Incorrect." });
      }
      const data = {
        citizen: {
          id: citizen.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRETE, { expiresIn: "1d" }); //token expire after 1day

      /*............For logout functionality............ */
      let oldTokens = citizen.authTokens || []; //if there is token then assign otherwise return empty array.
      if (oldTokens.length) {
        oldTokens = oldTokens.filter((t) => {
          const timeDiff = (Date.now() - parseInt(t.signedAt)) / 1000;
          if (timeDiff < 86400) {
            return t;
          }
        });
      }
      await Citizen.findByIdAndUpdate(citizen.id, {
        authTokens: [
          ...oldTokens,
          { authToken, signedAt: Date.now().toString() },
        ],
      });

      success = true;
      const citizenInfo = {
        name: citizen.name,
        email: citizen.email,
        password: citizen.password,
        phoneNo: citizen.phoneNo,
        vehicleNo: citizen.vehicleNo,
        avatar: citizen.avatar ? citizen.avatar : "",
        notificationsData: citizen.notificationsData
          ? citizen.notificationsData
          : "",
      };
      res.json({ success, citizen: citizenInfo, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

/************************** 3rd Route **************************************/
//Fetch citizen vehicle numbers using "GET": "api/auth/citizen_vehicleNo".
router.get("/citizen_vehicleNo", get_auth, async (req, res) => {
  try {
    const citizen = await Citizen.findById(req.citizen.id);
    if (!citizen) {
      return res.status(404).json({ error: "Citizen not found" });
    }
    res.json({ vehicleNo: citizen.vehicleNo });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

/************************* 4th Route *************************/
//Citizen forgot password using: POST "api/auth/citizen_forgot_password". No Login required.
router.post(
  "/citizen_forgot_password",
  [body("email", "Enter a valid email").isEmail()],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    try {
      const citizen = await Citizen.findOne({ email: req.body.email });
      if (!citizen) {
        return res
          .status(404)
          .json({ success, error: "Citizen with this Email does not exist" });
      }

      success = true;
      res.json({
        success,
        message: "You can reset your password.",
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

/************************* 5th Route *************************/
//Citizen reset password using: PUT "api/auth/citizen_reset_password". Not Login required.
router.put(
  "/citizen_reset_password",
  [
    [body("email", "Enter a valid email").isEmail()],
    body("newPassword")
      .isLength({ min: 5 })
      .withMessage("New password must be at least 5 characters long"),
  ],
  async (req, res) => {
    let emailSuccess = false;
    let passwordSuccess = false;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ emailSuccess, passwordSuccess, errors: errors.array() });
    }

    try {
      const citizen = await Citizen.findOne({ email: req.body.email });
      if (!citizen) {
        return res.status(400).json({
          emailSuccess,
          passwordSuccess,
          error: "Citizen with this Email does not exist",
        });
      }

      // email verification success
      emailSuccess = true;

      /*..........UPDATING CITIZEN'S PASSWORD..........*/
      const salt = await bcrypt.genSalt(10);
      const securePassword = await bcrypt.hash(req.body.newPassword, salt);
      await Citizen.findByIdAndUpdate(citizen.id, { password: securePassword });

      // password reset success
      passwordSuccess = true;

      /*Sending new password via email to the citizen*/
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "iamsamreenk@gmail.com",
          pass: "obotjvlbmedwjsqn",
        },
      });

      const mailOptions = {
        from: "iamsamreenk@gmail.com",
        to: citizen.email,
        subject: "E-Parking Challan App",
        html: `<p><strong>Dear ${citizen.name}! You have reset your password. Your new password is ${req.body.newPassword}.</p></strong>`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          res.status(500).send("Internal Server Error");
        } else {
          res.json({
            emailSuccess,
            passwordSuccess,
            message: "Password has been reset",
          });
        }
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

/************************* 6th Route *************************/
//Citizen change password using: PUT "api/auth/citizen_change_password". Login required.
router.put(
  "/citizen_change_password",
  get_auth,
  [
    body("oldPassword")
      .isLength({ min: 5 })
      .withMessage("Old password must be at least 5 characters long"),
    body("newPassword")
      .isLength({ min: 5 })
      .withMessage("New password must be at least 5 characters long"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let success = false;
    const { oldPassword, newPassword } = req.body;
    const citizenId = req.citizen.id; // assuming the citizen ID is stored in the request object by the get_auth middleware

    const citizen = await Citizen.findById(citizenId);
    const currentPassword = citizen.password;

    const passwordMatch = await bcrypt.compare(oldPassword, currentPassword);
    if (!passwordMatch) {
      return res.status(404).json({ message: "Old password is not correct." });
    }

    if (oldPassword === newPassword) {
      return res.status(404).json({ message: "Try a different password." });
    }

    // Hash the new password and update the citizen's password in the database
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    citizen.password = hashedNewPassword;
    await citizen.save();
    success = true;
    return res.json({
      success,
      message: "Your password changed successfully.",
    });
  }
);

/****************************** 7th Route ****************************/
//Citizen logged out: POST "api/auth/citizen_logout". Login required.
router.post("/citizen_logout", get_auth, async (req, res) => {
  const token = req.header("auth-token");
  try {
    let success = false;
    const citizen = await Citizen.findOneAndUpdate(
      { authTokens: { $elemMatch: { authToken: token } } },
      { $set: { authTokens: [] } }
    );
    if (!citizen) {
      return res.status(401).json({ message: "Invalid token" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Logout Successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

/************************************ WARDEN *****************************************/

/************************ 1st Route *****************************/
//Creating  "api/auth/createwarden".......for Warden.
router.post(
  "/createwarden",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid  email").isEmail(),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Enter atleast 5 charater long password"),
    body("liscenceID", "Enter a valid Liscence ID").isLength({ min: 3 }),
    body("phone", "Enter a valid phone number")
      .isLength({ min: 11 })
      .withMessage("Phone Number is not valid."),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    try {
      let warden = await Warden.findOne({ email: req.body.email });
      if (warden) {
        return res
          .status(400)
          .json({ success, error: "Warden with this Email already exists" });
      }

      let WliscenceID = await Warden.findOne({
        liscenceID: req.body.liscenceID,
      });
      if (WliscenceID) {
        return res.status(400).json({
          success,
          error: "Warden with this Liscence ID already exists",
        });
      }

      /*..........CREATING NEW WARDEN..........*/
      const salt = await bcrypt.genSalt(10);
      const securePasssword = await bcrypt.hash(req.body.password, salt);
      warden = await Warden.create({
        name: req.body.name,
        email: req.body.email,
        password: securePasssword,
        liscenceID: req.body.liscenceID,
        phone: req.body.phone,
      });

      /*For returning token to warden for the same warden who wants to login second time.*/
      const data = {
        warden: {
          id: warden.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRETE);
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

/************************* 2nd Route *************************/
//Authenticat a Warden using: POST "api/auth/wardenlogin". No login required.
router.post(
  "/wardenlogin",
  [
    body("email", "Enter a valid  email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let warden = await Warden.findOne({ email });
      if (!warden) {
        success = false;
        return res
          .status(404)
          .json({ error: "Warden with this Email does not exist!" });
      }
      const passwordCompare = await bcrypt.compare(password, warden.password);
      if (!passwordCompare) {
        return res.status(400).json({ success, error: "Password not match." });
      }
      const data = {
        warden: {
          id: warden.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRETE, { expiresIn: "1d" }); //token expire after 1day

      /*............For logout functionality............ */
      let oldTokens = warden.authTokens || []; //if there is token then assign otherwise return empty array.
      if (oldTokens.length) {
        oldTokens = oldTokens.filter((t) => {
          const timeDiff = (Date.now() - parseInt(t.signedAt)) / 1000;
          if (timeDiff < 86400) {
            return t;
          }
        });
      }
      await Warden.findByIdAndUpdate(warden.id, {
        authTokens: [
          ...oldTokens,
          { authToken, signedAt: Date.now().toString() },
        ],
      });

      success = true;
      const wardenInfo = {
        name: warden.name,
        email: warden.email,
        password: warden.password,
        avatar: warden.avatar ? warden.avatar : "",
        notificationsData: warden.notificationsData
          ? warden.notificationsData
          : "",
      };
      res.json({ success, warden: wardenInfo, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

/************************* 3rd Route *************************/
//Warden forgot password using: POST "api/auth/warden_forgot_password". Login required.
router.post(
  "/warden_forgot_password",
  [body("email", "Enter a valid email").isEmail()],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    try {
      const warden = await Warden.findOne({ email: req.body.email });
      if (!warden) {
        return res
          .status(404)
          .json({ success, error: "Warden with this Email does not exist" });
      }

      success = true;
      res.json({
        success,
        message: "You can reset your password.",
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

/************************* 4th Route *************************/
//Warden reset password using: PUT "api/auth/warden_reset_password". Login required.
router.put(
  "/warden_reset_password",
  [
    [body("email", "Enter a valid email").isEmail()],
    body("newPassword")
      .isLength({ min: 5 })
      .withMessage("New password must be at least 5 characters long"),
  ],
  async (req, res) => {
    let emailSuccess = false;
    let passwordSuccess = false;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ emailSuccess, passwordSuccess, errors: errors.array() });
    }

    try {
      const warden = await Warden.findOne({ email: req.body.email });
      if (!warden) {
        return res.status(400).json({
          emailSuccess,
          passwordSuccess,
          error: "Warden with this Email does not exist",
        });
      }

      // email verification success
      emailSuccess = true;

      /*..........UPDATING WARDEN'S PASSWORD..........*/
      const salt = await bcrypt.genSalt(10);
      const securePassword = await bcrypt.hash(req.body.newPassword, salt);
      await Warden.findByIdAndUpdate(warden.id, { password: securePassword });

      // password reset success
      passwordSuccess = true;

      /*Sending new password via email to the warden*/
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "iamsamreenk@gmail.com",
          pass: "obotjvlbmedwjsqn",
        },
      });

      const mailOptions = {
        from: "iamsamreenk@gmail.com",
        to: warden.email,
        subject: "E-Parking Challan App",
        html: `<p><strong>Dear Warden ${warden.name}! You have reset your password. Your new password is ${req.body.newPassword}.</p></strong>`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          res.status(500).send("Internal Server Error");
        } else {
          res.json({
            emailSuccess,
            passwordSuccess,
            message: "Your password has been reset.",
          });
        }
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

/************************* 5th Route *************************/
//Warden change password using: PUT "api/auth/warden_change_password". Login required.
router.put(
  "/warden_change_password",
  get_auth,
  [
    body("oldPassword")
      .isLength({ min: 5 })
      .withMessage("Old password must be at least 5 characters long"),
    body("newPassword")
      .isLength({ min: 5 })
      .withMessage("New password must be at least 5 characters long"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let success = false;
    const { oldPassword, newPassword } = req.body;
    const wardenId = req.warden.id; // assuming the warden ID is stored in the request object by the get_auth middleware

    const warden = await Warden.findById(wardenId);
    const currentPassword = warden.password;

    const passwordMatch = await bcrypt.compare(oldPassword, currentPassword);
    if (!passwordMatch) {
      return res.status(404).json({ message: "Old password is not correct." });
    }

    if (oldPassword === newPassword) {
      return res.status(404).json({ message: "Try a different password." });
    }

    // Hash the new password and update the warden's password in the database
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    warden.password = hashedNewPassword;
    await warden.save();
    success = true;
    return res.json({
      success,
      message: "Your password changed successfully.",
    });
  }
);

/****************************** 6th Route ****************************/
//Warden logged out: POST "api/auth/warden_logout". Login required.
router.post("/warden_logout", get_auth, async (req, res) => {
  const token = req.header("auth-token");
  try {
    let success = false;
    const warden = await Warden.findOneAndUpdate(
      { authTokens: { $elemMatch: { authToken: token } } },
      { $set: { authTokens: [] } }
    );
    if (!warden) {
      return res.status(401).json({ message: "Invalid token" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Warden Logout Successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

/************************************ ADMIN *****************************************/
/************************** 1st Route **************************************/
//Admin registration using POST "api/auth/adminRegister".
router.post(
  "/adminRegister",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid  email").isEmail(),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Enter atleast 5 charater long password"),
    body("phoneNo", "Enter a valid phone number")
      .isLength({ min: 11 })
      .withMessage("Phone Number is not valid."),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    try {
      let admin = await Admin.findOne({ email: req.body.email });
      if (admin) {
        return res
          .status(400)
          .json({ success, error: "Admin with this Email already exists" });
      }

      /*..........CREATING NEW ADMIN..........*/
      const salt = await bcrypt.genSalt(10);
      const securePasssword = await bcrypt.hash(req.body.password, salt);
      admin = await Admin.create({
        name: req.body.name,
        email: req.body.email,
        phoneNo: req.body.phoneNo,
        password: securePasssword,
      });

      /*For returning token to admin for the same admin who wants to login second time.*/
      const data = {
        admin: {
          id: admin.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRETE);
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

/************************* 2nd Route *************************/
//Authenticat a Admin using: POST "api/auth/adminlogin". No login required.
router.post(
  "/adminlogin",
  [
    body("email", "Enter a valid  email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let admin = await Admin.findOne({ email });
      if (!admin) {
        success = false;
        return res
          .status(404)
          .json({ error: "Admin with this Email does not exist!" });
      }
      const passwordCompare = await bcrypt.compare(password, admin.password);
      if (!passwordCompare) {
        return res.status(400).json({ success, error: "Password not match." });
      }
      const data = {
        admin: {
          id: admin.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRETE, { expiresIn: "1d" }); //token expire after 1day

      /*............For logout functionality............ */
      let oldTokens = admin.authTokens || []; //if there is token then assign otherwise return empty array.
      if (oldTokens.length) {
        oldTokens = oldTokens.filter((t) => {
          const timeDiff = (Date.now() - parseInt(t.signedAt)) / 1000;
          if (timeDiff < 86400) {
            return t;
          }
        });
      }
      await Admin.findByIdAndUpdate(admin.id, {
        authTokens: [
          ...oldTokens,
          { authToken, signedAt: Date.now().toString() },
        ],
      });

      success = true;
      const adminInfo = {
        name: admin.name,
        email: admin.email,
        password: admin.password,
        avatar: admin.avatar ? admin.avatar : "",
        notificationsData: admin.notificationsData
          ? admin.notificationsData
          : "",
      };
      res.json({ success, admin: adminInfo, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

/************************* 3rd Route *************************/
//Admin forgot password using: POST "api/auth/admin_forgot_password". Login required.
router.post(
  "/admin_forgot_password",
  [body("email", "Enter a valid email").isEmail()],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    try {
      const admin = await Admin.findOne({ email: req.body.email });
      if (!admin) {
        return res
          .status(404)
          .json({ success, error: "Admin with this Email does not exist" });
      }

      success = true;
      res.json({
        success,
        message: "You can reset your password.",
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

/************************* 4th Route *************************/
//Admin reset password using: PUT "api/auth/admin_reset_password". Login required.
router.put(
  "/admin_reset_password",
  [
    [body("email", "Enter a valid email").isEmail()],
    body("newPassword")
      .isLength({ min: 5 })
      .withMessage("New password must be at least 5 characters long"),
  ],
  async (req, res) => {
    let emailSuccess = false;
    let passwordSuccess = false;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ emailSuccess, passwordSuccess, errors: errors.array() });
    }

    try {
      const admin = await Admin.findOne({ email: req.body.email });
      if (!admin) {
        return res.status(400).json({
          emailSuccess,
          passwordSuccess,
          error: "Admin with this Email does not exist",
        });
      }

      // email verification success
      emailSuccess = true;

      /*..........UPDATING ADMIN'S PASSWORD..........*/
      const salt = await bcrypt.genSalt(10);
      const securePassword = await bcrypt.hash(req.body.newPassword, salt);
      await Admin.findByIdAndUpdate(admin.id, { password: securePassword });

      // password reset success
      passwordSuccess = true;

      /*Sending new password via email to the admin*/
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "iamsamreenk@gmail.com",
          pass: "obotjvlbmedwjsqn",
        },
      });

      const mailOptions = {
        from: "iamsamreenk@gmail.com",
        to: admin.email,
        subject: "E-Parking Challan App",
        html: `<p><strong>Dear Admin ${admin.name}! You have reset your password. Your new password is ${req.body.newPassword}.</p></strong>`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          res.status(500).send("Internal Server Error");
        } else {
          res.json({
            emailSuccess,
            passwordSuccess,
            message: "Your password has been reset.",
          });
        }
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

/************************* 5th Route *************************/
//Admin change password using: PUT "api/auth/admin_change_password". Login required.
router.put(
  "/admin_change_password",
  get_auth,
  [
    body("oldPassword")
      .isLength({ min: 5 })
      .withMessage("Old password must be at least 5 characters long"),
    body("newPassword")
      .isLength({ min: 5 })
      .withMessage("New password must be at least 5 characters long"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let success = false;
    const { oldPassword, newPassword } = req.body;
    const adminId = req.admin.id; // assuming the admin ID is stored in the request object by the get_auth middleware

    const admin = await Admin.findById(adminId);
    const currentPassword = admin.password;

    const passwordMatch = await bcrypt.compare(oldPassword, currentPassword);
    if (!passwordMatch) {
      return res.status(404).json({ message: "Old password is not correct." });
    }

    if (oldPassword === newPassword) {
      return res.status(404).json({ message: "Try a different password." });
    }

    // Hash the new password and update the admin's password in the database
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    admin.password = hashedNewPassword;
    await admin.save();
    success = true;
    return res.json({ success, message: "Password changed successfully." });
  }
);

/****************************** 6th Route ****************************/
//Admin logged out: POST "api/auth/admin_logout". Login required.
router.post("/admin_logout", get_auth, async (req, res) => {
  const token = req.header("auth-token");
  try {
    let success = false;
    const admin = await Admin.findOneAndUpdate(
      { authTokens: { $elemMatch: { authToken: token } } },
      { $set: { authTokens: [] } }
    );
    if (!admin) {
      return res.status(401).json({ message: "Invalid token" });
    }
    return res.status(200).json({
      success: true,
      message: "You has successfully logout as a admin.",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
