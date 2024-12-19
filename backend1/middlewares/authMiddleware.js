import JWT from "jsonwebtoken";
import userModels from "../models/userModels.js";

//Middleware for protected Routes

export const requiredSignIn = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (token && token.startsWith('Bearer ')) {
      token = token.slice(7, token.length).trimLeft();
    }

    if (!token) {
      return res.status(401).send({
        success: false,
        message: "Authorization required",
      });
    }

    const decode = JWT.verify(token, process.env.JWT_SECRET);
    req.user = decode;

    console.log("User:", req.user);

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      success: false,
      message: "Invalid Token",
    });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModels.findById(req.user._id);

    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
  }
};
