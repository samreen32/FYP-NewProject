const jwt = require("jsonwebtoken");
const JWT_SECRETE = "Samreenisagoodgir@l";

//fetching a admin/warden/citizen
const get_auth = (req, res, next) => {
  //Get the Admin/Warden/citizen from jwt token and add id to req object.
  const token = req.header("auth-token"); //getting token from header.
  if (!token) {
    res.status(401).send({ error: "please authenticate using valid token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRETE);
    req.admin = data.admin;
    req.warden = data.warden;
    req.citizen = data.citizen;
    next();
  } catch (error) {
    res.status(401).send({
      error: "Error on middleware...says please authenticate using valid token",
    });
  }
};

module.exports = get_auth;
