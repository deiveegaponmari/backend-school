const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
  let token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({
      error: "No Token Provided,authorization Denied",
    });
  }
  // Remove "Bearer " if exists
  if (token.startsWith("Bearer ")) {
    token = token.split(" ")[1];
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(400).json({
      error: "Invalid Token",
    });
  }
};


const adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      error: "Admin access only",
    });
  }
  next();
};

module.exports ={ 
  authMiddleware,
  adminMiddleware
}
