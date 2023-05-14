import jwt from "jsonwebtoken";

const config = process.env;

export const verifyToken = (req, res, next) => {
  const isAuthorizationHeader = req.headers.authorization || req.headers.Authorization;

  if (!isAuthorizationHeader) {
    return res.status(403).send("A token is required for authentication");
  }

  if (isAuthorizationHeader.split(" ")[0] !== "Bearer") {
    return res.status(401).send("Invalid Token");
  }

  const token = isAuthorizationHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }

  return next();
}