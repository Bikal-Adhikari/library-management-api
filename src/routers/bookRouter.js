import express from "express";
import { auth } from "../middlewares/auth.js";
const router = express.Router();

//create new user
router.post("/", auth, async (req, res, next) => {
  try {
    if (req.userInfo.role !== "admin") {
      throw new Error({
        status: 403,
        message: "UnAuthorized",
      });
    }
    console.log(req.body);
  } catch (error) {
    if (error.message.includes("E11000 duplicate key")) {
      error.message =
        "Another Book with same ISBN already exist, change your detail and try again";
      error.status = 200;
    }
    next(error);
  }
});

export default router;
