const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader || !authorizationHeader.includes("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authorization header missing or invalid",
      });
    }

    const token = authorizationHeader.split("Bearer ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token not found in authorization header",
      });
    }

    const decoded = jwt.verify(token, process.env.jwt_secret);

    if (decoded.userId) {
      req.body.userIdFromToken = decoded.userId;
      next();
    } else {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// const jwt = require("jsonwebtoken");

// module.exports = function (req, res, next) {
//   try {
//     console.log(req.headers); // Log headers for debugging

//     const authorizationHeader = req.headers.authorization;

//     if (!authorizationHeader) {
//       return res.status(401).json({
//         success: false,
//         message: "Authorization header missing",
//       });
//     }

//     const token = authorizationHeader.split(" ")[1];

//     if (!token || !authorizationHeader.startsWith("Bearer ")) {
//       return res.status(401).json({
//         success: false,
//         message: "Token not found or invalid format",
//       });
//     }

//     jwt.verify(token, process.env.jwt_secret, (err, decoded) => {
//       if (err) {
//         return res.status(401).json({
//           success: false,
//           message: "Invalid token",
//         });
//       }

//       if (decoded.userId) {
//         req.body.userIdFromToken = decoded.userId;
//         next();
//       } else {
//         return res.status(401).json({
//           success: false,
//           message: "Invalid token",
//         });
//       }
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
