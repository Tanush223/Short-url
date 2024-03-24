const jwt = require("jsonwebtoken");
const jwtkey = "password";

const validator = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Invalid token. Please sign in.",
    });
  }
  try {
    const token = auth.split(" ")[1];
    const decoded = jwt.verify(token, jwtkey);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error("Error while verifying token:", error.message);
    return res.status(401).json({
      message: "Error while verifying token. Please sign in again.",
    });
  }
};

module.exports = validator;
