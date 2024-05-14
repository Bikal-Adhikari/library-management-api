import express from "express";
import { createNewUser } from "../models/user/userModal.js";
import { hashPassword } from "../utils/bcrypt.js";
const router = express.Router();

router.all("/", (req, res, next) => {
  //always execute
  console.log("from all");
  next();
});

router.get("/", (req, res, next) => {
  try {
    res.json({
      status: "success",
      message: "todo GET",
    });
  } catch (error) {
    next(error);
  }
});
router.post("/", async (req, res, next) => {
  try {
    req.body.password = hashPassword(req.body.password);
    const user = await createNewUser(req.body);

    user?._id
      ? res.json({
          status: "success",
          message: "Your Account has been created successfully",
        })
      : res.json({
          status: "failure",
          message: "Unable to create an account, try again later",
        });
  } catch (error) {
    next(error);
  }
});

export default router;
