const jwt = require("jsonwebtoken");
const { secret } = require("./secret");

module.exports = function (req, res, next) {
  console.log(req.header);
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log("verifying", token);
  if (!token) return res.status(401).send({ message: "access denied!" });
  try {
    const verified = jwt.verify(token, secret);
    req.username = verified;
    console.log(req.username);
    next();
  } catch (error) {
    res.status(400).send({ message: "Invalid token" });
  }
};
