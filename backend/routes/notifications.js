const express = require("express");
const Citizen = require("../models/Citizen");
const Warden = require("../models/Warden");
const Admin = require("../models/Admin");
const router = express.Router();
const { body } = require("express-validator");
const get_auth = require("../middleware/get_auth");

/****************************** 1st Route ****************************/
//Citizen schedule notifications: POST "api/notifications/schedule_notification". Login required.
router.post(
  "/schedule_notification",
  get_auth,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("body", "Enter a valid body").isLength({ min: 3 }),
  ],
  async (req, res) => {
    try {
      let success = false;
      const { citizen } = req;
      if (!citizen) {
        success = false;
        return res.status(400).json({ error: "Unauthorized access" });
      }
      const notification = {
        title: req.body.title,
        body: req.body.body,
        badgeValue: 1, // initialize badge count to 1 for new notification
      };
      const citizenData = await Citizen.findById(citizen.id);
      const notificationsData = citizenData.notificationsData;
      const lastNotification = notificationsData[notificationsData.length - 1];
      if (lastNotification) {
        notification.badge = lastNotification.badge + 1; // increment badge count for new notification
      }

      notificationsData.push(notification);
      const saveNotification = await citizenData.save(); // save the updated citizen notification

      success = true;
      res.json({
        success,
        saveNotification,
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

/****************************** 2nd Route ****************************/
//Citizen view notifications: GET "api/notifications/fetch_notifications". Login required.
router.get("/fetch_notifications", get_auth, async (req, res) => {
  try {
    const notifications = await Citizen.findById({ _id: req.citizen.id });
    res.json(notifications);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

/****************************** 3rd Route ****************************/
//Citizen delete notifications: DELETE "api/notifications/delete_notification/:id". Login required.
router.delete("/delete_notification/:id", get_auth, async (req, res) => {
  try {
    let success = false;
    const notificationId = req.params.id;

    const citizen = await Citizen.findOneAndUpdate(
      { notificationsData: { $elemMatch: { _id: notificationId } } },
      { $pull: { notificationsData: { _id: notificationId } } },
      { new: true }
    );
    if (!citizen) {
      return res.status(401).json({ message: "Invalid notification ID" });
    }
    return res.status(200).json({
      success: true,
      message: "Notification has been Deleted",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

/****************************** 4th Route ****************************/
//Citizen notification badge value: GET "api/notifications/badge_value". Login required.
router.get("/badge_value", get_auth, async (req, res) => {
  try {
    const { citizen } = req;
    if (!citizen) {
      return res.status(400).json({ error: "Unauthorized access" });
    }
    const citizenData = await Citizen.findById(citizen.id);
    const notificationsData = citizenData.notificationsData;
    let badgeValue = 0;

    if (notificationsData.some((notification) => notification.badgeValue > 0)) {
      // Count the number of notifications with non-zero badge values
      badgeValue = notificationsData.filter(
        (notification) => notification.badgeValue > 0
      ).length;
    }

    res.json({ badgeValue });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

/****************************** 5th Route ****************************/
//Citizen reset notification badge value: POST "api/notifications/reset_notification_badge". Login required.
router.post("/reset_notification_badge", get_auth, async (req, res) => {
  try {
    let success = false;
    const { citizen } = req;
    if (!citizen) {
      success = false;
      return res.status(400).json({ error: "Unauthorized access" });
    }
    const citizenData = await Citizen.findById(citizen.id);
    const notificationsData = citizenData.notificationsData;
    notificationsData.forEach((notification) => {
      notification.badgeValue = 0; // reset badge value to 0
    });
    const saveNotification = await citizenData.save(); // save the updated citizen document
    success = true;
    res.json({
      success,
      message: "Notification badge has been reset.",
      saveNotification,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

/****************************** 1st Route ****************************/
//Warden schedule notifications: POST "api/notifications/wardenSchedule_notification". Login required.
router.post(
  "/wardenSchedule_notification",
  get_auth,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("body", "Enter a valid body").isLength({ min: 3 }),
  ],
  async (req, res) => {
    try {
      let success = false;
      const { warden } = req;
      if (!warden) {
        success = false;
        return res.status(400).json({ error: "Unauthorized access" });
      }
      const notification = {
        title: req.body.title,
        body: req.body.body,
        badgeValue: 1, // initialize badge count to 1 for new notification
      };
      const wardenData = await Warden.findById(warden.id);
      const notificationsData = wardenData.notificationsData;
      const lastNotification = notificationsData[notificationsData.length - 1];
      if (lastNotification) {
        notification.badge = lastNotification.badge + 1; // increment badge count for new notification
      }

      notificationsData.push(notification);
      const saveNotification = await wardenData.save(); // save the updated warden notification

      success = true;
      res.json({
        success,
        saveNotification,
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

/****************************** 2nd Route ****************************/
//Warden view notifications: GET "api/notifications/wardenFetch_notifications". Login required.
router.get("/wardenFetch_notifications", get_auth, async (req, res) => {
  try {
    const notifications = await Warden.findById({ _id: req.warden.id });
    res.json(notifications);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

/****************************** 3rd Route ****************************/
//Warden delete notifications: DELETE "api/notifications/wardenDelete_notification/:id". Login required.
router.delete("/wardenDelete_notification/:id", get_auth, async (req, res) => {
  try {
    let success = false;
    const notificationId = req.params.id;

    const warden = await Warden.findOneAndUpdate(
      { notificationsData: { $elemMatch: { _id: notificationId } } },
      { $pull: { notificationsData: { _id: notificationId } } },
      { new: true }
    );
    if (!warden) {
      return res.status(401).json({ message: "Invalid notification ID" });
    }
    return res.status(200).json({
      success: true,
      message: "Notification has been Deleted",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
 
/****************************** 4th Route ****************************/
//Warden notification badge value: GET "api/notifications/wardenBadge_value". Login required.
router.get("/wardenBadge_value", get_auth, async (req, res) => {
  try {
    const { warden } = req;
    if (!warden) {
      return res.status(400).json({ error: "Unauthorized access" });
    }
    const wardenData = await Warden.findById(warden.id);
    const notificationsData = wardenData.notificationsData;
    let badgeValue = 0;

    if (notificationsData.some((notification) => notification.badgeValue > 0)) {
      // Count the number of notifications with non-zero badge values
      badgeValue = notificationsData.filter(
        (notification) => notification.badgeValue > 0
      ).length;
    }
    res.json({ badgeValue });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

/****************************** 5th Route ****************************/
//Warden reset notification badge value: POST "api/notifications/wardenReset_notifi_badge". Login required.
router.post("/wardenReset_notifi_badge", get_auth, async (req, res) => {
  try {
    let success = false;
    const { warden } = req;
    if (!warden) {
      success = false;
      return res.status(400).json({ error: "Unauthorized access" });
    }
    const wardenData = await Warden.findById(warden.id);
    const notificationsData = wardenData.notificationsData;
    notificationsData.forEach((notification) => {
      notification.badgeValue = 0; // reset badge value to 0
    });
    const saveNotification = await wardenData.save(); // save the updated warden notification badge
    success = true;
    res.json({
      success,
      message: "Notification badge has been reset.",
      saveNotification,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

/****************************** 1st Route ****************************/
//Admin schedule notifications: POST "api/notifications/adminSchedule_notification". Login required.
router.post(
  "/adminSchedule_notification",
  get_auth,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("body", "Enter a valid body").isLength({ min: 3 }),
  ],
  async (req, res) => {
    try {
      let success = false;
      const { admin } = req;
      if (!admin) {
        success = false;
        return res.status(400).json({ error: "Unauthorized access" });
      }
      const notification = {
        title: req.body.title,
        body: req.body.body,
        badgeValue: 1, // initialize badge count to 1 for new notification
      };
      const adminData = await Admin.findById(admin.id);
      const notificationsData = adminData.notificationsData;
      const lastNotification = notificationsData[notificationsData.length - 1];
      if (lastNotification) {
        notification.badge = lastNotification.badge + 1; // increment badge count for new notification
      }

      notificationsData.push(notification);
      const saveNotification = await adminData.save(); // save the updated admin notification

      success = true;
      res.json({
        success,
        saveNotification,
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

/****************************** 2nd Route ****************************/
//Admin view notifications: GET "api/notifications/adminFetch_notifications". Login required.
router.get("/adminFetch_notifications", get_auth, async (req, res) => {
  try {
    const notifications = await Admin.findById({ _id: req.admin.id });
    res.json(notifications);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

/****************************** 3rd Route ****************************/
//Admin delete notifications: DELETE "api/notifications/adminDelete_notification/:id". Login required.
router.delete("/adminDelete_notification/:id", get_auth, async (req, res) => {
  try {
    let success = false;
    const notificationId = req.params.id;

    const admin = await Admin.findOneAndUpdate(
      { notificationsData: { $elemMatch: { _id: notificationId } } },
      { $pull: { notificationsData: { _id: notificationId } } },
      { new: true }
    );
    if (!admin) {
      return res.status(401).json({ message: "Invalid notification ID" });
    }
    return res.status(200).json({
      success: true,
      message: "Notification has been Deleted",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

/****************************** 4th Route ****************************/
//Admin notification badge value: GET "api/notifications/adminBadge_value". Login required.
router.get("/adminBadge_value", get_auth, async (req, res) => {
  try {
    const { admin } = req;
    if (!admin) {
      return res.status(400).json({ error: "Unauthorized access" });
    }
    const adminData = await Admin.findById(admin.id);
    const notificationsData = adminData.notificationsData;
    let badgeValue = 0;

    if (notificationsData.some((notification) => notification.badgeValue > 0)) {
      // Count the number of notifications with non-zero badge values
      badgeValue = notificationsData.filter(
        (notification) => notification.badgeValue > 0
      ).length;
    }
    res.json({ badgeValue });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

/****************************** 5th Route ****************************/
//Admin reset notification badge value: POST "api/notifications/adminReset_notifi_badge". Login required.
router.post("/adminReset_notifi_badge", get_auth, async (req, res) => {
  try {
    let success = false;
    const { admin } = req;
    if (!admin) {
      success = false;
      return res.status(400).json({ error: "Unauthorized access" });
    }
    const adminData = await Admin.findById(admin.id);
    const notificationsData = adminData.notificationsData;
    notificationsData.forEach((notification) => {
      notification.badgeValue = 0; // reset badge value to 0
    });
    const saveNotification = await adminData.save(); // save the updated admin notification badge
    success = true;
    res.json({
      success,
      message: "Notification badge has been reset.",
      saveNotification,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
