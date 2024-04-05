require("dotenv").config();
const jwt = require("jsonwebtoken");
const secretKey = process.env.TOKEN;

const auth = (req, res, next) => {
  try {
    // find the auth token which are send by frontend wiht name > x-access-token
    
    const token = req.headers["x-access-token"];
    const userData = jwt.verify(token, secretKey);
    req.decodeId = userData.id;
    next();
  } catch (error) {
    console.log("error in auth page", error);
    res.send({
      status: false,
      entity: "token is missing or invalid",
    });
  }
};

module.exports = { auth };
