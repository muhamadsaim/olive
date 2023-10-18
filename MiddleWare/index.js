const jwt = require("jsonwebtoken");

function Middleware(req, res, next) {
  const userToken = req.headers["x-usertoken"];
  
  if (!userToken) {
    return res
      .status(401)
      .json({ success: false, message: "Token not provided" });
  }

  jwt.verify(userToken, process.env.secretKey, function (err, decoded) {
    if (err) {
      console.error("JWT verification error:", err);
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    if (decoded) {
      // req.body = decoded;
      next();
    } else {
      res
        .status(401)
        .json({ success: false, message: "Please provide a valid token" });
    }
  });
}

module.exports = Middleware;
