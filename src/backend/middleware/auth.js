const jwt = require("jsonwebtoken");

const veryfyToken = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).send("access dnied");
  }
  token = token.split(" ")[1];
  if (token == "null" || !token) {
    return res.status(401).send("access dnied");
  }

  let verifiedUser = jwt.verify(token, "khaerul");
  console.log(verifiedUser);
  if (!verifiedUser) {
    return res.status(401).send("access dnied");
  }

  req.user = verifiedUser;
  console.log(verifiedUser);
  next();
};

const checkRole = async (req, res, next) => {
  if (req.user.isAdmin) {
    return next();
  }
  return res.status(401).send("access dnied");
};

module.exports = { veryfyToken, checkRole };
