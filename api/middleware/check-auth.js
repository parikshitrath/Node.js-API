const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    const verify = jwt.verify(token, "this is secret key");
    next();
    // if (verify.userType == "Admin") {
    //   next();
    // }
    // return res.status(401).json({
    //   msg: "invalid token, user is not admin",
    // });
  } catch (error) {
    return res.status(401).json({
      msg: "invalid token, log-in before making request",
    });
  }
};
