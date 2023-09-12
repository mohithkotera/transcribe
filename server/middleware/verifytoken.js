const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyUserToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(404).json({ error: "Token Not found" });
  }
  jwt.verify(
    token,
    process.env.JWT_SECRET,
    {
      expiresIn: "36d",
    },
    (err, user) => {
      if (err) {
        return res.status(500).json({ error: "No user details" });
      }

      req._id = user._id;
    }
  );
  next();
};

module.exports = verifyUserToken;
