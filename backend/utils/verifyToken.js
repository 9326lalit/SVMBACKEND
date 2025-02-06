import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";

export const verifyToken = (req, res, next) => 
{
  const token = req.cookies.access_token; // Access the access_token cookie

  if (!token) {
    return res.status(401).json({ message: "You are not authenticated!!" });
  }

  // console.log(req.cookies)

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(401, "Token is not valid"));
    req.user = user;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) 
    {
      next();
    } else 
    {
      if (err) return next(createError(401, "You are not authorized!!"));
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      if (err)
        return next(
          createError(401, "You are not authorized bcs you are not admin!!")
        );
    }
  });
};
