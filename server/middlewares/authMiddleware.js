const jwt = require("jsonwebtoken");
module.exports = function (req, res, next) {
  try {
    let token;
    let decoded;
    if(req.headers!==undefined){
      if(req.headers.authorization.startsWith("Bearer "){
      token = req.headers.authorization.split(" ")[1];
     decoded = jwt.verify(token, process.env.jwt_secret);
      }
    }
    
    if (decoded.userId) {
      req.body.userIdFromToken = decoded.userId;
      next();
    } else {
      return res.send({
        success: false,
        message: "Invalid token",
      });
    }
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};
